import { useEffect } from "react";

import { useNote } from "../../../hooks/useNote";
import NotesCarousel from "./NoteCarousel";

export default function FeaturedNoteCarousel() {
  const { error, featuredNotes, getFeaturedNotes } = useNote();

  useEffect(() => {
    const fetchNotes = async () => {
      await getFeaturedNotes();
    };

    fetchNotes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    featuredNotes &&
    featuredNotes.length >= 1 && (
      <NotesCarousel
        headline={"Featured notes"}
        link={"/"}
        error={error}
        notes={featuredNotes}
      />
    )
  );
}
