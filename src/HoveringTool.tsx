import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback
} from "react";
import { ReactEditor, useSlate, useFocused, useSelected } from "slate-react";
import { Editor, Range, Node, Transforms, RangeRef } from "slate";
import { Popper, Manager, Reference } from "react-popper";
import { VirtualElement } from "@popperjs/core";
import { useOnClickOutside, getActiveNode } from "./utils";

type HoverToolContext = {
  activeNode?: Node;
  enabled: boolean;
  selection: RangeRef | null;
  saveSelection: () => () => void;
  perform: (fn: (selection: Range) => void) => void;
  useToolWindow: () => typeof ToolWindow;
};

const hoverToolContext = React.createContext<HoverToolContext | undefined>(
  undefined
);

function ToolWindow(props: {
  renderContent: (setShow: (show: boolean) => void) => React.ReactNode;
  renderToolBtn: (
    props: {
      ref: React.Ref<any>;
      onClick: () => void;
    },
    show: boolean
  ) => React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const toolWindow = useRef(null);
  useOnClickOutside(toolWindow, e => {
    e.preventDefault();
    setShow(false);
  });
  return (
    <Manager>
      <Reference>
        {({ ref }) =>
          props.renderToolBtn({ ref, onClick: () => setShow(!show) }, show)
        }
      </Reference>
      <Popper
        placement="bottom"
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [-100, 10]
            }
          }
        ]}
      >
        {({ ref, style, placement, arrowProps }) => (
          <div ref={ref} style={style} data-placement={placement}>
            {show && <div ref={toolWindow}>{props.renderContent(setShow)}</div>}
            <div ref={arrowProps.ref} style={arrowProps.style} />
          </div>
        )}
      </Popper>
    </Manager>
  );
}

function getUseToolWindow() {
  return function useToolWindow() {
    return ToolWindow;
  };
}

function getNodeFromSelection(editor: Editor, selection: Range | null) {
  if (selection) {
    const [, path] = Editor.node(editor, selection);
    if (path.length) {
      const [parent] = Editor.parent(editor, path);
      return parent;
    }
  }
  return null;
}

function useProvideContext() {
  const editor = useSlate();
  const { selection } = editor;
  const [ctx, setCtx] = useState<HoverToolContext>({
    enabled: false,
    saveSelection: () => () => null,
    perform: () => () => null,
    selection: null,
    useToolWindow: getUseToolWindow()
  });
  const [savedSelection, setSaveSelection] = useState<RangeRef | null>(null);
  const isEditorFocused = ReactEditor.isFocused(editor);
  const isCollapsed = selection && Range.isCollapsed(selection);
  const isEmpty = selection && Editor.string(editor, selection) === "";
  const currentNode = getNodeFromSelection(editor, selection);
  const isVoid = Editor.isVoid(editor, currentNode);

  // console.log({
  //   isEditorFocused,
  //   selection,
  //   isCollapsed,
  //   isEmpty,
  //   isVoid,
  //   ...ctx
  // });

  // When selection changes. We proxy the editor selection with or own saved selection.
  useEffect(() => {
    if (savedSelection?.current) {
      setCtx({ ...ctx, selection: savedSelection });
    } else if (selection) {
      const sRef = Editor.rangeRef(editor, selection);
      setCtx({ ...ctx, selection: sRef });
    } else {
      setCtx({ ...ctx, selection: null });
    }
  }, [selection, savedSelection]);

  const setEnabled = useCallback((enabled: boolean) => {
    setCtx(ctx => ({
      ...ctx,
      enabled
    }));
  }, []);

  useEffect(() => {
    if (ctx.enabled) {
      if (!savedSelection?.current && isCollapsed && !isVoid) {
        setEnabled(false);
      }
    } else {
      if (isEditorFocused) {
        if (isCollapsed && isVoid) {
          setEnabled(true);
        } else if (!isCollapsed && !isEmpty) {
          setEnabled(true);
        }
      }
    }
  }, [isEditorFocused, isCollapsed, isEmpty, isVoid]);

  const editorRef = useRef(editor);
  editorRef.current = editor;

  const saveSelection = useCallback(() => {
    if (selection) {
      const sRef = Editor.rangeRef(editor, selection);
      setSaveSelection(sRef);
      setCtx(ctx => ({ ...ctx, selection: sRef }));
      return () => {
        if (sRef.current) {
          Transforms.select(editorRef.current, sRef.current);
          ReactEditor.focus(editorRef.current);
          setSaveSelection(null);
          sRef.current = null;
        }
      };
    }
    return () => null;
  }, [selection]);

  useEffect(() => setCtx(ctx => ({ ...ctx, saveSelection })), [saveSelection]);

  const perform = useCallback(
    (fn: (selection: Range) => void) => {
      if (savedSelection && savedSelection.current) {
        Transforms.select(editorRef.current, savedSelection.current);
        fn(savedSelection.current);
      }
    },
    [savedSelection]
  );
  useEffect(() => setCtx(ctx => ({ ...ctx, perform })), [perform]);

  return { ctx, setEnabled };
}

