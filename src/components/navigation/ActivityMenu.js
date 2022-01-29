import { IoNotificationsOutline } from "react-icons/io5"
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import ActivityItem from "./ActivityItem";

export default function ActivityMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
        <div className="h-8 w-8 flex justify-center items-center rounded-md bg-primary-white hover:bg-gray-100 duration-200 border-2 border-primary-border">
          <IoNotificationsOutline size={18} />
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
        <Menu.Items className="absolute z-40 right-0 w-[70vw] lg:w-[28rem] mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ActivityItem />
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
