import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { ElementWrapper } from "../element-wrapper";
import { ToolsWrapper } from "../ToolsWrapper";
import { StyledFocusToolbar } from "./StyledFocusToolbar";
export function WithAttentionToolbar(props) {
    const { btns, children, style } = props, renderElementProps = __rest(props, ["btns", "children", "style"]);
    return (_jsx(ElementWrapper, Object.assign({}, renderElementProps, { renderOnFocus: _jsx(StyledFocusToolbar, { children: _jsx(ToolsWrapper, { children: btns }, void 0) }, void 0), style: Object.assign({ right: 0, marginTop: 5, marginRight: 5 }, style) }, { children: children }), void 0));
}
//# sourceMappingURL=WithAttentionToolbar.js.map