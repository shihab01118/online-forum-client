import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import { getRole } from "../api/auth";

const useAdmin = () => {
  const { user } = useAuth();
  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const data = await getRole(user?.email);
      return data?.admin;
    },
  });

  return { isAdmin, isAdminLoading };
};
export default useAdmin;
