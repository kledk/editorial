import styled from "styled-components";

export const PlaceholderHint = styled.span<{
  isEmpty: boolean;
  placeholder?: string;
  hoverHint?: string;
}>`
  display: inline-block;
  width: 100%;
  ::before {
    @media print {
      display: none;
    }
    filter: brightness(40%) invert(50%) opacity(0.2) grayscale(100%);
    content: "${props =>
      props.isEmpty && props.placeholder && props.placeholder.length > 0
        ? props.placeholder
        : ``}"
;
    pointer-events: none;
    user-select: none;
    position: absolute;
  }
  &:hover:before {
    @media print {
      display: none;
    }
    content: "${props =>
      props.isEmpty && props.hoverHint && !props.placeholder
        ? props.hoverHint
        : props.isEmpty && props.placeholder
        ? props.placeholder
        : ""}";
  }
`;
