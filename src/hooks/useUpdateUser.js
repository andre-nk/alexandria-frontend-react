import { useState } from "react";
import { sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

import { projectAuth, projectStorage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import axiosInstance from "../axios/axiosConfig";

export const useUpdateUser = () => {
  const { user } = useAuthContext();

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isResetSent, setisResetSent] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState(null);

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

  const updatePhotoURL = async (profilePicture, role, location) => {
    try {
      const profilePictureRef = ref(
        projectStorage,
        `profilePicture/${projectAuth.currentUser.uid}.jpg`
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
        await updateProfile(projectAuth.currentUser, {
          photoURL: profilePictureURL,
        });

        let config = {
          headers: {
            Authorization: "Bearer " + user.uid,
          },
        };

        try {
          await axiosInstance.put(
            "/users",
            {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: profilePictureURL,
              role: role,
              location: location,
            },
            config
          );

          setSuccess("Your profile has been updated");
        } catch (error) {
          setError(error);
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const updateDisplayName = async (displayName, role, location) => {
    try {
      await updateProfile(projectAuth.currentUser, {
        displayName: displayName,
        photoURL: user.photoURL
      });

      let config = {
        headers: {
          Authorization: "Bearer " + user.uid,
        },
      };

      await axiosInstance.put(
        "/users",
        {
          uid: user.uid,
          displayName: displayName,
          photoURL: user.photoURL,
          role: role,
          location: location,
        },
        config
      );

      setSuccess("Your profile has been updated");
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const updateRole = async (role, location) => {
    try {
      let config = {
        headers: {
          Authorization: "Bearer " + user.uid,
        },
      };

      await axiosInstance.put(
        "/users",
        {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: role,
          location: location,
        },
        config
      );

      setSuccess("Your profile has been updated");
    } catch (error) {
      setError(error);
    }
  };

  const updateLocation = async (role, location) => {
    let config = {
      headers: {
        Authorization: "Bearer " + user.uid,
      },
    };

    try {
      await axiosInstance.put(
        "/users",
        {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: role,
          location: location,
        },
        config
      );

      setSuccess("Your profile has been updated");
    } catch (error) {
      setError(error);
    }
  };

  return {
    error,
    success,
    isResetSent,
    resetPassword,
    updateRole,
    updateLocation,
    updatePhotoURL,
    updateDisplayName,
  };
};
