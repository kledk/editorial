import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import styled from "styled-components";
const HiddenFileInput = styled.input.attrs({
    type: "file"
}) `
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute !important;
  white-space: nowrap;
  width: 1px;
`;
export const FileUpload = React.forwardRef((props, ref) => _jsx(HiddenFileInput, Object.assign({ ref: ref }, props), void 0));
//# sourceMappingURL=FileUpload.js.map