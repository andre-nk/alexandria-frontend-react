import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";

import { useCreateNote } from "../../hooks/useCreateNote";
import NoteHeaderMobile from "../../components/note/NoteHeaderMobile";
import NoteHeaderDesktop from "../../components/note/NoteHeaderDesktop";
import NoteToolbarDesktop from "../../components/note/NoteToolbarDesktop";
import NoteDrawer from "../../components/note/NoteDrawer";
import { CodeboxThemes } from "../../styles/codeboxTheme";
import NoteComment from "../../components/note/NoteComment";

export default function NewNotePage() {
  const params = useParams();
  const editorCore = useRef(null);
  const { title } = params;
  const { createNoteInstance } = useCreateNote();
  const [noteTitle, setNoteTitle] = useState(null);
  const [noteInstance, setNoteInstance] = useState(null);
  const [isDrawerOpen, setDrawerIsOpen] = useState(false);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [isCommentEnabled, setIsCommentEnabled] = useState(false);
  const [codeBoxColor, setCodeBoxColor] = useState(CodeboxThemes[0]);
  const [oldCodeBoxColor, setOldCodeBoxColor] = useState(CodeboxThemes[0]);

  useEffect(() => {
    const createNote = async () => {
      if (noteInstance === null) {
        const editor = createNoteInstance(codeBoxColor, "");
        setNoteInstance(editor);
      } else if (oldCodeBoxColor !== codeBoxColor) {
        console.log("UseEffect fired again!", codeBoxColor);
        noteInstance.saver.save().then(async (savedData) => {
          await noteInstance.destroy();
          const newEditor = createNoteInstance(
            savedData,
            codeBoxColor
          );
          setOldCodeBoxColor(codeBoxColor);
          setNoteInstance(newEditor);
        });
      }
    };

    createNote();
  }, [createNoteInstance, noteInstance, codeBoxColor, oldCodeBoxColor]);

  // const handleSave = () => {
  //   if (noteInstance) {
  //     noteInstance.saver.save().then((savedData) => {
  //       console.log(savedData);
  //     });
  //   }
  // };

  return (
    <div>
      <Helmet>
        <title>{noteTitle ?? "Untitled note"} - Alexandria</title>
      </Helmet>
      <NoteDrawer
        isOpen={isDrawerOpen}
        setIsOpen={setDrawerIsOpen}
        isCommentEnabled={isCommentEnabled}
        setIsCommentEnabled={setIsCommentEnabled}
      />
      <div className="min-h-screen relative flex bg-[rgb(247,247,247)]">
        <button
          onClick={() => {
            setDrawerIsOpen(true);
          }}
          className="flex p-3 bg-white justify-center items-center drop-shadow-md lg:hidden fixed z-40 bottom-10 right-10 rounded-lg border-2 border-primary-border"
        >
          <IoEllipsisVerticalSharp size={24} />
        </button>
        <div className="w-full pt-8 px-10">
          <NoteHeaderDesktop
            isToolbarOpen={isToolbarOpen}
            setIsToolbarOpen={setIsToolbarOpen}
            title={title}
            noteTitle={noteTitle}
            setNoteTitle={setNoteTitle}
          />
          <NoteHeaderMobile
            title={title}
            noteTitle={noteTitle}
            setNoteTitle={setNoteTitle}
          />
          <div className="flex justify-center py-10 overflow-hidden">
            <div
              id="editorjs"
              ref={editorCore}
              className={`${
                isToolbarOpen ? "w-full lg:w-9/12" : "lg:w-7/12"
              } overflow-hidden self-center duration-500 w-full px-8 py-10 bg-primary-white rounded-sm drop-shadow-xl`}
            ></div>
          </div>
          <NoteComment isToolbarOpen={isToolbarOpen} isCommentEnabled={isCommentEnabled} />
        </div>
        <NoteToolbarDesktop
          isToolbarOpen={isToolbarOpen}
          isCommentEnabled={isCommentEnabled}
          setIsCommentEnabled={setIsCommentEnabled}
          setIsToolbarOpen={setIsToolbarOpen}
          codeBoxThemes={CodeboxThemes}
          setCodeBoxColor={setCodeBoxColor}
        />
      </div>
    </div>
  );
}
