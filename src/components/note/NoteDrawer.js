import {
  IoAdd,
  IoStarOutline,
  IoShareOutline,
  IoArchiveOutline,
  IoTrashBinOutline,
  IoChevronForwardOutline,
  IoChatboxEllipsesOutline,
} from "react-icons/io5";

import NoteToolbarButton from "./NoteToolbarButton";

export default function NoteDrawer({
  isOpen,
  setIsOpen,
  isCommentEnabled,
  setIsCommentEnabled,
}) {
  const tags = ["react", "web", "trick", "javascript", "project", "dev"];

  return (
    <nav
      className={`fixed z-50 top-0 ${
        isOpen ? "right-0" : "-right-full"
      } w-full flex duration-300 lg:hidden`}
    >
      <div
        className={`w-3/12 md:w-5/12 bg-transparent`}
        onClick={() => {
          setIsOpen(false);
        }}
      ></div>
      <div className="w-9/12 md:w-7/12 p-8 bg-white transition-shadow shadow-zinc-700 drop-shadow-2xl h-screen">
        <div className={`flex flex-col space-y-7`}>
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
            <button
              disabled
              className="w-full p-3 flex flex-col space-y-3 rounded-md disabled:opacity-40 duration-200 border-2 border-primary-border"
            >
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
              <label className="flex justify-between items-center text-xl">
                <input
                  type="checkbox"
                  className="appearance-none peer"
                  value={isCommentEnabled}
                  onChange={() => {
                    setIsCommentEnabled(!isCommentEnabled);
                  }}
                />
                <span className="w-8 h-3.5 flex items-center flex-shrink-0 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-primary-blue after:w-4 after:h-4 after:bg-primary-white after:border after:border-primary-border after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4"></span>
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
    </nav>
  );
}
