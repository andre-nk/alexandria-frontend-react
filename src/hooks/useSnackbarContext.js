import { useContext } from "react";
import { SnackbarContext } from "../context/SnackbarContext";

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw Error(
      "useSnackbarContext must be invoked inside an SnackbarContextProvider"
    );
  }

  return context;
};
