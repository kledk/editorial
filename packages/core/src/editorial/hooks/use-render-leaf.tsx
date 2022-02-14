import { useEffect } from "react";
import { InjectedRenderLeaf } from "../editorial";
import { useEditorial } from "./use-editorial";

export function useRenderLeaf(irl: InjectedRenderLeaf, deps: any[] = []) {
  const chief = useEditorial();
  useEffect(() => {
    chief.injectRenderLeaf(irl);
    return () => chief.removeRenderLeaf(irl);
  }, deps);
}
