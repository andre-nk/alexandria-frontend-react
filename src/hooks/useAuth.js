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
import { useMutation } from "react-query";

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

    return userInstance;
  }
};

const loginUserAPI = async (user) => {
  const response = await axiosInstance.get(`/users/${user.uid}`);

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

    return userInstance;
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

export const useEmailRegister = () => {
  const { dispatchLoadingCtx } = useLoadingContext();
  const { dispatch } = useAuthContext();

  const emailRegisterMutation = useMutation(
    async ({ name, profilePicture, email, password }) => {
      dispatchLoadingCtx({
        type: "START",
      });

      console.log(name, profilePicture, email, password);

      const res = await createUserWithEmailAndPassword(
        projectAuth,
        email,
        password
      );
      console.log("User created!");

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

            await updateProfile(res.user, {
              displayName: name,
              photoURL: url,
            });

            const userInstance = await registerUserAPI(res.user);

            dispatchLoadingCtx({
              type: "STOP",
            });

            dispatch({
              type: "LOGIN",
              payload: userInstance,
            });
          } else {
            throw new Error("Photo upload failed, please try again!");
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  );

  return { emailRegisterMutation };
};

export const useSignIn = () => {
  const { dispatchLoadingCtx } = useLoadingContext();
  const { dispatch } = useAuthContext();

  const signInMutation = useMutation(async ({ email, password }) => {
    dispatchLoadingCtx({
      type: "START",
    });

    return signInWithEmailAndPassword(projectAuth, email, password).then(
      async (res) => {
        const userInstance = await loginUserAPI(res.user);

        dispatchLoadingCtx({
          type: "STOP",
        });

        dispatch({
          type: "LOGIN",
          payload: userInstance,
        });
      }
    );
  });

  return { signInMutation };
};

export const useGithubRegister = () => {
  const { dispatchLoadingCtx } = useLoadingContext();
  const { dispatch } = useAuthContext();

  const githubRegisterMutation = useMutation(
    async () => {
      dispatchLoadingCtx({
        type: "START",
      });

      return signInWithPopup(projectAuth, new GithubAuthProvider()).then(
        async (res) => {
          GithubAuthProvider.credentialFromResult(res);

          dispatchLoadingCtx({
            type: "STOP",
          });

          await registerUserAPI(res.user);
        }
      );
    },
    {
      onSuccess: (data) => {
        dispatch({
          type: "LOGIN",
          payload: data,
        });
      },
    }
  );

  return { githubRegisterMutation };
};

export const useGoogleRegister = () => {
  const { dispatchLoadingCtx } = useLoadingContext();
  const { dispatch } = useAuthContext();

  const googleRegisterMutation = useMutation(
    async () => {
      dispatchLoadingCtx({
        type: "START",
      });

      return signInWithPopup(projectAuth, new GoogleAuthProvider()).then(
        async (res) => {
          GoogleAuthProvider.credentialFromResult(res);

          dispatchLoadingCtx({
            type: "STOP",
          });

          await registerUserAPI(res.user);
        }
      );
    },
    {
      onSuccess: (data) => {
        dispatch({
          type: "LOGIN",
          payload: data,
        });
      },
    }
  );

  return { googleRegisterMutation };
};

export const usePasswordDelete = () => {
  const navigate = useNavigate();
  const user = projectAuth.currentUser;
  const { dispatchModalCtx } = useModalContext();
  const { dispatchLoadingCtx } = useLoadingContext();

  const passwordDeleteMutation = useMutation((password) => {
    dispatchLoadingCtx({
      type: "START",
    });

    const credential = EmailAuthProvider.credential(user.email, password);

    reauthenticateWithCredential(user, credential)
      .then(async () => {
        console.log("Reauthenticated!");
        await deleteUserAPI(user.uid);
        await deleteUser(user);

        navigate("/auth/login");

        dispatchLoadingCtx({
          type: "STOP",
        });

        dispatchModalCtx({
          type: "CLOSE",
          content: null,
        });
      })
      .catch((error) => {
        throw new Error(error);
      });
  });

  return { passwordDeleteMutation };
};

export const useGithubDelete = () => {
  const navigate = useNavigate();
  const githubProvider = new GithubAuthProvider();
  const { dispatchModalCtx } = useModalContext();
  const { dispatchLoadingCtx } = useLoadingContext();

  const user = projectAuth.currentUser;

  const githubDeleteMutation = useMutation(
    () => {
      dispatchLoadingCtx({
        type: "START",
      });

      reauthenticateWithPopup(user, githubProvider).then(async () => {
        await deleteUserAPI(user.uid);
        await deleteUser(user);

        dispatchLoadingCtx({
          type: "START",
        });

        dispatchModalCtx({
          type: "CLOSE",
          content: null,
        });

        navigate("/auth/login");
      });
    }
  );

  return githubDeleteMutation;
};

export const useGoogleDelete = () => {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  const { dispatchModalCtx } = useModalContext();
  const { dispatchLoadingCtx } = useLoadingContext();
  const user = projectAuth.currentUser;

  const googleDeleteMutation = useMutation(
    () => {
      dispatchLoadingCtx({
        type: "START",
        content: null,
      });

      reauthenticateWithPopup(user, googleProvider).then(async () => {
        await deleteUserAPI(user.uid);
        await deleteUser(user);
      });

      dispatchLoadingCtx({
        type: "STOP",
        content: null,
      });

      dispatchModalCtx({
        type: "CLOSE",
        content: null,
      });

      navigate("/auth/login");
    },
  );

  return googleDeleteMutation;
};

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const { mutate } = useMutation(
    () => {
      return signOut(projectAuth);
    },
    {
      onSuccess: () => {
        dispatch({
          type: "LOGOUT",
        });
      },
    }
  );

  return { mutate };
};
