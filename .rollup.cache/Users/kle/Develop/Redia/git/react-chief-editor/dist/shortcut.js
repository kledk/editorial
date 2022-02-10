import { toKeyName } from "is-hotkey";
export function shortcutText(shortcut) {
    return toKeyName(shortcut).replace("mod", "⌘").toUpperCase();
}
//# sourceMappingURL=shortcut.js.map