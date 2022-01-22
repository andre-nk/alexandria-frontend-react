import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import NoteCard from "./NoteCard";

export default function NotesCarousel({
  swiperRef,
  swiperActiveIndex,
  setSwiperActiveIndex,
  setIsSwiperEnded,
}) {
  return (
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
      <SwiperSlide>
        <NoteCard
          key="1"
          title={"Flutter: loop in build() method"}
          author={"Andreas Notokusumo"}
          isStarred={true}
          tags={["flutter", "mobile"]}
        />
      </SwiperSlide>
      <SwiperSlide>
        <NoteCard
          key="2"
          title={"Flutter: loop in build() method"}
          author={"Andreas Notokusumo"}
          isStarred={false}
          tags={["flutter", "mobile"]}
        />
      </SwiperSlide>
      <SwiperSlide>
        <NoteCard
          key="3"
          title={"Flutter: loop in build() method"}
          author={"Andreas Notokusumo"}
          isStarred={false}
          tags={["flutter", "mobile"]}
        />
      </SwiperSlide>
      <SwiperSlide>
        <NoteCard
          key="4"
          title={"Flutter: loop in build() method"}
          author={"Andreas Notokusumo"}
          isStarred={false}
          tags={["flutter", "mobile"]}
        />
      </SwiperSlide>
      <SwiperSlide>
        <NoteCard
          key="5"
          title={"Flutter: loop in build() method"}
          author={"Andreas Notokusumo"}
          isStarred={true}
          tags={["flutter", "mobile"]}
        />
      </SwiperSlide>
      <SwiperSlide>
        <NoteCard
          key="6"
          title={"Flutter: loop in build() method"}
          author={"Andreas Notokusumo"}
          isStarred={false}
          tags={["flutter", "mobile"]}
        />
      </SwiperSlide>
      <SwiperSlide>
        <NoteCard
          key="7"
          title={"Flutter: loop in build() method"}
          author={"Andreas Notokusumo"}
          isStarred={false}
          tags={["flutter", "mobile"]}
        />
      </SwiperSlide>
      <SwiperSlide>
        <NoteCard
          key="8"
          title={"Flutter: loop in build() method"}
          author={"Andreas Notokusumo"}
          isStarred={false}
          tags={["flutter", "mobile"]}
        />
      </SwiperSlide>
    </Swiper>
  );
}
