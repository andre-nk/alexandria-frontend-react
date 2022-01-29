import Helmet from "react-helmet";
import { Tab } from "@headlessui/react";
import ReactTooltip from "react-tooltip";
import { IoPeople, IoCloudOffline, IoPencilSharp } from "react-icons/io5";

export default function AppPage() {
  let categories = {
    MacOS: {
      title: "Alexandria on MacOS",
      downloadLink: "https://live.pramborsfm.com/",
      features: [
        {
          icon: <IoCloudOffline size={20} />,
          title: "Offline Mode",
        },
        {
          icon: <IoPeople size={20} />,
          title: "Collaborative",
        },
        {
          icon: <IoPencilSharp size={20} />,
          title: "Editor",
        },
        {
          icon: (
            <img
              src="/vscode-black.svg"
              alt="vscode-import"
              height={20}
              width={20}
              color={"#00000"}
            />
          ),
          title: "VSCode Import",
        },
      ],
    },
    Windows: {
      title: "Alexandria on Windows",
      downloadLink: "https://live.pramborsfm.com/",
      features: [
        {
          icon: <IoCloudOffline size={20} />,
          title: "Offline Mode",
        },
        {
          icon: <IoPeople size={20} />,
          title: "Collaborative",
        },
        {
          icon: <IoPencilSharp size={20} />,
          title: "Editor",
        },
        {
          icon: (
            <img
              src="/vscode-black.svg"
              alt="vscode-import"
              height={20}
              width={20}
              color={"#00000"}
            />
          ),
          title: "VSCode Import",
        },
      ],
    },
    Linux: {
      title: "Alexandria on Linux",
      downloadLink: "https://live.pramborsfm.com/",
      features: [
        {
          icon: <IoCloudOffline size={20} />,
          title: "Offline Mode",
        },
        {
          icon: <IoPeople size={20} />,
          title: "Collaborative",
        },
        {
          icon: <IoPencilSharp size={20} />,
          title: "Editor",
        },
        {
          icon: (
            <img
              src="/vscode-black.svg"
              alt="vscode-import"
              height={20}
              width={20}
              color={"#00000"}
            />
          ),
          title: "VSCode Import",
        },
      ],
    },
    iOS: {
      title: "Alexandria on iOS",
      downloadLink: "https://live.pramborsfm.com/",
      features: [
        {
          icon: <IoCloudOffline size={20} />,
          title: "Offline Mode",
        },
        {
          icon: <IoPeople size={20} />,
          title: "Collaborative",
        },
        {
          icon: <IoPencilSharp size={20} />,
          title: "Editor",
        },
        {
          icon: (
            <img
              src="/vscode-black.svg"
              alt="vscode-import"
              height={20}
              width={20}
              color={"#00000"}
            />
          ),
          title: "VSCode Import",
        },
      ],
    },
    Android: {
      title: "Alexandria on Android",
      downloadLink: "https://live.pramborsfm.com/",
      features: [
        {
          icon: <IoCloudOffline size={20} />,
          title: "Offline Mode",
        },
        {
          icon: <IoPeople size={20} />,
          title: "Collaborative",
        },
        {
          icon: <IoPencilSharp size={20} />,
          title: "Editor",
        },
        {
          icon: (
            <img
              src="/vscode-black.svg"
              alt="vscode-import"
              height={20}
              width={20}
              color={"#00000"}
            />
          ),
          title: "VSCode Import",
        },
      ],
    },
    VSCode: {
      title: "Alexandria on VSCode",
      downloadLink: "https://live.pramborsfm.com/",
      features: [
        {
          icon: <IoCloudOffline size={20} />,
          title: "Offline Mode",
        },
        {
          icon: <IoPeople size={20} />,
          title: "Collaborative",
        },
        {
          icon: <IoPencilSharp size={20} />,
          title: "Editor",
        },
        {
          icon: (
            <img
              src="/vscode-black.svg"
              alt="vscode-import"
              height={20}
              width={20}
              color={"#00000"}
            />
          ),
          title: "VSCode Import",
        },
      ],
    },
  };

  return (
    <div>
      <Helmet>
        <title>Download Apps - Alexandria</title>
        <meta
          name="Get our apps"
          content="Alexandria is widely available for many platforms and definitely will enhance your experience and allows even easier access ⚡️!"
        />
      </Helmet>
      <div className="w-full bg-primary-bg flex justify-between">
        <div className="w-full lg:w-4/12 flex px-10 lg:px-0 lg:pl-20 py-24 flex-col space-y-5">
          <h2 className="text-4xl font-semibold">Get the apps!</h2>
          <div className="flex flex-col">
            <p className="text-lg">
              Alexandria is widely available for many platforms and definitely
              will enhance your experience and allows even easier access ⚡️!
            </p>
            <br />
            <i>P.S. We got a VSCode Extension too! 🔥</i>
          </div>
        </div>
        <div className="w-5/12 hidden lg:block relative">
          <img
            alt="background"
            src="/ornament-white.svg"
            className="object-cover h-full"
          />
        </div>
      </div>
      <div className="w-full px-10 py-10 lg:px-20 lg:py-16">
        <div className="border border-gray-200 rounded-xl p-4 pb-6">
          <Tab.Group>
            <Tab.List className="flex overflow-x-auto space-x-4">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    `px-6 py-3 text-md leading-5 rounded-lg ${
                      selected
                        ? "bg-primary-blue text-white"
                        : "text-primary-black hover:bg-primary-border duration-200"
                    }`
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {Object.values(categories).map((posts, idx) => (
                <Tab.Panel key={idx} className="px-6 pt-12 py-5">
                  <div className="w-full flex flex-col space-y-6 lg:space-y-0 lg:flex-row justify-evenly items-center">
                    <div className="lg:flex-[5]">
                      <img src="/mockup-macos.png" alt="macos-mockup.png" />
                    </div>
                    <div className="flex-[1] bg-gray-50"></div>
                    <div className="flex-[5]">
                      <h2 className="text-4xl font-semibold">{posts.title}</h2>
                      <div className="w-full flex space-x-4 mt-5">
                        {posts.features.map((feature, index) => (
                          <div
                            key={index}
                            className="p-2.5 rounded-md bg-gray-100"
                          >
                            <p data-tip={feature.title}>{feature.icon}</p>
                            <ReactTooltip
                              place="bottom"
                              type="dark"
                              effect="solid"
                              className="p-0"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => {
                          window.open(posts.downloadLink);
                        }}
                        className="mt-10 lg:mt-12 rounded-md bg-primary-blue text-white px-6 py-2.5"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}
