import { ReactNode } from "react";
import { defaultTheme } from "../../defaultTheme";
import { ElementTypeMatch } from "../chief";
export declare function useIsControlEligable(opts: {
    typeMatch?: ElementTypeMatch;
    isVoid?: boolean;
    isText?: boolean;
    isEmpty?: boolean;
}): boolean;
export declare type RenderControlProps = {
    isActive: boolean;
    theme: typeof defaultTheme;
};
export declare type ControlChildrenProp = ((props: RenderControlProps) => ReactNode) | ReactNode;
export declare type ControlProps = {
    children: ControlChildrenProp;
};
//# sourceMappingURL=index.d.ts.map