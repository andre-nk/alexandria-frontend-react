export default function NoteHeaderMobile({
  title,
  noteTitle,
  setNoteTitle,
  handleSave,
}) {
  return (
    <div className="flex lg:hidden relative w-full justify-center items-center">
      <div className="w-full flex justify-between items-center">
        <button
          onClick={handleSave}
          className="px-5 py-[0.5rem] flex justify-center items-center rounded-md bg-primary-blue hover:bg-active-blue duration-200"
        >
          <p className="text-white">Save</p>
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
