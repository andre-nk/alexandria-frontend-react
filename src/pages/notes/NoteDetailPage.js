import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";

import { useCreateNote } from "../../hooks/useCreateNote";
import NoteHeaderMobile from "../../components/note/NoteHeaderMobile";
import NoteHeaderDesktop from "../../components/note/NoteHeaderDesktop";
import NoteToolbar from "../../components/note/toolbar/NoteToolbar";
import NoteDrawer from "../../components/note/toolbar/NoteDrawer";
import NoteComment from "../../components/note/comment/NoteComment";
import { CodeboxThemes } from "../../styles/codeboxTheme";
import { useNote } from "../../hooks/useNote";

export default function NoteDetailPage() {
  const params = useParams();
  const { id } = params;
  const editorCore = useRef(null);
  const [tags, setTags] = useState([]);
  const [noteTitle, setNoteTitle] = useState(null);
  const [isStarred, setIsStarred] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [isNoteLoaded, setIsNoteLoaded] = useState(false);
  const [noteInstance, setNoteInstance] = useState(null);
  const [isDrawerOpen, setDrawerIsOpen] = useState(false);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [isCommentEnabled, setIsCommentEnabled] = useState(true);
  const [codeBoxColor, setCodeBoxColor] = useState(CodeboxThemes[0]);
  const [oldCodeBoxColor, setOldCodeBoxColor] = useState(CodeboxThemes[0]);

  const { createNoteInstance } = useCreateNote();
  const {
    error,
    success,
    noteByID,
    getNoteByID,
    starNote,
    archiveNote,
    updateNote,
  } = useNote();

  useEffect(() => {
    const fetchNoteByID = async () => {
      await getNoteByID(id);
    };

    fetchNoteByID();
  }, [id]);

  useEffect(() => {
    const createNote = async () => {
      if (noteByID) {
        if (noteInstance !== null && isNoteLoaded === false) {
          setTags(noteByID.tags);
          setIsStarred(noteByID.is_starred);
          setIsArchived(noteByID.is_archived);
          setIsCommentEnabled(noteByID.is_comment_enabled);

          noteInstance.isReady.then(async () => {
            await noteInstance.destroy();

            let editorContentJSON = JSON.parse(noteByID.content);
            const newEditor = createNoteInstance(editorContentJSON, "");
            setNoteInstance(newEditor);
            setIsNoteLoaded(true);
          });
        }
      } else if (noteInstance === null) {
        const editor = createNoteInstance("", codeBoxColor);
        setNoteInstance(editor);
      }
    };

    createNote();
  }, [createNoteInstance, codeBoxColor, isNoteLoaded, noteByID, noteInstance]);

  useEffect(() => {
    const changeCodeBoxColor = async () => {
      if (noteInstance !== null) {
        if (oldCodeBoxColor !== codeBoxColor) {
          console.log("Codebox Changed:", codeBoxColor);

          noteInstance.saver.save().then(async (savedData) => {
            await noteInstance.destroy();
            const newEditor = createNoteInstance(savedData, codeBoxColor);
            setOldCodeBoxColor(codeBoxColor);
            setNoteInstance(newEditor);
          });
        }
      }
    };

    changeCodeBoxColor();
  }, [createNoteInstance, noteInstance, codeBoxColor, oldCodeBoxColor]);

  useEffect(() => {
    const updateNoteStar = async () => {
      if (noteByID !== null) {
        if (noteByID.is_starred !== isStarred) {
          await starNote(noteByID, isStarred);
        }
      }
    };

    updateNoteStar();
  }, [starNote, noteByID, isStarred]);

  useEffect(() => {
    const updateNoteArchive = async () => {
      if (noteByID !== null) {
        if (noteByID.is_archived !== isArchived) {
          await archiveNote(noteByID, isArchived);
        }
      }
    };

    updateNoteArchive();
  }, [archiveNote, noteByID, isArchived]);

  const handleSave = async () => {
    if (noteInstance && noteByID) {
      noteInstance.saver.save().then(async (savedData) => {
        let dataString = JSON.stringify(savedData);
        let noteInstance;

        if (noteTitle) {
          noteInstance = {
            title: noteTitle,
            tags: noteByID.tags,
            content: dataString,
            is_starred: noteByID.is_starred,
            is_comment_enabled: noteByID.is_comment_enabled,
            is_archived: noteByID.is_archived,
            collaborators: noteByID.collaborators,
          };

          await updateNote(noteInstance, noteByID._id);
        } else {
          noteInstance = {
            title: noteByID.title,
            tags: noteByID.tags,
            content: dataString,
            is_starred: noteByID.is_starred,
            is_comment_enabled: noteByID.is_comment_enabled,
            is_archived: noteByID.is_archived,
            collaborators: noteByID.collaborators,
          };
          
          await updateNote(noteInstance, noteByID._id);
        }
      });
    }
  };

  return (
    <div>
      <Helmet>
        {noteByID ? (
          <title>{noteTitle ?? noteByID.title} - Alexandria</title>
        ) : (
          <title>{noteTitle ?? "Untitled note"} - Alexandria</title>
        )}
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
        {!isToolbarOpen && (
          <button
            onClick={() => {
              setIsToolbarOpen(true);
            }}
            className="flex p-3 bg-white justify-center items-center drop-shadow-md fixed z-40 bottom-10 right-10 rounded-lg border-2 border-primary-border"
          >
            <IoEllipsisVerticalSharp size={24} />
          </button>
        )}
        <div className="w-full pt-8 px-10">
          {noteByID && (
            <div>
              <NoteHeaderDesktop
                title={noteByID.title}
                noteTitle={noteTitle}
                handleSave={handleSave}
                setNoteTitle={setNoteTitle}
              />
              <NoteHeaderMobile
                title={noteByID.title}
                handleSave={handleSave}
                noteTitle={noteTitle}
                setNoteTitle={setNoteTitle}
              />
            </div>
          )}
          <div className="flex justify-center py-10 overflow-hidden">
            <div
              id="editorjs"
              ref={editorCore}
              className={`${
                isToolbarOpen ? "w-full lg:w-9/12" : "lg:w-7/12"
              } overflow-hidden self-center duration-500 w-full px-8 py-10 bg-primary-white rounded-sm drop-shadow-xl`}
            ></div>
          </div>
          <NoteComment
            isToolbarOpen={isToolbarOpen}
            isCommentEnabled={isCommentEnabled}
          />
        </div>
        <NoteToolbar
          tags={tags}
          setTags={setTags}
          isStarred={isStarred}
          setIsStarred={setIsStarred}
          isArchived={isArchived}
          setIsArchived={setIsArchived}
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
