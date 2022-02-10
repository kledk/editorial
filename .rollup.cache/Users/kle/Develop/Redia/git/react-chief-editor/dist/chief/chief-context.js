import React, { useState, useRef } from "react";
import { useCreateEditor } from "./utils/create-editor";
export function useChiefRenderCore() {
    const [renderLeafs, setRenderLeafs] = useState([]);
    const [renderElements, setRenderElements] = useState([]);
    function injectRenderLeaf(irl) {
        setRenderLeafs((it) => [...it, irl]);
    }
    function removeRenderLeaf(irl) {
        setRenderLeafs((it) => {
            const toSlicer = [...it];
            toSlicer.splice(toSlicer.indexOf(irl), 1);
            return toSlicer;
        });
    }
    function injectRenderElement(ire) {
        setRenderElements((it) => [...it, ire]);
    }
    function removeRenderElement(ire) {
        setRenderElements((it) => {
            const toSlicer = [...it];
            toSlicer.splice(it.indexOf(ire), 1);
            return toSlicer;
        });
    }
    return {
        renderLeafs,
        injectRenderLeaf,
        removeRenderLeaf,
        renderElements,
        injectRenderElement,
        removeRenderElement,
    };
}
export const ChiefContext = React.createContext(null);
let count = 1;
export function useProvideChiefContext(props) {
    const [injectedPlugins, setInjectedPlugins] = useState([]);
    const [injectedLabels, setInjectedLabels] = useState({});
    const [onKeyHandlers, setOnKeyHandlers] = useState([]);
    const [decorations, setDecorations] = useState([]);
    const editor = useCreateEditor(injectedPlugins);
    const [readOnly, setReadOnly] = useState(Boolean(props.readOnly));
    const { current: id } = useRef(props.id || `chiefeditor${count++}`);
    function injectPlugin(plugin) {
        setInjectedPlugins((plugins) => [...plugins, plugin]);
    }
    function removePlugin(plugin) {
        setInjectedPlugins((it) => {
            const toSlicer = [...it];
            toSlicer.splice(toSlicer.indexOf(plugin), 1);
            return toSlicer;
        });
    }
    function injectOnKeyHandler(keyHandler) {
        setOnKeyHandlers((it) => [...it, keyHandler].sort((a, b) => a.priority === b.priority ? 0 : a.priority === "low" ? 1 : -1));
    }
    function removeOnKeyHandler(keyHandler) {
        setOnKeyHandlers((it) => {
            const toSlicer = [...it];
            toSlicer.splice(it.indexOf(keyHandler), 1);
            return toSlicer;
        });
    }
    function injectDecoration(decorator) {
        setDecorations((it) => [...it, decorator].sort((a, b) => a.priority === b.priority ? 0 : a.priority === "low" ? 1 : -1));
    }
    function removeDecoration(decorator) {
        setDecorations((it) => {
            const toSlicer = [...it];
            toSlicer.splice(it.indexOf(decorator), 1);
            return toSlicer;
        });
    }
    function injectLabels(labels) {
        setInjectedLabels((it) => (Object.assign(Object.assign({}, it), labels)));
    }
    const value = Object.assign(Object.assign({}, useChiefRenderCore()), { editor,
        readOnly,
        setReadOnly,
        id,
        injectOnKeyHandler,
        removeOnKeyHandler, onKeyDownHandlers: onKeyHandlers, injectPlugin,
        removePlugin, OnPlugins: injectedPlugins, labels: injectedLabels, injectLabels,
        decorations,
        injectDecoration,
        removeDecoration });
    return value;
}
//# sourceMappingURL=chief-context.js.map