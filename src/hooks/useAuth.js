import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  GoogleAuthProvider,
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from "firebase/auth";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

import { projectAuth, projectStorage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useLoadingContext } from "./useLoadingContext";
import axiosInstance from "../axios/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "./useModalContext";

export const useAuth = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();
  const { dispatchModalCtx } = useModalContext();
  const { dispatchLoadingCtx } = useLoadingContext();
  const [error, setError] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(null);

  const registerUserAPI = async (user) => {
    const response = await axiosInstance.post("/users", {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
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
      };

      dispatch({
        type: "LOGIN",
        payload: userInstance,
      });
    }
  };

  const loginUserAPI = async (user) => {
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
    dispatchLoadingCtx({
      type: "START",
    });

    createUserWithEmailAndPassword(projectAuth, email, password)
      .then(async (res) => {
        console.log("User created!");

        try {
          const profilePictureRef = ref(
            projectStorage,
            `profilePicture/${res.user.uid}.jpg`
          );

          console.log(profilePictureRef);

          await uploadBytes(profilePictureRef, profilePicture)
            .then(async () => {
              await getDownloadURL(profilePictureRef)
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

          console.log(profilePictureURL);

          if (profilePictureURL) {
            console.log(profilePictureURL);

            await updateProfile(res.user, {
              displayName: name,
              photoURL: profilePictureURL,
            });

            await registerUserAPI(res.user);

            console.log("User updated!");
          } else {
            console.log("URL failed!");
            setError("Account creation failed, please try again.");
            await deleteUser(projectAuth.currentUser);
          }
        } catch (err) {
          setError(err.message);
        }
      })
      .catch((err) => {
        setError(err.message);
      });

    dispatchLoadingCtx({
      type: "STOP",
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

  const deleteUsingPassword = async (password) => {
    setError(null);
    const user = projectAuth.currentUser;

    const credential = EmailAuthProvider.credential(user.email, password);

    try {
      await reauthenticateWithCredential(user, credential)
      .then(async () => {
        console.log("Reauthenticated!");
        await deleteUserAPI(user.uid);

        try {
          await deleteUserAPI(user.uid);
          deleteUser(user);
        } catch (error) {
          setError(error);
        }

        dispatchModalCtx({
          type: "CLOSE",
          content: null,
        });
        navigate("/auth/login");
      })
    } catch (error) {
      setError(error);
    }
  };

  const deleteUsingGithub = async () => {
    const githubProvider = new GithubAuthProvider();
    const user = projectAuth.currentUser;

    try {
      await reauthenticateWithPopup(
        user,
        githubProvider
      ).then(async () => {
        await deleteUserAPI(user.uid);

        try {
          await deleteUserAPI(user.uid);
          deleteUser(user);
        } catch (error) {
          setError(error);
        }

        dispatchModalCtx({
          type: "CLOSE",
          content: null,
        });
        navigate("/auth/login");
      });
    } catch (error) {
      setError(error);
    }
  };

  const deleteUsingGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const user = projectAuth.currentUser;

    try {
      await reauthenticateWithPopup(
        user,
        googleProvider
      ).then(async () => {
        await deleteUserAPI(user.uid);

        try {
          await deleteUserAPI(user.uid);
          deleteUser(user);
        } catch (error) {
          setError(error);
        }

        dispatchModalCtx({
          type: "CLOSE",
          content: null,
        });
        navigate("/auth/login");
      });
    } catch (error) {
      setError(error);
    }
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
    deleteUsingPassword,
    deleteUsingGithub,
    deleteUsingGoogle
  };
};
