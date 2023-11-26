import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Dashboard/Title";
import useUsers from "../../../../hooks/useUsers";

const ManageUsers = () => {
  const { users } = useUsers();
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
                <th>Action</th>
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
                    <button className="btn btn-sm">Make Admin</button>
                  </td>
                  <td>{user?.badge}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default ManageUsers;
