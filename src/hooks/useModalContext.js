import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw Error(
      "useModakContext must be invoked inside an LoadingContextProvider"
    );
  }

  return context;
};
