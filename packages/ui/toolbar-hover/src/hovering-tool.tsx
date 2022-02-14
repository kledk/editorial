import React, { useEffect, useState, useRef, useContext } from "react";
import { ReactEditor, useSlate } from "slate-react";
import { Editor, Range, Transforms } from "slate";
import { Popper } from "react-popper";
import { VirtualElement } from "@popperjs/core";
import {
  getNodeFromSelection,
  useChief,
  useSaveSelection,
  useHighlightSelection,
  useOnClickOutside,
} from "@editorial/core";

export const deselect = Transforms.deselect;
Transforms.deselect = (..._args) => {
  // We disable the default deselect.
};

type HoverToolContext = ReturnType<typeof useProvideContext>["ctx"];

const hoverToolContext = React.createContext<HoverToolContext | undefined>(
  undefined
);

function useProvideContext() {
  const editor = useSlate();
  const { selection } = editor;

  const isEditorFocused = ReactEditor.isFocused(editor);
  const isCollapsed = selection && Range.isCollapsed(selection);
  const isEmpty = selection && Editor.string(editor, selection) === "";
  const currentNode = getNodeFromSelection(editor, selection);
  const isVoid = Editor.isVoid(editor, currentNode);
  const isReadOnly = useChief().readOnly;
  const { savedSelection } = useSaveSelection();
  useHighlightSelection(savedSelection?.current, {
    backgroundColor: "#969696",
  });

  // ""({
  //   isEditorFocused,
  //   selection,
  //   isCollapsed,
  //   isEmpty,
  //   isVoid,
  //   ...ctx
  // });

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (isReadOnly) {
      setEnabled(false);
    } else if (ctx.enabled) {
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

  const ctx = {
    enabled,
  };

  return { ctx, setEnabled };
}

export function useHoverTool() {
  const ctx = useContext(hoverToolContext);
  if (ctx === undefined) {
    throw new Error("useHoverTool must be within a <HoverToolProvider/>");
  }
  return ctx;
}

export function HoverTools(props: { children?: React.ReactNode }) {
  const { ctx, setEnabled } = useProvideContext();
  return (
    <hoverToolContext.Provider value={ctx}>
      <HoveringTool
        onChangeEnabled={(enabled) => setEnabled(enabled)}
        enabled={ctx.enabled}
      >
        {props.children}
      </HoveringTool>
    </hoverToolContext.Provider>
  );
}

export const HoveringTool = (
  props: {
    children?: React.ReactNode;
    enabled: boolean;
    onChangeEnabled: (enabled: boolean) => void;
  } & React.HTMLProps<HTMLDivElement>
) => {
  const { children, enabled, onChangeEnabled, ...otherProps } = props;
  const editor = useSlate();
  const { selection } = editor;
  const [deltaOffset, setDeltaOffset] = useState(-1);
  const currentNode = getNodeFromSelection(editor, selection);

  useEffect(() => {
    const deltaoffset = selection
      ? selection.focus.offset - selection.anchor.offset
      : -1;
    setDeltaOffset(deltaoffset);
  }, [selection]);

  const toolRef = useRef(null);
  const [_v, _setV] = useState<VirtualElement>({
    //@ts-ignore
    getBoundingClientRect: () => ({
      top: -1000,
      left: -1000,
      bottom: 0,
      right: 0,
      width: 1,
      height: 1,
    }),
  });

  useOnClickOutside(toolRef, (e) => {
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
      const isVoid = Editor.isVoid(editor, currentNode);
      if (isVoid && currentNode) {
        try {
          const domNode = ReactEditor.toDOMNode(editor, currentNode);
          _setV({
            getBoundingClientRect: () => domNode.getBoundingClientRect(),
          });
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const domSelection = window.getSelection();
          if (domSelection && domSelection.rangeCount > 0) {
            const domRange = domSelection.getRangeAt(0);
            if (domRange && deltaOffset !== -1) {
              _setV({
                getBoundingClientRect: () => domRange.getBoundingClientRect(),
              });
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  }, [enabled, deltaOffset, selection, currentNode]);

  if (!enabled || !children) {
    return null;
  }

  return (
    <Popper
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ]}
      placement="top-end"
      referenceElement={_v}
    >
      {({ ref, style, placement, arrowProps }) => (
        <div
          ref={ref}
          style={{ ...style, zIndex: 10 }}
          data-placement={placement}
        >
          <div ref={toolRef} {...otherProps}>
            {children}
          </div>
          <div ref={arrowProps.ref} style={arrowProps.style} />
        </div>
      )}
    </Popper>
  );
};
