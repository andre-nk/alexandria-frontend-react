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
    success,
    noteByID,
    getNoteByID,
    starNote,
    archiveNote,
    updateNote,
    commentNote,
    deleteNote,
    tagsNote,
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

  const handleStar = async (value) => {
    if (noteByID !== null) {
      await starNote(noteByID, value);
      setIsStarred(value);
    }
  };

  const handleArchive = async (value) => {
    if (noteByID !== null) {
      await archiveNote(noteByID, value);
      setIsArchived(value);
    }
  };

  const handleComment = async (value) => {
    if (noteByID !== null) {
      await commentNote(noteByID, value);
      setIsCommentEnabled(value);
    }
  };

  const handleTags = async (value) => {
    if (noteByID.tags === undefined && tags === undefined) {
      noteByID.tags = [];
      setTags([]);
    }

    if (noteByID !== null && tags !== undefined) {
      setTags(value);
      await tagsNote(noteByID, value);
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
          setTags={handleTags}
          isCommentEnabled={isCommentEnabled}
          setIsCommentEnabled={handleComment}
          codeBoxThemes={CodeboxThemes}
          setCodeBoxColor={setCodeBoxColor}
          isStarred={isStarred}
          setIsStarred={handleStar}
          isArchived={isArchived}
          setIsArchived={handleArchive}
          handleDelete={handleDelete}
          setDrawerIsOpen={setDrawerIsOpen}
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
            noteTitle={noteTitle ?? noteByID.title}
            isCreateNotePage={false}
            tags={tags}
            setTags={handleTags}
            isStarred={isStarred}
            setIsStarred={handleStar}
            isArchived={isArchived}
            setIsArchived={handleArchive}
            isToolbarOpen={isToolbarOpen}
            isCommentEnabled={isCommentEnabled}
            setIsCommentEnabled={handleComment}
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
