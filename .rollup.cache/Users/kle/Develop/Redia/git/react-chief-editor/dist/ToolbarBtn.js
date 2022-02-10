import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { StyledToolbarBtn } from "./ui/styled-toolbar-btn";
import { useLabels } from "./chief/hooks/use-labels";
import { ElementHoverTip } from "./element-hover-tip";
import { useTheme } from "styled-components";
export const ToolbarBtn = React.forwardRef((props, ref) => {
    var _a;
    const { onClick, onMouseDown, tooltip, children } = props, otherProps = __rest(props, ["onClick", "onMouseDown", "tooltip", "children"]);
    const [labels] = useLabels();
    const theme = useTheme();
    return (_jsx(ElementHoverTip, Object.assign({ placement: (_a = tooltip === null || tooltip === void 0 ? void 0 : tooltip.placement) !== null && _a !== void 0 ? _a : "top", tip: tooltip && (_jsxs(React.Fragment, { children: [_jsx("div", { children: _jsx("strong", { children: labels(tooltip.label) }, void 0) }, void 0), _jsx("div", { children: tooltip.shortcut }, void 0)] }, void 0)) }, { children: _jsx(StyledToolbarBtn
        // @ts-ignore
        , Object.assign({ 
            // @ts-ignore
            ref: ref, onMouseDown: (e) => {
                if (onClick) {
                    onClick(e);
                    return;
                }
                onMouseDown && onMouseDown(e);
            } }, otherProps, { children: typeof children === "function"
                ? // @ts-ignore
                    children({ isActive: props.isActive, theme })
                : children }), void 0) }), void 0));
});
//# sourceMappingURL=ToolbarBtn.js.map