import { Fragment, useEffect, useState } from "react";
import { IoCloseOutline, IoTrashBinOutline } from "react-icons/io5";
import { AiOutlineGoogle } from "react-icons/ai"
import { FaGithub } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";

import { useModalContext } from "../../hooks/useModalContext";
import { useAuth } from "../../hooks/useAuth";
import { projectAuth } from "../../firebase/config";
import PasswordReauth from "./PasswordReauth";

export default function DeleteUserModal() {
  const { dispatchModalCtx } = useModalContext();
  const { deleteUsingPassword, deleteUsingGoogle, deleteUsingGithub, error } = useAuth();
  const [userProviderID, setUserProviderID] = useState(null);
  const [reauthPassword, setReauthPassword] = useState("");
  const providerID = projectAuth.currentUser.providerData[0].providerId;

  const closeModal = () => {
    dispatchModalCtx({
      type: "CLOSE",
      content: null,
    });
  };

  const deleteUserWithPassword = async () => {
    await deleteUsingPassword(reauthPassword);
  };

  const deleteUserWithGithub = async () => {
    await deleteUsingGithub();
  };

  const deleteUserWithGoogle = async () => {
    await deleteUsingGoogle();
  };

  useEffect(() => {
    switch (providerID) {
      case "github.com":
        setUserProviderID("Github");
        break;

      case "google.com":
        setUserProviderID("Google");
        break;

      case "password":
        setUserProviderID("Password");
        break;

      default:
        break;
    }
  }, [providerID]);

  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="inline-block w-full lg:max-w-xl p-8 pt-7 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
        <div className="w-full flex justify-between items-center">
          <div className="flex justify-start space-x-4">
            <IoTrashBinOutline size={24} className="text-primary-red" />
            <Dialog.Title
              as="h3"
              className="text-xl font-medium leading-6 text-gray-900"
            >
              Delete your account?
            </Dialog.Title>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-md hover:bg-primary-red hover:bg-opacity-20 duration-200"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        <p className="text-md text-major-text opacity-70 py-5">
          Are you sure you want to delete your account? This action is
          irreversible and will completely erase your notes, comments and other
          activities
        </p>
        {userProviderID === "Password" && (
          <PasswordReauth
            setReauthPassword={setReauthPassword}
            deleteUser={deleteUserWithPassword}
            reauthError={error}
          />
        )}
        <div className="w-full flex justify-end items-center mt-2 space-x-4">
          <button
            onClick={() => {
              closeModal();
            }}
            className="bg-slate-100 text-major-text hover:bg-primary-border rounded-md text-base border px-5 py-2 duration-200"
            type="submit"
          >
            Cancel
          </button>
          {userProviderID === "Password" && (
            <button
              onClick={() => {
                deleteUserWithPassword();
              }}
              className="bg-primary-red text-primary-bg hover:bg-active-red rounded-md text-base border px-5 py-2 duration-200"
              type="submit"
            >
              Delete account
            </button>
          )}
          {userProviderID === "Github" && (
            <button
              onClick={() => {
                deleteUserWithGithub();
              }}
              className="bg-primary-red text-primary-bg hover:bg-active-red flex rounded-md text-base border px-5 py-2 duration-200"
            >
              <FaGithub size={20} className="self-center"></FaGithub>
              <p className="pl-2 self-center">Confirm using Github</p>
            </button>
          )}

          {userProviderID === "Google" && (
            <button
              onClick={() => {
                deleteUserWithGoogle();
              }}
              className="bg-primary-red text-primary-bg hover:bg-active-red flex rounded-md text-base border px-5 py-2 duration-200"
            >
              <AiOutlineGoogle size={20} className="self-center text-white"></AiOutlineGoogle>
              <p className="pl-2 self-center">Confirm using Google</p>
            </button>
          )}
        </div>
      </div>
    </Transition.Child>
  );
}
