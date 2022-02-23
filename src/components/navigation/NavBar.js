import { useNavigate } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { VscTerminalLinux } from "react-icons/vsc";
import { BsWindows, BsApple } from "react-icons/bs";
import { Fragment, useEffect, useState } from "react";
import { IoAddOutline, IoLogoAndroid, IoMenuOutline } from "react-icons/io5";

import { useAuthContext } from "../../hooks/useAuthContext";
import NavLink from "./NavLink";
import AccountMenu from "./AccountMenu";

export default function Navbar({ isDynamic, setIsOpen, aboutSectionRef }) {
  const { user, authIsReady } = useAuthContext();
  const [currentAppCount, setCurrentAppCount] = useState(0);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    if (aboutSectionRef.current !== null) {
      aboutSectionRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("Ref is null:", aboutSectionRef);
    }
  };

  const appsList = [
    {
      src: <img alt="logo" src="/logo.png" width={32} height={32} />,
      title: (
        <span className="font-light text-md">
          <strong className="font-medium">alexandria.</strong>
        </span>
      ),
    },
    {
      src: <img alt="logo" src="/vscode.svg" width={32} height={32} />,
      title: (
        <span className="font-light text-md">
          Get <strong className="font-medium">Alexandria</strong> VSCode
          Extension
        </span>
      ),
    },
    {
      src: (
        <div className="flex space-x-4 justify-center items-center">
          <div className="pb-0.5">
            <BsApple size={24} />
          </div>
          <BsWindows size={24} />
          <VscTerminalLinux size={24} />
        </div>
      ),
      title: (
        <span className="font-light text-md">
          Get <strong className="font-medium">Alexandria</strong> Desktop Apps
        </span>
      ),
    },
    {
      src: (
        <div className="flex space-x-4 justify-center items-center">
          <div className="pb-0.5">
            <BsApple size={24} />
          </div>
          <IoLogoAndroid size={32} color="#01DF7A" />
        </div>
      ),
      title: (
        <span className="font-light text-md">
          Get <strong className="font-medium">Alexandria</strong> Mobile PWAs
        </span>
      ),
    },
  ];

  useEffect(() => {
    const appCountID = setInterval(() => {
      if (isDynamic) {
        if (currentAppCount === 3) {
          setCurrentAppCount(0);
        } else {
          setCurrentAppCount(currentAppCount + 1);
        }
      } else {
        setCurrentAppCount(0);
      }
    }, 5000);

    return () => clearInterval(appCountID);
  });

  return (
    <Fragment>
      {/* MOBILE */}
      <nav className="flex lg:hidden justify-between items-center h-[4.5rem] pl-10 pr-9 border-b bg-white border-primary-border">
        {authIsReady ? (
          user != null ? (
            <div className="flex w-full justify-between items-center">
              <button
                onClick={setIsOpen}
                className="h-8 w-8 flex justify-center items-center rounded-md bg-primary-white hover:bg-gray-100 duration-200 border-2 border-primary-border"
              >
                <IoMenuOutline size={18} />
              </button>
              <div className="flex space-x-6 justify-center items-center">
                <div
                  onClick={() => {
                    navigate("/profile");
                  }}
                  className="h-9 w-9 cursor-pointer rounded-full bg-primary-border overflow-clip"
                >
                  <img
                    alt="profilePicture"
                    src={user.photoURL}
                    width={36}
                    height={36}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex space-x-10 z-20 w-full justify-between items-center">
              <img alt="logo" src="/logo.png" width={40} height={40} />
              <button
                onClick={() => {
                  navigate("/auth/register");
                }}
                className="bg-primary-blue hover:bg-active-blue duration-200 rounded-md px-5 py-2.5 text-sm font-regular text-primary-white"
              >
                Get started
              </button>
            </div>
          )
        ) : (
          <ContentLoader
            rtl
            speed={1}
            width={476}
            height={40}
            viewBox="0 0 476 40"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            className="w-full flex justify-between"
          >
            <rect x="120" y="8" rx="3" ry="3" width="24" height="24" />
            <rect x="74" y="8" rx="3" ry="3" width="24" height="24" />
            <circle cx="20" cy="20" r="20" />
          </ContentLoader>
        )}
      </nav>

      {/* DESKTOP */}
      <nav className="hidden lg:flex z-30 w-full justify-between items-center bg-white border-b border-primary-border h-[4.5rem] px-8">
        <div
          onClick={() => {
            if (currentAppCount === 0) {
              navigate("/");
            } else {
              navigate("/app");
            }
          }}
          className="flex space-x-4 items-center bg-white hover:bg-gray-100 py-2 px-3 cursor-pointer rounded-md duration-200"
        >
          {appsList[currentAppCount].src}
          {appsList[currentAppCount].title}
        </div>
        {authIsReady ? (
          user != null ? (
            <div className="flex space-x-12 items-center">
              <NavLink pathname="/" title="Home" />
              <NavLink pathname="/app" title="Apps" />
              <NavLink pathname="/about" title="About" />
              <NavLink pathname="/notes" title="Collection" />
              <div className="flex justify-between items-center space-x-6">
                <div className="flex justify-between items-center space-x-4">
                  <button
                    onClick={() => {
                      navigate("/notes/new/Untitled%20Note");
                    }}
                    className="h-8 w-8 flex justify-center items-center rounded-md bg-primary-white hover:bg-gray-100 duration-200 border-2 border-primary-border"
                  >
                    <IoAddOutline size={18} />
                  </button>
                </div>
                <AccountMenu photoURL={user.photoURL} />
              </div>
            </div>
          ) : (
            <div className="flex space-x-10 items-center">
              <NavLink pathname="/" title="Home" />
              <NavLink pathname="/app" title="Apps" />
              <button onClick={scrollToBottom}>
                <p>About</p>
              </button>
              <button
                onClick={() => {
                  navigate("/auth/register");
                }}
                className="bg-primary-blue hover:bg-active-blue duration-200 rounded-md px-5 py-2.5 text-sm font-regular text-primary-white"
              >
                Get started
              </button>
            </div>
          )
        ) : (
          <ContentLoader
            rtl
            speed={1}
            width={476}
            height={40}
            viewBox="0 0 476 40"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="400" y="16" rx="3" ry="3" width="88" height="6" />
            <rect x="290" y="16" rx="3" ry="3" width="88" height="6" />
            <rect x="180" y="16" rx="3" ry="3" width="88" height="6" />
            <rect x="120" y="8" rx="3" ry="3" width="24" height="24" />
            <rect x="74" y="8" rx="3" ry="3" width="24" height="24" />
            <circle cx="20" cy="20" r="20" />
          </ContentLoader>
        )}
      </nav>
    </Fragment>
  );
}
