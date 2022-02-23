import Helmet from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";

import {
  useNoteByID,
  useUpdateNote,
  useDeleteNote,
  useStarNote,
  useArchiveNote,
  useCommentNote,
  useTagsNote,
} from "../../hooks/useNote";
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
  const { noteByIDQuery } = useNoteByID(id);
  const { updateNoteMutation } = useUpdateNote();
  const { deleteNoteMutation } = useDeleteNote();
  const { starNoteMutation } = useStarNote();
  const { archiveNoteMutation } = useArchiveNote();
  const { commentNoteMutation } = useCommentNote();
  const { tagsNoteMutation } = useTagsNote();

  //LOAD OR CREATE NOTE INSTANCE
  useEffect(() => {
    const createNote = async () => {
      if (noteByIDQuery.data) {
        if (noteInstance !== null && isNoteLoaded === false) {
          setTags(noteByIDQuery.data.tags);
          setIsStarred(noteByIDQuery.data.is_starred);
          setIsArchived(noteByIDQuery.data.is_archived);
          setIsCommentEnabled(noteByIDQuery.data.is_comment_enabled);

          noteInstance.isReady.then(async () => {
            await noteInstance.destroy();

            let editorContentJSON = JSON.parse(noteByIDQuery.data.content);
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
  }, [
    createNoteInstance,
    codeBoxColor,
    isNoteLoaded,
    noteByIDQuery.data,
    noteInstance,
  ]);

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

  const handleSave = () => {
    if (noteInstance && noteByIDQuery.data) {
      noteInstance.saver.save().then(async (savedData) => {
        let dataString = JSON.stringify(savedData);
        let defaultTags = [];
        let noteInstance;

        if (noteTitle) {
          noteInstance = {
            title: noteTitle,
            tags: noteByIDQuery.data.tags ?? defaultTags,
            content: dataString,
            is_starred: noteByIDQuery.data.is_starred,
            is_comment_enabled: noteByIDQuery.data.is_comment_enabled,
            is_archived: noteByIDQuery.data.is_archived,
            collaborators: noteByIDQuery.data.collaborators,
          };

          updateNoteMutation.mutate({
            updatedNote: noteInstance,
            noteID: noteByIDQuery.data._id,
          });
        } else {
          noteInstance = {
            title: noteByIDQuery.data.title,
            tags: noteByIDQuery.data.tags ?? defaultTags,
            content: dataString,
            is_starred: noteByIDQuery.data.is_starred,
            is_comment_enabled: noteByIDQuery.data.is_comment_enabled,
            is_archived: noteByIDQuery.data.is_archived,
            collaborators: noteByIDQuery.data.collaborators,
          };

          updateNoteMutation.mutate({
            updatedNote: noteInstance,
            noteID: noteByIDQuery.data._id,
          });
        }
      });
    }
  };

  const handleDelete = () => {
    if (noteInstance && noteByIDQuery.data) {
      deleteNoteMutation.mutate({
        noteID: noteByIDQuery.data._id,
      });

      navigate("/");
    }
  };

  const handleStar = (value) => {
    if (noteByIDQuery.data !== null) {
      starNoteMutation.mutate({
        oldNote: noteByIDQuery.data,
        isStarred: value,
      });

      setIsStarred(value);
    }
  };

  const handleArchive = (value) => {
    if (noteByIDQuery.data !== null) {
      archiveNoteMutation.mutate({
        oldNote: noteByIDQuery.data,
        isArchived: value,
      });

      setIsArchived(value);
    }
  };

  const handleComment = (value) => {
    if (noteByIDQuery.data !== null) {
      commentNoteMutation.mutate({
        oldNote: noteByIDQuery.data,
        isCommentEnabled: value,
      });

      setIsCommentEnabled(value);
    }
  };

  const handleTags = (value) => {
    if (noteByIDQuery.data.tags === undefined && tags === undefined) {
      noteByIDQuery.data.tags = [];
      setTags([]);
    }

    if (noteByIDQuery.data !== null && tags !== undefined) {
      tagsNoteMutation.mutate({
        oldNote: noteByIDQuery.data,
        tags: value,
      });
      setTags(value);
    }
  };

  return (
    <div>
      <Helmet>
        {noteByIDQuery.data ? (
          <title>{noteTitle ?? noteByIDQuery.data.title} - Alexandria</title>
        ) : (
          <title>{noteTitle ?? "Untitled note"} - Alexandria</title>
        )}
      </Helmet>
      {noteByIDQuery.data && (
        <NoteDrawer
          noteTitle={noteTitle ?? noteByIDQuery.data.title}
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
          {noteByIDQuery.data && (
            <div>
              <NoteHeaderDesktop
                title={noteByIDQuery.data.title}
                noteTitle={noteTitle}
                handleSave={handleSave}
                setNoteTitle={setNoteTitle}
              />
              <NoteHeaderMobile
                title={noteByIDQuery.data.title}
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
          {noteByIDQuery.data && (
            <NoteComment
              noteID={noteByIDQuery.data._id}
              isToolbarOpen={isToolbarOpen}
              isCommentEnabled={isCommentEnabled}
            />
          )}
        </div>
        {noteByIDQuery.data && (
          <NoteToolbar
            noteTitle={noteTitle ?? noteByIDQuery.data.title}
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
