import { ReactNode } from "react";
import { RangeRef } from "slate";
export declare function useSaveSelection(): {
    saveSelection: (selection: import("slate").BaseRange | null) => () => void;
    savedSelection: RangeRef | null;
};
export declare function SavedSelectionProvider(props: {
    children: ReactNode;
}): JSX.Element;
//# sourceMappingURL=saved-selection.d.ts.map