import isHotkey from "is-hotkey";
export const handleKeyDown = (event, editor, onKeyHandlers) => {
    for (let handler of onKeyHandlers) {
        if (handler.pattern) {
            if (Array.isArray(handler.pattern) &&
                handler.pattern.some(h => isHotkey(h, event.nativeEvent)) &&
                handler.handler(event.nativeEvent, editor)) {
                return;
            }
            else if (isHotkey(handler.pattern, event.nativeEvent) &&
                handler.handler(event.nativeEvent, editor)) {
                return;
            }
        }
        else if (handler.pattern === null) {
            if (handler.handler(event.nativeEvent, editor)) {
                return;
            }
        }
    }
};
//# sourceMappingURL=handleKeyDown.js.map