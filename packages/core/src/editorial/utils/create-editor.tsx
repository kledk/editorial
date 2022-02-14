import { useMemo } from "react";
import { ReactEditor, withReact } from "slate-react";
import { createEditor as createSlateEditor } from "slate";
import { withHistory } from "slate-history";
import { OnPlugin } from "../../addon";
import { withChiefOnPlugIn } from "./with-chief-on-plugIn";
import { EditorialEditor } from "../../typings";

export const useCreateEditor = (plugins: OnPlugin[]): EditorialEditor => {
  const editor = useMemo(() => withReact(withHistory(createSlateEditor())), []);
  return useMemo(() => withChiefOnPlugIn(editor, plugins), [plugins]);
};
