import { useRef, useState } from "react";
import { IoAdd, IoCloseOutline } from "react-icons/io5";

export default function NoteTagsEditor({ tags, setTags }) {
  const newTagRef = useRef("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [isInputVisible, setIsInputVisible] = useState(false);

  const addLocalTag = () => {
    setIsInputVisible(true);
  };

  const handleSave = () => {
    setTags([...tags, newTagRef.current.value]);
    newTagRef.current.value = "";
  };

  const handleDelete = () => {
    setTags(tags.filter((tag) => tag !== tags[selectedTag]));
  };

  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-lg font-medium">Tags 🏷</h2>
        <div className="flex space-x-2 items-center justify-end">
          {selectedTag !== null && (
            <button
              onClick={() => {
                handleDelete();
              }}
              className={`p-1 rounded-md bg-primary-red bg-opacity-20 hover:bg-primary-blue hover:text-white duration-200 cursor-pointer text-sm`}
            >
              <IoCloseOutline />
            </button>
          )}
          <button
            onClick={() => {
              addLocalTag();
            }}
            className={`${
              isInputVisible && "bg-opacity-50"
            } p-1 rounded-md bg-slate-100 hover:bg-primary-blue hover:text-white duration-200 cursor-pointer text-sm`}
          >
            <IoAdd />
          </button>
        </div>
      </div>
      <div className="w-full flex flex-wrap">
        {isInputVisible && (
          <input
            autoFocus
            type="text"
            ref={newTagRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
            className="w-full py-2 my-2 mr-2 px-3 rounded-md outline-none bg-slate-100 active:border-primary-blue duration-200 cursor-pointer text-sm"
          ></input>
        )}
        {tags.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                setSelectedTag(index);
              }}
              className={`${
                selectedTag === index
                  ? "bg-primary-blue text-white"
                  : "bg-slate-100"
              } py-1 mt-2 mr-2 px-2 rounded-md hover:bg-primary-blue hover:text-white duration-200 cursor-pointer text-sm`}
            >
              <p>{item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
