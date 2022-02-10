/// <reference types="react" />
import { Editor, Point, Node, Location, Range } from "slate";
import { ChiefEditor } from "./typings";
export declare const isInside: (rect: ClientRect, x: number, y: number) => boolean;
export declare const useGlobalHover: (element: HTMLElement | null) => boolean;
export declare function useHover<T extends HTMLElement>(): readonly [import("react").RefObject<T>, boolean];
export declare const getNode: <T extends Node>(editor: Editor, path: Path) => T | null;
export declare const getActiveNode: (editor: Editor) => import("slate").Ancestor | null;
export declare const getActiveNodeType: (editor: Editor) => string | null;
export declare const clone: (value: any) => any;
interface State {
    node: Node | null;
    point: Point | null;
    selection: Range | null;
}
export declare const useLastFocused: (editor: ChiefEditor) => State;
export declare const isBlockEmpty: (editor: Editor, location?: Location | undefined) => boolean;
export declare const toggleBlock: (editor: Editor, type: string) => void;
export declare const isNodeActive: (editor: Editor, type: string) => boolean;
export declare function useOnClickOutside(ref: React.RefObject<HTMLElement | null>, handler: (event: MouseEvent | TouchEvent) => void): void;
export declare function getNodeFromSelection(editor: Editor, selection: Range | null): import("slate").Ancestor | null;
export declare const findNodes: (editor: Editor, match: (node: Node) => boolean) => Generator<import("slate").NodeEntry<Node>, void, undefined>;
export declare const getAncestor: (editor: Editor, node: Node, level?: number) => ChiefEditor | import("./typings").CustomElement | null;
export {};
//# sourceMappingURL=utils.d.ts.map