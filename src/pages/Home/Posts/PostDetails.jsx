import { useParams } from "react-router-dom";
import usePosts from "../../../hooks/usePosts";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import { formatDistance } from "date-fns";
import {FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon} from "react-share"

const PostDetails = () => {
  const { id } = useParams();
  const { posts } = usePosts();

  const post = posts?.find((post) => post?._id === id);
  const { name, img, title, tag, description, createdAt } = post || {};

  const totalTime = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
  });

  return (
    <div className="py-[78px]">
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
            <IconButton>
              <ThumbUpIcon color="primary" />
            </IconButton>
            <IconButton>
              <ThumbDownIcon color="error" />
            </IconButton>
            <IconButton>
              <InsertCommentIcon color="success" />
            </IconButton>
          </div>
          <div className="flex gap-3 items-center">
            <FacebookShareButton url="https://web.programming-hero.com/dashboard">
                <FacebookIcon round size={26} />
            </FacebookShareButton>
            <WhatsappShareButton url="https://web.programming-hero.com/dashboard">
                <WhatsappIcon round size={26} />
            </WhatsappShareButton>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default PostDetails;
