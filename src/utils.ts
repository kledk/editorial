import { useEffect, useCallback, useState } from "react";
import { Editor, Point, Node, Transforms } from "slate";
import { ReactEditor } from "slate-react";

export const isInside = (rect: ClientRect, x: number, y: number) => {
  return (
    x >= rect.left &&
    x <= rect.left + rect.width &&
    y >= rect.top &&
    y <= rect.top + rect.height
  );
};

export const useHover = (element: HTMLElement | null) => {
  const [over, setOver] = useState(false);

  const handleMove = useCallback(
    (event: MouseEvent) => {
      if (element) {
        const bounds = element.getBoundingClientRect();
        setOver(isInside(bounds, event.clientX, event.clientY));
      }
    },
    [element]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, [element]);
  return over;
};

export const getActiveNode = (editor: ReactEditor) => {
  if (editor.selection) {
    const [, path] = Editor.node(editor, editor.selection);
    if (path.length) {
      const [parent] = Editor.parent(editor, path);
      return parent;
    }
  }
  return null;
};

export const getActiveNodeType = (editor: ReactEditor) => {
  const block = getActiveNode(editor);
  return block ? block.type : null;
};

export const clone = (value: any) => {
  return JSON.parse(JSON.stringify(value));
};

interface State {
  node: Node | null;
  point: Point | null;
  selection: Range | null;
}

export const useLastFocused = (editor: ReactEditor) => {
  const [state, setState] = useState<State>({
    node: null,
    point: null,
    selection: null
  });
  const { selection } = editor;
  const current = getActiveNodeType(editor);

  useEffect(() => {
    if (!ReactEditor.isFocused(editor)) {
      return;
    }
    if (!selection) {
      return;
    }
    if (current) {
      const point = selection.focus;
      const [node] = Editor.parent(editor, point);
      if (Node.isNode(node)) {
        setState({ node, point, selection: clone(selection) });
      }
    }
  }, [current, selection]);

  return state;
};

export const isBlockEmpty = (editor: Editor) => {
  const { selection } = editor;

  if (selection) {
    const [node] = Editor.node(editor, selection);
    return Node.string(node).length === 0;
  }

  return false;
};

export const toggleBlock = (editor: Editor, type: string) => {
  const isActive = isNodeActive(editor, type);

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : type
  });
};

export const isNodeActive = (editor: Editor, type: string) => {
  const { selection } = editor;
  if (!selection) {
    return false;
  }
  const [match] = Editor.nodes(editor, {
    at: selection,
    match: n => n.type === type
  });
  return !!match;
};

export function useOnClickOutside(
  ref: React.MutableRefObject<any>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(
    () => {
      const listener = (event: MouseEvent | TouchEvent) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }

        handler(event);
      };

      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);

      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  );
}
