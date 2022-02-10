import { CSSProperties, ReactNode } from "react";
import { Element } from "slate";
export declare function useShowOnFocus(element: Element, when: {
    isFocusedWithin?: boolean;
    isFocused?: boolean;
    isInside?: boolean;
}): readonly [{
    onMouseEnter: () => void;
    onMouseLeave: () => void;
}, (props: {
    children: ReactNode;
    style?: CSSProperties;
}) => JSX.Element];
//# sourceMappingURL=use-show-on-focus.d.ts.map