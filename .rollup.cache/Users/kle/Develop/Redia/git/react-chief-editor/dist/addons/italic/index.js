import { jsx as _jsx } from "react/jsx-runtime";
import { renderLeaf } from "../../chief/render/leaf-renderer";
import { MarkBtn, toggleFormat } from "../../mark-button";
import { useRenderLeaf } from "../../chief/hooks/use-render-leaf";
import { useOnKeyDown } from "../../chief/hooks/use-on-key-down";
import { useLabels } from "../../chief/hooks/use-labels";
import { shortcutText } from "../../shortcut";
import { useIsControlEligable } from "../../chief/controls";
const shortcut = "mod+i";
export function ItalicControl(props) {
    if (!useIsControlEligable({
        isText: true
    })) {
        return null;
    }
    return (_jsx(MarkBtn, Object.assign({ tooltip: {
            label: {
                key: "marks.italic",
                defaultLabel: "Italic"
            },
            shortcut: shortcutText(shortcut)
        }, markType: "italic" }, { children: props.children }), void 0));
}
const _renderLeaf = {
    renderLeaf: props => renderLeaf(props, "italic", "em")
};
const Presenter = {
    leaf: _renderLeaf
};
export function ItalicAddon(props) {
    useLabels(props.labels);
    useRenderLeaf(_renderLeaf);
    useOnKeyDown({
        pattern: shortcut,
        handler: (event, editor) => {
            event.preventDefault();
            toggleFormat(editor, "italic");
            return true;
        }
    });
    return null;
}
ItalicAddon.Presenter = Presenter;
//# sourceMappingURL=index.js.map