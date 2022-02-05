import Helmet from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";

import { useNote } from "../../hooks/useNote";
import { CodeboxThemes } from "../../styles/codeboxTheme";
import { useCreateNote } from "../../hooks/useCreateNote";
import NoteDrawer from "../../components/note/toolbar/NoteDrawer";
import NoteToolbar from "../../components/note/toolbar/NoteToolbar";
import NoteComment from "../../components/note/comment/NoteComment";
import NoteHeaderMobile from "../../components/note/NoteHeaderMobile";
import NoteHeaderDesktop from "../../components/note/NoteHeaderDesktop";
import NoteArchiveBanner from "../../components/note/NoteArchiveBanner";

export default function NoteDetailPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const editorCore = useRef(null);
  const [tags, setTags] = useState([]);
  const [noteTitle, setNoteTitle] = useState(null);
  const [isStarred, setIsStarred] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [noteInstance, setNoteInstance] = useState(null);
  const [isNoteLoaded, setIsNoteLoaded] = useState(false);
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
    commentNote,
    deleteNote,
  } = useNote();

  //FETCH CURRENT NOTE BY ID
  useEffect(() => {
    const fetchNoteByID = async () => {
      await getNoteByID(id);
    };

    fetchNoteByID();
  }, [id]);

  //LOAD OR CREATE NOTE INSTANCE
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

  //LISTEN TO CODEBOX COLOR CHANGE
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

  //LISTEN TO STAR STATE CHANGE
  useEffect(() => {
    const updateNoteStar = async () => {
      if (noteByID !== null) {
        if (noteByID.is_starred !== isStarred) {
          console.log("Fired");
          await starNote(noteByID, isStarred);
        }
      }
    };

    updateNoteStar();
  }, [noteByID, isStarred]);

  //LISTEN TO ARCHIVE STATE CHANGE
  useEffect(() => {
    const updateNoteArchive = async () => {
      if (noteByID !== null) {
        if (noteByID.is_archived !== isArchived) {
          await archiveNote(noteByID, isArchived);
        }
      }
    };

    updateNoteArchive();
  }, [noteByID, isArchived]);

  //LISTEN TO COMMENT STATE CHANGE
  useEffect(() => {
    const updateNoteComment = async () => {
      if (noteByID !== null) {
        if (noteByID.is_comment_enabled !== isCommentEnabled) {
          await commentNote(noteByID, isCommentEnabled);
        }
      }
    };

    updateNoteComment();
  }, [noteByID, isCommentEnabled]);

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

  const handleDelete = async () => {
    if (noteInstance && noteByID) {
      await deleteNote(noteByID._id).then(() => {
        console.log("is Success:", success);
        if (success) {
          navigate("/");
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
      {noteByID && (
        <NoteDrawer
          noteTitle={noteTitle ?? noteByID.title}
          isCreateNotePage={false}
          isOpen={isDrawerOpen}
          setIsOpen={setDrawerIsOpen}
          tags={tags}
          setTags={setTags}
          isCommentEnabled={isCommentEnabled}
          setIsCommentEnabled={setIsCommentEnabled}
          codeBoxThemes={CodeboxThemes}
          setCodeBoxColor={setCodeBoxColor}
          isStarred={isStarred}
          setIsStarred={setIsStarred}
          isArchived={isArchived}
          setIsArchived={setIsArchived}
          handleDelete={handleDelete}
        />
      )}
      <div className="min-h-screen relative flex bg-[rgb(247,247,247)]">
        {isArchived && <NoteArchiveBanner />}
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
        <div className={`w-full ${isArchived ? "pt-20" : "pt-8"} px-10`}>
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
        {noteByID && (
          <NoteToolbar
            tags={tags}
            noteTitle={noteTitle ?? noteByID.title}
            setTags={setTags}
            isStarred={isStarred}
            setIsStarred={setIsStarred}
            isArchived={isArchived}
            setIsArchived={setIsArchived}
            isToolbarOpen={isToolbarOpen}
            isCommentEnabled={isCommentEnabled}
            isCreateNotePage={false}
            setIsCommentEnabled={setIsCommentEnabled}
            setIsToolbarOpen={setIsToolbarOpen}
            codeBoxThemes={CodeboxThemes}
            setCodeBoxColor={setCodeBoxColor}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
