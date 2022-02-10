import { __rest } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useSlate } from "slate-react";
import { ToolbarBtn } from "./ToolbarBtn";
import { Editor, Transforms, Text } from "slate";
export function toggleFormat(editor, format) {
    let isFormatted = isMark(editor, format);
    Transforms.setNodes(editor, { [format]: !isFormatted }, { match: n => Text.isText(n), split: true });
}
const isMark = (editor, formatType) => {
    const [match] = Editor.nodes(editor, {
        match: n => Boolean(n[formatType])
    });
    return Boolean(match);
};
export function MarkBtn(props) {
    const { markType: formatType } = props, otherProps = __rest(props, ["markType"]);
    const editor = useSlate();
    const isActive = isMark(editor, props.markType);
    return (_jsx(ToolbarBtn, Object.assign({ isActive: isActive, onMouseDown: (e) => {
            e.preventDefault();
            toggleFormat(editor, props.markType);
        } }, otherProps), void 0));
}
//# sourceMappingURL=mark-button.js.map