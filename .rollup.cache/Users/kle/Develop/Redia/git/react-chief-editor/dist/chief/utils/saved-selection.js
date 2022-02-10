import { jsx as _jsx } from "react/jsx-runtime";
import React, { useCallback, useContext, useRef, useState } from "react";
import { ReactEditor, useSlate } from "slate-react";
import { Editor, Transforms } from "slate";
const savedSelectionContext = React.createContext(undefined);
export function useSaveSelection() {
    const context = useContext(savedSelectionContext);
    if (!context) {
        throw new Error("No SavedSelectionProvider.");
    }
    return context;
}
export function SavedSelectionProvider(props) {
    const value = useProvideContext();
    return (_jsx(savedSelectionContext.Provider, Object.assign({ value: value }, { children: props.children }), void 0));
}
function useProvideContext() {
    const editor = useSlate();
    const editorRef = useRef(editor);
    editorRef.current = editor;
    const [savedSelection, setSaveSelection] = useState(null);
    const saveSelection = useCallback((selection) => {
        if (selection !== null) {
            const sRef = Editor.rangeRef(editor, selection);
            setSaveSelection(sRef);
            return () => {
                if (sRef.current) {
                    setTimeout(() => {
                        ReactEditor.focus(editorRef.current);
                        Transforms.select(editorRef.current, sRef.current);
                        setSaveSelection(null);
                        sRef.unref();
                    }, 0);
                }
            };
        }
        return () => null;
    }, []);
    return { saveSelection, savedSelection };
}
//# sourceMappingURL=saved-selection.js.map