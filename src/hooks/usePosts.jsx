import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePosts = () => {
  const axiosPublic = useAxiosPublic();

  const { data: posts, isLoading, refetch } = useQuery({
    queryKey: ["posts", axiosPublic],
    queryFn: async () => {
      const { data } = await axiosPublic("/posts");
      return data;
    },
  });

  return { posts, isLoading, refetch };
};
export default usePosts;
