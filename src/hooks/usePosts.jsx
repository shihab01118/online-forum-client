import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePosts = () => {
  const axiosPublic = useAxiosPublic();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", axiosPublic],
    queryFn: async () => {
      const { data } = await axiosPublic("/posts");
      return data;
    },
  });

  return { posts, isLoading };
};
export default usePosts;
