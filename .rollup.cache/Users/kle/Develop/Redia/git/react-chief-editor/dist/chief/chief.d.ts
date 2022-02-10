import React from "react";
import { RenderLeafProps, ReactEditor, RenderElementProps } from "slate-react";
import { Node, Element, NodeEntry, Range, Descendant } from "slate";
import { ChiefEditorTheme } from "../chief-editor-theme";
export declare function isChiefElement(element: unknown): element is ChiefElement;
export declare type ChiefElement = Element & {
    type: string;
};
export declare type ChiefRenderElementProps<T extends ChiefElement = ChiefElement> = RenderElementProps & {
    element: T;
};
export declare type ElementTypeMatch = RegExp | string | readonly string[];
export declare type InjectedRenderLeaf = {
    renderLeaf: (props: RenderLeafProps, editor?: ReactEditor) => JSX.Element | undefined;
};
export declare type InjectedRenderElement<T extends ChiefElement = ChiefElement> = {
    typeMatch?: ElementTypeMatch;
    Component?: React.FunctionComponent<ChiefRenderElementProps<T>>;
    renderElement?: JSX.Element | ((props: ChiefRenderElementProps<T>, editor?: ReactEditor) => JSX.Element | undefined);
};
export declare type InjectedLabels = {
    [key: string]: string | undefined;
};
export declare type Label = {
    key: string;
    defaultLabel: string;
};
export declare type InjectedDecorator = {
    decorator: (entry: NodeEntry<Node>, editor: ReactEditor) => Range[] | undefined;
    priority?: "high" | "low";
};
export declare const Chief: React.NamedExoticComponent<{
    value: Descendant[];
    onChange: (value: Descendant[]) => void;
    children: React.ReactNode;
    readOnly?: boolean | undefined;
    id?: string | undefined;
    theme?: (ChiefEditorTheme & {
        [key: string]: any;
    }) | undefined;
}>;
//# sourceMappingURL=chief.d.ts.map