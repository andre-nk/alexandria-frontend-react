import Quote from "@editorjs/quote";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import ImageTool from "@editorjs/image";
import NestedList from "@editorjs/nested-list";
import Checklist from "@editorjs/checklist";
import LinkTool from "@editorjs/link";
import CodeBox from "@bomdi/codebox";
import CodexEditor from "@editorjs/editorjs";

export const useCreateNote = () => {
  const createNoteInstance = (currentData, codeBoxTheme) => {
    const Paragraph = require("editorjs-paragraph-with-alignment");
    const Header = require("@editorjs/header");

    let editor = new CodexEditor({
      tools: {
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        header: {
          class: Header,
          shortcut: "CMD+SHIFT+H",
        },

        quote: Quote,
        inlineCode: InlineCode,
        marker: Marker,
        imageTool: ImageTool,
        list: {
          class: NestedList,
          inlineToolbar: true,
        },
        checkList: Checklist,
        linkTool: LinkTool,
        codeBox: {
          class: CodeBox,
          config: {
            themeURL: codeBoxTheme.url, // Optional
            themeName: codeBoxTheme.name, // Optional
            useDefaultTheme: "dark", // Optional. This also determines the background color of the language select drop-down
          },
        },
      },
      data: currentData ?? {},
    });

    return editor;
  };

  return { createNoteInstance };
};
