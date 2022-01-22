import { Fragment } from "react";

import NotesCarouselWrapper from "../components/home/NoteCarouselWrapper";
import SearchBar from "../components/home/SearchBar";

export default function Home() {
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
      {/* <div className="flex flex-col h-[90vh] bg-white relative justify-center align-middle items-center lg:w-full p-8 pt-0">
        <div className="z-10 lg:w-7/12 flex flex-col">
          <div className="px-6 pb-6 self-center">
            <img alt="logo" src="/logo-text.png" height={90.5} width={422} />
          </div>
          <SearchBar />
          <p className="font-light text-major-text text-center">
            Dedicated <span className="font-semibold">space</span> for your
            personal programming-related notes.
          </p>
        </div>
        <img alt="background" src="/ornament.svg" className="object-cover" />
      </div> */}
      <div className="py-16 space-y-20 w-full bg-[rgb(247,247,247)] ">
        <NotesCarouselWrapper headline={"Recent notes"} link={"/notes"} />
        <NotesCarouselWrapper headline={"Featured notes"} link={"/notes"} />
      </div>
    </Fragment>
  );
}
