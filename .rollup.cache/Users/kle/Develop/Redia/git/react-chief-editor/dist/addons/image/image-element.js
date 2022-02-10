import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useCallback, useEffect } from "react";
import { Transforms } from "slate";
import { useFocused, useSelected, ReactEditor, useSlate } from "slate-react";
import { WithAttentionToolbar } from "../../ui/WithAttentionToolbar";
import { Input, InputWrapper } from "../../InputWrapper";
import isUrl from "is-url";
import { Button } from "../../ui/button";
import styled from "styled-components";
import { ToolBtnPopup } from "../../ToolBtnPopup";
import { StyledToolBox } from "../../ui/StyledToolBox";
import { ToolbarBtn } from "../../ToolbarBtn";
import { StyledFocusToolBtn } from "../../ui/StyledFocusToolbar";
import { UiWrap } from "../../ui/ui-wrap";
import ReactResizeDetector from "react-resize-detector";
import { useChief } from "../../chief/hooks/use-chief";
export const ImageBlock = (props) => {
    const focused = useFocused();
    const selected = useSelected();
    const editor = useSlate();
    const { readOnly } = useChief();
    const { onOpenFileRequest, onRemoved } = props, renderElementProps = __rest(props, ["onOpenFileRequest", "onRemoved"]);
    const { element, children, attributes } = renderElementProps;
    const [embedUrl, setEmbedUrl] = useState(element.url || "");
    const [isReplacing, setIsReplacing] = useState(false);
    const handleSubmitEmbed = useCallback((e) => {
        e.preventDefault();
        if (embedUrl.length > 0) {
            Transforms.setNodes(editor, {
                url: embedUrl,
                align: "center",
            }, {
                at: ReactEditor.findPath(editor, element),
            });
            if (isReplacing) {
                setIsReplacing(false);
            }
        }
    }, [embedUrl, isReplacing]);
    useEffect(() => {
        if (element.url && isReplacing) {
            setIsReplacing(false);
        }
    }, [element.url]);
    const handleDelete = useCallback(() => {
        onRemoved && onRemoved(element.url);
        Transforms.delete(editor, { at: ReactEditor.findPath(editor, element) });
    }, [element]);
    const handleUpload = useCallback(() => {
        onOpenFileRequest && onOpenFileRequest();
    }, [onOpenFileRequest]);
    const handleResize = useCallback((w, h) => {
        Transforms.setNodes(editor, {
            width: w,
            height: h,
        }, {
            at: ReactEditor.findPath(editor, element),
        });
    }, []);
    const align = useCallback((align) => {
        Transforms.setNodes(editor, {
            align,
        }, {
            at: ReactEditor.findPath(editor, element),
        });
    }, []);
    const toggleReplace = useCallback(() => {
        setIsReplacing(!isReplacing);
    }, [isReplacing]);
    const handleClick = () => {
        Transforms.select(editor, ReactEditor.findPath(editor, element));
    };
    let imageHandler = null;
    if (!isReplacing && element.url) {
        const src = element.url || "";
        imageHandler = (_jsxs("div", Object.assign({ style: {
                width: "auto",
                position: "relative",
                height: element.height,
                display: "flex",
                justifyContent: props.element.align === "center"
                    ? "center"
                    : props.element.align === "left"
                        ? "flex-start"
                        : "flex-end",
            }, contentEditable: false, onClick: handleClick }, { children: [_jsx(ReactResizeDetector, Object.assign({ onResize: (w, h) => handleResize(w, h) }, { children: _jsx("div", Object.assign({ style: {
                            resize: readOnly ? "none" : "vertical",
                            overflow: "hidden",
                            width: "auto",
                            height: element.height,
                            cursor: "pointer",
                        } }, { children: _jsx(WithAttentionToolbar, Object.assign({}, renderElementProps, { btns: _jsxs(React.Fragment, { children: [_jsx(StyledFocusToolBtn, Object.assign({ onMouseDown: toggleReplace }, { children: "Replace" }), void 0), _jsx(ToolBtnPopup, { renderContent: (setShow) => (_jsxs(StyledToolBox, { children: [_jsx(ToolbarBtn, Object.assign({ onMouseDown: () => {
                                                        setShow(false);
                                                        align("left");
                                                    } }, { children: "Align left" }), void 0), _jsx(ToolbarBtn, Object.assign({ onMouseDown: () => {
                                                        setShow(false);
                                                        align("center");
                                                    } }, { children: "Align center" }), void 0), _jsx(ToolbarBtn, Object.assign({ onMouseDown: () => {
                                                        setShow(false);
                                                        align("right");
                                                    } }, { children: "Align right" }), void 0), _jsx(ToolbarBtn, Object.assign({ style: { color: "#FE292D" }, onMouseDown: handleDelete }, { children: "Delete" }), void 0)] }, void 0)), renderToolBtn: (tprops) => (_jsx(StyledFocusToolBtn, Object.assign({}, tprops, { children: _jsx("span", Object.assign({ style: {} }, { children: "\u2699\uFE0E" }), void 0) }), void 0)) }, void 0)] }, void 0) }, { children: _jsx("img", { 
                                // draggable={false}
                                style: {
                                    filter: focused && selected ? "brightness(0.5)" : "none",
                                    objectFit: "cover",
                                    height: element.height,
                                    width: "100%",
                                    display: "block",
                                }, alt: element.caption, src: src }, void 0) }), void 0) }), void 0) }), void 0), children] }), void 0));
    }
    else {
        imageHandler = (_jsx(WithAttentionToolbar, Object.assign({}, renderElementProps, { btns: _jsxs(React.Fragment, { children: [_jsx(StyledFocusToolBtn, Object.assign({ onMouseDown: handleDelete }, { children: "Delete" }), void 0), isReplacing && (_jsx(StyledFocusToolBtn, Object.assign({ onMouseDown: toggleReplace }, { children: "Cancel" }), void 0))] }, void 0) }, { children: _jsx("div", Object.assign({ contentEditable: false }, { children: _jsxs(StyledImageEmptyContainer, { children: [_jsx("h2", { children: "Insert image" }, void 0), _jsx(Button, Object.assign({ onMouseDown: handleUpload }, { children: "Upload" }), void 0), _jsx("p", { children: "Or paste a link" }, void 0), _jsxs("form", Object.assign({ onSubmit: handleSubmitEmbed, "data-slate-editor": true }, { children: [_jsx(InputWrapper, Object.assign({ style: { width: "50%" } }, { children: _jsx(Input, { value: embedUrl, onChange: (e) => setEmbedUrl(e.target.value), placeholder: "Paste link" }, void 0) }), void 0), _jsx("br", {}, void 0), _jsx(Button, Object.assign({ disabled: embedUrl.length === 0 || !isUrl(embedUrl) }, { children: "Embed" }), void 0)] }), void 0), children] }, void 0) }), void 0) }), void 0));
    }
    return (_jsx("div", Object.assign({}, attributes, { contentEditable: false }, { children: imageHandler }), void 0));
};
export const StyledImageEmptyContainer = styled(UiWrap) `
  background-color: ${(props) => props.theme.colors.gray[300]};
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    width: 70%;
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
  }
  h2,
  p {
    color: ${(props) => props.theme.colors.gray[600]};
    user-select: none;
  }
`;
//# sourceMappingURL=image-element.js.map