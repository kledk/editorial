import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
//@ts-nocheck
import { useEffect, useRef, useState, useCallback } from "react";
import { useSlate, useSlateStatic } from "slate-react";
import { Element, Editor, Transforms, Range } from "slate";
import isUrl from "is-url";
import { ToolBtnPopup } from "../../ToolBtnPopup";
import { useOnClickOutside } from "../../utils";
import { StyledToolBox } from "../../ui/StyledToolBox";
import { InputWrapper, Input } from "../../InputWrapper";
import { ToolbarBtn } from "../../ToolbarBtn";
import { useRenderElement } from "../../chief/hooks/use-render-element";
import { usePlugin } from "../../chief/hooks/use-plugin";
import { useLabels } from "../../chief/hooks/use-labels";
import { shortcutText } from "../../shortcut";
import { ElementHoverTip } from "../../element-hover-tip";
import { useSaveSelection } from "../../chief/utils/saved-selection";
import { useIsControlEligable } from "../../chief/controls";
import { registerInlineType } from "../../chief/utils/register-inline";
export const isLinkELement = (element) => {
    return element.type === "link" && typeof element.url === "string";
};
export function LinkAddon(props) {
    useLabels(props.labels);
    usePlugin({
        insertText: (insertText, editor) => (text) => {
            if (text && isUrl(text)) {
                wrapLink(editor, text);
            }
            else {
                insertText(text);
            }
        },
        insertData: (insertData, editor) => (data) => {
            const text = data.getData("text/plain");
            if (text && isUrl(text)) {
                wrapLink(editor, text);
            }
            else {
                insertData(data);
            }
        },
        isInline: registerInlineType(isLinkELement),
    });
    useRenderElement({
        typeMatch: "link",
        renderElement: (props) => (_jsx(ElementHoverTip, Object.assign({ delayed: true, placement: "bottom", tip: _jsx("span", { children: _jsx("a", Object.assign({ rel: "noreferrer", target: "_blank", href: props.element.url }, { children: props.element.url }), void 0) }, void 0) }, { children: (triggerRef) => (_jsx("a", Object.assign({}, props.attributes, { href: props.element.url }, { children: _jsx("span", Object.assign({ ref: triggerRef }, { children: props.children }), void 0) }), void 0)) }), void 0)),
    });
    return null;
}
export function LinkControl(props) {
    const editor = useSlateStatic();
    const isActive = isLinkActive(editor);
    if (!useIsControlEligable({
        isText: true,
    })) {
        return null;
    }
    return (_jsx(ToolBtnPopup, { shortcut: "mod+k", renderContent: (setShow) => (_jsx(StyledToolBox, { children: _jsx(LinkPopup, { onClose: () => setShow(false) }, void 0) }, void 0)), renderToolBtn: (tprops, show) => (_jsx(ToolbarBtn, Object.assign({ tooltip: {
                label: {
                    key: "elements.link",
                    defaultLabel: "Add link",
                },
                shortcut: shortcutText("mod+k"),
            } }, tprops, { isActive: isActive || show }, { children: props.children }), void 0)) }, void 0));
}
const Presenter = {
    element: {
        typeMatch: "link",
        renderElement: (props) => _jsx("a", Object.assign({ href: props.element.url }, { children: props.children }), void 0),
    },
};
LinkAddon.Presenter = Presenter;
export const insertLink = (editor, url) => {
    if (editor.selection) {
        wrapLink(editor, url);
    }
};
export const isLinkActive = (editor) => {
    const [link] = Editor.nodes(editor, {
        match: (n) => Element.isElement(n) && n.type === "link",
    });
    return Boolean(link);
};
const unwrapLink = (editor) => {
    Transforms.unwrapNodes(editor, {
        match: (n) => Element.isElement(n) && n.type === "link",
    });
};
const wrapLink = (editor, url) => {
    if (isLinkActive(editor)) {
        unwrapLink(editor);
    }
    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
    const link = {
        type: "link",
        url,
        children: isCollapsed ? [{ text: url }] : [],
    };
    if (isCollapsed) {
        Transforms.insertNodes(editor, link);
    }
    else {
        Transforms.wrapNodes(editor, link, { split: true });
        Transforms.collapse(editor, { edge: "end" });
    }
};
function LinkPopup(props) {
    const editor = useSlate();
    const { selection } = editor;
    const { saveSelection } = useSaveSelection();
    useEffect(() => {
        return saveSelection(selection);
    }, []);
    const linkWrapperRef = useRef(null);
    useOnClickOutside(linkWrapperRef, () => {
        props.onClose();
    });
    let linkNode = null;
    if (selection) {
        const [_linkNode] = Editor.nodes(editor, {
            at: selection,
            match: (n) => Element.isElement(n) && n.type === "link",
        });
        linkNode = _linkNode && _linkNode[0];
    }
    const [url, setUrl] = useState("");
    useEffect(() => {
        if (linkNode && typeof linkNode.url === "string") {
            setUrl(linkNode.url);
        }
    }, [linkNode]);
    const handleInsertLink = useCallback(() => {
        if (url.length > 0) {
            insertLink(editor, url);
            props.onClose();
        }
        else if (linkNode &&
            typeof linkNode.url === "string" &&
            linkNode.url.length > 0) {
            unwrapLink(editor);
            props.onClose();
        }
    }, [url]);
    const handleUnlink = useCallback(() => {
        unwrapLink(editor);
        props.onClose();
    }, [url]);
    const [getLabel] = useLabels();
    return (_jsx("form", Object.assign({ ref: linkWrapperRef, onSubmit: handleInsertLink }, { children: _jsxs("div", Object.assign({ style: {
                padding: 9,
                display: "flex",
                minWidth: 400,
                flexDirection: "row",
            } }, { children: [_jsx(InputWrapper, { children: _jsx(Input, { value: url, onChange: (e) => setUrl(e.currentTarget.value), placeholder: getLabel({
                            key: "elements.link.placeholder",
                            defaultLabel: "Paste or type your link here",
                        }), autoFocus: true }, void 0) }, void 0), _jsx(ToolbarBtn, Object.assign({ rounded: true, disabled: url.length === 0, onMouseDown: handleInsertLink }, { children: getLabel({
                        key: "elements.link.btn.link",
                        defaultLabel: "Link",
                    }) }), void 0), _jsx(ToolbarBtn, Object.assign({ rounded: true, disabled: !isLinkActive(editor), onMouseDown: handleUnlink }, { children: getLabel({
                        key: "elements.link.btn.unlink",
                        defaultLabel: "Unlink",
                    }) }), void 0)] }), void 0) }), void 0));
}
//# sourceMappingURL=index.js.map