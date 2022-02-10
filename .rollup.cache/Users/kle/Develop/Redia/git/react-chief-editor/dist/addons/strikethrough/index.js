import { jsx as _jsx } from "react/jsx-runtime";
import { renderLeaf } from "../../chief/render/leaf-renderer";
import { MarkBtn, toggleFormat } from "../../mark-button";
import { useRenderLeaf } from "../../chief/hooks/use-render-leaf";
import { useOnKeyDown } from "../../chief/hooks/use-on-key-down";
import { useLabels } from "../../chief/hooks/use-labels";
import { shortcutText } from "../../shortcut";
import { useIsControlEligable } from "../../chief/controls";
const shortcut = "mod+s";
export function StrikethroughControl(props) {
    if (!useIsControlEligable({
        isText: true
    })) {
        return null;
    }
    return (_jsx(MarkBtn, Object.assign({ tooltip: {
            label: {
                key: "marks.strikethrough",
                defaultLabel: "Strike-through"
            },
            shortcut: shortcutText(shortcut)
        }, markType: "strikethrough" }, { children: props.children }), void 0));
}
const _renderLeaf = {
    renderLeaf: props => renderLeaf(props, "strikethrough", "s")
};
const Presenter = {
    leaf: _renderLeaf
};
export function StrikethroughAddon(props) {
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
//# sourceMappingURL=index.js.map