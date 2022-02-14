import { useContext } from "react";
import { EditorialContext } from "../editorial-context";

export function useEditorial() {
  const ctx = useContext(EditorialContext);
  if (!ctx) {
    throw new Error(
      'Chief context not found. Wrap your <Chief.Editor/> in a <Chief/> before using "useChief()"'
    );
  }
  return ctx;
}
