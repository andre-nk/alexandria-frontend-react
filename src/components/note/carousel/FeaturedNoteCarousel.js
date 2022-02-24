import { useFeaturedNotes } from "../../../hooks/useNote";

import NotesCarousel from "./NoteCarousel";

export default function FeaturedNoteCarousel() {
  let localError = false;
  const { featuredNotesQuery } = useFeaturedNotes();

  if(featuredNotesQuery.error === null && featuredNotesQuery.data === null){
    localError = true;
  }

  return (
    featuredNotesQuery.isSuccess && (
      <NotesCarousel
        headline={"Featured notes"}
        link={"/"}
        error={featuredNotesQuery.error ?? localError}
        notes={featuredNotesQuery.data ?? []}
      />
    )
  );
}
