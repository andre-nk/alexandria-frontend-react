import { Transition } from "@headlessui/react";
import {
  IoCheckmarkCircleOutline,
  IoCloseOutline,
  IoInformationCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";

import { useSnackbarContext } from "../../hooks/useSnackbarContext";

export default function Snackbar({ snackbar }) {
  const { snackbars, dispatchSnackbarCtx } = useSnackbarContext();
  let isShowing = false;

  snackbars.forEach((source) => {
    if (source.id === snackbar.id) {
      isShowing = true;
    }
  });

  console.log(isShowing);

  return (
    <Transition
      appear={true}
      show={isShowing}
      enter="transition-opacity duration-75"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className="p-4 mb-4 text-sm flex justify-between items-center shadow-lg bg-primary-white border border-primary-border rounded-lg"
        role="alert"
      >
        <div className="flex justify-start items-center space-x-4">
          {snackbar.type === "Error" ? (
            <IoWarningOutline className="text-active-red" size={24} />
          ) : snackbar.type === "Info" ? (
            <IoInformationCircleOutline
              className="text-primary-blue"
              size={24}
            />
          ) : (
            <IoCheckmarkCircleOutline
              className="text-primary-green"
              size={24}
            />
          )}
          <span className="flex space-x-2">
            <p className="text-base font-medium">{snackbar.type}!</p>
            <p className="text-base">{snackbar.content}</p>
          </span>
        </div>
        <button
          onClick={() => {
            dispatchSnackbarCtx({
              type: "DEL",
              snackbarID: snackbar.id,
            });
          }}
        >
          <IoCloseOutline size={24} className="text-major-text" />
        </button>
      </div>
    </Transition>
  );
}
