import {
  IoAdd,
  IoStarOutline,
  IoShareOutline,
  IoArchiveOutline,
  IoTrashBinOutline,
  IoChevronForwardOutline,
  IoChatboxEllipsesOutline,
} from "react-icons/io5";
import { Switch } from "@headlessui/react";

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
