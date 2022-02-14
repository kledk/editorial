import { useEffect, useCallback } from "react";
import { InjectedLabels, Label } from "../editorial";
import { useEditorial } from "./use-editorial";

export function useLabels(labels?: InjectedLabels) {
  const { labels: injectedLabels, injectLabels } = useEditorial();
  const getLabel = useCallback(
    (label: Label) => {
      if (typeof injectedLabels[label.key] === "string") {
        return injectedLabels[label.key];
      }
      return label.defaultLabel;
    },
    [injectedLabels]
  );

  useEffect(() => {
    if (labels) {
      injectLabels(labels);
    }
  }, []);

  return [getLabel, injectLabels] as const;
}
