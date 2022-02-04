import { useAuthContext } from "./useAuthContext";
import axiosInstance from "../axios/axiosConfig";
import { useCallback, useState } from "react";

export const useNote = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [noteByID, setNoteByID] = useState(null);
  const [recentNotes, setRecentNotes] = useState([]);
  const [featuredNotes, setFeaturedNotes] = useState([]);

  const createNote = async (title, tags, content) => {
    let noteInstance = JSON.stringify({
      title: title,
      creator_uid: user.uid,
      tags: tags,
      content: content,
      is_starred: true,
      is_comment_enabled: true,
      is_archived: false,
      collaborators: [],
    });

    try {
      setError(null);

      let config = {
        headers: {
          Authorization: "Bearer " + user.uid,
        },
      };

      const response = await axiosInstance.post("/notes", noteInstance, config);

      if (response.status === 200) {
        setSuccess("Note has been created");
      } else {
        setError(response.data.data);
      }
    } catch (error) {
      setError(error);
    }
  };

  const getRecentNotes = async () => {
    setError(null);
    try {
      const response = await axiosInstance.get(
        `/notes?recent=true&uid=${user.uid}`
      );

      if (response.status === 200) {
        setSuccess("Recent notes has been fetched!");
        setRecentNotes(response.data.data);
      }
    } catch (error) {
      setError(error);
    }
  };

  const getNoteByID = useCallback(async (id) => {
    setError(null);
    try {
      let config = {
        headers: {
          Authorization: "Bearer " + user.uid,
        },
      };

      const response = await axiosInstance.get(`/notes/${id}`, config);

      if (response.status === 200) {
        setSuccess("Note has been fetched!");
        setNoteByID(response.data.data);
      }
    } catch (error) {
      setError(error);
    }
  });

  const updateNote = async (updatedNote, noteID) => {
    updatedNote.creator_uid = user.uid;

    console.log(updatedNote);

    try {
      setError(null);

      let config = {
        headers: {
          Authorization: "Bearer " + user.uid,
        },
      };

      const response = await axiosInstance.put(
        `/notes/${noteID}`,
        updatedNote,
        config
      );

      if (response.status === 200) {
        setSuccess("User has been updated!");
      } else {
        setError(response.data.data);
      }
    } catch (error) {
      setError(error);
    }
  };

  const updateNoteTitle = useCallback(async (oldNote, newTitle) => {
    let noteInstance = {
      title: newTitle,
      creator_uid: user.uid,
      tags: oldNote.tags,
      content: oldNote.content,
      is_starred: oldNote.is_starred,
      is_comment_enabled: oldNote.is_comment_enabled,
      is_archived: oldNote.is_archived,
      collaborators: oldNote.collaborators,
    };

    try {
      setError(null);

      let config = {
        headers: {
          Authorization: "Bearer " + user.uid,
        },
      };

      const response = await axiosInstance.put(
        `/notes/${oldNote._id}`,
        noteInstance,
        config
      );

      if (response.status === 200) {
        setSuccess("Note's title has been updated");
      } else {
        setError(response.data.data);
      }
    } catch (error) {
      setError(error);
    }
  });

  const starNote = useCallback(async (oldNote, isStarred) => {
    let noteInstance = {
      title: oldNote.title,
      creator_uid: user.uid,
      tags: oldNote.tags,
      content: oldNote.content,
      is_starred: isStarred,
      is_comment_enabled: oldNote.is_comment_enabled,
      is_archived: oldNote.is_archived,
      collaborators: oldNote.collaborators,
    };

    try {
      setError(null);

      let config = {
        headers: {
          Authorization: "Bearer " + user.uid,
        },
      };

      const response = await axiosInstance.put(
        `/notes/${oldNote._id}`,
        noteInstance,
        config
      );

      if (response.status === 200) {
        let successMessage = isStarred
          ? "Note has been starred"
          : "Note has been unstarred";
        setSuccess(successMessage);
      } else {
        setError(response.data.data);
      }
    } catch (error) {
      setError(error);
    }
  });

  const archiveNote = useCallback(async (oldNote, isArchived) => {
    let noteInstance = {
      title: oldNote.title,
      creator_uid: user.uid,
      tags: oldNote.tags,
      content: oldNote.content,
      is_starred: oldNote.is_starred,
      is_comment_enabled: oldNote.is_comment_enabled,
      is_archived: isArchived,
      collaborators: oldNote.collaborators,
    };

    try {
      setError(null);

      let config = {
        headers: {
          Authorization: "Bearer " + user.uid,
        },
      };

      const response = await axiosInstance.put(
        `/notes/${oldNote._id}`,
        noteInstance,
        config
      );

      if (response.status === 200) {
        let successMessage = isArchived
          ? "Note has been archived"
          : "Note has been unarchived";
        setSuccess(successMessage);
      } else {
        setError(response.data.data);
      }
    } catch (error) {
      setError(error);
    }
  });

  return {
    error,
    success,
    recentNotes,
    featuredNotes,
    noteByID,
    createNote,
    getNoteByID,
    getRecentNotes,
    updateNoteTitle,
    starNote,
    archiveNote,
    updateNote,
  };
};
