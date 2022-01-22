import { Fragment } from "react";

import NotesCarouselWrapper from "../components/home/NoteCarouselWrapper";
import Footer from "../components/navigation/Footer";
import SearchBar from "../components/home/SearchBar";

export default function Home() {
  return (
    <Fragment>
      <div className="flex flex-col bg-white justify-center items-center lg:w-full">
        <div className="z-10 flex flex-col justify-center px-10 pt-0">
          <div className="px-6 pb-6 self-center">
            <img alt="logo" src="/logo-text.png" height={90.5} width={422} />
          </div>
          <SearchBar />
          <p className="font-light text-major-text text-center">
            Dedicated <span className="font-semibold">space</span> for your
            personal programming-related notes.
          </p>
        </div>
        <div className="h-[40vh] absolute top-0 z-0 overflow-hidden">
          <img alt="background" src="/ornament.svg" className="object-fill" />
        </div>
      </div>
      <div className="py-16 space-y-20 w-full bg-[rgb(247,247,247)] ">
        <NotesCarouselWrapper headline={"Recent notes"} link={"/notes"} />
        <NotesCarouselWrapper headline={"Featured notes"} link={"/notes"} />
      </div>
      <Footer />
    </Fragment>
  );
}
