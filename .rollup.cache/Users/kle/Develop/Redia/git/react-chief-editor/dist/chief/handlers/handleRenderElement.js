import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { matchesType } from "../utils/matches-type";
export function handleRenderElement(props, renderElements, editor) {
    let element;
    for (let renderElement of renderElements) {
        if (renderElement.typeMatch === undefined ||
            matchesType(props.element, renderElement.typeMatch)) {
            if (renderElement.Component) {
                element = _jsx(renderElement.Component, Object.assign({}, props), void 0);
            }
            else if (renderElement.renderElement) {
                element =
                    typeof renderElement.renderElement === "function"
                        ? renderElement.renderElement(props, editor)
                        : React.cloneElement(renderElement.renderElement, props) || element;
            }
        }
    }
    return (element = element || _jsx(React.Fragment, { children: null }, void 0));
}
//# sourceMappingURL=handleRenderElement.js.map