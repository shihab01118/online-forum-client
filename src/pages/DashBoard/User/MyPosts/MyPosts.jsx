import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Dashboard/Title";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { AwesomeButton } from "react-awesome-button";
import Loader from "../../../../components/shared/Loader";
import useAuth from "../../../../hooks/useAuth";
import axiosSecure from "../../../../api";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const MyPosts = () => {
  const { user } = useAuth();

  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts", axiosSecure, user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/posts/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <Loader />;

  const handleDelete = (post) => {
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
          .delete(`/posts/${post._id}`)
          .then((res) => {
            const data = res.data;
            console.log(data);
            if (data.deletedCount > 0) {
              refetch();
              toast.success("Post Deleted!");
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - My Posts</title>
      </Helmet>
      {posts?.length > 0 ? (
        <div>
          <Title
            heading="Your Contributions"
            subheading="Explore Your Shared Content"
          />
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
                  <tr
                    key={post?.title}
                    className="text-center  text-[#757575] font-medium"
                  >
                    <th>{post?.title}</th>
                    <td>{post?.upVote}</td>
                    <td>
                      <Link to={`comments/${post?.title}`}>
                        <button className="btn btn-sm">Comments</button>
                      </Link>
                    </td>
                    <td>
                      <IconButton
                        onClick={() => handleDelete(post)}
                        color="error"
                        aria-label="delete"
                      >
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
            <p className="text-red-500 font-medium text-lg mb-3 capitalize">
              {" "}
              No Posts added yet!{" "}
            </p>
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
