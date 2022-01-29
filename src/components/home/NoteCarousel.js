import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import NoteCard from "./NoteCard";
import { Fragment } from "react";

export default function NotesCarousel({
  swiperRef,
  swiperActiveIndex,
  setSwiperActiveIndex,
  setIsSwiperEnded,
}) {
  const mockNotes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Fragment>
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
          {mockNotes.map((note) => {
            return (
              <SwiperSlide key={note}>
                <NoteCard
                  title={"Flutter: loop in build() method"}
                  author={"Andreas Notokusumo"}
                  isStarred={false}
                  tags={["flutter", "mobile"]}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
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
          {mockNotes.map((note) => {
            return (
              <SwiperSlide key={note}>
                <NoteCard
                  title={"Flutter: loop in build() method"}
                  author={"Andreas Notokusumo"}
                  isStarred={false}
                  tags={["flutter", "mobile"]}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Fragment>
  );
}
