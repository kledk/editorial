export function OverrideTheme(name, props) {
    if (props.theme.overrides && props.theme.overrides[name]) {
        return props.theme.overrides[name];
    }
    return undefined;
}
//# sourceMappingURL=override-theme.js.map