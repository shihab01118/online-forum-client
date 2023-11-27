import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import axiosSecure from "../api";

const useGetUser = () => {
  const { user } = useAuth();
  const { data: currentUser } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users/${user?.email}`);
      return data;
    },
  });

  return currentUser;
};
export default useGetUser;
