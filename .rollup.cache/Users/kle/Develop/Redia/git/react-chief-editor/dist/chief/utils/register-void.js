export function registerVoidType(validateType) {
    return (isVoid) => (element) => (typeof validateType === "string" && validateType === element.type) ||
        // @ts-expect-error
        (typeof validateType === "function" && validateType(element))
        ? true
        : isVoid(element);
}
//# sourceMappingURL=register-void.js.map