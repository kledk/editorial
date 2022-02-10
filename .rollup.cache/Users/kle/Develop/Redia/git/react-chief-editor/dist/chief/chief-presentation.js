import { jsx as _jsx } from "react/jsx-runtime";
import React, { useCallback, useEffect } from "react";
import { handleRenderElement } from "./handlers/handleRenderElement";
import { handleRenderLeaf } from "./handlers/handleRenderLeaf";
import { useChiefRenderCore } from "./chief-context";
const SlatePresentationContext = React.createContext(null);
function useSlatePresentation() {
    const ctx = React.useContext(SlatePresentationContext);
    if (!ctx) {
        throw new Error("No SlatePresentationContext");
    }
    return ctx;
}
function isElement(value) {
    return value instanceof Object && Array.isArray(value.children);
}
function Element(props) {
    const { renderElement } = useSlatePresentation();
    const { element } = props;
    return (_jsx(React.Fragment, { children: renderElement({
            children: _jsx(Children, { children: element.children }, void 0),
            element
        }) }, void 0));
}
function Leaf({ leaf = { text: "" } }) {
    const { renderLeaf } = useSlatePresentation();
    return (_jsx(React.Fragment, { children: renderLeaf({
            children: _jsx("span", { children: leaf.text }, void 0),
            leaf,
            text: leaf.text
        }) }, void 0));
}
function Children(props) {
    const { children } = props;
    return (_jsx(React.Fragment, { children: children.map((child, i) => {
            if (isElement(child)) {
                return _jsx(Element, { element: child }, i);
            }
            else {
                return _jsx(Leaf, { leaf: child }, i);
            }
        }) }, void 0));
}
export function ChiefPresentation({ value = [], presenters = [], overrideRenderElement, overrideRenderLeaf }) {
    const { renderLeafs, renderElements, injectRenderElement, injectRenderLeaf } = useChiefRenderCore();
    useEffect(() => {
        for (const presenter of presenters) {
            if (presenter.element) {
                injectRenderElement(presenter.element);
            }
            if (presenter.leaf) {
                injectRenderLeaf(presenter.leaf);
            }
        }
    }, []);
    return (_jsx(SlatePresentationContext.Provider, Object.assign({ value: {
            renderElement: useCallback((props) => {
                const overridedElement = overrideRenderElement && overrideRenderElement(props);
                if (overridedElement) {
                    return overridedElement;
                }
                return handleRenderElement(props, renderElements);
            }, [renderElements]),
            renderLeaf: useCallback((props) => {
                const overridedLeaf = overrideRenderLeaf && overrideRenderLeaf(props);
                if (overridedLeaf) {
                    return overridedLeaf;
                }
                return handleRenderLeaf(props, renderLeafs);
            }, [renderLeafs])
        } }, { children: _jsx(Children, { children: value }, void 0) }), void 0));
}
//# sourceMappingURL=chief-presentation.js.map