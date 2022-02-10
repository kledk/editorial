import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Editor as SlateEditor } from "slate";
import { useFocused, useSelected, useSlate } from "slate-react";
import { PlaceholderHint } from "../../placeholder-hint";
export function ParagraphElement(props) {
    const editor = useSlate();
    const isFocused = useFocused();
    const isSelected = useSelected();
    return (_jsx("p", Object.assign({}, props.attributes, { children: _jsx(PlaceholderHint, Object.assign({ isEmpty: SlateEditor.isEmpty(editor, props.element), hoverHint: props.hint, placeholder: isFocused && isSelected ? props.placeholder : undefined }, { children: React.Children.map(props.children, it => it) }), void 0) }), void 0));
}
//# sourceMappingURL=paragraph-element.js.map