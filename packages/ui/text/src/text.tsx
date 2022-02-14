import {
  ElementTypeMatch,
  RichEditor,
  iPresenter,
  isNodeActive,
  ControlProps,
  useIsControlEligable,
} from "@editorial/core";
import { ToolbarBtn } from "@editorial/ui";

import { ReactEditor, useSlate } from "slate-react";

const TYPE: ElementTypeMatch = "paragraph";

export function ParagraphControl(props: ControlProps) {
  const editor = useSlate();
  if (
    !useIsControlEligable({
      isText: true,
      isEmpty: true,
    })
  ) {
    return null;
  }
  return (
    <ToolbarBtn
      tooltip={{
        label: {
          key: `elements.paragraph.placeholder`,
          defaultLabel: "Paragraph",
        },
      }}
      isActive={isNodeActive(editor, "paragraph")}
      onMouseDown={() => {
        RichEditor.insertBlock(editor, "paragraph");
        //@ts-expect-error
        ReactEditor.focus(editor);
      }}
    >
      {props.children}
    </ToolbarBtn>
  );
}

export const ParagraphPresenter: iPresenter = {
  element: {
    typeMatch: TYPE,
    renderElement: (props) => <p>{props.children}</p>,
  },
};
