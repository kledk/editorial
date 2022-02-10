import React, { ReactNode } from "react";
import Overlay from "react-overlays/Overlay";
export declare function ElementHoverTip(props: {
    children: ReactNode | ((triggerRef: React.RefObject<HTMLDivElement>, isHovering: boolean) => ReactNode);
    tip?: ReactNode;
    delayed?: boolean;
} & Omit<React.ComponentProps<typeof Overlay>, "children" | "target" | "container">): JSX.Element;
export declare const StyledTooltipBody: import("styled-components").StyledComponent<"div", any, {}, never>;
export declare const Arrow: import("styled-components").StyledComponent<"div", any, {
    placement: string;
}, never>;
export declare const Tooltip: import("styled-components").StyledComponent<"div", any, {
    placement: string;
}, never>;
//# sourceMappingURL=element-hover-tip.d.ts.map