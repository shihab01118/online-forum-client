import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import axiosSecure from "../../../../api";
import useAuth from "../../../../hooks/useAuth";
import toast from "react-hot-toast";

const CommentRow = ({ comment }) => {
  const { user } = useAuth();
  const [feedback, setFeedback] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "60%",
    transform: "translate(-50%, -50%)",
    borderRadius: "6px",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const handleReport = async () => {
    const reportedComment = {
      commenterEmail: comment?.commenterEmail,
      comment: comment?.comment,
      reporterEmail: user?.email,
      commentedPost: comment?.commentedPost,
      feedback: feedback,
      commentId: comment?._id,
    };
    // console.log(reportedComment);
    const { data } = await axiosSecure.post("/reportedComments", reportedComment);
    console.log(data);
    if (data?._id) {
      toast.success("Comment Reported!");
      setFeedback("");
    }
  };

  return (
    <tr className="text-center  text-[#757575] font-medium">
      <th>{comment?.commenterEmail}</th>
      <td>
        {comment?.comment.slice(0, 20)}...{" "}
        <button onClick={handleOpen} className="btn btn-xs">
          Read More
        </button>
      </td>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <p>{comment?.comment}</p>
        </Box>
      </Modal>
      <td>
        <FormControl fullWidth>
          <InputLabel id="demo-select-small-label">Feedback</InputLabel>
          <Select
            labelId="demo-select-small-label"
            value={feedback}
            label="Select Tag"
            onChange={(e) => setFeedback(e.target.value)}
            fullWidth
          >
            <MenuItem value="Excellent">Excellent</MenuItem>
            <MenuItem value="Average">Average</MenuItem>
            <MenuItem value="Poor">Poor</MenuItem>
          </Select>
        </FormControl>
      </td>
      <td>
        <Button
          disabled={!feedback}
          style={{
            textTransform: "capitalize",
            fontSize: "14px",
            fontWeight: 600,
          }}
          variant="contained"
          color="error"
          onClick={handleReport}
        >
          Report
        </Button>
      </td>
    </tr>
  );
};

CommentRow.propTypes = {
  comment: PropTypes.object,
};

export default CommentRow;
