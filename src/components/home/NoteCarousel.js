import "swiper/css";
import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import NoteCard from "./NoteCard";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function NotesCarousel({
  notes,
  swiperRef,
  swiperActiveIndex,
  setSwiperActiveIndex,
  setIsSwiperEnded,
}) {
  const { user } = useAuthContext();

  return (
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
  );
}
