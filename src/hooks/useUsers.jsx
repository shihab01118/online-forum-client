import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api";

const useUsers = () => {
  const {
    data: users,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", axiosSecure],
    queryFn: async () => {
      const { data } = await axiosSecure("/users");
      return data;
    },
  });

  return { users, refetch, isLoading };
};
export default useUsers;
