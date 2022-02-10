import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Slate, } from "slate-react";
import merge from "lodash/merge";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "../defaultTheme";
import { useProvideChiefContext, ChiefContext } from "./chief-context";
import { useErrorBoundary } from "use-error-boundary";
import { SavedSelectionProvider } from "./utils/saved-selection";
export function isChiefElement(element) {
    return element.type !== undefined;
}
export const Chief = React.memo(function (props) {
    const { children, onChange, value, readOnly, id, theme } = props;
    const _theme = merge({}, defaultTheme, theme);
    const chiefValue = useProvideChiefContext({ readOnly, id });
    const { ErrorBoundary, didCatch, error } = useErrorBoundary();
    if (didCatch) {
        console.log(error);
    }
    return (_jsx(ErrorBoundary, { children: _jsx(Slate, Object.assign({ editor: chiefValue.editor, value: value, onChange: onChange }, { children: _jsx(ChiefContext.Provider, Object.assign({ value: chiefValue }, { children: _jsx(SavedSelectionProvider, { children: _jsx(ThemeProvider, Object.assign({ theme: _theme }, { children: _jsx(React.Fragment, { children: children }, void 0) }), void 0) }, void 0) }), void 0) }), void 0) }, void 0));
});
//# sourceMappingURL=chief.js.map