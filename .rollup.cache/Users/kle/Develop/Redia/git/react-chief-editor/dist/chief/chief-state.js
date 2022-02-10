import { Editor, Range, Node } from "slate";
import { isChiefElement } from "./chief";
export function getState(editor) {
    const { selection } = editor;
    const point = selection ? selection.focus : undefined;
    const [element] = point ? Editor.parent(editor, point) : [];
    let isSelectionExpanded = false;
    let isSelectionCollapsed = true;
    if (selection) {
        isSelectionExpanded = Range.isExpanded(selection);
        isSelectionCollapsed = Range.isCollapsed(selection);
    }
    let isElementEmpty = true;
    if (element) {
        isElementEmpty = Node.string(element).length == 0;
    }
    let elementType = undefined;
    if (element && isChiefElement(element)) {
        elementType = element.type;
    }
    return {
        editor,
        // TODO:: THIS
        // @ts-ignore
        element,
        elementType,
        point,
        selection,
        isElementEmpty,
        isSelectionExpanded,
        isSelectionCollapsed,
    };
}
//# sourceMappingURL=chief-state.js.map