import Header from "@editorjs/header";
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
    let editor = new CodexEditor({
      tools: {
        header: Header,
        quote: Quote,
        inlineCode: InlineCode,
        marker: Marker,
        imageTool: ImageTool,
        nestedList: NestedList,
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
