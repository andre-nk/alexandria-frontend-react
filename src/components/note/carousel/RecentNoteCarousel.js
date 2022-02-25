import { useRecentNotes } from "../../../hooks/useNote";

import NotesCarousel from "./NoteCarousel";

export default function RecentNoteCarousel() {
  let localError = false;
  const { recentNotesQuery } = useRecentNotes();

  if(recentNotesQuery.error === null && recentNotesQuery.data === null){
    localError = true;
  }

  console.log(recentNotesQuery.error === null);

  return (
    recentNotesQuery.isSuccess && (
      <NotesCarousel
        headline={"Recent notes"}
        link={"/"}
        error={recentNotesQuery.error ?? localError}
        notes={recentNotesQuery.data ?? []}
      />
    )
  );
}
