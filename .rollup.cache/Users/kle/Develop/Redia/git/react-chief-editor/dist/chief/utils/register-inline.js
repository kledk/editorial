export function registerInlineType(validateType) {
    return (isInline) => (element) => (typeof validateType === "string" && validateType === element.type) ||
        (typeof validateType === "function" && validateType(element))
        ? true
        : isInline(element);
}
//# sourceMappingURL=register-inline.js.map