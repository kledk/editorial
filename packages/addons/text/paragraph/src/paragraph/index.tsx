import {
  useRenderElement,
  AddonProps,
  useLabels,
  ElementTypeMatch,
  InjectedRenderElement,
} from "@editorial/core";
import React from "react";

const TYPE: ElementTypeMatch = "paragraph";

export function ParagraphAddon({
  showHint = true,
  showPlaceholder = true,
  labels,
  renderElement,
}: {
  showHint?: boolean;
  showPlaceholder?: boolean;
  renderElement: InjectedRenderElement["renderElement"];
} & AddonProps) {
  const [getLabel] = useLabels(labels);
  useRenderElement(
    {
      typeMatch: TYPE,
      renderElement,
    },
    [getLabel]
  );
  return null;
}
