import { RenderLeafProps } from "slate-react";
import { Node } from "slate";
import { ChiefRenderElementProps, InjectedRenderLeaf, InjectedRenderElement, ChiefElement } from "./chief";
export declare type iPresenter<T extends ChiefElement = any> = {
    element?: InjectedRenderElement<T>;
    leaf?: InjectedRenderLeaf;
};
declare type PresenterElementProps = Omit<ChiefRenderElementProps, "attributes">;
declare type PresenterLeafProps = Omit<RenderLeafProps, "attributes">;
export declare function ChiefPresentation({ value, presenters, overrideRenderElement, overrideRenderLeaf }: {
    value: Node[];
    presenters: iPresenter[];
    overrideRenderElement?: (props: PresenterElementProps) => JSX.Element | undefined;
    overrideRenderLeaf?: (props: PresenterLeafProps) => JSX.Element | undefined;
}): JSX.Element;
export {};
//# sourceMappingURL=chief-presentation.d.ts.map