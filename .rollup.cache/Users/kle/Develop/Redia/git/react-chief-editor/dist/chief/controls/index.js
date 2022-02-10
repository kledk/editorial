import { Editor as SlateEditor } from "slate";
import { useSlate } from "slate-react";
import { isChiefElement } from "../chief";
import { matchesType } from "../utils/matches-type";
export function useIsControlEligable(opts) {
    const editor = useSlate();
    const { selection } = editor;
    if (selection) {
        const [match] = SlateEditor.nodes(editor, {
            match: (n) => {
                if (opts.typeMatch && typeof n.type === "string") {
                    if (matchesType(n, opts.typeMatch)) {
                        return true;
                    }
                }
                else if (typeof opts.isVoid === "boolean" &&
                    opts.isVoid === SlateEditor.isVoid(editor, n)) {
                    return true;
                }
                else if (opts.isEmpty &&
                    isChiefElement(n) &&
                    SlateEditor.isEmpty(editor, n)) {
                    return true;
                }
                else if (opts.isText &&
                    SlateEditor.string(editor, selection).length > 0) {
                    return true;
                }
                return false;
            },
        });
        return Boolean(match);
    }
    return false;
}
//# sourceMappingURL=index.js.map