import { Editor as SlateEditor } from "slate";
export const handleKeyUp = (event, editor) => {
    const { selection } = editor;
    if (!selection) {
        return;
    }
    const [, path] = SlateEditor.node(editor, selection);
    if (!path.length) {
        return;
    }
    const [parent] = SlateEditor.parent(editor, path);
    if (parent) {
        // TODO: implement some kind of trigger
        // for (let addon of addons) {
        //   if (addon.triggers) {
        //     for (let trigger of plugin.triggers) {
        //       const matches = findMatches(trigger.pattern, trigger.range, editor);
        //       if (matches.length) {
        //         plugin.onTrigger && plugin.onTrigger(editor, matches, trigger);
        //         return;
        //       }
        //     }
        //   }
        // }
    }
};
//# sourceMappingURL=handleKeyUp.js.map