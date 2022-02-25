import { useMutation, useQuery } from "react-query";

import axiosInstance from "../axios/axiosConfig";
import { useAuthContext } from "./useAuthContext";

export const useCreateComment = () => {
  const { user } = useAuthContext();

  const createCommentMutation = useMutation(async ({ noteID, content }) => {
    let commentInstance = JSON.stringify({
      note_id: noteID,
      creator_uid: user.uid,
      content,
    });

    const response = await axiosInstance.post("/comments", commentInstance, {
      headers: {
        Authorization: "Bearer " + user.uid,
      },
    });

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
  });

  return { createCommentMutation };
};

export const useDeleteComment = () => {
  const { user } = useAuthContext();

  const deleteCommentMutation = useMutation(async ({ noteID, commentID }) => {
    const response = await axiosInstance.delete(
      `/notes/${noteID}/comments/${commentID}`,
      {
        headers: {
          Authorization: "Bearer " + user.uid,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
  });

  return { deleteCommentMutation };
};

export const useGetNoteComments = (id) => {
  const fetchNoteComments = async () => {
    try {
      const response = await axiosInstance.get(`/notes/${id}/comments`);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const noteCommentsQuery = useQuery(
    ["noteComments", id],
    async () => {
      const response = await fetchNoteComments(id);
      return response;
    },
    {
      staleTime: 5000,
    }
  );

  return { noteCommentsQuery };
};
