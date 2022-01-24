import { useAuth } from "../../hooks/useAuth";

import DrawerLinks from "./DrawerLinks";

export default function Drawer({ isOpen, setIsOpen }) {
  const { logout } = useAuth();

  return (
    <nav
      className={`fixed z-50 top-0 ${
        isOpen ? "left-0" : "-left-full"
      } w-full flex duration-300 lg:hidden`}
    >
      <div className="w-9/12 md:w-7/12 p-8 bg-white transition-shadow shadow-zinc-700 drop-shadow-2xl h-screen">
        <div className="flex w-full justify-center pb-6">
          <img alt="logo" src="/logo-text.png" width={150} height={50} />
        </div>
        <DrawerLinks setIsOpen={setIsOpen} title={"Home"} pathname={"/"} />
        <DrawerLinks
          setIsOpen={setIsOpen}
          title={"Collection"}
          pathname={"/notes"}
        />
        <DrawerLinks
          setIsOpen={setIsOpen}
          title={"Profile"}
          pathname={"/profile"}
        />
        <DrawerLinks
          setIsOpen={setIsOpen}
          title={"About"}
          pathname={"/about"}
        />
        <DrawerLinks
          setIsOpen={setIsOpen}
          title={"Get our apps"}
          pathname={"/app"}
        />
        <div className="h-[2px] w-3/12 mt-4 mb-3 bg-primary-black bg-opacity-30"></div>
        <button
          className="bg-gray-50 hover:bg-primary-border text-primary-red w-full rounded-md text-medium border px-4 py-3 duration-200 mt-5"
          onClick={() => {
            logout();
            setIsOpen(false);
          }}
        >
          Log out
        </button>
      </div>
      <div
        className={`w-3/12 md:w-5/12 bg-transparent`}
        onClick={() => {
          setIsOpen(false);
        }}
      ></div>
    </nav>
  );
}
