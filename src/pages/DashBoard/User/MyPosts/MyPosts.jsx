import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api";
import useAuth from "../../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Dashboard/Title";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";

const MyPosts = () => {
  const { user } = useAuth();
  const { data: posts } = useQuery({
    queryKey: ["posts", axiosSecure, user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/posts/${user?.email}`);
      return data;
    },
  });

  return (
    <>
      <Helmet>
        <title>Dashboard - My Posts</title>
      </Helmet>
      {posts?.length > 0 ? (
        <div>
          <Title heading="My Posts" />
          <div className="overflow-x-auto mt-6">
            <table className="table border border-[#1E88E5] rounded">
              <thead>
                <tr className="text-center text-base text-white bg-[#1E88E5]">
                  <th>Post Title</th>
                  <th>Number of Votes</th>
                  <th>Check Comments</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {posts?.map((post) => (
                  <tr key={post?.title} className="text-center">
                    <th>{post?.title}</th>
                    <td>{post?.upVote}</td>
                    <td>
                      <button className="btn btn-sm">Comments</button>
                    </td>
                    <td>
                      <IconButton color="error" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="h-[calc(100vh-40px)] flex justify-center items-center">
            <div className="text-center">
            <p className="text-red-500 font-medium text-lg mb-3 capitalize"> No Posts added yet! </p>
            <Link to="/dashboard/addPost">
                <AwesomeButton>Add Post</AwesomeButton>
            </Link>
            </div>
        </div>
      )}
    </>
  );
};
export default MyPosts;
