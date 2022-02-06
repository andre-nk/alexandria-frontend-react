import { createContext } from "react";

export const SnackbarContext = createContext();

export const snackbarReducer = (state, action) => {};

export const SnackbarContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(snackbarReducer, {
      
  });
};
