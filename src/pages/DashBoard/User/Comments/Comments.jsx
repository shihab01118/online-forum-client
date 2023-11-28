import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Dashboard/Title";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api";
import Loader from "../../../../components/shared/Loader";
import CommentRow from "./CommentRow";

const Comments = () => {
  const { title } = useParams();
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", axiosSecure, title],
    queryFn: async () => {
      const { data } = await axiosSecure(`/comments/${title}`);
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
            <div className="overflow-x-auto mt-6">
              <table className="table border border-[#1E88E5] rounded">
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
          </div>
        ) : (
          <div className="h-[calc(100vh-40px)] flex justify-center items-center">
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
