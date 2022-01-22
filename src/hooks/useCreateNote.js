import { useEffect, useState } from "react";
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
  const [editor, setEditor] = useState(null);
  const [saver, setSaver] = useState(null);

  useEffect(() => {
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
            themeURL:
              "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.1/build/styles/dracula.min.css", // Optional
            themeName: "atom-one-dark", // Optional
            useDefaultTheme: "light", // Optional. This also determines the background color of the language select drop-down
          },
        },
      },
    });

    console.log(editor);

    setEditor(editor);
    setSaver(editor.saver)
  }, []);

  return { editor, saver };
};
