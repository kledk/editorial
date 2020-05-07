import React, { useEffect, useRef, useState, useCallback } from "react";
import { RenderElementProps, ReactEditor, useSlate } from "slate-react";
import { Element, Editor, Transforms, Range, Node } from "slate";
import { Addon } from "../../addon";
import isUrl from "is-url";
import { RichEditor } from "../../aeditor";
import { useHoverTool } from "../../HoveringTool";
import { useOnClickOutside } from "../../utils";
import { StyledToolbarBtn } from "../../StyledToolbarBtn";
import { StyledToolBox } from "../../StyledToolBox";
import { InputWrapper } from "../../InputWrapper";

export const isLinkELement = (element: Element) => {
  return element.type === "link" && typeof element.url === "string";
};

export const Link = (props: RenderElementProps) => {
  return (
    <a {...props.attributes} href={props.element.url as string}>
      {props.children}
    </a>
  );
};

export const LinkAddon: Addon = {
  name: "link",
  element: {
    typeMatch: /link/,
    renderElement: props => {
      return <Link {...props} />;
    }
  },
  withPlugin: <T extends ReactEditor>(editor: T): T => {
    const { insertData, insertText, isInline } = editor;

    editor.isInline = element => {
      return isLinkELement(element) ? true : isInline(element);
    };

    editor.insertText = text => {
      if (text && isUrl(text)) {
        wrapLink(editor, text);
      } else {
        insertText(text);
      }
    };
    editor.insertData = data => {
      const text = data.getData("text/plain");
      if (text && isUrl(text)) {
        wrapLink(editor, text);
      } else {
        insertData(data);
      }
    };
    return editor;
  },
  hoverMenu: {
    order: 5,
    category: "link",
    renderButton: () => {
      return <LinkBtn>Link</LinkBtn>;
    }
  }
};

export const insertLink = (editor: Editor, url: string) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

export const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, { match: n => n.type === "link" });
  return !!link;
};

const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, { match: n => n.type === "link" });
};

const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : []
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

function LinkPopup(props: { onClose: () => void }) {
  const editor = useSlate();
  const { selection } = editor;
  const { saveSelection, perform } = useHoverTool();
  useEffect(() => {
    return saveSelection(selection);
  }, []);
  const linkWrapperRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(linkWrapperRef, e => {
    e.preventDefault();
    props.onClose();
  });
  let linkNode: Node | null = null;
  if (selection) {
    const [_linkNode] = Editor.nodes(editor, {
      at: selection,
      match: n => n.type === "link"
    });
    linkNode = _linkNode && _linkNode[0];
  }
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (linkNode && typeof linkNode.url === "string") {
      setUrl(linkNode.url);
    }
  }, [linkNode]);
  const handleInsertLink = useCallback(() => {
    RichEditor.insertLink(editor, url);
    props.onClose();
  }, [url]);

  return (
    <div
      ref={linkWrapperRef}
      style={{ padding: 9, display: "flex", minWidth: 300 }}
    >
      <InputWrapper>
        <input
          value={url}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setUrl(e.currentTarget.value)
          }
          placeholder="Insert link"
          autoFocus
          data-slate-editor
        />
      </InputWrapper>
      <StyledToolbarBtn onClick={handleInsertLink}>Link</StyledToolbarBtn>
      <StyledToolbarBtn onClick={props.onClose}>Unlink</StyledToolbarBtn>
    </div>
  );
}

export function LinkBtn(props: { children: React.ReactNode }) {
  const editor = useSlate();
  const isActive = isLinkActive(editor);
  const { useToolWindow } = useHoverTool();
  const Toolwindow = useToolWindow();
  return (
    <Toolwindow
      renderContent={setShow => (
        <StyledToolBox>
          <LinkPopup onClose={() => setShow(false)}></LinkPopup>
        </StyledToolBox>
      )}
      renderToolBtn={(tprops, show) => (
        <StyledToolbarBtn {...tprops} isActive={isActive || show}>
          {props.children}
        </StyledToolbarBtn>
      )}
    />
  );
}