import { jsx as _jsx } from "react/jsx-runtime";
import { toggleList } from "./transforms";
import { ReactEditor, useSlate } from "slate-react";
import { isNodeActive } from "../../utils";
import { ToolbarBtn } from "../../ToolbarBtn";
import { useIsControlEligable } from "../../chief/controls";
export function ListControl(props) {
    const editor = useSlate();
    const { type, children } = props;
    if (!useIsControlEligable({
        isText: true,
        isEmpty: true
    })) {
        return null;
    }
    return (_jsx(ToolbarBtn, Object.assign({ tooltip: {
            label: {
                key: `elements.${type}`,
                defaultLabel: type
            }
        }, isActive: isNodeActive(editor, type), onClick: () => {
            toggleList(editor, type);
            ReactEditor.focus(editor);
        } }, { children: children || type }), void 0));
}
//# sourceMappingURL=controls.js.map