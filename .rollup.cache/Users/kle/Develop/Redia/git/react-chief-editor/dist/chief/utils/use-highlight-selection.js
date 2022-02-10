import { jsx as _jsx } from "react/jsx-runtime";
import { Node } from "slate";
import { useDecoration } from "../hooks/use-decoration";
import { useRenderLeaf } from "..";
export function useHighlightSelection(selection, style) {
    useRenderLeaf({
        renderLeaf: props => {
            return (_jsx("span", Object.assign({ style: props.leaf.highlightSelection ? style : undefined }, props.attributes, { children: props.children }), void 0));
        }
    }, [selection]);
    useDecoration({
        decorator: ([node]) => {
            const ranges = [];
            if (selection && Node.has(node, selection.anchor.path)) {
                ranges.push(Object.assign(Object.assign({}, selection), { highlightSelection: true }));
            }
            return ranges;
        }
    }, [selection]);
}
//# sourceMappingURL=use-highlight-selection.js.map