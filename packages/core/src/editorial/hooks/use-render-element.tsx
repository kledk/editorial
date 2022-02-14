import { useEffect } from "react";
import { EditorialElement, InjectedRenderElement } from "../editorial";
import { useEditorial } from "./use-editorial";

export function useRenderElement<T extends EditorialElement = EditorialElement>(
  ire: InjectedRenderElement<T>,
  deps: any[] = []
) {
  const chief = useEditorial();
  useEffect(() => {
    chief.injectRenderElement(ire);
    return () => chief.removeRenderElement(ire);
  }, deps);
}
