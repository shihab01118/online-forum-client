import useAuth from "../../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import useGetUser from "../../../../hooks/useGetUser";
import goldBadge from "../../../../assets/images/golden.png";
import bronzeBadge from "../../../../assets/images/bronze.png";
import useGetUserPosts from "../../../../hooks/useGetUserPosts";
import Loader from "../../../../components/shared/Loader";
import RecentPost from "./RecentPost";
import { Card } from "@mui/material";

const UserProfile = () => {
  const { user } = useAuth();
  const currentUser = useGetUser();
  const { posts, isLoading } = useGetUserPosts();

  if (isLoading) return <Loader />;

  return (
    <div className="flex justify-center">
      <Helmet>
        <title>Dashboard - Profile</title>
      </Helmet>
      <div className=" rounded-2xl w-4/6">
        <Card elevation={5}>
        <img
          alt="profile"
          src="https://img.freepik.com/free-photo/abstract-grunge-decorative-relief-navy-blue-stucco-wall-texture-wide-angle-rough-colored-background_1258-28311.jpg"
          className="w-full mb-4 rounded-t-lg h-36"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            User Id: {user.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold ">{user?.displayName}</span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold ">{user?.email}</span>
              </p>

              <div className="w-10">
                {currentUser?.badge === "gold" && (
                  <img src={goldBadge} alt="gold-badge" />
                )}
                {currentUser?.badge === "bronze" && (
                  <img src={bronzeBadge} alt="bronze-badge" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 pb-6">
          <h3 className="text-xl font-bold mb-4">Recent Posts</h3>
          <div className="flex flex-col gap-2">
            {posts?.slice(0, 3)?.map((post) => (
              <RecentPost key={post?._id} post={post} />
            ))}
          </div>
        </div>
        </Card>
      </div>
    </div>
  );
};
export default UserProfile;
