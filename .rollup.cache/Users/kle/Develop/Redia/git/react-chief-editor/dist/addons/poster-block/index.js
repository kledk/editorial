import { __rest } from "tslib";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useSelected } from "slate-react";
import { usePlugin, useRenderElement, } from "../../chief";
import { registerVoidType } from "../../chief/utils/register-void";
import { useShowOnFocus } from "../../chief/utils/use-show-on-focus";
import { StyledFocusToolBtn, } from "../../ui/StyledFocusToolbar";
function isPosterBlockElement(element) {
    if (element && element.type === "poster-block") {
        return true;
    }
    return false;
}
function PosterBlock(props) {
    const { children } = props, renderElementProps = __rest(props, ["children"]);
    const { element, attributes } = renderElementProps;
    const [showOnProps, ShouldShow] = useShowOnFocus(element, {
        isInside: true,
        isFocusedWithin: true,
    });
    const selected = useSelected();
    return (_jsxs("div", Object.assign({}, attributes, showOnProps, { style: {
            display: "flex",
            flex: element.flex,
            flexBasis: props.element.void ? `${props.element.flex * 100}%` : "100%",
            flexDirection: "row",
            backgroundColor: element.backgroundColor,
            backgroundImage: element.backgroundImage,
            backgroundSize: "cover",
            cursor: props.element.void ? "default" : undefined,
            backgroundPosition: "center",
        } }, { children: [_jsx(ShouldShow, Object.assign({ style: { right: 0 } }, { children: _jsx(_Fragment, { children: _jsx(StyledFocusToolBtn, Object.assign({ onMouseDown: () => null }, { children: "Color" }), void 0) }, void 0) }), void 0), _jsx("div", Object.assign({ style: Object.assign({ width: "100%", height: "100%" }, (selected && props.element.void
                    ? {
                        border: "1px solid #d7ae84",
                        backgroundColor: "rgba(255,255,255,0.1)",
                    }
                    : undefined)) }, { children: children }), void 0)] }), void 0));
}
export function PosterBlockAddon() {
    useRenderElement({
        typeMatch: "poster-block",
        Component: (props) => _jsx(PosterBlock, Object.assign({}, props), void 0),
    });
    usePlugin({
        isVoid: registerVoidType((element) => element.void),
    });
    return null;
}
const Presenter = {
    element: {
        typeMatch: "poster-block",
        renderElement: (props) => (_jsx("div", Object.assign({ style: {
                display: "flex",
                flex: props.element.flex,
                flexBasis: props.element.void
                    ? `${props.element.flex * 100}%`
                    : "100%",
                flexDirection: "column",
                backgroundColor: props.element.backgroundColor,
                backgroundImage: props.element.backgroundImage,
                backgroundSize: "cover",
                backgroundPosition: "center",
            } }, { children: props.children }), void 0)),
    },
};
PosterBlockAddon.Presenter = Presenter;
//# sourceMappingURL=index.js.map