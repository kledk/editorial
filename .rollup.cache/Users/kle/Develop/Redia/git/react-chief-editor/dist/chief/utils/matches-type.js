export function matchesType(element, typeMatch) {
    return ((Array.isArray(typeMatch) && typeMatch.includes(element.type)) ||
        (typeof typeMatch === "string" && typeMatch === element.type) ||
        Boolean(typeMatch instanceof RegExp && element.type.match(typeMatch)));
}
//# sourceMappingURL=matches-type.js.map