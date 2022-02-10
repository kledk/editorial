import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useState, useEffect } from "react";
import Overlay from "react-overlays/Overlay";
import { useGlobalHover, useHover } from "./utils";
import styled, { css } from "styled-components";
import { UiWrap } from "./ui/ui-wrap";
export function ElementHoverTip(props) {
    const containerRef = useRef(null);
    const overlayRef = useRef(null);
    const [triggerRef, isHovering] = useHover();
    const isOverlayHovering = useGlobalHover(overlayRef.current);
    const isOverlayHoveringRef = useRef(isOverlayHovering);
    isOverlayHoveringRef.current = isOverlayHovering;
    const isHoveringRef = useRef(isHovering);
    isHoveringRef.current = isHovering;
    const [show, setShow] = useState(isHovering);
    useEffect(() => {
        if (isHovering) {
            setShow(true);
        }
        else if (delayed) {
            setTimeout(() => !isOverlayHoveringRef.current && setShow(false), 150);
        }
        else {
            setShow(false);
        }
    }, [isHovering]);
    useEffect(() => {
        if (!isOverlayHovering) {
            setTimeout(() => !isHoveringRef.current && setShow(false), 150);
        }
    }, [isOverlayHovering]);
    const { children, tip, delayed } = props, overlayProps = __rest(props, ["children", "tip", "delayed"]);
    const overlay = (_jsx(Overlay, Object.assign({ ref: overlayRef, show: Boolean(tip) && show, container: containerRef, target: triggerRef }, overlayProps, { children: ({ props, arrowProps, placement }) => (_jsxs(Tooltip, Object.assign({}, props, { placement: placement }, { children: [_jsx(Arrow, Object.assign({}, arrowProps, { placement: placement, style: arrowProps.style }), void 0), tip] }), void 0)) }), void 0));
    const container = (_jsx("div", { contentEditable: false, style: { position: "absolute", width: "100%" }, ref: containerRef }, void 0));
    if (typeof children === "function") {
        return (_jsxs(React.Fragment, { children: [container, children(triggerRef, isHovering), overlay] }, void 0));
    }
    else {
        return (_jsxs(React.Fragment, { children: [container, _jsx("span", Object.assign({ ref: triggerRef }, { children: children }), void 0), overlay] }, void 0));
    }
}
export const StyledTooltipBody = styled(UiWrap) `
  width: 100%;
  font-size: 12px;
  padding: 3px 8px;
  color: #fff;
  text-align: center;
  border-radius: 3px;
  background-color: #000;
  div:nth-child(1) {
  }
  div:nth-child(2) {
    font-weight: bold;
    font-size: 0.7em;
    color: ${(props) => props.theme.colors.gray[400]};
  }
`;
export const Arrow = styled.div `
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;

  ${(p) => {
    switch (p.placement) {
        case "left":
            return css `
          right: 0;
          border-width: 5px 0 5px 5px;
          border-color: transparent transparent transparent #000;
        `;
        case "right":
            return css `
          left: 0;
          border-width: 5px 5px 5px 0;
          border-color: transparent #232323 transparent transparent;
        `;
        case "top":
            return css `
          bottom: 0;
          border-width: 5px 5px 0;
          border-color: #232323 transparent transparent transparent;
        `;
        case "bottom":
            return css `
          top: 0;
          border-width: 0 5px 5px;
          border-color: transparent transparent #232323 transparent;
        `;
        default:
            return "";
    }
}}
`;
export const Tooltip = styled.div `
  position: absolute;
  padding: 0 5px;

  ${(p) => {
    switch (p.placement) {
        case "left":
            return css `
          padding: 0 5px;
        `;
        case "right":
            return css `
          padding: 0 5px;
        `;
        case "top":
            return css `
          padding: 5px 0;
        `;
        case "bottom":
            return css `
          padding: 5px 0;
        `;
        default:
            return "";
    }
}}
`;
//# sourceMappingURL=element-hover-tip.js.map