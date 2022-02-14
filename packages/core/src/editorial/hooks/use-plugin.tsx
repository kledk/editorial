import { useEffect } from "react";
import { OnPlugin } from "../../addon";
import { useEditorial } from "./use-editorial";

export function usePlugin(plugin: OnPlugin) {
  const chief = useEditorial();
  useEffect(() => {
    chief.injectPlugin(plugin);
    return () => chief.removePlugin(plugin);
  }, []);
}
