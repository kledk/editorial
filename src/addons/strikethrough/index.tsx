import React from "react";
import { Addon } from "../../addon";
import { renderLeaf } from "../../leaf-renderer";
import { MarkBtn } from "../../mark-button";
import { useCreateAddon, useRenderLeaf } from "../../chief/chief";

export const StrikethroughAddonImpl: Addon = {
  hoverMenu: {
    order: 4,
    category: "marks",
    renderButton: () => {
      return (
        <MarkBtn
          tooltip={{ label: "Strike-through", shortcut: "⌘+S" }}
          formatType="strikethrough"
        >
          S
        </MarkBtn>
      );
    }
  }
};

export function StrikethroughAddon(props: Addon) {
  useCreateAddon(StrikethroughAddonImpl, props);
  useRenderLeaf(
    {
      renderLeaf: props => {
        return renderLeaf(props, "strikethrough", "s");
      }
    },
    props
  );
  return null;
}
