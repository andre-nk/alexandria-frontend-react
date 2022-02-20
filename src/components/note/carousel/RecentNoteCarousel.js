import { useRecentNotes } from "../../../hooks/useNote";

import NotesCarousel from "./NoteCarousel";

export default function RecentNoteCarousel() {
  const { recentNotesQuery } = useRecentNotes();

  return (
    recentNotesQuery.isSuccess && (
      <NotesCarousel
        headline={"Recent notes"}
        link={"/"}
        error={recentNotesQuery.error}
        notes={recentNotesQuery.data ?? []}
      />
    )
  );
}
