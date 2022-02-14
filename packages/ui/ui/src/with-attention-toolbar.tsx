import React, { ComponentProps } from "react";
import { RenderElementProps } from "slate-react";
import { ToolsWrapper } from "./tools-wrapper";
import { StyledFocusToolbar } from "./styled-focus-toolbar";
import { ElementWrapper } from "./element-wrapper";

export function WithAttentionToolbar(
  props: RenderElementProps & {
    children: React.ReactNode;
    btns: React.ReactNode;
  } & ComponentProps<typeof ElementWrapper>
) {
  const { btns, children, style, ...renderElementProps } = props;
  return (
    <ElementWrapper
      {...renderElementProps}
      renderOnFocus={
        <StyledFocusToolbar>
          <ToolsWrapper>{btns}</ToolsWrapper>
        </StyledFocusToolbar>
      }
      style={{ right: 0, marginTop: 5, marginRight: 5, ...style }}
    >
      {children}
    </ElementWrapper>
  );
}
