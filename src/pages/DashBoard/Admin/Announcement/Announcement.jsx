import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Dashboard/Title";
import useAuth from "../../../../hooks/useAuth";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import axiosSecure from "../../../../api";
import toast from "react-hot-toast";

const Announcement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuth();
  const authorName = user?.displayName;
  const authorImage = user?.photoURL;

  const handleAnnounce = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const announcement = {
        name: authorName,
        img: authorImage,
        title,
        description,
      };

      const { data } = await axiosSecure.post("/announcements", announcement);
      if (data._id) {
        form.reset();
        toast.success("Announcement Added!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard - Make Announcement</title>
      </Helmet>
      <div>
        <Title
          heading="Create Announcements"
          subheading="Broadcast Important Updates and Information"
        />
        <form
          onSubmit={handleAnnounce}
          className="mt-6 px-16 py-6 bg-base-200 rounded-md shadow-lg"
        >
          <div className="grid md:grid-cols-2 mb-6 gap-6">
            <TextField
              label="Author Name"
              defaultValue={authorName}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
            />
            <TextField
              label="Author Image"
              defaultValue={authorImage}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
            />
          </div>
          <TextField
            label="Announcement Title"
            variant="outlined"
            fullWidth
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            onChange={(e) => setDescription(e.target.value)}
            style={{ margin: "24px 0" }}
            label="Description"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />
          <div className="text-center">
            <Button type="submit" variant="contained">
              Announce
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Announcement;
