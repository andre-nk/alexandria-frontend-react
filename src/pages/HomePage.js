import { Fragment } from "react";
import Helmet from "react-helmet";

import { useAuthContext } from "../hooks/useAuthContext";
import SearchBar from "../components/home/SearchBar";
import CTASection from "../components/home/CTASection";
import AboutPoints from "../components/about/AboutPoints";
import RecentNoteCarousel from "../components/note/carousel/RecentNoteCarousel";
import FeaturedNoteCarousel from "../components/note/carousel/FeaturedNoteCarousel";

export default function Home({ aboutSectionRef }) {
  const { user, isAuthReady } = useAuthContext();

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
        <div className="px-10 flex flex-col mb-6 justify-center items-center h-full z-10 lg:w-7/12">
          <div className="pb-6 w-10/12 md:w-7/12">
            <img alt="logo" src="/logo-text.png" />
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
          className="object-cover h-full w-full absolute z-0 top-0"
        />
      </div>
      {user && (
        <div className="py-16 space-y-20 w-full bg-[rgb(247,247,247)]">
            <RecentNoteCarousel />
            <FeaturedNoteCarousel />
        </div>
      )}
      {(!user && isAuthReady) && (
        <div className="py-16 w-full bg-white" ref={aboutSectionRef}>
          <AboutPoints />
          <CTASection />
        </div>
      )}
    </Fragment>
  );
}
