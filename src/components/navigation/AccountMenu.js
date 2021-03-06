import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useAuth";

export default function AccountMenu({ photoURL }) {
  const navigate = useNavigate();
  const { mutate } = useLogout();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
        <div className="h-9 w-9 rounded-full mt-1.5 bg-primary-border overflow-clip">
          <img alt="profilePicture" src={photoURL} width={36} height={36} />
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-40 right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    navigate("/profile")
                  }}
                  className={`${
                    active && "bg-primary-border"
                  } group flex rounded-md items-center w-full px-4 py-2.5 text-sm duration-200`}
                >
                  Your profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    mutate();
                  }}
                  className={`${
                    active && "bg-primary-border"
                  } group text-primary-red flex rounded-md items-center w-full px-3 py-2.5 text-sm duration-200`}
                >
                  Log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
