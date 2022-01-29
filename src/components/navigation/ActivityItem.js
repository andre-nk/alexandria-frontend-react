import { IoChatboxEllipses } from "react-icons/io5";
import { Menu } from "@headlessui/react";

export default function ActivityItem() {
  return (
    <div className="px-1 py-1">
      <Menu.Item>
        {({ active }) => (
          <button
            className={`${
              active && "bg-blue-50"
            } group flex justify-between rounded-md items-start w-full px-3 lg:px-4 py-2.5 text-sm duration-200`}
          >
            <div className="flex space-x-3 lg:space-x-5 items-center">
              <div
                className={`${
                  active && "bg-white"
                } h-9 w-9 rounded-full flex justify-center items-center bg-primary-border overflow-clip duration-200`}
              >
                <IoChatboxEllipses />
              </div>
              <div className="flex flex-col justify-between space-y-1 items-start">
                <h2 className="text-md lg:text-base font-medium">Agatha Chelsea</h2>
                <p className="text-xs lg:text-sm text-left text-minor-text">You're mentioned in this comment</p>
              </div>
            </div>
            <p className="text-xs text-minor-text">2 hours ago</p>
          </button>
        )}
      </Menu.Item>
    </div>
  );
}
