import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

import { projectAuth, projectStorage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import axiosInstance from "../axios/axiosConfig";

export const useAuth = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);

  const registerUserAPI = async (user) => {
    //CALL NATIVE API
    const response = await axiosInstance.post("/users", {
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL ?? "",
      role: "",
      location: "",
    });

    if (response.status === 200) {
      const responseData = await response.data;

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

      dispatch({
        type: "LOGIN",
        payload: userInstance,
      });
    }
  };

  const loginUserAPI = async (user) => {
    //CALL NATIVE API
    const response = await axiosInstance.get(`/${user.uid}`);

    if (response.status === 200) {
      const responseData = await response.data;

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

      dispatch({
        type: "LOGIN",
        payload: userInstance,
      });
    }
  };

  const deleteUserAPI = async (userID) => {
    console.log("Delete user API fired!");

    try {
      let config = {
        headers: {
          Authorization: "Bearer " + userID,
        },
      };

      await axiosInstance.delete(`/users/${userID}`, config);
    } catch (err) {
      console.log(err.message);
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

  const deleteUser = async (user) => {
    console.log("Delete user Firebase fired!");

    deleteUser(user)
      .then(async () => {
        await deleteUserAPI(user.uid);
      })
      .catch((error) => {
        console.log(error.message);
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
    logout,
    signInWithEmail,
    registerWithEmail,
    registerWithGithub,
    registerWithGoogle,
    deleteUser
  };
};
