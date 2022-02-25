import {
  IoCheckmarkCircleOutline,
  IoInformationCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { useSnackbarContext } from "../../hooks/useSnackbarContext";

export default function GlobalSnackbar() {
  const { snackbars } = useSnackbarContext();
  console.log(snackbars);

  return (
    <div className="fixed bottom-2.5 mx-5 z-50 w-11/12 lg:w-2/12">
      {snackbars.map((snackbar) => {
        return (
          <div
            class="p-4 mb-4 text-sm flex space-x-4 justify-start items-center shadow-lg bg-primary-white border border-primary-border rounded-lg"
            role="alert"
          >
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
        );
      })}
    </div>
  );
}
