import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../api";
import useAuth from "./useAuth";

const useUsers = () => {
  const { user } = useAuth();
  const {
    data: users,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", axiosSecure],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await axiosSecure("/users");
      return data;
    },
  });

  return { users, refetch, isLoading };
};
export default useUsers;
