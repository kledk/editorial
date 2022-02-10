import { __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState, useRef, useContext } from "react";
import { ReactEditor, useSlate } from "slate-react";
import { Editor, Range, Transforms } from "slate";
import { Popper } from "react-popper";
import { useOnClickOutside, getNodeFromSelection } from "../../utils";
import { useChief } from "../../chief/hooks/use-chief";
import { useHighlightSelection } from "../../chief/utils/use-highlight-selection";
import { useSaveSelection } from "../../chief/utils/saved-selection";
export const deselect = Transforms.deselect;
Transforms.deselect = (..._args) => {
    // We disable the default deselect.
};
const hoverToolContext = React.createContext(undefined);
function useProvideContext() {
    const editor = useSlate();
    const { selection } = editor;
    const isEditorFocused = ReactEditor.isFocused(editor);
    const isCollapsed = selection && Range.isCollapsed(selection);
    const isEmpty = selection && Editor.string(editor, selection) === "";
    const currentNode = getNodeFromSelection(editor, selection);
    const isVoid = Editor.isVoid(editor, currentNode);
    const isReadOnly = useChief().readOnly;
    const { savedSelection } = useSaveSelection();
    useHighlightSelection(savedSelection === null || savedSelection === void 0 ? void 0 : savedSelection.current, {
        backgroundColor: "#969696",
    });
    // ""({
    //   isEditorFocused,
    //   selection,
    //   isCollapsed,
    //   isEmpty,
    //   isVoid,
    //   ...ctx
    // });
    const [enabled, setEnabled] = useState(false);
    useEffect(() => {
        if (isReadOnly) {
            setEnabled(false);
        }
        else if (ctx.enabled) {
            if (!(savedSelection === null || savedSelection === void 0 ? void 0 : savedSelection.current) && isCollapsed && !isVoid) {
                setEnabled(false);
            }
        }
        else {
            if (isEditorFocused) {
                if (isCollapsed && isVoid) {
                    setEnabled(true);
                }
                else if (!isCollapsed && !isEmpty) {
                    setEnabled(true);
                }
            }
        }
    }, [isEditorFocused, isCollapsed, isEmpty, isVoid]);
    const ctx = {
        enabled,
    };
    return { ctx, setEnabled };
}
export function useHoverTool() {
    const ctx = useContext(hoverToolContext);
    if (ctx === undefined) {
        throw new Error("useHoverTool must be within a <HoverToolProvider/>");
    }
    return ctx;
}
export function HoverTools(props) {
    const { ctx, setEnabled } = useProvideContext();
    return (_jsx(hoverToolContext.Provider, Object.assign({ value: ctx }, { children: _jsx(HoveringTool, Object.assign({ onChangeEnabled: (enabled) => setEnabled(enabled), enabled: ctx.enabled }, { children: props.children }), void 0) }), void 0));
}
export const HoveringTool = (props) => {
    const { children, enabled, onChangeEnabled } = props, otherProps = __rest(props, ["children", "enabled", "onChangeEnabled"]);
    const editor = useSlate();
    const { selection } = editor;
    const [deltaOffset, setDeltaOffset] = useState(-1);
    const currentNode = getNodeFromSelection(editor, selection);
    useEffect(() => {
        const deltaoffset = selection
            ? selection.focus.offset - selection.anchor.offset
            : -1;
        setDeltaOffset(deltaoffset);
    }, [selection]);
    const toolRef = useRef(null);
    const [_v, _setV] = useState({
        //@ts-ignore
        getBoundingClientRect: () => ({
            top: -1000,
            left: -1000,
            bottom: 0,
            right: 0,
            width: 1,
            height: 1,
        }),
    });
    useOnClickOutside(toolRef, (e) => {
        if (currentNode) {
            const domNode = ReactEditor.toDOMNode(editor, currentNode);
            if (e.target && domNode.contains(e.target)) {
                return;
            }
        }
        onChangeEnabled(false);
    });
    useEffect(() => {
        if (enabled) {
            const isVoid = Editor.isVoid(editor, currentNode);
            if (isVoid && currentNode) {
                try {
                    const domNode = ReactEditor.toDOMNode(editor, currentNode);
                    _setV({
                        getBoundingClientRect: () => domNode.getBoundingClientRect(),
                    });
                }
                catch (err) {
                    console.log(err);
                }
            }
            else {
                try {
                    const domSelection = window.getSelection();
                    if (domSelection && domSelection.rangeCount > 0) {
                        const domRange = domSelection.getRangeAt(0);
                        if (domRange && deltaOffset !== -1) {
                            _setV({
                                getBoundingClientRect: () => domRange.getBoundingClientRect(),
                            });
                        }
                    }
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
    }, [enabled, deltaOffset, selection, currentNode]);
    if (!enabled || !children) {
        return null;
    }
    return (_jsx(Popper, Object.assign({ modifiers: [
            {
                name: "offset",
                options: {
                    offset: [0, 10],
                },
            },
        ], placement: "top-end", referenceElement: _v }, { children: ({ ref, style, placement, arrowProps }) => (_jsxs("div", Object.assign({ ref: ref, style: Object.assign(Object.assign({}, style), { zIndex: 10 }), "data-placement": placement }, { children: [_jsx("div", Object.assign({ ref: toolRef }, otherProps, { children: children }), void 0), _jsx("div", { ref: arrowProps.ref, style: arrowProps.style }, void 0)] }), void 0)) }), void 0));
};
//# sourceMappingURL=hovering-tool.js.map