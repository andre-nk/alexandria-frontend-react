import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CustomNoteEditor from "../../components/note/CustomNoteEditor";

export default function NewNotePage() {
  const params = useParams();
  const [noteTitle, setNoteTitle] = useState("");

  useEffect(() => {
    const { title } = params;
    setNoteTitle(title);

    // if (typeof window !== "undefined" && CustomEditor === null) {

    // }
  }, [params]);

  return (
    <div className="py-8 pr-8 pl-10 min-h-screen flex bg-[rgb(247,247,247)]">
      <div className="w-full">
        <div className="relative flex w-full justify-center items-center">
          <input
            value={noteTitle}
            onChange={(e) => {
              setNoteTitle(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log(noteTitle);
              }
            }}
            className="absolute bg-transparent outline-none text-center text-md capitalize font-medium text-major-text"
          />
          <div className="w-full flex justify-between items-center">
            <button className="px-5 py-[0.4rem] flex justify-center items-center rounded-md bg-primary-white hover:bg-gray-100 duration-200 border-2 border-primary-border">
              Back
            </button>
            <button className="px-5 py-[0.4rem] flex justify-center items-center rounded-md bg-primary-white hover:bg-gray-100 duration-200 border-2 border-primary-border">
              Show toolbar
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center py-10">
          <div
            id="editorjs"
            className="w-full self-center lg:w-7/12 px-8 py-10 h-auto bg-primary-white rounded-sm drop-shadow-xl"
          >
            <CustomNoteEditor />
          </div>
        </div>
      </div>
      {/* <div className="w-1/4">

      </div> */}
    </div>
  );
}
