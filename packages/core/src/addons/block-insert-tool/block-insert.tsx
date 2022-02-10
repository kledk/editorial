import { useOnClickOutside } from "../../utils";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSlate, ReactEditor } from "slate-react";
import { Node, Editor, Transforms } from "slate";
import { Manager, Reference, Popper } from "react-popper";
import styled from "styled-components";
import { useHoveredNode } from "./use-hovered-node";

export const BlockInsertBtn = styled.button.attrs({ contentEditable: false })`
  @media print {
    display: none;
  }
  cursor: pointer;
  user-select: none;
  border: none;
  background: transparent;
  display: block;
  width: 25px;
  height: 25px;
  border: 1px solid #ccc;
  border-radius: ${25 / 2}px;
  &:before {
    content: "+";
    font-family: serif;
    font-weight: normal;
    font-size: 28px;
    color: #ccc;
    position: absolute;
    top: -10px;
    left: 4px;
    padding: 0;
    margin: 0;
  }
  &:hover {
    &:before {
      color: #ddd;
    }
  }
  &:active {
    &:before {
      color: #eee;
    }
  }
`;

export function BlockInsert(props: { children?: React.ReactNode }) {
  const editor = useSlate();
  const [coords, setCoords] = useState([-1000, -1000]);
  const [showMenu, setShowMenu] = useState(false);
  const toolboxRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(toolboxRef, () => {
    setShowMenu(false);
  });

  const hoveredNode = useHoveredNode(editor);

  const handleBlockInsert = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();
      if (!showMenu && hoveredNode) {
        Transforms.select(editor, hoveredNode.path);
      }
      setShowMenu(!showMenu);
      ReactEditor.focus(editor);
    },
    [showMenu, hoveredNode]
  );

  useEffect(() => {
    if (hoveredNode?.node && !showMenu) {
      try {
        const [rootNode] = Editor.node(editor, {
          anchor: Editor.start(editor, []),
          focus: Editor.end(editor, []),
        });
        if (rootNode && Node.isNode(rootNode)) {
          const firstDOMPoint = ReactEditor.toDOMNode(editor, rootNode);
          const activeDOMNode = ReactEditor.toDOMNode(editor, hoveredNode.node);
          const rect = activeDOMNode.getBoundingClientRect();
          const top = rect.top + window.pageYOffset + rect.height / 2 - 25 / 2;
          const left =
            firstDOMPoint.getBoundingClientRect().left +
            window.pageXOffset -
            30;
          setCoords([top, left]);
        }
      } catch (err) {
        /*ignore*/
      }
    }
  }, [hoveredNode]);

  if (
    !hoveredNode ||
    hoveredNode.path.length === 0 ||
    Node.string(hoveredNode.node).length !== 0 ||
    Editor.isVoid(editor, hoveredNode.node)
  ) {
    if (!showMenu) {
      return null;
    }
  }
  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div
            ref={ref}
            style={{ position: "absolute", top: coords[0], left: coords[1] }}
          >
            <BlockInsertBtn style={{color: 'red'}} onClick={handleBlockInsert} />
          </div>
        )}
      </Reference>
      {showMenu && (
        <Popper
          placement="bottom-end"
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [25, 10],
              },
            },
          ]}
        >
          {({ ref, style, placement, arrowProps }) => (
            <div
              ref={ref}
              style={{ ...style, zIndex: 20 }}
              data-placement={placement}
              onMouseDown={(e) => {
                if (!e.isDefaultPrevented()) {
                  e.preventDefault();
                  setShowMenu(false);
                  ReactEditor.focus(editor);
                  editor.selection &&
                    Transforms.select(editor, editor.selection.focus);
                }
              }}
            >
              <div ref={toolboxRef}>{props.children}</div>
              <div ref={arrowProps.ref} style={arrowProps.style} />
            </div>
          )}
        </Popper>
      )}
    </Manager>
  );
}
