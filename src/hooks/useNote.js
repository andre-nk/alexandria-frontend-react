import { useAuthContext } from "./useAuthContext";
import axiosInstance from "../axios/axiosConfig";
import { useMutation, useQuery } from "react-query";
import { useLoadingContext } from "./useLoadingContext";

export const useNewNote = () => {
  const { user } = useAuthContext();
  const { dispatchLoadingCtx } = useLoadingContext();

  const createNoteMutation = useMutation(
    async ({ noteInstanceTitle, tags, content }) => {
      dispatchLoadingCtx({
        type: "START"
      });

      let noteInstance = JSON.stringify({
        title: noteInstanceTitle,
        creator_uid: user.uid,
        tags: tags,
        content: content,
        is_starred: false,
        is_comment_enabled: true,
        is_archived: false,
        pending_collaborators: [],
        collaborators: [],
      });

      const response = await axiosInstance.post("/notes", noteInstance, {
        headers: {
          Authorization: "Bearer " + user.uid,
        },
      });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      dispatchLoadingCtx({
        type: "STOP"
      });
    }
  );

  return { createNoteMutation };
};

export const useRecentNotes = () => {
  const { user } = useAuthContext();

  const fetchRecentNotes = async () => {
    try {
      const response = await axiosInstance.get(
        `/notes?recent=true&uid=${user.uid}`
      );

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const recentNotesQuery = useQuery("recentNotes", fetchRecentNotes, {
    staleTime: 5000,
  });

  return { recentNotesQuery };
};

export const useFeaturedNotes = () => {
  const { user } = useAuthContext();

  const fetchFeaturedNotes = async () => {
    try {
      const response = await axiosInstance.get(
        `/notes?featured=true&uid=${user.uid}`
      );

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      return response.data.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const featuredNotesQuery = useQuery("featuredNotes", fetchFeaturedNotes, {
    staleTime: 5000,
  });

  return { featuredNotesQuery };
};

export const useNoteByID = (id) => {
  const { user } = useAuthContext();

  const fetchNoteByID = async (id) => {
    try {
      let config = {
        headers: {
          Authorization: "Bearer " + user.uid,
        },
      };

      const response = await axiosInstance.get(`/notes/${id}`, config);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const noteByIDQuery = useQuery(
    ["noteByID", id],
    async () => {
      const data = await fetchNoteByID(id);
      return data;
    },
    {
      staleTime: 5000,
    }
  );

  return { noteByIDQuery };
};

export const useUpdateNote = () => {
  const { user } = useAuthContext();
  const { dispatchLoadingCtx } = useLoadingContext();

  const updateNoteMutation = useMutation(async ({ updatedNote, noteID }) => {
    try {
      dispatchLoadingCtx({
        type: "START"
      });

      updatedNote.creator_uid = user.uid;

      const response = await axiosInstance.put(
        `/notes/${noteID}`,
        updatedNote,
        {
          headers: {
            Authorization: "Bearer " + user.uid,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      dispatchLoadingCtx({
        type: "STOP"
      });
    } catch (err) {
      throw new Error(err.message);
    }
  });

  return { updateNoteMutation };
};

export const useTitleNote = () => {
  const { user } = useAuthContext();

  const titleNoteMutation = useMutation(async ({ oldNote, newTitle }) => {
    try {
      let noteInstance = {
        title: newTitle,
        creator_uid: user.uid,
        tags: oldNote.tags,
        content: oldNote.content,
        is_starred: oldNote.is_starred,
        is_comment_enabled: oldNote.is_comment_enabled,
        is_archived: oldNote.is_archived,
        pending_collaborators: oldNote.pending_collaborators,
        collaborators: oldNote.collaborators,
      };

      const response = await axiosInstance.put(
        `/notes/${oldNote._id}`,
        noteInstance,
        {
          headers: {
            Authorization: "Bearer " + user.uid,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  });

  return { titleNoteMutation };
};

export const useStarNote = () => {
  const { user } = useAuthContext();

  const starNoteMutation = useMutation(async ({ oldNote, isStarred }) => {
    try {
      let noteInstance = {
        title: oldNote.title,
        creator_uid: user.uid,
        tags: oldNote.tags ?? [],
        content: oldNote.content,
        is_starred: isStarred,
        is_comment_enabled: oldNote.is_comment_enabled,
        is_archived: oldNote.is_archived,
        pending_collaborators: oldNote.pending_collaborators,
        collaborators: oldNote.collaborators,
      };

      const response = await axiosInstance.put(
        `/notes/${oldNote._id}`,
        noteInstance,
        {
          headers: {
            Authorization: "Bearer " + user.uid,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  });

  return { starNoteMutation };
};

export const useArchiveNote = () => {
  const { user } = useAuthContext();

  const archiveNoteMutation = useMutation(async ({ oldNote, isArchived }) => {
    try {
      let noteInstance = {
        title: oldNote.title,
        creator_uid: user.uid,
        tags: oldNote.tags ?? [],
        content: oldNote.content,
        is_starred: oldNote.is_starred,
        is_comment_enabled: oldNote.is_comment_enabled,
        is_archived: isArchived,
        pending_collaborators: oldNote.pending_collaborators,
        collaborators: oldNote.collaborators,
      };

      const response = await axiosInstance.put(
        `/notes/${oldNote._id}`,
        noteInstance,
        {
          headers: {
            Authorization: "Bearer " + user.uid,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  });

  return { archiveNoteMutation };
};

export const useCommentNote = () => {
  const { user } = useAuthContext();

  const commentNoteMutation = useMutation(
    async ({ oldNote, isCommentEnabled }) => {
      try {
        let noteInstance = {
          title: oldNote.title,
          creator_uid: user.uid,
          tags: oldNote.tags ?? [],
          content: oldNote.content,
          is_starred: oldNote.is_starred,
          is_comment_enabled: isCommentEnabled,
          is_archived: oldNote.is_archived,
          pending_collaborators: oldNote.pending_collaborators,
          collaborators: oldNote.collaborators,
        };

        const response = await axiosInstance.put(
          `/notes/${oldNote._id}`,
          noteInstance,
          {
            headers: {
              Authorization: "Bearer " + user.uid,
            },
          }
        );

        if (response.status !== 200) {
          throw new Error(response.data.message);
        }
      } catch (err) {
        throw new Error(err.message);
      }
    }
  );

  return { commentNoteMutation };
};

export const useTagsNote = () => {
  const { user } = useAuthContext();

  const tagsNoteMutation = useMutation(async ({ oldNote, newTags }) => {
    try {
      let noteInstance = {
        title: oldNote.title,
        creator_uid: user.uid,
        tags: newTags ?? [],
        content: oldNote.content,
        is_starred: oldNote.is_starred,
        is_comment_enabled: oldNote.is_comment_enabled,
        is_archived: oldNote.is_archived,
        pending_collaborators: oldNote.pending_collaborators,
        collaborators: oldNote.collaborators,
      };

      const response = await axiosInstance.put(
        `/notes/${oldNote._id}`,
        noteInstance,
        {
          headers: {
            Authorization: "Bearer " + user.uid,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  });

  return { tagsNoteMutation };
};

export const useDeleteNote = () => {
  const { user } = useAuthContext();
  const { dispatchLoadingCtx } = useLoadingContext();

  const deleteNoteMutation = useMutation(async ({ noteID }) => {
    try {
      dispatchLoadingCtx({
        type: "START"
      });
      
      let config = {
        headers: {
          Authorization: "Bearer " + user.uid,
        },
      };

      const response = await axiosInstance.delete(`/notes/${noteID}`, config);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }

      dispatchLoadingCtx({
        type: "STOP"
      });
    } catch (err) {
      throw new Error(err.message);
    }
  });

  return { deleteNoteMutation };
};
