import React, { ReactNode } from "react";
import { AddonProps } from "../../addon";
import { renderLeaf } from "../../chief/render/leaf-renderer";
import { MarkBtn, toggleFormat } from "../../mark-button";
import { useRenderLeaf } from "../../chief/hooks/use-render-leaf";
import { useOnKeyDown } from "../../chief/hooks/use-on-key-down";
import { useLabels } from "../../chief/hooks/use-labels";
import { InjectedRenderLeaf } from "../../chief";
import { iPresenter } from "../../chief/chief-presentation";
import { shortcutText } from "../../shortcut";
import { ControlProps, useIsControlEligable } from "../../chief/controls";

const shortcut = "mod+u";

export function UnderlineControl(props: ControlProps) {
  if (
    !useIsControlEligable({
      isText: true,
      isEmpty: true
    })
  ) {
    return null;
  }
  return (
    <MarkBtn
      tooltip={{
        label: {
          key: "marks.underline",
          defaultLabel: "Underline"
        },
        shortcut: shortcutText(shortcut)
      }}
      markType="underline"
    >
      {props.children}
    </MarkBtn>
  );
}

const _renderLeaf: InjectedRenderLeaf = {
  renderLeaf: props => renderLeaf(props, "underline", "u")
};

const Presenter: iPresenter = {
  leaf: _renderLeaf
};

export function UnderlineAddon(props: AddonProps) {
  useLabels(props.labels);
  useRenderLeaf(_renderLeaf);
  useOnKeyDown({
    pattern: shortcut,
    handler: (event, editor) => {
      event.preventDefault();
      toggleFormat(editor, "underline");
      return true;
    }
  });
  return null;
}

UnderlineAddon.Presenter = Presenter;
