import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Heading } from "./Heading";
import { Transforms, Editor, Range, Element } from "slate";
import { useSlate, ReactEditor } from "slate-react";
import { isNodeActive } from "../../utils";
import { ToolbarBtn } from "../../ToolbarBtn";
import { useRenderElement } from "../../chief/hooks/use-render-element";
import { useOnKeyDown } from "../../chief/hooks/use-on-key-down";
import { useIsControlEligable } from "../../chief/controls";
export const headingTypes = ["h1", "h2", "h3", "h4", "h5", "h6"];
export function HeadingControl(props) {
    const { heading, children } = props;
    const editor = useSlate();
    if (!useIsControlEligable({
        isText: true,
        isEmpty: true,
    })) {
        return null;
    }
    return (_jsx(ToolbarBtn, Object.assign({ tooltip: {
            label: {
                key: `elements.heading.${heading}.placeholder`,
                defaultLabel: heading,
            },
        }, isActive: isNodeActive(editor, heading), onMouseDown: (_e) => {
            ReactEditor.focus(editor);
            toggleHeading(editor, heading);
        } }, { children: children || heading.toUpperCase() }), void 0));
}
const Presenter = {
    element: {
        typeMatch: headingTypes,
        renderElement: (props) => React.createElement(props.element.type, null, props.children),
    },
};
export function HeadingsAddon(_props) {
    useRenderElement({
        typeMatch: headingTypes,
        renderElement: (props) => _jsx(Heading, Object.assign({}, props), void 0),
    });
    useOnKeyDown({
        pattern: "Enter",
        handler: (event, editor) => {
            const { selection } = editor;
            if (selection && Range.isCollapsed(selection)) {
                const [match] = Editor.nodes(editor, {
                    match: (n) => { var _a; return Element.isElement(n) && Boolean((_a = n.type) === null || _a === void 0 ? void 0 : _a.match(/(h[1-6])/)); },
                });
                if (match) {
                    event.preventDefault();
                    const [node] = match;
                    if (Element.isElement(node) && Editor.isEmpty(editor, node)) {
                        Transforms.setNodes(editor, { type: "paragraph" });
                    }
                    else {
                        Transforms.insertNodes(editor, {
                            type: "paragraph",
                            children: [{ text: "" }],
                        });
                    }
                    return true;
                }
            }
            return false;
        },
    });
    return null;
}
function toggleHeading(editor, heading) {
    const isHeaderOfType = isHeadingType(editor, heading);
    if (isHeaderOfType) {
        Transforms.setNodes(editor, {
            type: "paragraph",
        });
    }
    else {
        Transforms.setNodes(editor, {
            type: heading,
        }, { split: true });
    }
}
export const isHeadingType = (editor, header) => {
    const [match] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && n.type === header,
    });
    return Boolean(match);
};
function insertHeader(editor, heading) {
    Transforms.insertNodes(editor, {
        type: heading,
        children: [{ text: "" }],
    });
}
HeadingsAddon.Presenter = Presenter;
//# sourceMappingURL=index.js.map