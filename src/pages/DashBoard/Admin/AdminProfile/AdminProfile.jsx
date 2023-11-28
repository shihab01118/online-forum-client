import { Card } from "@mui/material";
import { Helmet } from "react-helmet-async";
import ProfileLeft from "./ProfileLeft";

const AdminProfile = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard - Profile</title>
      </Helmet>
      <div className="flex gap-5 min-h-[calc(100vh-48px)]">
        <div className="md:w-1/3">
          <ProfileLeft />
        </div>
        <div className="md:w-2/3 border border-red-600">
          <Card elevation={4}></Card>
        </div>
      </div>
    </>
  );
};
export default AdminProfile;
