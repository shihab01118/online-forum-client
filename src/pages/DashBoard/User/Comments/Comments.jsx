import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Dashboard/Title";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api";
import Loader from "../../../../components/shared/Loader";
import CommentRow from "./CommentRow";
import { useEffect, useState } from "react";

const Comments = () => {
  const { title } = useParams();
  const [commentCount, setCommentCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axiosSecure("/comments/count").then((res) =>
      setCommentCount(res.data.count)
    );
  }, []);

  const itemsPerPage = 10;
  const numberOfPages = Math.ceil(commentCount / itemsPerPage);

  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", axiosSecure, title],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/comments/${title}?page=${currentPage - 1}&size=${itemsPerPage}`
      );
      return data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>Interact with Comments</title>
      </Helmet>
      <div>
        {comments?.length > 0 ? (
          <div>
            <Title
              heading="Comment Interaction"
              subheading="Engage, Evaluate, and Interact with Comments"
            />
            <div className="overflow-x-auto mt-6 border border-[#1E88E5]">
              <table className="table">
                <thead>
                  <tr className="text-center text-base text-white bg-[#1E88E5]">
                    <th>Commenter Email</th>
                    <th>Comment</th>
                    <th>Response</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {comments?.map((comment) => (
                    <CommentRow key={comment?._id} comment={comment} />
                  ))}
                </tbody>
              </table>
            </div>
            {commentCount > 10 && (
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
        ) : (
          <div className="h-[calc(100vh-48px)] flex justify-center items-center">
            <div className="text-center">
              <p className="text-red-500 font-medium text-lg mb-3 capitalize">
                {" "}
                No Comment added yet!{" "}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Comments;
