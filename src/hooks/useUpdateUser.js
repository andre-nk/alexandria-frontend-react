import { sendPasswordResetEmail, updateProfile } from "firebase/auth";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

import { projectAuth, projectStorage } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import axiosInstance from "../axios/axiosConfig";
import { useMutation } from "react-query";

export const useResetPassword = () => {
  const resetPasswordMutation = useMutation((email) => {
    sendPasswordResetEmail(projectAuth, email);
  });

  return { resetPasswordMutation };
};

export const useUpdatePhoto = () => {
  const { user } = useAuthContext();

  const updatePhotoMutation = useMutation(
    async ({ profilePicture, role, location }) => {
      const profilePictureRef = ref(
        projectStorage,
        `profilePicture/${projectAuth.currentUser.uid}.jpg`
      );

      await uploadBytes(profilePictureRef, profilePicture)
        .then(async () => {
          const url = await getDownloadURL(profilePictureRef);

          if (url) {
            await updateProfile(projectAuth.currentUser, {
              photoURL: url,
            });

            try {
              await axiosInstance.put(
                "/users",
                {
                  uid: user.uid,
                  email: user.email,
                  displayName: user.displayName,
                  photoURL: url,
                  role: role,
                  location: location,
                },
                {
                  headers: {
                    Authorization: "Bearer " + user.uid,
                  },
                }
              );
            } catch (err) {
              throw new Error(err);
            }
          } else {
            throw new Error("Photo upload failed, please try again!");
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  );

  return { updatePhotoMutation };
};

export const useUpdateName = () => {
  const { user } = useAuthContext();

  const updateNameMutation = useMutation(
    async ({ displayName, role, location }) => {
      try {
        updateProfile(projectAuth.currentUser, {
          displayName: displayName,
          photoURL: user.photoURL,
        });

        await axiosInstance.put(
          "/users",
          {
            uid: user.uid,
            email: user.email,
            displayName: displayName,
            photoURL: user.photoURL,
            role: role,
            location: location,
          },
          {
            headers: {
              Authorization: "Bearer " + user.uid,
            },
          }
        );
      } catch (err) {
        throw new Error(err);
      }
    }
  );

  return { updateNameMutation };
};

export const useUpdateRole = () => {
  const { user } = useAuthContext();

  const updateRoleMutation = useMutation(async ({ role, location }) => {
    try {
      await axiosInstance.put(
        "/users",
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: role,
          location: location,
        },
        {
          headers: {
            Authorization: "Bearer " + user.uid,
          },
        }
      );
    } catch (err) {
      throw new Error(err);
    }
  });

  return { updateRoleMutation };
};

export const useUpdateLocation = () => {
  const { user } = useAuthContext();

  const updateLocationMutation = useMutation(async ({ role, location }) => {
    try {
      await axiosInstance.put(
        "/users",
        {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          role: role,
          location: location,
        },
        {
          headers: {
            Authorization: "Bearer " + user.uid,
          },
        }
      );
    } catch (err) {
      throw new Error(err);
    }
  });

  return { updateLocationMutation };
};
