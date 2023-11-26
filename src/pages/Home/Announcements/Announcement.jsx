import { Card, CardContent } from "@mui/material";
import { formatDistance } from "date-fns";
import PropTypes from "prop-types";

const Announcement = ({ announcement }) => {
  const { name, img, title, description, createdAt } = announcement || {};

  const totalTime = formatDistance(new Date(createdAt), new Date(), {
    addSuffix: true,
  });

  return (
    <Card style={{ padding: "16px" }} elevation={4}>
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
        <h4 className="text-lg font-semibold">{title}</h4>
        <p className="mt-3 text-[#757575]">{description}</p>
      </CardContent>
    </Card>
  );
};

Announcement.propTypes = {
  announcement: PropTypes.object,
};

export default Announcement;
