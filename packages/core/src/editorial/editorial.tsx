import React, { useEffect } from "react";
import {
  RenderLeafProps,
  ReactEditor,
  RenderElementProps,
  Slate,
} from "slate-react";
import { Node, Element, NodeEntry, Range, Descendant } from "slate";
import { useProvideChiefContext, EditorialContext } from "./editorial-context";
import { useErrorBoundary } from "use-error-boundary";
import { SavedSelectionProvider } from "./utils/saved-selection";

export function isEditoralElement(element: unknown): element is EditorialElement {
  return (element as EditorialElement).type !== undefined;
}

export type EditorialElement = Element & {
  type: string;
};

export type EditorialRenderElementProps<
  T extends EditorialElement = EditorialElement
> = RenderElementProps & {
  element: T;
};

export type ElementTypeMatch = RegExp | string | readonly string[];

export type InjectedRenderLeaf = {
  renderLeaf: (
    props: RenderLeafProps,
    editor?: ReactEditor
  ) => JSX.Element | undefined;
};

export type InjectedRenderElement<T extends EditorialElement = EditorialElement> = {
  typeMatch?: ElementTypeMatch;
  Component?: React.FunctionComponent<EditorialRenderElementProps<T>>;
  renderElement?:
    | JSX.Element
    | ((
        props: EditorialRenderElementProps<T>,
        editor?: ReactEditor
      ) => JSX.Element | undefined);
};

export type InjectedLabels = { [key: string]: string | undefined };
export type Label = { key: string; defaultLabel: string };

export type InjectedDecorator = {
  decorator: (
    entry: NodeEntry<Node>,
    editor: ReactEditor
  ) => Range[] | undefined;
  priority?: "high" | "low";
};

export const Editorial = React.memo(function (props: {
  value: Descendant[];
  onChange: (value: Descendant[]) => void;
  children: React.ReactNode;
  readOnly?: boolean;
  id?: string;
}) {
  const { children, onChange, value, readOnly, id} = props;
  const chiefValue = useProvideChiefContext({ readOnly, id });
  const { ErrorBoundary, didCatch, error } = useErrorBoundary();
  if (didCatch) {
    console.log(error);
  }
  return (
    <ErrorBoundary>
      <Slate editor={chiefValue.editor} value={value} onChange={onChange}>
        <EditorialContext.Provider value={chiefValue}>
          <SavedSelectionProvider>
            <React.Fragment>{children}</React.Fragment>
          </SavedSelectionProvider>
        </EditorialContext.Provider>
      </Slate>
    </ErrorBoundary>
  );
});
