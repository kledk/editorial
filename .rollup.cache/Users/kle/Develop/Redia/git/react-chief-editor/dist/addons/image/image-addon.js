import { __awaiter } from "tslib";
import { jsx as _jsx } from "react/jsx-runtime";
import { useRef, useEffect } from "react";
import { Editor, Element, Transforms } from "slate";
import { HistoryEditor } from "slate-history";
import { useSlate, ReactEditor } from "slate-react";
import { isDefined, isFilled } from "ts-is-present";
import { isImageElement } from ".";
import { useOnKeyDown, getNodeFromSelection, usePlugin, useRenderElement, } from "../..";
import { registerVoidType } from "../../chief/utils/register-void";
import { FileUpload } from "../../FileUpload";
import { findNodes } from "../../utils";
import { ImageBlock } from "./image-element";
const insertImage = (editor, url) => {
    const image = { type: "image", url, children: [{ text: "" }] };
    Transforms.insertNodes(editor, image);
};
function getAllImageNodes(editor) {
    const [...images] = findNodes(editor, (n) => Element.isElement(n) && n.type === "image");
    return images.map(([node]) => node);
}
export function ImageAddon(props) {
    const editor = useSlate();
    const fileRef = useRef(null);
    useOnKeyDown({
        pattern: ["delete", "backspace"],
        handler: (_e, editor) => {
            if (editor.selection) {
                const element = getNodeFromSelection(editor, editor.selection);
                if (Editor.isVoid(editor, element)) {
                    props.onRemoved && props.onRemoved(element.url);
                    Transforms.delete(editor, {
                        at: ReactEditor.findPath(editor, element),
                    });
                }
            }
        },
    });
    usePlugin({
        isVoid: registerVoidType(isImageElement),
        insertData: (insertData, editor) => (data) => {
            const { files } = data;
            if (files && files.length > 0) {
                for (const file of Array.from(files)) {
                    const reader = new FileReader();
                    const [mime] = file.type.split("/");
                    if (mime === "image") {
                        reader.addEventListener("load", () => {
                            const url = reader.result;
                            insertImage(editor, url);
                        });
                        reader.readAsDataURL(file);
                    }
                }
            }
            else {
                insertData(data);
            }
        },
    });
    const onPreview = (dataUrl) => {
        if (typeof dataUrl === "string") {
            if (HistoryEditor.isHistoryEditor(editor)) {
                HistoryEditor.withoutSaving(editor, () => {
                    Transforms.setNodes(editor, {
                        url: dataUrl,
                    });
                });
            }
        }
    };
    const handleFile = (e) => __awaiter(this, void 0, void 0, function* () {
        if (!editor.selection) {
            return;
        }
        const imageRef = Editor.rangeRef(editor, editor.selection);
        const onUploadedSuccess = (url) => {
            if (!imageRef.current)
                return;
            const node = getNodeFromSelection(editor, imageRef.current);
            if (node && isImageElement(node)) {
                Transforms.setNodes(editor, {
                    url,
                    align: "center",
                }, {
                    at: imageRef.current,
                });
                imageRef.unref();
            }
        };
        const onUploadedFailed = () => {
            if (!imageRef.current)
                return;
            Transforms.setNodes(editor, {
                // url: null,
                error: "failedupload",
            }, {
                at: imageRef.current,
            });
            imageRef.unref();
        };
        const files = e.target.files;
        if (!files) {
            return;
        }
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.addEventListener("load", () => onPreview(reader.result));
            reader.readAsDataURL(file);
            if (props.onUploadRequest) {
                try {
                    const url = yield props.onUploadRequest(files);
                    onUploadedSuccess(url);
                }
                catch (err) {
                    onUploadedFailed();
                }
            }
        }
    });
    let imageUrls = [];
    if (props.onChange) {
        imageUrls = getAllImageNodes(editor)
            .map((it) => it)
            .filter(isDefined)
            .filter(isFilled);
    }
    useEffect(() => {
        props.onChange && props.onChange(imageUrls);
    }, [JSON.stringify(imageUrls), props.onChange]);
    useRenderElement({
        typeMatch: "image",
        renderElement: (renderElementProps) => (_jsx(ImageBlock, Object.assign({ onOpenFileRequest: () => fileRef.current && fileRef.current.click(), onRemoved: props.onRemoved }, renderElementProps), void 0)),
    }, [props.onRemoved]);
    return (_jsx(FileUpload, { accept: "image/*", ref: fileRef, onChange: handleFile, multiple: false }, void 0));
}
const Presenter = {
    element: {
        typeMatch: "image",
        renderElement: (props) => {
            var _a;
            return (_jsx("div", Object.assign({ style: {
                    display: "flex",
                    justifyContent: props.element.align === "center"
                        ? "center"
                        : props.element.align === "left"
                            ? "flex-start"
                            : "flex-end",
                } }, { children: _jsx("img", { style: {
                        objectFit: "fill",
                        width: props.element.width,
                        height: props.element.height,
                        display: "block",
                    }, alt: props.element.caption, src: ((_a = props.element) === null || _a === void 0 ? void 0 : _a.url) ? props.element.url : "" }, void 0) }), void 0));
        },
    },
};
ImageAddon.Presenter = Presenter;
//# sourceMappingURL=image-addon.js.map