import { useEffect } from "react";
import { useEditorial } from "./use-editorial";
import { InjectedDecorator } from "../editorial";

export function useDecoration(decoration: InjectedDecorator, deps?: any[]) {
  const chief = useEditorial();
  useEffect(() => {
    chief.injectDecoration(decoration);
    return () => chief.removeDecoration(decoration);
  }, deps);
}
