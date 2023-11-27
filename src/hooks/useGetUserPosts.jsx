import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api";
import useAuth from "./useAuth";

const useGetUserPosts = () => {
  const { user } = useAuth();
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", axiosSecure, user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/posts/${user?.email}`);
      return data;
    },
  });

  return { posts, isLoading };
};
export default useGetUserPosts;
