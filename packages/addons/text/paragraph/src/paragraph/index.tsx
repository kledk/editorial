import React, { ReactNode } from "react";
import {
  useRenderElement,
  AddonProps,
  useLabels,
  ElementTypeMatch,
  RichEditor,
  iPresenter,
  isNodeActive,
  ControlProps,
  useIsControlEligable,
} from "@editorial/core";
import { ParagraphElement } from "./paragraph-element";

import { ReactEditor, useSlate } from "slate-react";

const TYPE: ElementTypeMatch = "paragraph";

export function ParagraphAddon({
  showHint = true,
  showPlaceholder = true,
  labels,
}: {
  showHint?: boolean;
  showPlaceholder?: boolean;
} & AddonProps) {
  const [getLabel] = useLabels(labels);
  useRenderElement(
    {
      typeMatch: TYPE,
      renderElement: (props) => (
        <ParagraphElement
          hint={
            showHint
              ? getLabel({
                  key: "elements.paragraph.hint",
                  defaultLabel: "Click to start typing",
                })
              : undefined
          }
          placeholder={
            showPlaceholder
              ? getLabel({
                  key: "elements.paragraph.placeholder",
                  defaultLabel: "Text",
                })
              : undefined
          }
          {...props}
        ></ParagraphElement>
      ),
    },
    [getLabel]
  );
  return null;
}

const ParagraphPresenter: iPresenter = {
  element: {
    typeMatch: TYPE,
    renderElement: (props) => <p>{props.children}</p>,
  },
};

ParagraphAddon.Presenter = ParagraphPresenter;
