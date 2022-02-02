import { useNavigate } from "react-router-dom";

export default function NoteHeaderDesktop({
  title,
  noteTitle,
  setNoteTitle,
  handleSave,
}) {
  const navigate = useNavigate();

  return (
    <div className="hidden lg:flex relative w-full justify-center items-center">
      <input
        value={noteTitle === null ? title : noteTitle}
        placeholder="Untitled note"
        onChange={(e) => {
          setNoteTitle(e.currentTarget.value);
        }}
        className="absolute w-[50vw] bg-transparent outline-none text-center text-lg capitalize font-medium text-major-text"
      />
      <div className="w-full flex justify-between items-center">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="px-5 py-[0.5rem] cursor-pointer flex justify-center items-center rounded-md bg-primary-white hover:bg-gray-100 duration-200 border-2 border-primary-border"
        >
          Back
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-[0.5rem] flex justify-center items-center rounded-md bg-primary-blue hover:bg-active-blue duration-200"
        >
          <p className="text-white">Save</p>
        </button>
      </div>
    </div>
  );
}
