import { useLoaderData } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { formatDistance } from "date-fns";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axiosSecure from "../../../api";
import toast from "react-hot-toast";
import usePosts from "../../../hooks/usePosts";
import { Helmet } from "react-helmet-async";

const PostDetails = () => {
  const { user } = useAuth();
  const { refetch } = usePosts();
  const post = useLoaderData();
  const [comment, setComment] = useState("");

  const { name, img, title, tag, description, createdAt, _id } = post || {};

  const totalTime = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
  });

  const handleComment = async (e) => {
    e.preventDefault();
    const form = e.target;

    const commentData = {
      commenterEmail: user?.email,
      comment: comment,
      commentedPost: title,
    };

    const { data } = await axiosSecure.post("/comments", commentData);
    console.log(data);
    if (data._id) {
      form.reset();
      toast.success("Comment Added!");
    }
  };

  const handleLike = async () => {
    const res = await axiosSecure.put(`/posts/${_id}/like`, {
      action: "like",
    });
    console.log(res);
    if (res.status === 200) {
      refetch();
      toast.success("You liked this post");
    }
  };

  const handleDislike = async () => {
    const res = await axiosSecure.put(`/posts/${_id}/like`, {
      action: "dislike",
    });
    console.log(res);
    if (res.status === 200) {
      refetch();
      toast.error("You disliked this post");
    }
  }

  return (
    <div className="py-[78px] min:h-[calc(100vh-78px)]">
      <Helmet>
        <title>{`${title}`}</title>
      </Helmet>
      <Card
        sx={{ maxWidth: 800, padding: 3, margin: "20px auto" }}
        elevation={5}
      >
        <div className="flex gap-4">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src={img} />
            </div>
          </div>
          <div className="pt-1">
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-xs font-semibold text-[#757575]">{totalTime}</p>
          </div>
        </div>
        <CardContent>
          <div className="flex flex-col">
            <h4 className="text-lg font-semibold">{title}</h4>
            <p className="text-sm font-medium text-[#757575]">#{tag}</p>
          </div>
          <p className="mt-3 text-[#757575]">{description}</p>
        </CardContent>
        <div className="flex justify-between items-center">
          <div className="ml-2">
            <IconButton onClick={handleLike}>
              <ThumbUpIcon color="primary" />
            </IconButton>
            <IconButton onClick={handleDislike}>
              <ThumbDownIcon color="error" />
            </IconButton>
            <IconButton>
              <InsertCommentIcon color="success" />
            </IconButton>
          </div>
          <div className="flex gap-3 items-center">
            <FacebookShareButton
              url={`https://online-forum-f9255.web.app/posts/${_id}`}
            >
              <FacebookIcon round size={26} />
            </FacebookShareButton>
            <WhatsappShareButton
              url={`https://online-forum-f9255.web.app/posts/${_id}`}
            >
              <WhatsappIcon round size={26} />
            </WhatsappShareButton>
          </div>
        </div>
        <form onSubmit={handleComment}>
          <div className="flex flex-col gap-4">
            <TextField
              onChange={(e) => setComment(e.target.value)}
              style={{ marginTop: "24px" }}
              id="post-content"
              label="Write A Comment"
              multiline
              rows={2}
              fullWidth
              variant="outlined"
              elevation={4}
            />
            <Button
              variant="contained"
              type="submit"
              style={{ marginTop: "auto", width: "fit-content" }}
            >
              Comment
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default PostDetails;
