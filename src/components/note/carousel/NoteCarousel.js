import "swiper/css";
import { Fragment, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import NoteCard from "./NoteCard";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function NotesCarousel({ notes, error, headline, link }) {
  const { user } = useAuthContext();

  const swiperRef = useRef(null);
  const [isNoteAvailable, setisNoteAvailable] = useState(false);
  const [isSwiperEnded, setIsSwiperEnded] = useState(false);
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(0);

  useEffect(() => {
    notes.forEach((note) => {
      if (!note.is_archived) {
        setisNoteAvailable(true);
      }
    });
  }, [setisNoteAvailable, notes]);

  return (
    <div>
      <div className="w-full flex justify-between px-10">
        <h2 className="text-3xl font-semibold">{headline}</h2>
        <a href={link}>
          <p className="underline cursor-pointer text-minor-text hover:text-major-text duration-200">
            see all notes
          </p>
        </a>
      </div>
      {!error && isNoteAvailable ? (
        <div className="relative flex flex-col justify-center">
          <div className="w-full absolute flex justify-between px-5">
            <button
              disabled={swiperActiveIndex <= 0}
              className={`${
                swiperActiveIndex > 0 ? "opacity-100" : "opacity-0"
              } duration-100 drop-shadow-md h-10 w-10 z-10 flex justify-center items-center bg-primary-white hover:bg-slate-100 rounded-md border border-minor-text`}
              onClick={() => {
                swiperRef.current.swiper.slidePrev();
              }}
            >
              <IoChevronBack size={18} className="text-major-text" />
            </button>
            <button
              disabled={isSwiperEnded}
              className={`${
                !isSwiperEnded ? "opacity-100" : "opacity-0"
              } duration-100 drop-shadow-md h-10 w-10 z-10 flex justify-center items-center bg-primary-white hover:bg-slate-100 rounded-md border border-minor-text`}
              onClick={() => {
                swiperRef.current.swiper.slideNext();
              }}
            >
              <IoChevronForward size={18} className="text-major-text" />
            </button>
          </div>
          <div className="flex w-full pt-4 px-6">
            <div className="px-4 w-full">
              <Fragment>
                {/* MOBILE */}
                <div className="block lg:hidden">
                  <Swiper
                    spaceBetween={32}
                    ref={swiperRef}
                    onReachEnd={() => {
                      setIsSwiperEnded(true);
                    }}
                    onActiveIndexChange={(swiper) => {
                      if (swiperActiveIndex > swiper.activeIndex) {
                        setIsSwiperEnded(false);
                      }
                      setSwiperActiveIndex(swiper.activeIndex);
                    }}
                  >
                    {notes.map((note) => {
                      if (note.is_archived) {
                        return <div key={note._id}></div>;
                      }

                      return (
                        <SwiperSlide key={note._id}>
                          <NoteCard
                            _id={note._id}
                            title={note.title}
                            author={user.displayName}
                            isStarred={note.is_starred}
                            tags={note.tags}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>

                {/* DESKTOP */}
                <div className="hidden lg:block">
                  <Swiper
                    spaceBetween={32}
                    slidesPerView={3}
                    ref={swiperRef}
                    onReachEnd={() => {
                      setIsSwiperEnded(true);
                    }}
                    onActiveIndexChange={(swiper) => {
                      if (swiperActiveIndex > swiper.activeIndex) {
                        setIsSwiperEnded(false);
                      }
                      setSwiperActiveIndex(swiper.activeIndex);
                    }}
                  >
                    {notes.map((note) => {
                      if (note.is_archived) {
                        return <div key={note._id}></div>;
                      }

                      return (
                        <SwiperSlide key={note._id}>
                          <NoteCard
                            _id={note._id}
                            title={note.title}
                            author={user.displayName}
                            isStarred={note.is_starred}
                            tags={note.tags}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </Fragment>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex  w-full justify-center items-center py-20 px-10">
          <div className="relative flex justify-center items-center">
            <img
              className="max-w-xl absolute top-0"
              src={`/404/brush-` + [Math.floor(Math.random() * 4) + 1] + `.png`}
              alt="404.png"
            />
            <div className="flex z-10 flex-col space-y-2 justify-center items-start">
              <h2 className="text-2xl font-medium text-major-text">
                There are no notes here...
              </h2>
              <div className="text-base text-major-text">
                Check your archived notes, or{" "}
                <a
                  href="/notes/new/Untitled note"
                  className="underline hover:text-primary-blue duration-200"
                >
                  create
                </a>{" "}
                a new one!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
