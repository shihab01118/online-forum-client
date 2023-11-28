import { Button } from "@mui/material";
import PropTypes from "prop-types";
import axiosSecure from "../../../../api";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ReportedComment = ({ item, refetch }) => {
  const {
    commenterEmail,
    comment,
    reporterEmail,
    commentedPost,
    feedback,
    // commentId,
    // _id
  } = item || {};

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
            .delete(`/comments/${commentedPost}`)
            .then((res) => {
              const data = res.data;
              console.log(data);
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
  }

  return (
      <div className="flex flex-col gap-3 p-5 bg-white rounded-md shadow-md">
        <h3 className="text-xl font-semibold">{commentedPost}</h3>
        <div className="flex-grow">
          <p className="font-medium">
            Comment: <span className="text-[#757575]">{comment}</span>
          </p>
          <p className="font-medium">
            Commenter: <span className="text-[#757575]">{commenterEmail}</span>
          </p>
          <p className="font-medium">
            Feedback: <span className="text-[#757575]">{feedback}</span>
          </p>
          <p className="font-medium flex-grow">
            Reporter: <span className="text-[#757575]">{reporterEmail}</span>
          </p>
        </div>
          <div className="w-fit ml-auto">
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
  );
};

ReportedComment.propTypes = {
  item: PropTypes.object,
  refetch: PropTypes.func,
};

export default ReportedComment;
