import { useNavigate } from "react-router-dom";

export default function NoteHeaderMobile({
  title,
  noteTitle,
  setNoteTitle
}) {
  const navigate = useNavigate();

  return (
    <div className="flex lg:hidden relative w-full justify-center items-center">
      <div className="w-full flex justify-between items-center">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="px-5 py-[0.5rem] cursor-pointer flex justify-center items-center rounded-md bg-primary-white hover:bg-gray-100 duration-200 border-2 border-primary-border"
        >
          Back
        </button>
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
      </div>
    </div>
  );
}
