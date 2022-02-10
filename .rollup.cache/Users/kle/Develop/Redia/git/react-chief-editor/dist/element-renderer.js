import React from "react";
export const renderElement = (props, elementType, reactType, addionalProps) => {
    const { children, attributes, element } = props;
    if (element.type === elementType) {
        return React.createElement(reactType, Object.assign(Object.assign({}, attributes), addionalProps), children);
    }
    return undefined;
};
//# sourceMappingURL=element-renderer.js.map