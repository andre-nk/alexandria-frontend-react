import {
  IoStar,
  IoArchive,
  IoStarOutline,
  IoShareOutline,
  IoArchiveOutline,
  IoTrashBinOutline,
  IoChevronForwardOutline,
  IoChatboxEllipsesOutline,
} from "react-icons/io5";
import { Fragment } from "react";
import { Switch } from "@headlessui/react";
import { RWebShare } from "react-web-share";
import { useLocation } from "react-router-dom";

import NoteToolbarButton from "./NoteToolbarButton";
import NoteTagsEditor from "./NoteTagsEditor";

export default function NoteDrawer({
  tags,
  setTags,
  isStarred,
  setIsStarred,
  isArchived,
  setIsArchived,
  isOpen,
  setIsOpen,
  isCommentEnabled,
  setIsCommentEnabled,
  codeBoxThemes,
  setCodeBoxColor,
  isCreateNotePage,
  handleDelete,
  noteTitle
}) {

  const location = useLocation();
  const currentPathname = "localhost:3000" + location.pathname;

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
            <NoteTagsEditor tags={tags} setTags={setTags} />
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
                  return (
                    <option key={index} value={index}>
                      {theme.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <span className="h-[1px] w-full bg-primary-border"></span>
          <div className="flex flex-col w-full space-y-3.5">
            {!isCreateNotePage && !isArchived && (
              <button className="w-full p-3 flex flex-col space-y-3 rounded-md hover:bg-gray-100 duration-200 border-2 border-primary-border">
                <img alt="logo" src="/vscode.svg" width={24} height={24} />
                <div className="w-full flex items-center justify-between">
                  <p className="text-sm">Import to VSCode</p>
                  <IoChevronForwardOutline size={16} />
                </div>
              </button>
            )}
            {!isCreateNotePage && !isArchived && (
              <RWebShare
                data={{
                  text: "Alexandria is a dead-simple notetaking app for your programming-related notes, but way more than that.",
                  url: currentPathname,
                  title: noteTitle,
                }}
              >
                <NoteToolbarButton
                  buttonIcon={<IoShareOutline size={18} />}
                  buttonTitle={"Share note"}
                  onClick={() => {}}
                />
              </RWebShare>
            )}
            {!isArchived && (
              <NoteToolbarButton
                buttonIcon={
                  isStarred ? (
                    <IoStar className="text-yellow-400" size={18} />
                  ) : (
                    <IoStarOutline size={18} />
                  )
                }
                buttonTitle={isStarred ? "Unstar note" : "Star note"}
                onClick={() => {
                  setIsStarred(!isStarred);
                }}
              />
            )}
            {!isCreateNotePage && (
              <NoteToolbarButton
                buttonIcon={
                  isArchived ? (
                    <IoArchive className="text-primary-blue" size={18} />
                  ) : (
                    <IoArchiveOutline size={18} />
                  )
                }
                buttonTitle={isArchived ? "Unarchive note" : "Archive note"}
                onClick={() => {
                  setIsArchived(!isArchived);
                }}
              />
            )}
            {!isCreateNotePage && (
              <NoteToolbarButton
                buttonIcon={
                  <IoTrashBinOutline size={18} className="text-primary-red" />
                }
                buttonTitle={"Delete note"}
                onClick={() => {
                  handleDelete();
                }}
              />
            )}
          </div>
          {!isArchived && (
            <Fragment>
              <span className="h-[1px] w-full bg-primary-border"></span>
              <div className="flex flex-col w-full space-y-3.5">
                <div className="w-full p-3 flex justify-between items-center rounded-md hover:bg-gray-100 duration-200 border-2 border-primary-border">
                  <div className="flex space-x-3 items-center">
                    <IoChatboxEllipsesOutline size={16} />
                    <p className="text-sm">Comment</p>
                  </div>
                  <Switch
                    checked={isCommentEnabled}
                    onChange={() => {
                      setIsCommentEnabled(!isCommentEnabled);
                    }}
                    className={`
                  ${!isCommentEnabled ? "bg-slate-400" : "bg-active-blue"}
                  relative flex items-center flex-shrink-0 h-6 w-11 rounded-full cursor-pointer transition-colors ease-in-out duration-200`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        isCommentEnabled ? "translate-x-6" : "translate-x-1"
                      } pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-lg transform transition ease-in-out duration-200`}
                    />
                  </Switch>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </nav>
  );
}
