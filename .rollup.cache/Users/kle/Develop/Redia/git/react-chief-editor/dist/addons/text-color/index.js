import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef } from "react";
import { Editor, Text, Transforms } from "slate";
import { useSlate } from "slate-react";
import { useRenderLeaf, } from "../../chief";
import { renderLeaf } from "../../chief/render/leaf-renderer";
import { StyledToolBox } from "../../ui/StyledToolBox";
import { ToolbarBtn } from "../../ToolbarBtn";
import { ToolBtnPopup } from "../../ToolBtnPopup";
import { useOnClickOutside, } from "../../utils";
import { useSaveSelection } from "../../chief/utils/saved-selection";
import { useIsControlEligable } from "../../chief/controls";
export function TextColorAddon() {
    useRenderLeaf({
        renderLeaf: (props) => {
            if (typeof props.leaf["color"] === "string")
                return (_jsx("span", Object.assign({ style: { color: props.leaf["color"] } }, props.attributes, { children: props.children }), void 0));
            return undefined;
        },
    });
    return null;
}
export function TextColorControl(props) {
    if (!useIsControlEligable({
        isText: true,
    })) {
        return null;
    }
    return (_jsx(ToolBtnPopup, { renderContent: (setShow) => (_jsx(StyledToolBox, { children: _jsx(ColorSelector, { colors: props.colors || [
                    "rgb(142, 209, 252)",
                    "rgb(132, 109, 52)",
                    "rgb(42, 09, 232)",
                    "rgb(54, 209, 12)",
                ], onClose: () => setShow(false) }, void 0) }, void 0)), renderToolBtn: (tprops, show) => (_jsx(ToolbarBtn, Object.assign({ tooltip: {
                label: {
                    key: "marks.textcolor",
                    defaultLabel: "Textcolor",
                },
            } }, tprops, { isActive: show }, { children: props.children }), void 0)) }, void 0));
}
const Presenter = {
    leaf: {
        renderLeaf: (props) => renderLeaf(props, "color", "span", {
            style: { color: props.leaf["color"] },
        }),
    },
};
TextColorAddon.Presenter = Presenter;
function ColorSelector(props) {
    const editor = useSlate();
    const { onClose, colors } = props;
    const { selection } = editor;
    const { saveSelection } = useSaveSelection();
    let node = null;
    if (selection) {
        const [_node] = Editor.nodes(editor, {
            at: selection,
            match: (n) => Boolean(n["color"]),
        });
        node = _node && _node[0];
    }
    useEffect(() => {
        return saveSelection(selection);
    }, []);
    const wrapperRef = useRef(null);
    useOnClickOutside(wrapperRef, () => {
        onClose();
    });
    const handleChangeTextColor = useCallback((color) => {
        Transforms.setNodes(editor, { color }, { match: (n) => Text.isText(n), split: true });
        onClose();
    }, [colors]);
    return (_jsx("div", Object.assign({ style: {
            padding: 5,
        } }, { children: _jsx("div", Object.assign({ ref: wrapperRef, style: {
                display: "flex",
                flexDirection: "row",
            } }, { children: _jsxs("div", Object.assign({ style: { display: "flex", flexWrap: "wrap", maxWidth: 170 } }, { children: [_jsx(ToolbarBtn, Object.assign({ tooltip: {
                            label: {
                                key: "color.default",
                                defaultLabel: "Default",
                            },
                        }, onClick: () => handleChangeTextColor(undefined), style: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 24,
                            height: 24,
                            border: "1px solid rgb(236 236 236)",
                            margin: 2,
                            cursor: "pointer",
                        } }, { children: "A" }), void 0), colors.map((color, i) => {
                        return (_jsx(ToolbarBtn, Object.assign({ tooltip: {
                                label: {
                                    key: `color.${color}`,
                                    defaultLabel: color,
                                },
                            }, onClick: () => handleChangeTextColor(color), style: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "1px solid rgb(236 236 236)",
                                width: 24,
                                height: 24,
                                margin: 2,
                                color: color,
                                cursor: "pointer",
                            } }, { children: "A" }), i));
                    })] }), void 0) }), void 0) }), void 0));
}
//# sourceMappingURL=index.js.map