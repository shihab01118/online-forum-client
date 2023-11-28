import { Card, Chip } from "@mui/material";
import { Helmet } from "react-helmet-async";
import useGetUser from "../../../../hooks/useGetUser";
import useAuth from "../../../../hooks/useAuth";

const AdminProfile = () => {
  const { user } = useAuth();
  const currentUser = useGetUser();
  console.log(currentUser, user);

  return (
    <>
      <Helmet>
        <title>Dashboard - Profile</title>
      </Helmet>
      <div className="flex gap-5 min-h-[calc(100vh-48px)]">
        <div className="w-1/3 border border-red-600">
          <Card elevation={4}>
            <div className="flex flex-col gap-2 justify-center py-4">
              <div className="avatar w-fit mx-auto">
                <div className="w-24 rounded-full">
                  <img src={user?.photoURL} />
                </div>
              </div>
              <div className="text-center mb-1">
                <p className="text-black font-semibold text-lg">
                  {currentUser?.name}
                </p>
                <p className="text-[#757575] text-sm font-medium">
                  {currentUser?.email}
                </p>
              </div>
              <Chip
                style={{
                  width: "fit-content",
                  margin: "0 auto",
                  fontSize: "12px",
                  fontWeight: 600,
                }}
                label="Admin"
                size="small"
                variant="outlined"
                color="secondary"
              />
            </div>
          </Card>
        </div>
        <div className="w-2/3 border border-red-600">
          <Card elevation={4}></Card>
        </div>
      </div>
    </>
  );
};
export default AdminProfile;
