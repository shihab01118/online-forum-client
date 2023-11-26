import PropTypes from "prop-types";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const { img, title, tag, upVote, comments, createdAt, _id } = post || {};

  const totalTime = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
  });

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
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-[6px]">
              <ThumbUpIcon color="action" />{" "}
              <span className="text-lg font-medium text-[#757575]">
                {upVote}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <CommentIcon color="action" />{" "}
              <span className="text-lg font-medium text-[#757575]">
                {comments?.length}
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
