import PropTypes from "prop-types";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Post = ({ post }) => {
  const axiosPublic = useAxiosPublic();
  const [commentsCount, setCommentsCount] = useState(0);
  const { img, title, tag, upVote, downVote, createdAt, _id } =
    post || {};

  const totalTime = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
  });

  useEffect(() => {
    axiosPublic(`/comments/${title}`).then((res) => {
      setCommentsCount(res.data?.length);
    });
  }, [axiosPublic, title]);

  return (
    <Link to={`/posts/${_id}`}>
      <div className="flex gap-4 bg-gray-100 p-4 border shadow-xl rounded-md h-full">
        <div className="avatar h-16">
          <div className="w-16 rounded-full">
            <img src={img} />
          </div>
        </div>
        <div className="flex flex-col gap-[6px] w-full">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <p className="flex-grow text-gray-500">#{tag}</p>
          <div className="flex gap-5 items-center">
            <div className="flex items-center gap-[6px]">
              <ThumbUpIcon style={{ fontSize: "22px" }} color="action" />{" "}
              <span className="text-lg font-medium text-[#757575]">
                {upVote}
              </span>
            </div>
            <div className="flex items-center gap-[6px]">
              <ThumbDownIcon style={{ fontSize: "22px" }} color="action" />{" "}
              <span className="text-lg font-medium text-[#757575]">
                {downVote}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CommentIcon style={{ fontSize: "22px" }} color="action" />{" "}
              <span className="text-lg font-medium text-[#757575]">
                {commentsCount}
              </span>
            </div>
          </div>
          <p className="text-xs text-[#757575] font-medium ml-auto">
            {totalTime}
          </p>
        </div>
      </div>
    </Link>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
