import {
  IoAdd,
  IoStarOutline,
  IoShareOutline,
  IoArchiveOutline,
  IoTrashBinOutline,
  IoChevronForwardOutline,
  IoChatboxEllipsesOutline,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";

import NoteToolbarButton from "./NoteToolbarButton";

export default function NoteToolbarDesktop({
  isToolbarOpen,
  setIsToolbarOpen,
  isCommentEnabled,
  setIsCommentEnabled,
  codeBoxThemes,
  setCodeBoxColor,
}) {
  const mockTags = ["react", "web", "trick", "javascript", "project", "dev"];

  return (
    <div
      className={`${isToolbarOpen ? "w-[22.5%] p-8" : "w-[0px] p-0"} 
        duration-500 min-h-full bg-primary-white drop-shadow-xl hidden lg:block`}
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
          <div className="pt-6 flex flex-col space-y-2">
            <label htmlFor="selectTheme" className="text-sm pl-1">
              Code snippet theme: 🎨
            </label>
            <select
              name="selectTheme"
              onChange={(e) => {
                setCodeBoxColor(codeBoxThemes[e.currentTarget.value]);
              }}
              className="form-select form-select-lg appearance-none w-full px-3 py-2.5 text-sm font-normal text-primary-black bg-white rounded-md border border-primary-border focus:border-primary-blue"
            >
              {codeBoxThemes.map((theme, index) => {
                return <option value={index}>{theme.name}</option>;
              })}
            </select>
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
  );
}
