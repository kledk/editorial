import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback } from "react";
import { Transforms } from "slate";
import { Editable, ReactEditor } from "slate-react";
import styled from "styled-components";
import { isNodeActive } from "../utils";
import { OverrideTheme } from "../override-theme";
import { useChief } from "./hooks/use-chief";
import { handleDecorate } from "./handlers/handleDecorate";
import { handleClick } from "./handlers/handleClick";
import { handleKeyUp } from "./handlers/handleKeyUp";
import { handleKeyDown } from "./handlers/handleKeyDown";
import { handleRenderLeaf } from "./handlers/handleRenderLeaf";
import { handleRenderElement } from "./handlers/handleRenderElement";
import { useCorrectVoidDeleteBehavior } from "./utils/use-correct-void-delete-behavior";
export const RichEditor = Object.assign(Object.assign({}, ReactEditor), { insertBlock(editor, blockType) {
        if (!isNodeActive(editor, blockType)) {
            Transforms.setNodes(editor, {
                type: blockType,
                children: [{ text: "" }]
            });
        }
        else {
            Transforms.insertNodes(editor, {
                type: blockType,
                children: [{ text: "" }]
            });
        }
    } });
const EditorThemeWrapper = styled.div `
  ${props => OverrideTheme("Editor", props)}
`;
export const Editor = React.memo((props) => {
    const { editor, readOnly, id, renderLeafs, renderElements, onKeyDownHandlers, decorations } = useChief();
    const { children } = props, otherProps = __rest(props, ["children"]);
    useCorrectVoidDeleteBehavior();
    const renderElement = useCallback((props) => {
        return handleRenderElement(props, renderElements, editor);
    }, [renderElements]);
    const renderLeaf = useCallback((props) => {
        return handleRenderLeaf(props, renderLeafs, editor);
    }, [renderLeafs]);
    const decorate = useCallback((entry) => handleDecorate(entry, editor, decorations), [decorations]);
    const keyDown = useCallback((event) => {
        return handleKeyDown(event, editor, onKeyDownHandlers);
    }, [onKeyDownHandlers]);
    // TODO
    const keyUp = useCallback((event) => {
        handleKeyUp(event, editor);
    }, []);
    //TODO
    const click = useCallback((event) => handleClick(event, editor, []), []);
    const paste = useCallback((event) => {
        const clipboardData = event.clipboardData;
        const pastedData = clipboardData.getData("Text");
        if (!pastedData) {
            return;
        }
        // editor.insertText(pastedData);
    }, []);
    // TODO
    const onDOMBeforeInput = useCallback(e => { }, []);
    return (_jsx(React.Fragment, { children: _jsxs(EditorThemeWrapper, { children: [children, _jsx(Editable, Object.assign({ onDOMBeforeInput: onDOMBeforeInput, renderLeaf: renderLeaf, renderElement: renderElement, decorate: decorate, onKeyDown: keyDown, onKeyUp: keyUp, onClick: click, onPaste: paste, readOnly: readOnly, id: `${id}` }, otherProps), void 0)] }, void 0) }, void 0));
});
//# sourceMappingURL=editor.js.map