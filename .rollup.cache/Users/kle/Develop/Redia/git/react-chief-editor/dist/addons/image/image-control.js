import { jsx as _jsx } from "react/jsx-runtime";
import { ReactEditor, useSlate } from "slate-react";
import { isNodeActive } from "../../utils";
import { RichEditor } from "../../chief/editor";
import { ToolbarBtn } from "../../ToolbarBtn";
import { useIsControlEligable } from "../../chief/controls";
export function ImageControl(props) {
    const editor = useSlate();
    if (!useIsControlEligable({
        isText: true,
        isEmpty: true,
    })) {
        return null;
    }
    return (_jsx(ToolbarBtn, Object.assign({ tooltip: {
            label: {
                key: `elements.image`,
                defaultLabel: "Image",
            },
        }, isActive: isNodeActive(editor, "image"), onClick: () => {
            RichEditor.insertBlock(editor, "image");
            ReactEditor.focus(editor);
        } }, { children: props.children }), void 0));
}
//# sourceMappingURL=image-control.js.map