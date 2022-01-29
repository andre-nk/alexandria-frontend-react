import { useNavigate } from "react-router-dom";
import { IoChevronBackCircleOutline } from "react-icons/io5";

export default function NoteHeaderDesktop({
  title,
  noteTitle,
  setNoteTitle,
  isToolbarOpen,
  setIsToolbarOpen,
}) {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:flex relative w-full justify-center items-center">
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
          className="absolute w-[50vw] bg-transparent outline-none text-center text-lg capitalize font-medium text-major-text"
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
            className="bg-transparent outline-none text-right text-lg capitalize font-medium text-major-text"
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
  );
}
