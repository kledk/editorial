import { useMemo } from "react";
import { withReact } from "slate-react";
import { createEditor as createSlateEditor } from "slate";
import { withHistory } from "slate-history";
import { withChiefOnPlugIn } from "./with-chief-on-plugIn";
export const useCreateEditor = (plugins) => {
    const editor = useMemo(() => withReact(withHistory(createSlateEditor())), []);
    return useMemo(() => withChiefOnPlugIn(editor, plugins), [plugins]);
};
//# sourceMappingURL=create-editor.js.map