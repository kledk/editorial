import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment } from "react";
export const Show = (props) => {
    const { when, children } = props;
    if (!Boolean(when)) {
        return null;
    }
    return _jsx(Fragment, { children: children }, void 0);
};
//# sourceMappingURL=show.js.map