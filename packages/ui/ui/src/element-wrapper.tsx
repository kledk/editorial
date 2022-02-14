import React, { useState } from "react";
import { RenderElementProps } from "slate-react";
import { useEditorial, Show, useFocused } from "@editorial/core";
import { useDropdownMenu } from "react-overlays";

export function ElementWrapper(
  props: RenderElementProps & {
    renderOnFocus?: React.ReactNode;
    style?: React.CSSProperties;
  }
) {
  const { children, element, renderOnFocus, style, attributes, ...otherProps } =
    props;
  const { isFocusedWithin } = useFocused(element);
  const [inside, setInside] = useState(false);
  const { readOnly } = useEditorial();
  const handleEnter = () => {
    !readOnly && setInside(true);
  };
  const handleLeave = () => {
    setInside(false);
  };
  const [dropDownprops] = useDropdownMenu();
  return (
    <div
      data-slate-zero-width="z"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ position: "relative" }}
      {...otherProps}
    >
      <Show when={!readOnly && (isFocusedWithin || inside)}>
        <div
          role="menu"
          style={{ position: "absolute", zIndex: 2, ...style }}
          {...dropDownprops}
        >
          {renderOnFocus}
        </div>
      </Show>
      {children}
    </div>
  );
}
