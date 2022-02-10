import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useFocused } from "./Focused";
import { Show } from "./show";
import { useChief } from "./chief/hooks/use-chief";
import { useDropdownMenu } from "react-overlays";
export function ElementWrapper(props) {
    const { children, element, renderOnFocus, style, attributes } = props, otherProps = __rest(props, ["children", "element", "renderOnFocus", "style", "attributes"]);
    const { isFocusedWithin } = useFocused(element);
    const [inside, setInside] = useState(false);
    const { readOnly } = useChief();
    const handleEnter = () => {
        !readOnly && setInside(true);
    };
    const handleLeave = () => {
        setInside(false);
    };
    const [dropDownprops] = useDropdownMenu();
    return (_jsxs("div", Object.assign({ "data-slate-zero-width": "z", onMouseEnter: handleEnter, onMouseLeave: handleLeave, style: { position: "relative" } }, otherProps, { children: [_jsx(Show, Object.assign({ when: !readOnly && (isFocusedWithin || inside) }, { children: _jsx("div", Object.assign({ role: "menu", style: Object.assign({ position: "absolute", zIndex: 2 }, style) }, dropDownprops, { children: renderOnFocus }), void 0) }), void 0), children] }), void 0));
}
//# sourceMappingURL=element-wrapper.js.map