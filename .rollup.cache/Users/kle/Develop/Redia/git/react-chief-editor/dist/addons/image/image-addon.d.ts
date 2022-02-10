import { ImageElement } from ".";
import { AddonProps } from "../..";
import { iPresenter } from "../../chief";
export declare function ImageAddon(props: AddonProps & {
    onUploadRequest?: (files: globalThis.FileList | null) => Promise<string>;
    onRemoved?: (url: string | null) => void;
    onChange?: (images: ImageElement[]) => void;
}): JSX.Element;
export declare namespace ImageAddon {
    var Presenter: iPresenter<ImageElement>;
}
//# sourceMappingURL=image-addon.d.ts.map