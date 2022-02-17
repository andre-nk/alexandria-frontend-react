import {
  IoStar,
  IoArchive,
  IoStarOutline,
  IoShareOutline,
  IoArchiveOutline,
  IoTrashBinOutline,
  IoChevronForwardOutline,
  IoChatboxEllipsesOutline,
  IoChevronForwardCircleOutline,
} from "react-icons/io5";
import { Fragment } from "react";
import { Switch } from "@headlessui/react";

import NoteToolbarButton from "./NoteToolbarButton";
import NoteTagsEditor from "./NoteTagsEditor";
import { useModalContext } from "../../../hooks/useModalContext";
import NoteCollaboratorEditor from "./NoteCollaboratorEditor";

export default function NoteToolbar({
  tags,
  setTags,
  isStarred,
  setIsStarred,
  isArchived,
  setIsArchived,
  isToolbarOpen,
  setIsToolbarOpen,
  isCommentEnabled,
  setIsCommentEnabled,
  codeBoxThemes,
  setCodeBoxColor,
  isCreateNotePage,
  handleDelete,
  noteTitle
}) {
  const { dispatchModalCtx } = useModalContext();
  const showEditorModal = () => {
    dispatchModalCtx({
      type: "SHOW",
      content: <NoteCollaboratorEditor noteTitle={noteTitle} />,
    });
  };

  return (
    <div
      className={`${isToolbarOpen ? "w-[22.5%] p-8" : "w-[0px] p-0"} 
        duration-500 min-h-full bg-primary-white drop-shadow-xl hidden lg:block z-0`}
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
            <NoteToolbarButton
              buttonIcon={<IoShareOutline size={18} />}
              buttonTitle={"Share note"}
              onClick={() => {
                showEditorModal();
              }}
            />
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
  );
}
