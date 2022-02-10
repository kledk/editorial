import React, { ReactNode } from "react";
import { AddonProps } from "../../addon";
import { renderLeaf } from "../../chief/render/leaf-renderer";
import { MarkBtn, toggleFormat } from "../../mark-button";
import { useRenderLeaf } from "../../chief/hooks/use-render-leaf";
import { useOnKeyDown } from "../../chief/hooks/use-on-key-down";
import { useLabels } from "../../chief/hooks/use-labels";
import { shortcutText } from "../../shortcut";
import { InjectedRenderLeaf } from "../../chief";
import { iPresenter } from "../../chief/chief-presentation";
import { ControlProps, useIsControlEligable } from "../../chief/controls";

const shortcut = "mod+s";

export function StrikethroughControl(props: ControlProps) {
  if (
    !useIsControlEligable({
      isText: true
    })
  ) {
    return null;
  }
  return (
    <MarkBtn
      tooltip={{
        label: {
          key: "marks.strikethrough",
          defaultLabel: "Strike-through"
        },
        shortcut: shortcutText(shortcut)
      }}
      markType="strikethrough"
    >
      {props.children}
    </MarkBtn>
  );
}

const _renderLeaf: InjectedRenderLeaf = {
  renderLeaf: props => renderLeaf(props, "strikethrough", "s")
};

const Presenter: iPresenter = {
  leaf: _renderLeaf
};

export function StrikethroughAddon(props: AddonProps) {
  useLabels(props.labels);
  useRenderLeaf(_renderLeaf);
  useOnKeyDown({
    pattern: shortcut,
    handler: (event, editor) => {
      event.preventDefault();
      toggleFormat(editor, "strikethrough");
      return true;
    }
  });
  return null;
}

StrikethroughAddon.Presenter = Presenter;
