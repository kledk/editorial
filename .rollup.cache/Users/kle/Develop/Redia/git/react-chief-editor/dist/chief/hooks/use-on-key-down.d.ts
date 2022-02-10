import { KeyHandler } from "../key-handler";
/**
 * Respond to onKeyDown events in the editor.
 * If you want to receive all onKeyDown events, you can leave out the pattern.
 * For responding to certain key down combos, you can specify a key pattern, eg. "mod+b".
 * @param handler Function to call when a key or combo is pressed
 * @param overrides
 * @param deps
 */
export declare function useOnKeyDown(handler: KeyHandler, deps?: any[]): void;
//# sourceMappingURL=use-on-key-down.d.ts.map