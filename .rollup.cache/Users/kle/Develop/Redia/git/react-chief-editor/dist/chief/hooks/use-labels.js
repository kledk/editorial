import { useEffect, useCallback } from "react";
import { useChief } from "./use-chief";
export function useLabels(labels) {
    const { labels: injectedLabels, injectLabels } = useChief();
    const getLabel = useCallback((label) => {
        if (typeof injectedLabels[label.key] === "string") {
            return injectedLabels[label.key];
        }
        return label.defaultLabel;
    }, [injectedLabels]);
    useEffect(() => {
        if (labels) {
            injectLabels(labels);
        }
    }, []);
    return [getLabel, injectLabels];
}
//# sourceMappingURL=use-labels.js.map