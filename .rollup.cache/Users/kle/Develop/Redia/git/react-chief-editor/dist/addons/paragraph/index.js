import { jsx as _jsx } from "react/jsx-runtime";
import { useRenderElement } from "../../chief/hooks/use-render-element";
import { ParagraphElement } from "./paragraph-element";
import { useLabels, RichEditor } from "../../chief";
import { ToolbarBtn } from "../../ToolbarBtn";
import { isNodeActive } from "../../utils";
import { ReactEditor, useSlate } from "slate-react";
import { useIsControlEligable } from "../../chief/controls";
const TYPE = "paragraph";
export function ParagraphControl(props) {
    const editor = useSlate();
    if (!useIsControlEligable({
        isText: true,
        isEmpty: true
    })) {
        return null;
    }
    return (_jsx(ToolbarBtn, Object.assign({ tooltip: {
            label: {
                key: `elements.paragraph.placeholder`,
                defaultLabel: "Paragraph"
            }
        }, isActive: isNodeActive(editor, "paragraph"), onMouseDown: () => {
            RichEditor.insertBlock(editor, "paragraph");
            ReactEditor.focus(editor);
        } }, { children: props.children }), void 0));
}
export function ParagraphAddon({ showHint = true, showPlaceholder = true, labels }) {
    const [getLabel] = useLabels(labels);
    useRenderElement({
        typeMatch: TYPE,
        renderElement: props => (_jsx(ParagraphElement, Object.assign({ hint: showHint
                ? getLabel({
                    key: "elements.paragraph.hint",
                    defaultLabel: "Click to start typing"
                })
                : undefined, placeholder: showPlaceholder
                ? getLabel({
                    key: "elements.paragraph.placeholder",
                    defaultLabel: "Text"
                })
                : undefined }, props), void 0))
    }, [getLabel]);
    return null;
}
const ParagraphPresenter = {
    element: {
        typeMatch: TYPE,
        renderElement: props => _jsx("p", { children: props.children }, void 0)
    }
};
ParagraphAddon.Presenter = ParagraphPresenter;
//# sourceMappingURL=index.js.map