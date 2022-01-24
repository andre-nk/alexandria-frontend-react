import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  IoAdd,
  IoStarOutline,
  IoShareOutline,
  IoArchiveOutline,
  IoTrashBinOutline,
  IoChevronForwardOutline,
  IoChatboxEllipsesOutline,
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";

import { useCreateNote } from "../../hooks/useCreateNote";
import NoteToolbarButton from "../../components/note/NoteToolbarButton";

export default function NewNotePage() {
  const params = useParams();
  const navigate = useNavigate();
  const editorCore = useRef(null);
  const { title } = params;
  const { createNoteInstance } = useCreateNote();
  const [noteTitle, setNoteTitle] = useState(null);
  const [noteInstance, setNoteInstance] = useState(null);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const [isCommentEnabled, setIsCommentEnabled] = useState(true);

  const tags = ["react", "web", "trick", "javascript", "project", "dev"];

  useEffect(() => {
    const createNote = () => {
      if (noteInstance === null) {
        const editor = createNoteInstance();
        setNoteInstance(editor);
      }
    };

    createNote();
  }, [createNoteInstance, noteInstance]);

  const handleSave = () => {
    if (noteInstance) {
      noteInstance.saver.save().then((savedData) => {
        console.log(savedData);
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-[rgb(247,247,247)]">
      <div className="w-full pt-8 px-10">
        <div className="relative flex w-full justify-center items-center">
          {isToolbarOpen === false && (
            <input
              value={noteTitle === null ? title : noteTitle}
              placeholder="Untitled note"
              onChange={(e) => {
                setNoteTitle(e.currentTarget.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log(noteTitle);
                }
              }}
              className="absolute w-auto max-w-[100rem] bg-transparent outline-none text-center text-md capitalize font-medium text-major-text"
            />
          )}
          <div className="w-full flex justify-between items-center">
            <button
              onClick={() => {
                navigate("/");
              }}
              className="px-5 py-[0.5rem] cursor-pointer flex justify-center items-center rounded-md bg-primary-white hover:bg-gray-100 duration-200 border-2 border-primary-border"
            >
              Back
            </button>
            {isToolbarOpen && (
              <input
                value={noteTitle === null ? title : noteTitle}
                onChange={(e) => {
                  setNoteTitle(e.currentTarget.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    console.log(noteTitle);
                  }
                }}
                className="bg-transparent outline-none text-right text-md capitalize font-medium text-major-text"
              />
            )}
            {isToolbarOpen === false && (
              <button
                onClick={() => {
                  setIsToolbarOpen(true);
                }}
                className="px-4 py-[0.5rem] flex justify-center items-center rounded-md bg-primary-white hover:bg-gray-100 duration-200 border-2 border-primary-border"
              >
                <div className="flex space-x-3 items-center">
                  <IoChevronBackCircleOutline size={18} />
                  <p>Show toolbar</p>
                </div>
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-center py-10">
          <div
            id="editorjs"
            ref={editorCore}
            className={`${
              isToolbarOpen ? "w-full lg:w-9/12" : "lg:w-7/12"
            } self-center duration-500 w-full px-8 py-10 h-full bg-primary-white rounded-sm drop-shadow-xl`}
          ></div>
        </div>
      </div>
      <div
        className={`${isToolbarOpen ? "w-[22.5%] p-8" : "w-[0px] p-0"} 
        duration-500 min-h-full bg-primary-white drop-shadow-xl`}
      >
        <div
          className={`${
            isToolbarOpen === false ? "hidden" : "block"
          } duration-500 flex flex-col space-y-7`}
        >
          <button
            onClick={() => {
              setIsToolbarOpen(false);
            }}
            className="px-4 py-[0.5rem] w-full flex justify-center space-x-3 items-center rounded-md bg-primary-white hover:bg-gray-100 duration-200 border-2 border-primary-border"
          >
            <IoChevronForwardCircleOutline size={18} />
            <p>Hide toolbar</p>
          </button>
          <div className="flex flex-col space-y-1">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-lg font-medium">Tags</h2>
              <div className="p-1 rounded-md bg-slate-100 hover:bg-primary-blue hover:text-white duration-200 cursor-pointer text-sm">
                <IoAdd />
              </div>
            </div>
            <div className="w-full flex flex-wrap">
              {tags.map((item) => {
                return (
                  <div className="py-1 mt-2 mr-2 px-2 rounded-md bg-slate-100 hover:bg-primary-blue hover:text-white duration-200 cursor-pointer text-sm">
                    <p>{item}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <span className="h-[1px] w-full bg-primary-border"></span>
          <div className="flex flex-col w-full space-y-3.5">
            <button className="w-full p-3 flex flex-col space-y-3 rounded-md hover:bg-gray-100 duration-200 border-2 border-primary-border">
              <img alt="logo" src="/vscode.svg" width={24} height={24} />
              <div className="w-full flex items-center justify-between">
                <p className="text-sm">Import to VSCode</p>
                <IoChevronForwardOutline size={16} />
              </div>
            </button>
            <NoteToolbarButton
              buttonIcon={<IoShareOutline size={18} />}
              buttonTitle={"Share note"}
              onClick={() => {}}
            />
            <NoteToolbarButton
              buttonIcon={<IoStarOutline size={18} />}
              buttonTitle={"Star note"}
              onClick={() => {}}
            />
            <NoteToolbarButton
              buttonIcon={<IoArchiveOutline size={18} />}
              buttonTitle={"Archive note"}
              onClick={() => {}}
            />
            <NoteToolbarButton
              buttonIcon={
                <IoTrashBinOutline size={18} className="text-primary-red" />
              }
              buttonTitle={"Delete note"}
              onClick={() => {}}
            />
          </div>
          <span className="h-[1px] w-full bg-primary-border"></span>
          <div className="flex flex-col w-full space-y-3.5">
            <div className="w-full p-3 flex justify-between items-center rounded-md hover:bg-gray-100 duration-200 border-2 border-primary-border">
              <div className="flex space-x-3 items-center">
                <IoChatboxEllipsesOutline size={16} />
                <p className="text-sm">Comment</p>
              </div>
              <label class="flex justify-between items-center text-xl">
                <input
                  type="checkbox"
                  class="appearance-none peer"
                  value={isCommentEnabled}
                  onChange={() => {
                    setIsCommentEnabled(!isCommentEnabled);
                  }}
                />
                <span class="w-8 h-3.5 flex items-center flex-shrink-0 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-primary-blue after:w-4 after:h-4 after:bg-primary-white after:border after:border-primary-border after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4"></span>
              </label>
            </div>
            <NoteToolbarButton
              buttonIcon={<IoChatboxEllipsesOutline size={16} />}
              buttonTitle={"See comment"}
              onClick={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
