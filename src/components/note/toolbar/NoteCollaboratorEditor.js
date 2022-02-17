import * as Yup from "yup";
import { Fragment, useState } from "react";
import { Formik, Field, Form } from "formik";
import { IoAdd, IoCloseOutline, IoLinkOutline } from "react-icons/io5";
import { Dialog, Transition } from "@headlessui/react";

import { useModalContext } from "../../../hooks/useModalContext";
import { RWebShare } from "react-web-share";
import { useLocation } from "react-router-dom";

export default function NoteCollaboratorEditor({noteTitle}) {
  const { dispatchModalCtx } = useModalContext();
  const location = useLocation();
  const [collaboratorEmails, setCollaboratorEmails] = useState([]);

  const InviteSchema = Yup.object().shape({
    email: Yup.string().email("Invalid e-mail address"),
  });

  const currentPathname = "http://192.168.0.102:3000/" + location.pathname

  const closeModal = () => {
    dispatchModalCtx({
      type: "CLOSE",
      content: null,
    });
  };

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
      <div className="inline-block w-full lg:max-w-xl p-6 pt-5 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
        <div className="w-full flex justify-between items-center">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            {"Share & collaborate"}
          </Dialog.Title>
          <button
            onClick={closeModal}
            className="p-1 rounded-md hover:bg-primary-red hover:bg-opacity-20 duration-200"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={InviteSchema}
          onSubmit={async (values) => {
            setCollaboratorEmails([...collaboratorEmails, values.email]);
          }}
        >
          {({ errors, touched }) => {
            return (
              <Form className="flex flex-col mt-4">
                <div className="w-full flex flex-col space-y-2.5">
                  <label htmlFor="email" className="text-major-text text-sm">
                    Type collaborator's e-mail here:
                  </label>
                  <div className="w-full flex space-x-3">
                    <Field
                      type="text"
                      name="email"
                      id="email"
                      className="border border-primary-border w-full focus:border-primary-blue outline-none rounded-md flex-1 px-4 py-2.5 duration-200"
                      placeholder="E-mail address..."
                    />
                    <button
                      className="bg-white hover:bg-primary-bg text-major-text rounded-md border p-2.5 duration-200"
                      type="submit"
                    >
                      <IoAdd size={24} />
                    </button>
                  </div>
                  {errors.email && touched.email ? (
                    <p className="text-xs text-red-500 opacity-70">
                      *{errors.email}
                    </p>
                  ) : null}
                </div>
              </Form>
            );
          }}
        </Formik>
        <div className="w-full flex flex-wrap mt-2">
          {collaboratorEmails.map((email, index) => {
            return (
              <div
                key={index}
                className={`py-1 mt-2 mr-2 pl-2 pr-1 space-x-2 flex items-center rounded-md bg-slate-100 duration-200 cursor-pointer text-sm`}
              >
                <p>{email}</p>
                <button
                  onClick={() => {
                    setCollaboratorEmails(
                      collaboratorEmails.filter(
                        (email) => email !== collaboratorEmails[index]
                      )
                    );
                  }}
                  className="p-1 rounded-md hover:bg-primary-red hover:bg-opacity-20 duration-200"
                >
                  <IoCloseOutline size={16} />
                </button>
              </div>
            );
          })}
        </div>
        <div className="w-full flex justify-end items-center mt-4 space-x-4">
          <RWebShare
            data={{
              text: "Alexandria is a dead-simple notetaking app for your programming-related notes, but way more than that.",
              url: currentPathname,
              title: noteTitle,
            }}
          >
            <button
              className="bg-white hover:bg-primary-bg text-major-text rounded-md text-base border p-2.5 duration-200"
            >
              <IoLinkOutline size={24} />
            </button>
          </RWebShare>
          <button
            className="bg-primary-blue text-primary-bg hover:bg-active-blue rounded-md text-base border px-6 py-2.5 duration-200"
            type="submit"
          >
            Send invitation
          </button>
        </div>
      </div>
    </Transition.Child>
  );
}
