import React, { ReactNode } from "react";
import { StyledToolbarBtn } from "@editorial/core";
import Overlay from "react-overlays/Overlay";
import { ControlProps, useLabels, Label, defaultTheme } from "@editorial/core";
import { useTheme } from "styled-components";
import { ElementHoverTip } from ".";

export type Ref = HTMLElement;

type Props = {
  tooltip?: {
    label: Label;
    shortcut?: string;
    placement?: React.ComponentProps<typeof Overlay>["placement"];
  };
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & ControlProps &
  Omit<React.ComponentProps<typeof StyledToolbarBtn>, "children">;

export const ToolbarBtn = React.forwardRef<Ref, Props>((props, ref) => {
  const { onClick, onMouseDown, tooltip, children, ...otherProps } = props;
  const [labels] = useLabels();
  const theme = useTheme() as typeof defaultTheme;

  return (
    <ElementHoverTip
      placement={tooltip?.placement ?? "top"}
      tip={
        tooltip && (
          <React.Fragment>
            <div>
              <strong>{labels(tooltip.label)}</strong>
            </div>
            <div>{tooltip.shortcut}</div>
          </React.Fragment>
        )
      }
    >
      <StyledToolbarBtn
        // @ts-ignore
        ref={ref}
        onMouseDown={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
          if (onClick) {
            onClick(e);
            return;
          }
          onMouseDown && onMouseDown(e);
        }}
        {...otherProps}
      >
        {typeof children === "function"
          ? // @ts-ignore
            children({ isActive: props.isActive, theme })
          : children}
      </StyledToolbarBtn>
    </ElementHoverTip>
  );
});
