import { Fragment } from "react";

import { useAuthContext } from "../hooks/useAuthContext";
import NotesCarouselWrapper from "../components/home/NoteCarouselWrapper";
import SearchBar from "../components/home/SearchBar";

export default function Home() {
  // const { user, isAuthReady } = useAuthContext();
  const user = null;

  return (
    <Fragment>
      <div className="flex flex-col justify-center items-center w-full relative h-[90vh] bg-white overflow-clip">
        <div className=" flex flex-col mb-6 justify-center items-center h-full z-10 lg:w-7/12">
          <div className="pb-6">
            <img alt="logo" src="/logo-text.png" height={90.5} width={422} />
          </div>
          <SearchBar />
          <p className="font-light text-major-text text-center">
            Dedicated <span className="font-semibold">space</span> for your
            personal programming-related notes.
          </p>
        </div>
        <img
          alt="background"
          src="/ornament.svg"
          className="object-cover absolute z-0 top-0"
        />
      </div>
      {user && (
        <div className="py-16 space-y-20 w-full bg-[rgb(247,247,247)]">
          <NotesCarouselWrapper headline={"Recent notes"} link={"/notes"} />
          <NotesCarouselWrapper headline={"Featured notes"} link={"/notes"} />
        </div>
      )}
      {!user && (
        <div className="py-16 flex flex-col space-y-32 w-full bg-white">
          <div className="w-1/2 px-20 flex flex-col space-y-5">
            <h2 className="text-4xl font-semibold">What is Alexandria?</h2>
            <p className="text-lg leading-8">
              We are a dead-simple notetaking app for your programming-related
              notes, but way more than that. Here, you can easily share your
              notes with your teams and swiftly access their code snippet into
              your project in VSCode!
            </p>
          </div>
          <div className="w-full px-20 flex flex-row-reverse items-center justify-between">
            <div className="w-5/12 space-y-5">
              <h2 className="text-4xl font-semibold">Simply elegant editor.</h2>
              <p className="text-lg leading-8">
                Alexandria provides an elegant and easy-to-use editor just for
                you. More than just a rich-text editor, we crafted a dedicated
                code snippet feature with some famous theme highlighters and a
                bunch of language support. It will exactly feel like your
                day-to-day IDE!
              </p>
            </div>
            <div className="w-5/12 bg-gray-200"></div>
          </div>
          <div className="w-full px-20 flex items-center justify-between">
            <div className="w-5/12 space-y-5">
              <h2 className="text-4xl font-semibold">Swift access!</h2>
              <p className="text-lg leading-8">
                Alexandria is available throughout many platforms, even a VSCode
                Extension. The extension allows you can manage your notes and
                quickly drop your code snippets directly to your current
                project!
              </p>
            </div>
            <div className="w-5/12 bg-gray-200"></div>
          </div>
          <div className="w-full px-20 flex flex-row-reverse items-center justify-between">
            <div className="w-5/12 space-y-5">
              <h2 className="text-4xl font-semibold">Safe and Share!</h2>
              <p className="text-lg leading-8">
                Easily collaborate with your teams through our secured share,
                including a live edit and comments! We made it easy to connect
                your teams and notes -- so you can discuss and move as one!
              </p>
            </div>
            <div className="w-5/12 bg-gray-200"></div>
          </div>
          <div className="w-full px-20 flex flex-col justify-center items-center">
            <div className="h-20 w-20">
              <img src="/logo.png" alt="logo" className="object-cover" />
            </div>
            <h2 className="text-4xl mt-6 mb-4 font-semibold">
              Try Alexandria today.
            </h2>
            <p className="text-lg text-major-text">
              Start taking your notes and see them in action!
            </p>
            <p className="text-lg text-major-text mt-1">
              It's free. Indefinitely.
            </p>
            <button className="bg-primary-blue px-10 py-2.5 mt-8 min-h-full text-primary-bg hover:bg-active-blue rounded-md text-base border duration-200">
              Try Alexandria free
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}
