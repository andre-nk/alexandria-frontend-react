import { Fragment } from "react";
import Helmet from "react-helmet";

import { useAuthContext } from "../hooks/useAuthContext";
import NotesCarouselWrapper from "../components/home/NoteCarouselWrapper";
import SearchBar from "../components/home/SearchBar";
import CTASection from "../components/home/CTASection";
import AboutPoints from "../components/about/AboutPoints";

export default function Home({ aboutSectionRef }) {
  const { user } = useAuthContext();

  return (
    <Fragment>
      <Helmet>
        <title>Alexandria</title>
        <meta
          name="Homepage"
          content="We are a dead-simple notetaking app for your programming-related otes, but way more than that."
        />
      </Helmet>
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
        <div className="py-16 w-full bg-white" ref={aboutSectionRef}>
          <AboutPoints />
          <CTASection />
        </div>
      )}
    </Fragment>
  );
}
