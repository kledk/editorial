import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { useFocused, useSelected, useSlateStatic, } from "slate-react";
import { PlaceholderHint } from "../../placeholder-hint";
import { Editor } from "slate";
import { useLabels } from "../../chief";
export const Heading = (props) => {
    const editor = useSlateStatic();
    const isFocused = useFocused();
    const isSelected = useSelected();
    const defaultPlaceholderTexts = {
        h1: "Heading 1",
        h2: "Heading 2",
        h3: "Heading 3",
        h4: "Heading 4",
        h5: "Heading 5",
        h6: "Heading 6",
    };
    const [getLabel] = useLabels();
    const placeholder = getLabel({
        key: `elements.heading.${props.element.type}.placeholder`,
        defaultLabel: defaultPlaceholderTexts[props.element.type],
    });
    return React.createElement(props.element.type, props.attributes, _jsx(PlaceholderHint, Object.assign({ isEmpty: Editor.isEmpty(editor, props.element), placeholder: isFocused && isSelected ? placeholder : undefined }, { children: props.children }), void 0));
};
//# sourceMappingURL=Heading.js.map