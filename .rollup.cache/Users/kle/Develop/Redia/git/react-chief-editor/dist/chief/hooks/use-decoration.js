import { useEffect } from "react";
import { useChief } from "./use-chief";
export function useDecoration(decoration, deps) {
    const chief = useChief();
    useEffect(() => {
        chief.injectDecoration(decoration);
        return () => chief.removeDecoration(decoration);
    }, deps);
}
//# sourceMappingURL=use-decoration.js.map