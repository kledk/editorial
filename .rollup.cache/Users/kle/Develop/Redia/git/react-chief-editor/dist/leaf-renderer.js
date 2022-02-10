import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
export function renderLeaf(props, leafType, rectType, elementProps) {
    const { children, leaf } = props;
    if (leaf[leafType]) {
        return (_jsx(Leaf, Object.assign({}, props, { children: React.createElement(rectType, elementProps, children) }), void 0));
    }
    return undefined;
}
const Leaf = (props) => {
    const { attributes, children } = props;
    return _jsx("span", Object.assign({}, attributes, { children: children }), void 0);
};
//# sourceMappingURL=leaf-renderer.js.map