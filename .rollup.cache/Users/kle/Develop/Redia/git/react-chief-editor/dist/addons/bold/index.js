import { jsx as _jsx } from "react/jsx-runtime";
import { renderLeaf } from "../../chief/render/leaf-renderer";
import { useRenderLeaf } from "../../chief/hooks/use-render-leaf";
import { useOnKeyDown } from "../../chief/hooks/use-on-key-down";
import { useLabels } from "../../chief/hooks/use-labels";
import { MarkBtn, toggleFormat } from "../../mark-button";
import { shortcutText } from "../../shortcut";
import { useIsControlEligable } from "../../chief/controls";
const shortcut = "mod+b";
const action = (editor) => toggleFormat(editor, "bold");
const _renderLeaf = {
    renderLeaf: (props) => renderLeaf(props, "bold", "strong"),
};
export function BoldAddon(props) {
    // useAddonAction("bold", action);
    // const boldToggle = useAddonAction("bold");
    useLabels(props.labels);
    useRenderLeaf(_renderLeaf);
    useOnKeyDown({
        pattern: shortcut,
        handler: (event, editor) => {
            event.preventDefault();
            action(editor);
            return true;
        },
    });
    return null;
}
const Presenter = {
    leaf: _renderLeaf,
};
export function BoldControl(props) {
    if (!useIsControlEligable({
        isText: true,
    })) {
        return null;
    }
    return (_jsx(MarkBtn, Object.assign({ tooltip: {
            label: {
                key: "marks.bold",
                defaultLabel: "Bold",
            },
            shortcut: shortcutText(shortcut),
        }, markType: "bold" }, { children: props.children }), void 0));
}
BoldAddon.Presenter = Presenter;
//# sourceMappingURL=index.js.map