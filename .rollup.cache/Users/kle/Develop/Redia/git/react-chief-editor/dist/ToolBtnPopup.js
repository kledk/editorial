import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef } from "react";
import { Popper, Manager, Reference } from "react-popper";
import { useOnClickOutside } from "./utils";
import { useOnKeyDown } from "./chief";
export function ToolBtnPopup(props) {
    const [show, setShow] = useState(false);
    const toolWindow = useRef(null);
    useOnClickOutside(toolWindow, (e) => {
        if (!e.defaultPrevented) {
            setShow(false);
        }
        e.preventDefault();
    });
    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
            setShow(false);
        }
    };
    useOnKeyDown({
        pattern: props.shortcut,
        handler: () => setShow(!show),
    });
    return (_jsxs(Manager, { children: [_jsx(Reference, { children: ({ ref }) => props.renderToolBtn({
                    ref,
                    onMouseDown: (e) => {
                        e.preventDefault();
                        setShow(!show);
                    },
                }, show) }, void 0), _jsx(Popper, Object.assign({ placement: "bottom-start", modifiers: [
                    {
                        name: "offset",
                        options: {
                            offset: [-100, 10],
                        },
                    },
                ] }, { children: ({ ref, style, placement, arrowProps }) => (_jsxs("div", Object.assign({ ref: ref, style: style, "data-placement": placement }, { children: [show && (_jsx("div", Object.assign({ onKeyDown: handleKeyDown, ref: toolWindow }, { children: props.renderContent(setShow) }), void 0)), _jsx("div", { ref: arrowProps.ref, style: arrowProps.style }, void 0)] }), void 0)) }), void 0)] }, void 0));
}
//# sourceMappingURL=ToolBtnPopup.js.map