import { ReactEditor } from "slate-react";
import { Point, Editor, Range } from "slate";
import { ChiefElement } from "./chief";
import { ChiefEditor } from "../typings";
interface ChiefState {
    editor: ReactEditor;
    element?: ChiefElement | Editor | undefined;
    elementType?: string;
    point?: Point;
    isElementEmpty: boolean;
    selection?: Range | null;
    isSelectionCollapsed: boolean;
    isSelectionExpanded: boolean;
}
export declare function getState(editor: ChiefEditor): ChiefState;
export {};
//# sourceMappingURL=chief-state.d.ts.map