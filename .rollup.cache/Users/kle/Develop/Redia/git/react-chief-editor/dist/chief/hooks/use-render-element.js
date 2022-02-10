import { useEffect } from "react";
import { useChief } from "./use-chief";
export function useRenderElement(ire, deps = []) {
    const chief = useChief();
    useEffect(() => {
        chief.injectRenderElement(ire);
        return () => chief.removeRenderElement(ire);
    }, deps);
}
//# sourceMappingURL=use-render-element.js.map