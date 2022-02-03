import { useAuthContext } from "./useAuthContext";
import axiosInstance from "../axios/axiosConfig";
import { useState } from "react";

export const useNote = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
        setSuccess("Your profile has been updated");
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

  return {
    error,
    success,
    recentNotes,
    featuredNotes,
    createNote,
    getRecentNotes
  };
};
