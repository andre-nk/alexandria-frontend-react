import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

import { projectAuth, projectStorage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [isResetSent, setisResetSent] = useState(false);
  const { dispatch } = useAuthContext();

  const registerUserAPI = async (user) => {
    //CALL NATIVE API
    const response = await fetch("http://localhost:8080/api/v1/users", {
      method: "POST",
      body: JSON.stringify({
        uid: user.uid,
        role: "",
        location: "",
        friends: [],
      }),
    });

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

      dispatch({
        type: "LOGIN",
        payload: userInstance,
      });
    }
  };

  const loginUserAPI = async (user) => {
    //CALL NATIVE API
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

      dispatch({
        type: "LOGIN",
        payload: userInstance,
      });
    }
  };

  const registerWithEmail = async (name, profilePicture, email, password) => {
    setError(null);
    createUserWithEmailAndPassword(projectAuth, email, password)
      .then(async (res) => {
        try {
          const profilePictureRef = ref(
            projectStorage,
            `profilePicture/${res.user.uid}.jpg`
          );

          uploadBytes(profilePictureRef, profilePicture)
            .then(() => {
              getDownloadURL(profilePictureRef)
                .then((url) => {
                  setProfilePictureURL(url);
                })
                .catch((err) => {
                  setError(err.message);
                });
            })
            .catch((err) => {
              setError(err.message);
            });

          if (profilePictureURL) {
            await updateProfile(res.user, {
              displayName: name,
              photoURL: profilePictureURL,
            });

            await registerUserAPI(res.user);
          }
        } catch (err) {
          setError(err.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const resetPassword = async (email) => {
    setError(null);
    sendPasswordResetEmail(projectAuth, email)
      .then(() => {
        setisResetSent(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const signInWithEmail = async (email, password) => {
    setError(null);
    signInWithEmailAndPassword(projectAuth, email, password)
      .then(async (res) => {
        try {
          await loginUserAPI(res.user);
        } catch (err) {
          setError(err.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const registerWithGithub = async () => {
    setError(null);
    signInWithPopup(projectAuth, new GithubAuthProvider())
      .then(async (res) => {
        GithubAuthProvider.credentialFromResult(res);
        await registerUserAPI(res.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const registerWithGoogle = async () => {
    setError(null);
    signInWithPopup(projectAuth, new GoogleAuthProvider())
      .then(async (res) => {
        GoogleAuthProvider.credentialFromResult(res);
        await registerUserAPI(res.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const logout = async () => {
    setError(null);
    signOut(projectAuth)
      .then(() => {
        dispatch({
          type: "LOGOUT",
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return {
    error,
    isResetSent,
    registerWithEmail,
    signInWithEmail,
    logout,
    resetPassword,
    registerWithGithub,
    registerWithGoogle,
  };
};
