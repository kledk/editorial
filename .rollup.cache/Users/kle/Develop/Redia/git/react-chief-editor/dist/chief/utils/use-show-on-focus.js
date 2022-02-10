import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { useFocused } from "../../Focused";
import { Show } from "../../show";
import { useChief } from "../hooks/use-chief";
import { useDropdownMenu } from "react-overlays";
export function useShowOnFocus(element, when) {
    const { isFocusedWithin, isFocused } = useFocused(element);
    const [inside, setInside] = useState(false);
    const { readOnly } = useChief();
    const handleEnter = () => {
        !readOnly && setInside(true);
    };
    const handleLeave = () => {
        setInside(false);
    };
    const props = {
        // "data-slate-zero-width": "z",
        onMouseEnter: handleEnter,
        onMouseLeave: handleLeave,
    };
    const [dropDownprops] = useDropdownMenu({ show: true, usePopper: false });
    const { isFocused: whenIsFocused, isFocusedWithin: whenIsFocusedWithin, isInside: whenIsInside, } = when;
    const show = useMemo(() => {
        if (typeof whenIsFocused === "boolean" && isFocused) {
            return true;
        }
        if (typeof whenIsFocusedWithin === "boolean" && isFocusedWithin) {
            return true;
        }
        if (typeof whenIsInside === "boolean" && inside) {
            return true;
        }
        return false;
    }, [
        whenIsFocused,
        whenIsFocusedWithin,
        whenIsInside,
        isFocused,
        isFocusedWithin,
        inside,
    ]);
    const ShouldShow = useMemo(() => (props) => {
        const { children, style } = props;
        return (_jsx(Show, Object.assign({ when: show }, { children: _jsx("div", Object.assign({ contentEditable: false, role: "menu" }, dropDownprops, { style: Object.assign({ position: "absolute", zIndex: 2, marginTop: 5, marginRight: 5 }, style) }, { children: children }), void 0) }), void 0));
    }, [show]);
    return [props, ShouldShow];
}
//# sourceMappingURL=use-show-on-focus.js.map