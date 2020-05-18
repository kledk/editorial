import React, { useRef, useState } from "react";
import { StyledToolbarBtn } from "./StyledToolbarBtn";
import usePopper from "react-overlays/usePopper";
import Overlay from "react-overlays/Overlay";
import { useHover } from "./utils";
import styled, { css } from "styled-components";

export type Ref = HTMLElement;

type Props = {
  tooltip?: { label?: string; shortcut?: string };
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & React.ComponentProps<typeof StyledToolbarBtn>;

export const ToolbarBtn = React.forwardRef<Ref, Props>((props, ref) => {
  const { onClick, onMouseDown, tooltip, ...otherProps } = props;
  const containerRef = useRef(null);
  const [triggerRef, show] = useHover<HTMLDivElement>();

  return (
    <div ref={containerRef}>
      <div ref={triggerRef}>
        <StyledToolbarBtn
          ref={ref}
          onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            onMouseDown && onMouseDown(e);
          }}
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
            onClick && onClick(e);
          }}
          {...otherProps}
        />
      </div>
      <Overlay
        show={tooltip && show}
        placement={"top"}
        container={containerRef}
        target={triggerRef}
      >
        {({ props, arrowProps, placement }) => (
          <Tooltip {...props} placement={placement}>
            <Arrow
              {...arrowProps}
              placement={placement}
              style={arrowProps.style}
            />
            {tooltip && (
              <StyledTooltipBody>
                <div>
                  <strong>{tooltip.label}</strong>
                </div>
                <div>{tooltip.shortcut}</div>
              </StyledTooltipBody>
            )}
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
});

const StyledTooltipBody = styled.div`
  font-size: 0.8em;
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
    color: ${props => props.theme.colors.gray[400]};
  }
`;

const Arrow = styled.div<{ placement: string }>`
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;

  ${p => {
    switch (p.placement) {
      case "left":
        return css`
          right: 0;
          border-width: 5px 0 5px 5px;
          border-color: transparent transparent transparent #000;
        `;
      case "right":
        return css`
          left: 0;
          border-width: 5px 5px 5px 0;
          border-color: transparent #232323 transparent transparent;
        `;
      case "top":
        return css`
          bottom: 0;
          border-width: 5px 5px 0;
          border-color: #232323 transparent transparent transparent;
        `;
      case "bottom":
        return css`
          top: 0;
          border-width: 0 5px 5px;
          border-color: transparent transparent #232323 transparent;
        `;
      default:
        return "";
    }
  }}
`;

const Tooltip = styled.div<{ placement: string }>`
  position: absolute;
  padding: 0 5px;

  ${p => {
    switch (p.placement) {
      case "left":
        return css`
          padding: 0 5px;
        `;
      case "right":
        return css`
          padding: 0 5px;
        `;
      case "top":
        return css`
          padding: 5px 0;
        `;
      case "bottom":
        return css`
          padding: 5px 0;
        `;
      default:
        return "";
    }
  }}
`;