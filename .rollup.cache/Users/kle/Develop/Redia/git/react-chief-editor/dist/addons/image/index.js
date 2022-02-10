import { isChiefElement } from "../../chief/chief";
import isUrl from "is-url";
import { ImageExtensions } from "./ImageExtensions";
export { ImageAddon } from "./image-addon";
export { ImageControl } from "./image-control";
export function isImageElement(element) {
    return isChiefElement(element) && element.type === "image";
}
export const isImageUrl = (url, extensions = ImageExtensions) => {
    if (!url)
        return false;
    if (!isUrl(url))
        return false;
    const ext = new URL(url).pathname.split(".").pop();
    return extensions.includes(ext);
};
//# sourceMappingURL=index.js.map