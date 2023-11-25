import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Dashboard/Title";
import { Button, FormControl, InputLabel, TextField } from "@mui/material";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axiosSecure from "../../../../api";
import toast from "react-hot-toast";

const AddPost = () => {
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuth();
  const authorName = user?.displayName;
  const authorEmail = user?.email;
  const authorImage = user?.photoURL;

  const handleAddPost = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      const post = {
        name: authorName,
        email: authorEmail,
        img: authorImage,
        title,
        tag,
        description,
        upVote: 0,
        downVote: 0,
      };
      const { data } = await axiosSecure.post("/posts", post);
      if (data._id) {
        form.reset();
        toast.success("Post Added Successfully!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Helmet>
        <title>Dashboard - Add Post</title>
      </Helmet>
      <div>
        <Title
          heading="Add new Post"
          subheading="Share Your Thoughts, Questions, or Expertise with the Community"
        />
        <form
          onSubmit={handleAddPost}
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
              label="Author Email"
              defaultValue={authorEmail}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
            />
          </div>
          <TextField
            label="Author Image"
            defaultValue={authorImage}
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
            fullWidth
          />
          <div className="grid md:grid-cols-2 my-6 gap-6">
            <TextField
              name="title"
              label="Post Title"
              type="text"
              variant="outlined"
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="demo-select-small-label">Select Tag</InputLabel>
              <Select
                labelId="demo-select-small-label"
                value={tag}
                defaultValue="Select"
                label="Select Tag"
                onChange={(e) => setTag(e.target.value)}
                fullWidth
              >
                <MenuItem value="technology">Technology</MenuItem>
                <MenuItem value="science">Science</MenuItem>
                <MenuItem value="art">Art</MenuItem>
                <MenuItem value="design">Design</MenuItem>
                <MenuItem value="programming">Programming</MenuItem>
                <MenuItem value="travel">Travel</MenuItem>
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="health">Health</MenuItem>
                <MenuItem value="business">Business</MenuItem>
                <MenuItem value="education">Education</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TextField
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: "24px" }}
            id="post-content"
            label="Post Description"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
          />
          <div className="text-center">
            <Button type="submit" variant="contained">
              Add Post
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddPost;
