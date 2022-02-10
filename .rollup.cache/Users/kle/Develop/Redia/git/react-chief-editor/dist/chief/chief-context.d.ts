import React from "react";
import { OnPlugin } from "../addon";
import { KeyHandler } from "./key-handler";
import { InjectedRenderLeaf, InjectedRenderElement, InjectedLabels, InjectedDecorator } from "./chief";
import { ChiefEditor } from "../typings";
interface ChiefRenderCore {
    injectRenderLeaf: (irl: InjectedRenderLeaf) => void;
    removeRenderLeaf: (irl: InjectedRenderLeaf) => void;
    renderLeafs: Array<InjectedRenderLeaf>;
    injectRenderElement: (irl: InjectedRenderElement<any>) => void;
    removeRenderElement: (irl: InjectedRenderElement<any>) => void;
    renderElements: InjectedRenderElement[];
}
export declare function useChiefRenderCore(): {
    renderLeafs: InjectedRenderLeaf[];
    injectRenderLeaf: (irl: InjectedRenderLeaf) => void;
    removeRenderLeaf: (irl: InjectedRenderLeaf) => void;
    renderElements: InjectedRenderElement<import("./chief").ChiefElement>[];
    injectRenderElement: (ire: InjectedRenderElement) => void;
    removeRenderElement: (ire: InjectedRenderElement) => void;
};
export interface ChiefContextValue extends ChiefRenderCore {
    editor: ChiefEditor;
    readOnly: boolean;
    setReadOnly: (readOnly: boolean) => void;
    id: string;
    injectOnKeyHandler: (keyHandler: KeyHandler) => void;
    removeOnKeyHandler: (keyHandler: KeyHandler) => void;
    onKeyDownHandlers: KeyHandler[];
    injectPlugin: (plugin: OnPlugin) => void;
    removePlugin: (plugin: OnPlugin) => void;
    OnPlugins: OnPlugin[];
    labels: InjectedLabels;
    injectLabels: (labels: InjectedLabels) => void;
    decorations: InjectedDecorator[];
    injectDecoration: (decoration: InjectedDecorator) => void;
    removeDecoration: (decoration: InjectedDecorator) => void;
}
export declare const ChiefContext: React.Context<ChiefContextValue | null>;
export declare function useProvideChiefContext(props: {
    readOnly?: boolean;
    id?: string;
}): ChiefContextValue;
export {};
//# sourceMappingURL=chief-context.d.ts.map