import { useEffect } from "react";
import { useChief } from "./use-chief";
export function usePlugin(plugin) {
    const chief = useChief();
    useEffect(() => {
        chief.injectPlugin(plugin);
        return () => chief.removePlugin(plugin);
    }, []);
}
//# sourceMappingURL=use-plugin.js.map