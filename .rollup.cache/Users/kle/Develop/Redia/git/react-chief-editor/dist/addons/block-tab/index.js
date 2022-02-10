import { useOnKeyDown } from "../../chief/hooks/use-on-key-down";
export function BlockTabAddon(props) {
    useOnKeyDown({
        pattern: "tab",
        priority: "low",
        handler: e => {
            e.preventDefault();
            return true;
        }
    });
    return null;
}
//# sourceMappingURL=index.js.map