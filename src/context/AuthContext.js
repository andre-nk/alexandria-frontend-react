import { onAuthStateChanged } from "firebase/auth";
import { createContext, useReducer, useEffect } from "react";

import { projectAuth } from "../firebase/config";
import axiosConfig from "../axios/axiosConfig";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "AUTH_IS_READY":
      return {
        user: action.payload,
        authIsReady: true,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(projectAuth, async (user) => {
      //CALL NATIVE API AND FORM A DESIRED USER STRUCT THEN PASS IT AS A PAYLOAD
      if (user !== null) {
        try {
          const response = await axiosConfig.get(`users/${user.uid}`);

          if (response.status === 200) {
            const responseData = await response.data.data

            const userInstance = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              provider: user.providerId,
              photoURL: user.photoURL,
              isVerified: user.emailVerified,
              role: responseData.role,
              location: responseData.location,
              friends: responseData.friends,
            };

            dispatch({ type: "AUTH_IS_READY", payload: userInstance });
          }
        } catch (error) {
          dispatch({ type: "AUTH_IS_READY", payload: user });
        }
      } else {
        dispatch({ type: "AUTH_IS_READY", payload: null });
      }

      unsubscribe();
    });
  }, []);

  console.log(state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