export function useHoverTool() {
  const ctx = useContext(hoverToolContext);
  if (ctx === undefined) {
    throw new Error("useHoverTool must be within a <HoverToolProvider/>");
  }
  return ctx;
}

export function HoverToolProvider(props: {
  children?: React.ReactNode;
  hoverTool: React.ReactNode;
}) {
  const { ctx, setEnabled } = useProvideContext();
  return (
    <hoverToolContext.Provider value={ctx}>
      <HoveringTool
        selection={ctx.selection?.current || null}
        onChangeEnabled={enabled => setEnabled(enabled)}
        enabled={ctx.enabled}
      >
        {props.hoverTool}
      </HoveringTool>
      {props.children}
    </hoverToolContext.Provider>
  );
}

export const HoveringTool = (
  props: {
    selection: Range | null;
    children?: React.ReactNode;
    enabled: boolean;
    onChangeEnabled: (enabled: boolean) => void;
  } & React.HTMLProps<HTMLDivElement>
) => {
  const {
    children,
    enabled,
    onChangeEnabled,
    selection,
    ...otherProps
  } = props;
  const editor = useSlate();
  const currentNode = getNodeFromSelection(editor, selection);
  const isVoid = Editor.isVoid(editor, currentNode);

  const [deltaOffset, setDeltaOffset] = useState(-1);

  useEffect(() => {
    const deltaoffset = selection
      ? selection.focus.offset - selection.anchor.offset
      : -1;
    setDeltaOffset(deltaoffset);
  }, [selection]);

  const toolRef = useRef(null);
  const [_v, _setV] = useState<VirtualElement>({
    getBoundingClientRect: () => ({
      top: -1000,
      left: -1000,
      bottom: 0,
      right: 0,
      width: 1,
      height: 1
    })
  });

  useOnClickOutside(toolRef, e => {
    if (currentNode) {
      const domNode = ReactEditor.toDOMNode(editor, currentNode);
      if (e.target && domNode.contains(e.target as globalThis.Node)) {
        return;
      }
    }
    onChangeEnabled(false);
  });

  useEffect(() => {
    if (enabled) {
      const domSelection = window.getSelection();
      const domRange = domSelection?.getRangeAt(0);
      if (domRange && deltaOffset !== -1) {
        _setV({
          getBoundingClientRect: () => domRange.getBoundingClientRect()
        });
      }
    }
  }, [enabled, deltaOffset, selection]);

  const [offsetW, setOffsetW] = useState(0);

  useEffect(() => {
    if (currentNode && isVoid) {
      const domNode = ReactEditor.toDOMNode(editor, currentNode);
      const rect = domNode.getBoundingClientRect();
      setOffsetW(rect.width / 2);
    }
    if (!isVoid) {
      setOffsetW(0);
    }
  }, [currentNode, isVoid]);

  if (!enabled || !children) {
    return null;
  }

  return (
    <Popper
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [offsetW, 10]
          }
        }
      ]}
      placement="top"
      referenceElement={_v}
    >
      {({ ref, style, placement, arrowProps }) => (
        <div ref={ref} style={style} data-placement={placement}>
          <div
            ref={toolRef}
            onMouseDown={e => {
              e.preventDefault();
            }}
            {...otherProps}
          >
            {children}
          </div>
          <div ref={arrowProps.ref} style={arrowProps.style} />
        </div>
      )}
    </Popper>
  );
};
