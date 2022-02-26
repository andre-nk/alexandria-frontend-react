import { createContext, useReducer } from "react";

export const SnackbarContext = createContext();

export const snackbarReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        snackbars: [...state.snackbars, action.content],
      };
    case "DEL": 
      return {
        snackbars: state.snackbars.filter((snackbar) => snackbar.id !== action.snackbarID)
      }
    default:
      return {
        snackbars: [...state.snackbars, action.content],
      };
  }
};

export const SnackbarContextProvider = ({ children }) => {
  const [state, dispatchSnackbarCtx] = useReducer(snackbarReducer, {
    snackbars: [],
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("Snackbar deleted:", state.snackbars[state.snackbars.length - 1]);
  //   }, 5000)
  // }, [state]);

  console.log(state);

  return (
    <SnackbarContext.Provider value={{ ...state, dispatchSnackbarCtx }}>
      {children}
    </SnackbarContext.Provider>
  );
};
