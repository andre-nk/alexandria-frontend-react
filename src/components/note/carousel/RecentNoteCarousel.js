import { useEffect } from "react";

import { useNote } from "../../../hooks/useNote";
import NotesCarousel from "./NoteCarousel";

export default function RecentNoteCarousel() {
  const { error, recentNotes, getRecentNotes } = useNote();

  useEffect(() => {
    const fetchNotes = async () => {
      await getRecentNotes();
    };

    fetchNotes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (recentNotes) {
    return (
      <NotesCarousel
        headline={"Recent notes"}
        link={"/"}
        error={error}
        notes={recentNotes}
      />
    );
  }
}
