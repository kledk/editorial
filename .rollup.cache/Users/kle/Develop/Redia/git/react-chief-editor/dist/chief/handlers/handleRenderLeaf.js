import { jsx as _jsx } from "react/jsx-runtime";
export function handleRenderLeaf(props, renderLeafs, editor) {
    let copy = Object.assign({}, props);
    for (const renderLeaf of renderLeafs) {
        const leaf = renderLeaf.renderLeaf(copy, editor);
        if (leaf) {
            copy = Object.assign(Object.assign({}, copy), { children: leaf });
        }
    }
    return _jsx("span", Object.assign({}, copy.attributes, { children: copy.children }), void 0);
}
//# sourceMappingURL=handleRenderLeaf.js.map