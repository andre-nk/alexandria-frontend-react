import { useState } from "react";
import { useQuery } from "react-query";

import axiosInstance from "../axios/axiosConfig";
import { useAuthContext } from "../hooks/useAuthContext";

export const useAccountByEmail = () => {
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const fetchAccountByEmail = async (email) => {
    setError(null);

    if (user.email === email) {
      setError("You are already the owner / collaborator in this note.");
      throw new Error("You are already the owner / collaborator in this note.");
    } else {
      const response = await axiosInstance.get(`/users/e/${email}`);
      if (response.status === 204) {
        setError(
          "This e-mail address is not associated with any user. Try another!"
        );
      }

      return response;
    }
  };

  return {
    error,
    setError,
    fetchAccountByEmail,
  };
};

export const useAccountByUID = (uid) => {
  const fetchUserByUID = async (uid) => {
    try {
      const response = await axiosInstance.get(`/users/${uid}`);

      if (response.status !== 200) {
        throw new Error(response.data.message);
      }
      return response.data.data;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const userByUIDQuery = useQuery(
    ["fetchUser", uid],
    async () => {
      const response = await fetchUserByUID(uid);
      return response;
    },
    {
      staleTime: 5000,
    }
  );

  return { userByUIDQuery };
};
