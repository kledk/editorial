import { AddonProps } from "../../addon";
import { Editor } from "slate";
import { iPresenter } from "../../chief/chief-presentation";
import { ControlProps } from "../../chief/controls";
export declare const headingTypes: readonly ["h1", "h2", "h3", "h4", "h5", "h6"];
export declare function HeadingControl(props: {
    heading: typeof headingTypes[number];
} & ControlProps): JSX.Element | null;
export declare function HeadingsAddon(_props: AddonProps): null;
export declare namespace HeadingsAddon {
    var Presenter: iPresenter<any>;
}
export declare const isHeadingType: (editor: Editor, header: string) => boolean;
//# sourceMappingURL=index.d.ts.map