import { useOnKeyDown } from "../../chief/hooks/use-on-key-down";
import { Range } from "slate";
export function PreventNewlineAddon(props) {
    useOnKeyDown({
        pattern: "enter+shift",
        handler: (event, editor) => {
            if (editor.selection && Range.isCollapsed(editor.selection)) {
                event.preventDefault();
                event.stopPropagation();
                editor.insertText("\n");
                return true;
            }
            return false;
        }
    });
    return null;
}
//# sourceMappingURL=index.js.map