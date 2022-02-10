import { Element, Editor } from "slate";
import { AddonProps } from "../../addon";
import { iPresenter } from "../../chief/chief-presentation";
import { ControlProps } from "../../chief/controls";
export declare const isLinkELement: (element: Element) => boolean;
export declare function LinkAddon(props: AddonProps): null;
export declare namespace LinkAddon {
    var Presenter: iPresenter<{
        url: string;
    } & import("../../typings").CustomElement & {
        type: string;
    }>;
}
export declare function LinkControl(props: ControlProps): JSX.Element | null;
export declare const insertLink: (editor: Editor, url: string) => void;
export declare const isLinkActive: (editor: Editor) => boolean;
//# sourceMappingURL=index.d.ts.map