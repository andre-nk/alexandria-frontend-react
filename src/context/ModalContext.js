import { createContext, useReducer } from "react";

export const ModalContext = createContext();
export const modalReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return {
        ...state,
        content: action.content,
        isShow: true,
      };
    case "CLOSE":
      return {
        ...state,
        content: null,
        isShow: false,
      };

    default:
      return {
        ...state,
        content: null,
        isShow: false,
      };
  }
};

export const ModalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modalReducer, {
    content: null,
    isShow: false,
  });

  console.log(state);

  return (
    <ModalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ModalContext.Provider>
  );
};
