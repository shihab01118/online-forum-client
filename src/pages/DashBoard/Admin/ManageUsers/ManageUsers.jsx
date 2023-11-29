import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Dashboard/Title";
import Swal from "sweetalert2";
import axiosSecure from "../../../../api";
import toast from "react-hot-toast";
import Loader from "../../../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";

const ManageUsers = () => {
  const {
    data: users,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", axiosSecure],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/users`
      );
      return data;
    },
  });

  if (isLoading) return <Loader />;

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1E88E5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Continue",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/${user._id}`)
          .then((res) => {
            const data = res.data;
            if (data.modifiedCount > 0) {
              refetch();
              toast.success("Updated to Admin Successfully!");
            }
          })
          .catch((error) => {
            console.error(error.message);
          });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Manage Users</title>
      </Helmet>
      <div>
        <Title
          heading="User Management"
          subheading="Effortlessly Handle User Accounts and Permissions"
        />
        <div className="overflow-x-auto mt-6">
          <table className="table border border-[#1E88E5] rounded">
            <thead>
              <tr className="text-center text-base text-white bg-[#1E88E5]">
                <th>User Name</th>
                <th>User Email</th>
                <th>User Role</th>
                <th>Membership</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr
                  key={user?._id}
                  className="text-center text-[#757575] font-medium"
                >
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>
                    {user?.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm"
                      >
                        Make Admin
                      </button>
                    )}
                  </td>
                  <td>{user?.badge}</td>
                </tr>
              ))}
            </tbody>
          </table>
            {/* <div className="w-fit mx-auto mt-6">
              {pages?.map((page) => (
                <button
                  onClick={() => setCurrentPage(page)}
                  className={
                    currentPage === page
                      ? "btn btn-xs btn-circle mr-2 bg-[#1E88E5] text-white"
                      : "btn btn-xs btn-circle mr-2 text-[#1E88E5]"
                  }
                  key={page}
                >
                  {page}
                </button>
              ))}
            </div> */}
        </div>
      </div>
    </>
  );
};
export default ManageUsers;
