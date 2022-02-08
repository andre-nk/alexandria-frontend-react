import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import { useModalContext } from "../../hooks/useModalContext";

export default function GlobalModal() {
  const { content, isShow, dispatch } = useModalContext();
  let completeButtonRef = useRef(null);

  const closeModal = () => {
    dispatch({
      type: "CLOSE",
      content: null,
    });
  };

  return (
    <div className="z-50">
      <Transition appear show={isShow} as={Fragment}>
        <Dialog
          as="div"
          initialFocus={completeButtonRef}
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-20"
              leave="ease-in duration-200"
              leaveFrom="opacity-20"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className={`fixed inset-0 bg-primary-black bg-opacity-25`}/>
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            {content}
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
