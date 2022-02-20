import { useFeaturedNotes } from "../../../hooks/useNote";

import NotesCarousel from "./NoteCarousel";

export default function FeaturedNoteCarousel() {
  const { featuredNotesQuery } = useFeaturedNotes();

  return (
    featuredNotesQuery.isSuccess && (
      <NotesCarousel
        headline={"Featured notes"}
        link={"/"}
        error={featuredNotesQuery.error}
        notes={featuredNotesQuery.data ?? []}
      />
    )
  );
}
