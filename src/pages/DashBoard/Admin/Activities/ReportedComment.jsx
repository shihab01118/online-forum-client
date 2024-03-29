import { Button } from "@mui/material";
import PropTypes from "prop-types";
import axiosSecure from "../../../../api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { formatDistance } from "date-fns";

const ReportedComment = ({ item, refetch }) => {
  const {
    commenterEmail,
    comment,
    reporterEmail,
    commentedPost,
    feedback,
    commentId,
    _id,
    timeStamp,
  } = item || {};

  const timeCount = formatDistance(new Date(timeStamp), new Date(), {
    addSuffix: true,
  });

  const handleDeleteComment = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1E88E5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/comments?commentId=${commentId}&reportedCommentId=${_id}`)
          .then((res) => {
            const data = res.data;
            if (data.deletedCount > 0) {
              refetch();
              toast.success("Comment has been deleted!");
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }
    });
  };

  return (
    <div className="flex flex-col gap-3 p-5 bg-gray-200 rounded-md shadow-lg">
      <h3 className="text-xl font-semibold">{commentedPost}</h3>
      <div className="flex-grow">
        <p className="font-medium">
          Comment: <span className="text-[#757575] text-sm">{comment}</span>
        </p>
        <p className="font-medium">
          Commenter:{" "}
          <span className="text-[#757575] text-sm">{commenterEmail}</span>
        </p>
        <p className="font-medium">
          Feedback: <span className="text-[#757575] text-sm">{feedback}</span>
        </p>
        <p className="font-medium flex-grow">
          Reporter:{" "}
          <span className="text-[#757575] text-sm">{reporterEmail}</span>
        </p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-xs text-[#757575] font-medium mt-auto">
          {timeCount}
        </p>
        <div className="w-fit">
          <Button
            variant="contained"
            color="error"
            style={{
              textTransform: "capitalize",
              fontSize: "14px",
              fontWeight: 600,
            }}
            onClick={handleDeleteComment}
          >
            Delete Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

ReportedComment.propTypes = {
  item: PropTypes.object,
  refetch: PropTypes.func,
};

export default ReportedComment;
