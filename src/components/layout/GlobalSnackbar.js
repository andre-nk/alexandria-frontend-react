import { useSnackbarContext } from "../../hooks/useSnackbarContext";
import Snackbar from "./Snackbar";

export default function GlobalSnackbar() {
  const { snackbars } = useSnackbarContext();

  return (
    <div className="fixed bottom-2.5 mx-5 z-50 w-11/12 lg:w-3/12">
      {snackbars.map((snackbar) => {
        return (
          <Snackbar snackbar={snackbar} />
        );
      })}
    </div>
  );
}
