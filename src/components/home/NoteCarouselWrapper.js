import { useRef, useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import NotesCarousel from "./NoteCarousel";

export default function NotesCarouselWrapper({ headline, link }) {
  const swiperRef = useRef(null);
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(0);
  const [isSwiperEnded, setIsSwiperEnded] = useState(false);

  console.log(swiperActiveIndex);

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
            <NotesCarousel
              swiperRef={swiperRef}
              swiperActiveIndex={swiperActiveIndex}
              setSwiperActiveIndex={setSwiperActiveIndex}
              setIsSwiperEnded={setIsSwiperEnded}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
