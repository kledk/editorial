import { ChiefElement } from "../../chief/chief";
export { ImageAddon } from "./image-addon";
export { ImageControl } from "./image-control";
export interface ImageElement extends ChiefElement {
    type: "image";
    url: string | null;
    caption?: string;
    previewId?: number;
    width: number;
    height: number;
    align: "left" | "center" | "right";
}
export declare function isImageElement(element: unknown): element is ImageElement;
export declare const isImageUrl: (url: string, extensions?: string[]) => boolean;
//# sourceMappingURL=index.d.ts.map