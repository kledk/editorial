import React from "react";
export declare const deselect: (editor: import("../../typings").ChiefEditor) => void;
export declare function useHoverTool(): {
    enabled: boolean;
};
export declare function HoverTools(props: {
    children?: React.ReactNode;
}): JSX.Element;
export declare const HoveringTool: (props: {
    children?: React.ReactNode;
    enabled: boolean;
    onChangeEnabled: (enabled: boolean) => void;
} & React.HTMLProps<HTMLDivElement>) => JSX.Element | null;
//# sourceMappingURL=hovering-tool.d.ts.map