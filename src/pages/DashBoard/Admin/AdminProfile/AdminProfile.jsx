import { Card } from "@mui/material";
import { Helmet } from "react-helmet-async";
import ProfileLeft from "./ProfileLeft";
import { useEffect, useState } from "react";
import axiosSecure from "../../../../api";
import Stats from "./Stats";
import Statistics from "./Statistics";

const AdminProfile = () => {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    axiosSecure("/users/count").then((res) => setUserCount(res.data?.count));
  }, []);

  useEffect(() => {
    axiosSecure("/posts/count").then((res) => setPostCount(res.data?.count));
  }, []);

  useEffect(() => {
    axiosSecure("/comments/count").then((res) =>
      setCommentCount(res.data?.count)
    );
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard - Profile</title>
      </Helmet>
      <div className="flex gap-5 min-h-[calc(100vh-48px)]">
        <div className="md:w-1/3">
          <ProfileLeft />
        </div>
        <div className="md:w-2/3">
          <Card elevation={4}>
            <div className="py-5 px-3">
              <Stats
                userCount={userCount}
                postCount={postCount}
                commentCount={commentCount}
              />
              <Statistics
                userCount={userCount}
                postCount={postCount}
                commentCount={commentCount}
              />
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};
export default AdminProfile;
