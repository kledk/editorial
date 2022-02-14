import { ElementTypeMatch, EditorialElement } from "../editorial";

export function matchesType(
  element: EditorialElement,
  typeMatch?: ElementTypeMatch
): element is EditorialElement {
  return (
    (Array.isArray(typeMatch) && typeMatch.includes(element.type)) ||
    (typeof typeMatch === "string" && typeMatch === element.type) ||
    Boolean(typeMatch instanceof RegExp && element.type.match(typeMatch))
  );
}
