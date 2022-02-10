import React from "react";
import { Editor as SlateEditor } from "slate";
import { Editable, ReactEditor } from "slate-react";
export declare const RichEditor: {
    insertBlock(editor: SlateEditor, blockType: string): void;
    getWindow(editor: ReactEditor): Window;
    findKey(editor: ReactEditor, node: import("slate").Node): import("slate-react/dist/utils/key").Key;
    findPath(editor: ReactEditor, node: import("slate").Node): import("slate").Path;
    findDocumentOrShadowRoot(editor: ReactEditor): Document | ShadowRoot;
    isFocused(editor: ReactEditor): boolean;
    isReadOnly(editor: ReactEditor): boolean;
    blur(editor: ReactEditor): void;
    focus(editor: ReactEditor): void;
    deselect(editor: ReactEditor): void;
    hasDOMNode(editor: ReactEditor, target: Node, options?: {
        editable?: boolean | undefined;
    } | undefined): boolean;
    insertData(editor: ReactEditor, data: DataTransfer): void;
    insertFragmentData(editor: ReactEditor, data: DataTransfer): boolean;
    insertTextData(editor: ReactEditor, data: DataTransfer): boolean;
    setFragmentData(editor: ReactEditor, data: DataTransfer, originEvent?: "copy" | "drag" | "cut" | undefined): void;
    toDOMNode(editor: ReactEditor, node: import("slate").Node): HTMLElement;
    toDOMPoint(editor: ReactEditor, point: import("slate").BasePoint): import("slate-react/dist/utils/dom").DOMPoint;
    toDOMRange(editor: ReactEditor, range: import("slate").BaseRange): Range;
    toSlateNode(editor: ReactEditor, domNode: Node): import("slate").Node;
    findEventRange(editor: ReactEditor, event: any): import("slate").BaseRange;
    toSlatePoint<T extends boolean>(editor: ReactEditor, domPoint: import("slate-react/dist/utils/dom").DOMPoint, options: {
        exactMatch: T;
        suppressThrow: T;
    }): T extends true ? import("slate").BasePoint | null : import("slate").BasePoint;
    toSlateRange<T_1 extends boolean>(editor: ReactEditor, domRange: Selection | Range | StaticRange, options: {
        exactMatch: T_1;
        suppressThrow: T_1;
    }): T_1 extends true ? import("slate").BaseSelection : import("slate").BaseRange & {
        placeholder?: string | undefined;
    };
    hasRange(editor: ReactEditor, range: import("slate").BaseRange): boolean;
};
export declare const Editor: React.MemoExoticComponent<(props: {
    children?: React.ReactNode;
} & React.ComponentProps<typeof Editable>) => JSX.Element>;
//# sourceMappingURL=editor.d.ts.map