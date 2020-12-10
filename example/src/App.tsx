import React, { useState } from "react";
import {
  Editor,
  Chief,
  // Addons
  HeadingsAddon,
  BoldAddon,
  ItalicAddon,
  UnderlineAddon,
  StrikethroughAddon,
  ImageAddon,
  ResetToParagraphAddon,
  PreventNewlineAddon,
  ListsAddon,
  BlockTabAddon,
  ParagraphAddon,
  LabelsAddon,
  // Block toolbar addon
  BlockInsert,
  BlockInsertControls,
  // Custom addon creation
  AddonProps,
  useRenderElement,
  InputWrapper,
  usePlugin,
  // Presentation
  ChiefPresentation,
  BoldControl,
  HeadingControl,
  ItalicControl,
  StrikethroughControl,
  UnderlineControl,
  HoverTools,
  ImageControl,
  ListControl,
  TextColorAddon,
  TextColorControl,
  LinkAddon,
  LinkControl,
  ParagraphControl
} from "react-chief-editor";
import { Node, Element } from "slate";
import styled, { css } from "styled-components";
import MdiIcon from "@mdi/react";
import {
  mdiFormatParagraph,
  mdiFormatHeader1,
  mdiFormatHeader2,
  mdiFormatHeader3,
  mdiFormatHeader4,
  mdiFormatHeader5,
  mdiFormatHeader6,
  mdiFormatListNumbered,
  mdiFormatListBulleted,
  mdiFormatBold,
  mdiFormatItalic,
  mdiFormatStrikethrough,
  mdiFormatUnderline,
  mdiImage,
  mdiLink,
  mdiFormatColorText
} from "@mdi/js";

function Icon(props: React.ComponentProps<typeof MdiIcon>) {
  return <MdiIcon color="#2b2b2b" size={0.7} {...props}></MdiIcon>;
}

const editorLabels = {
  "marks.bold": "Fed",
  "marks.italic": "Kursiv",
  "marks.strikethrough": "Gennemstreg",
  "marks.underline": "Understreg",
  "marks.textcolor": "Tekstfarve",
  "elements.image": "Billede",
  "elements.link": "Link",
  "elements.ordered-list": "Nummereret list",
  "elements.unordered-list": "Punkt list",
  "elements.link.placeholder": "Indsæt eller skriv link",
  "elements.link.btn.link": "Tilføj",
  "elements.link.btn.unlink": "Fjern",
  "elements.paragraph.hint": "Klik for at redigere",
  "elements.paragraph.placeholder": "Tekst",
  "elements.heading.h1.placeholder": "Overskrift 1",
  "elements.heading.h2.placeholder": "Overskrift 2",
  "elements.heading.h3.placeholder": "Overskrift 3",
  "elements.heading.h4.placeholder": "Overskrift 4",
  "elements.heading.h5.placeholder": "Overskrift 5",
  "elements.heading.h6.placeholder": "Overskrift 6"
};

function ExampleCustomAddon(props: AddonProps) {
  usePlugin({
    isVoid: isVoid => element =>
      Element.isElement(element) && element.type === "custom_void_element"
        ? true
        : isVoid(element)
  });

  useRenderElement({
    typeMatch: /custom_void_element/,
    renderElement: (props, editor) => {
      return (
        <div {...props.attributes}>
          <InputWrapper>
            <input type="text" />
          </InputWrapper>
          {props.children}
        </div>
      );
    }
  });

  return null;
}

const ContentStyle = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  font-size: 18px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: white;
  }
  a {
    color: rgb(234 66 205);
  }
