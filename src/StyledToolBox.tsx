import styled from "styled-components";
import { OverrideTheme } from "./override-theme";

export const StyledToolBase = styled.div`
  overflow: hidden;
  border-radius: 3px;
  box-shadow: rgba(15, 15, 15, 0.05) 0px 0px 0px 1px,
    rgba(15, 15, 15, 0.1) 0px 3px 6px, rgba(15, 15, 15, 0.2) 0px 9px 24px;
`;

export const StyledToolBox = styled(StyledToolBase)`
  background-color: white;
  ${props =>
    props.theme.preferDarkOption &&
    `
@media (prefers-color-scheme: dark) {
    background-color: ${props.theme.darkTheme.background};
  }`}
  ${props => OverrideTheme("StyledToolBox", props)}
`;
