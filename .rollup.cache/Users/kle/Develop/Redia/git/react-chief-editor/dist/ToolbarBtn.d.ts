import React from "react";
import { StyledToolbarBtn } from "./ui/styled-toolbar-btn";
import Overlay from "react-overlays/Overlay";
import { Label } from "./chief/chief";
import { ControlProps } from "./chief/controls";
export declare type Ref = HTMLElement;
declare type Props = {
    tooltip?: {
        label: Label;
        shortcut?: string;
        placement?: React.ComponentProps<typeof Overlay>["placement"];
    };
    onMouseDown?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
} & ControlProps & Omit<React.ComponentProps<typeof StyledToolbarBtn>, "children">;
export declare const ToolbarBtn: React.ForwardRefExoticComponent<Pick<Props, string | number | symbol> & React.RefAttributes<HTMLElement>>;
export {};
//# sourceMappingURL=ToolbarBtn.d.ts.map