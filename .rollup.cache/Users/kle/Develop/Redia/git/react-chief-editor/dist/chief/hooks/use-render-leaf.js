import { useEffect } from "react";
import { useChief } from "./use-chief";
export function useRenderLeaf(irl, deps = []) {
    const chief = useChief();
    useEffect(() => {
        chief.injectRenderLeaf(irl);
        return () => chief.removeRenderLeaf(irl);
    }, deps);
}
//# sourceMappingURL=use-render-leaf.js.map