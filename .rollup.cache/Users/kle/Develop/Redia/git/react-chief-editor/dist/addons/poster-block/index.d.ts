import { ChiefElement, iPresenter } from "../../chief";
export declare type PosterBlockElement = {
    type: "poster-block";
    backgroundImage?: string;
    backgroundColor?: string;
    flex: number;
    void: boolean;
} & ChiefElement;
export declare function PosterBlockAddon(): null;
export declare namespace PosterBlockAddon {
    var Presenter: iPresenter<PosterBlockElement>;
}
//# sourceMappingURL=index.d.ts.map