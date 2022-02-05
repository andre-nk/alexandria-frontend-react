import { useAuthContext } from "./useAuthContext";
import { useLoadingContext } from "./useLoadingContext";
import axiosInstance from "../axios/axiosConfig";
import { useCallback, useState } from "react";

export const useNote = () => {
  const { user } = useAuthContext();
  const { dispatch } = useLoadingContext();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [noteByID, setNoteByID] = useState(null);
  const [recentNotes, setRecentNotes] = useState([]);
  const [featuredNotes, setFeaturedNotes] = useState([]);

  const createNote = async (title, tags, content) => {
    setSuccess(null);
    setError(null);
    dispatch({
      type: "START",
    });

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

    dispatch({
      type: "STOP",
    });
  };

  const getRecentNotes = async () => {
    setSuccess(null);
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
    setSuccess(null);
    setError(null);
    dispatch({
      type: "START",
    });

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

    dispatch({
      type: "STOP",
    });
  });

  const updateNote = async (updatedNote, noteID) => {
    setSuccess(null);
    setError(null);
    dispatch({
      type: "START",
    });

    try {
      updatedNote.creator_uid = user.uid;
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

    dispatch({
      type: "STOP",
    });
  };

  const updateNoteTitle = useCallback(async (oldNote, newTitle) => {
    setSuccess(null);
    setError(null);
    dispatch({
      type: "START",
    });

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

    dispatch({
      type: "STOP",
    });
  });

  const starNote = useCallback(async (oldNote, isStarred) => {
    setSuccess(null);
    setError(null);
    dispatch({
      type: "START",
    });

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

      dispatch({
        type: "STOP",
      });
    } catch (error) {
      setError(error);

      dispatch({
        type: "STOP",
      });
    }
  });

  const archiveNote = useCallback(async (oldNote, isArchived) => {
    setSuccess(null);
    setError(null);
    dispatch({
      type: "START",
    });

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

    dispatch({
      type: "STOP",
    });
  });

  const commentNote = useCallback(async (oldNote, isCommentEnabled) => {
    setSuccess(null);
    setError(null);
    dispatch({
      type: "START",
    });

    let noteInstance = {
      title: oldNote.title,
      creator_uid: user.uid,
      tags: oldNote.tags,
      content: oldNote.content,
      is_starred: oldNote.is_starred,
      is_comment_enabled: isCommentEnabled,
      is_archived: oldNote.is_archived,
      collaborators: oldNote.collaborators,
    };

    try {
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
        let successMessage = isCommentEnabled
          ? "Note's comment has been enabled"
          : "Note's comment has been disabled";
        setSuccess(successMessage);
      } else {
        setError(response.data.data);
      }
    } catch (error) {
      setError(error);
    }

    dispatch({
      type: "STOP",
    });
  });

  const deleteNote = useCallback(async (noteID) => {
    setSuccess(null);
    setError(null);
    dispatch({
      type: "START",
    });

    try {
      let config = {
        headers: {
          Authorization: "Bearer " + user.uid,
        },
      };

      const response = await axiosInstance.delete(
        `/notes/${noteID}`,
        config
      );

      if (response.status === 200) {
        setSuccess("Note has been deleted!");
      } else {
        setError(response.data.data);
      }
    } catch (error) {
      setError(error);
    }

    dispatch({
      type: "STOP",
    });
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
    commentNote,
    deleteNote,
  };
};
