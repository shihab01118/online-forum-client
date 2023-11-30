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
import { useEffect, useState } from "react";

const MyPosts = () => {
  const { user } = useAuth();
  const [postCount, setPostCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axiosSecure("/posts/count").then((res) => setPostCount(res.data.count));
  }, []);

  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(postCount / itemsPerPage);

  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["posts", axiosSecure, user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/posts/${user?.email}?page=${currentPage - 1}&size=${itemsPerPage}`
      );
      return data;
    },
  });

  const firstIndex = currentPage * 10 + 1;

  let lastIndex = currentPage * 10;
  if (posts?.length < 10) {
    lastIndex = (currentPage - 1) * 10 + posts?.length;
  }

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
          <div className="overflow-x-auto mt-6  border border-[#1E88E5]">
            <table className="table">
              <thead>
                <tr className="text-center text-base text-white bg-[#1E88E5]">
                  <th>Post Title</th>
                  <th>Likes</th>
                  <th>Dislikes</th>
                  <th>Comments</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {posts?.map((post) => (
                  <tr
                    key={post?.title}
                    className="text-center  text-[#757575] font-medium"
                  >
                    <td>{post?.title}</td>
                    <td>{post?.upVote}</td>
                    <td>{post?.downVote}</td>
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
          {postCount > 10 && (
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
              <p className="tex-xs text-[#757575]">
                showing {firstIndex - 10}-{lastIndex} of {postCount}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="h-[calc(100vh-48px)] flex justify-center items-center">
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
