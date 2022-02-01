import { IoAdd } from "react-icons/io5";

export default function NoteTagsEditor({
    mockTags
}) {
  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-medium">Tags 🏷</h2>
        <div className="p-1 rounded-md bg-slate-100 hover:bg-primary-blue hover:text-white duration-200 cursor-pointer text-sm">
          <IoAdd />
        </div>
      </div>
      <div className="w-full flex flex-wrap">
        {mockTags.map((item) => {
          return (
            <div className="py-1 mt-2 mr-2 px-2 rounded-md bg-slate-100 hover:bg-primary-blue hover:text-white duration-200 cursor-pointer text-sm">
              <p>{item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
