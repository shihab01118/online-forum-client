import { formatDistance } from "date-fns";
import PropTypes from "prop-types";

const RecentPost = ({ post }) => {
  const postedTime = formatDistance(new Date(post?.createdAt), new Date(), {
    addSuffix: true,
  });
  console.log(postedTime);
  return (
    <div className="p-2 shadow-md border">
      <h3 className="font-medium">{post?.title}</h3>
      <p className="text-sm font-medium text-[#757575]">
        {post?.description.slice(0, 80)}...
      </p>
      <p className="text-xs font-semibold text-right text-[#757575]">{postedTime}</p>
    </div>
  );
};

RecentPost.propTypes = {
  post: PropTypes.object,
};

export default RecentPost;
