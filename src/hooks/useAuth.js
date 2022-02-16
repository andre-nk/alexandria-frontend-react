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
} from "firebase/auth";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

import { projectAuth, projectStorage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import axiosInstance from "../axios/axiosConfig";

export const useAuth = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
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

  const deleteUsingPassword = async () => {
    const user = projectAuth.currentUser;

    const credential = EmailAuthProvider.credential(
      user.email,
      "23Zephyrnaut2004"
    );

    reauthenticateWithCredential(user, credential)
      .then(async () => {
        await deleteUserAPI(user.uid);

        deleteUser(user)
          .then(() => {
            setSuccess(true);
          })
          .catch((error) => {
            setError(error);
            setSuccess(false);
          });
      })
      .catch((error) => {
        setError(error);
      });
  };

  const deleteUserInstance = async () => {
    try {
      switch (projectAuth.currentUser.providerData[0].providerId) {
        case "github.com":
          console.log("Signed up using Github");
          break;

        case "google.com":
          console.log("Signed up using Github");
          break;

        case "password":
          deleteUsingPassword();
          break;

        default:
          break;
      }
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
    success,
    error,
    logout,
    signInWithEmail,
    registerWithEmail,
    registerWithGithub,
    registerWithGoogle,
    deleteUserInstance,
  };
};
