import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Dashboard/Title";
import Swal from "sweetalert2";
import axiosSecure from "../../../../api";
import toast from "react-hot-toast";
import Loader from "../../../../components/shared/Loader";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const ManageUsers = () => {
  const [userCount, setUserCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axiosSecure("/users/count").then((res) => setUserCount(res.data.count));
  }, []);

  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(userCount / itemsPerPage);

  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  const {
    data: users,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", axiosSecure, currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/users?page=${currentPage - 1}&size=${itemsPerPage}`
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
        <div className="overflow-x-auto mt-6 border border-[#1E88E5]">
          <table className="table">
            <thead>
              <tr className="text-center text-base text-white bg-[#1E88E5]">
                <th>Serial</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User Role</th>
                <th>Membership</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr
                  key={user?._id}
                  className="text-center text-[#757575] font-medium"
                >
                  <td>{index + 1}</td>
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
          {userCount > 10 && (
            <div className="mt-4 w-fit mx-auto flex gap-4">
              <div>
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
              </div>
              {/* <p className="tex-xs text-[#757575]">showing 1-10 of {userCount}</p> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ManageUsers;
