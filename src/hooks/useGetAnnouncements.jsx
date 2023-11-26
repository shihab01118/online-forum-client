import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetAnnouncements = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: announcements,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["announcements", axiosPublic],
    queryFn: async () => {
      const { data } = await axiosPublic("/announcements");
      return data;
    },
  });

  return { announcements, isLoading, refetch };
};
export default useGetAnnouncements;