`;

function App() {
  const [value, setValue] = useState<Node[]>([
    {
      type: "h1",
      children: [{ text: "1914-oversættelsen af Rackham" }]
    },
    {
      type: "paragraph",
      children: [
        {
          text:
            "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness."
        }
      ]
    },
    {
      type: "paragraph",
      children: [
        {
          color: "#00b159",
          text:
            "No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
        }
      ]
    },
    {
      type: "h1",
      children: [{ text: "Righteous" }]
    },
    {
      type: "image",
      width: 700,
      height: 420,
      align: "left",
      url:
        "https://everything-pr.com/wp-content/uploads/2010/08/Funny-Meme.jpg",
      children: [
        {
          text: "asd"
        }
      ]
    },
    {
      type: "h1",
      children: [{ text: "Extremely" }]
    },
    {
      type: "h2",
      children: [{ text: "Ordered" }]
    },
    {
      type: "ordered-list",
      children: [
        { type: "list-item", children: [{ text: "Molestias" }] },
        { type: "list-item", children: [{ text: "Minus" }] }
      ]
    },
    {
      type: "h2",
      children: [{ text: "Unordered" }]
    },
    {
      type: "unordered-list",
      children: [
        { type: "list-item", children: [{ text: "Through " }] },
        { type: "list-item", children: [{ text: "Tough Ø Å" }] }
      ]
    }
  ]);

  console.log(value);

  return (
    <div style={{ padding: "1em" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <ContentStyle>
            <Chief
              value={value}
              onChange={value => setValue(value)}
              theme={{
                overrides: {
                  // StyledToolbarBtn: css`
                  //   background-color: transparent;
                  //   color: white;
                  //   padding: 10px;
                  //   &:hover {
                  //     background-color: ${props =>
                  //       // @ts-ignore
                  //       props.disabled ? undefined : "#2d2d2d"};
                  //   }
                  // `,
                  // StyledToolBox: css`
                  //   border-radius: 20px;
                  //   background-color: black;
                  // `,
                  // ui: css`
                  //   /* font-family: monospace; */
                  // `
                }
              }}
            >
              <LabelsAddon labels={editorLabels} />
              <ParagraphAddon />
              <BoldAddon />
              <ItalicAddon />
              <UnderlineAddon />
              <StrikethroughAddon />
              <HeadingsAddon />
              <ImageAddon />
              <ResetToParagraphAddon />
              <PreventNewlineAddon />
              <PreventNewlineAddon />
              <LinkAddon />
              <ListsAddon />
              <BlockTabAddon />
              <TextColorAddon />
              <div
                style={{
                  marginLeft: 20
                }}
              >
                <BlockInsert>
                  <ParagraphControl>
                    <Icon path={mdiFormatParagraph} />
                  </ParagraphControl>
                  <HeadingControl heading="h1">
                    <Icon path={mdiFormatHeader1} />
                  </HeadingControl>
                  <HeadingControl heading="h2">
                    <Icon path={mdiFormatHeader2} />
                  </HeadingControl>
                  <HeadingControl heading="h3">
                    <Icon path={mdiFormatHeader3} />
                  </HeadingControl>
                  <HeadingControl heading="h4">
                    <Icon path={mdiFormatHeader4} />
                  </HeadingControl>
                  <HeadingControl heading="h5">
                    <Icon path={mdiFormatHeader5} />
                  </HeadingControl>
                  <HeadingControl heading="h6">
                    <Icon path={mdiFormatHeader6} />
                  </HeadingControl>
                  <ListControl type="ordered-list">
                    <Icon path={mdiFormatListNumbered} />
                  </ListControl>
                  <ListControl type="unordered-list">
                    <Icon path={mdiFormatListBulleted} />
                  </ListControl>
                  <ImageControl>
                    <Icon path={mdiImage} />
                  </ImageControl>
                </BlockInsert>
                <HoverTools>
                  <BoldControl>
                    <Icon path={mdiFormatBold} />
                  </BoldControl>
                  <ItalicControl>
                    <Icon path={mdiFormatItalic} />
                  </ItalicControl>
                  <StrikethroughControl>
                    <Icon path={mdiFormatStrikethrough} />
                  </StrikethroughControl>
                  <UnderlineControl>
                    <Icon path={mdiFormatUnderline} />
                  </UnderlineControl>
                  <HeadingControl heading="h1">
                    <Icon path={mdiFormatHeader1} />
                  </HeadingControl>
                  <HeadingControl heading="h2">
                    <Icon path={mdiFormatHeader2} />
                  </HeadingControl>
                  <HeadingControl heading="h3">
                    <Icon path={mdiFormatHeader3} />
                  </HeadingControl>
                  <HeadingControl heading="h4">
                    <Icon path={mdiFormatHeader4} />
                  </HeadingControl>
                  <HeadingControl heading="h5">
                    <Icon path={mdiFormatHeader5} />
                  </HeadingControl>
                  <HeadingControl heading="h6">
                    <Icon path={mdiFormatHeader6} />
                  </HeadingControl>
                  <LinkControl>
                    <Icon path={mdiLink} />
                  </LinkControl>
                  <TextColorControl
                    colors={[
                      "#d11141",
                      "#00b159",
                      "#00aedb",
                      "#f37735",
                      "#ffc425",
                      "#edc951",
                      "#eb6841",
                      "#cc2a36",
                      "#4f372d",
                      "#00a0b0"
                    ]}
                  >
                    <Icon path={mdiFormatColorText} />
                  </TextColorControl>
                </HoverTools>
                <Editor
                  spellCheck={false}
                  style={{ overflow: "auto", minHeight: 500 }}
                ></Editor>
              </div>
            </Chief>
          </ContentStyle>
        </div>
        {/* <div style={{ flex: 1 }}>
          <ContentStyle>
            <ChiefPresentation
              value={value}
              presenters={[
                ParagraphAddon.Presenter,
                BoldAddon.Presenter,
                ItalicAddon.Presenter,
                StrikethroughAddon.Presenter,
                UnderlineAddon.Presenter,
                HeadingsAddon.Presenter,
                LinkAddon.Presenter,
                ListsAddon.Presenter,
                ImageAddon.Presenter,
                TextColorAddon.Presenter
              ]}
            ></ChiefPresentation>
          </ContentStyle>
        </div> */}
      </div>
    </div>
  );
}

export default App;
