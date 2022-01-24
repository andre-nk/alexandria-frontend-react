import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";

import { useCreateNote } from "../../hooks/useCreateNote";

export default function NewNotePage() {
  const params = useParams();
  const navigate = useNavigate();
  const editorCore = useRef(null);
  const { title } = params;
  const { createNoteInstance } = useCreateNote();
  const [noteTitle, setNoteTitle] = useState(null);
  const [noteInstance, setNoteInstance] = useState(null);
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);

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
      <div className="w-full pt-8 pl-10 pr-12">
        <div className="relative flex w-full justify-center items-center">
          {isToolbarOpen === false && (
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
              className="absolute w-full bg-transparent outline-none text-center text-md capitalize font-medium text-major-text"
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
            } self-center duration-500 w-full px-8 py-10 h-auto bg-primary-white rounded-sm drop-shadow-xl`}
          ></div>
        </div>
      </div>
      <div
        className={`${isToolbarOpen ? "w-4/12 lg:w-3/12 p-8" : "w-[0px] p-0"} 
        duration-500 min-h-full bg-primary-white drop-shadow-xl`}
      >
        <div className={`${isToolbarOpen === false ? "hidden" : "block"} duration-500`}>
          <button
            onClick={() => {
              setIsToolbarOpen(false);
            }}
            className="px-4 py-[0.5rem] w-full flex justify-center items-center rounded-md bg-primary-white hover:bg-gray-100 duration-200 border-2 border-primary-border"
          >
            <div className="flex space-x-3 items-center">
              <IoChevronForwardCircleOutline size={18} />
              <p>Hide toolbar</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
