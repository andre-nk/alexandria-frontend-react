import { onAuthStateChanged } from "firebase/auth";
import { createContext, useReducer, useEffect } from "react";
import { projectAuth } from "../firebase/config";

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
          const response = await fetch(
            `http://localhost:8080/api/v1/users/${user.uid}`,
            {
              method: "GET",
            }
          );

          if (response.ok) {
            const responseData = await response.json();

            const userInstance = {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              provider: user.providerId,
              photoURL: user.photoURL,
              isVerified: user.emailVerified,
              role: responseData.data.role,
              location: responseData.data.location,
              friends: responseData.data.friends,
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
