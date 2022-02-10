import { useState, useEffect } from "react";
import { ReactEditor } from "slate-react";
import { Node, Editor } from "slate";
export function useHoveredNode(editor) {
    const [node, setNode] = useState(null);
    useEffect(() => {
        try {
            const [rootNode] = Editor.node(editor, {
                anchor: Editor.start(editor, []),
                focus: Editor.end(editor, []),
            });
            if (rootNode && Node.isNode(rootNode)) {
                const firstDOMPoint = ReactEditor.toDOMNode(editor, rootNode);
                firstDOMPoint.addEventListener("mousemove", (e) => {
                    if (ReactEditor.hasDOMNode(editor, e.target)) {
                        const node = ReactEditor.toSlateNode(editor, e.target);
                        const path = ReactEditor.findPath(editor, node);
                        setNode({ node, path });
                    }
                    else {
                        setNode(null);
                    }
                });
            }
        }
        catch (err) {
            setNode(null);
        }
    }, [editor]);
    return node;
}
//# sourceMappingURL=use-hovered-node.js.map