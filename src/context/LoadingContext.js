import { createContext, useReducer } from "react";

export const LoadingContext = createContext();

export const loadingReducer = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        isLoading: true,
      };
    case "STOP":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return {
        ...state,
        isLoading: false,
      }
  }
};

export const LoadingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(loadingReducer, {
    isLoading: false,
  });

  return (
    <LoadingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};
