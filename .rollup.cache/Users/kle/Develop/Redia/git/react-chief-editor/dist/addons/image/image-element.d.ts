import { ImageElement } from "./index";
import { ChiefRenderElementProps } from "../../chief/chief";
export declare const ImageBlock: (props: import("slate-react").RenderElementProps & {
    element: ImageElement;
} & {
    onOpenFileRequest?: (() => void) | undefined;
    onRemoved?: ((url: string | null) => void) | undefined;
}) => JSX.Element;
export declare const StyledImageEmptyContainer: import("styled-components").StyledComponent<"div", any, {}, never>;
//# sourceMappingURL=image-element.d.ts.map