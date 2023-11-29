import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Dashboard/Title";
import { Button, FormControl, InputLabel, TextField } from "@mui/material";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axiosSecure from "../../../../api";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { AwesomeButton } from "react-awesome-button";
import { Link } from "react-router-dom";
import useGetUser from "../../../../hooks/useGetUser";
import Loader from "../../../../components/shared/Loader";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const AddPost = () => {
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const currentUser = useGetUser();
  const authorName = user?.displayName;
  const authorEmail = user?.email;
  const authorImage = user?.photoURL;

  const { data: tags, isLoading } = useQuery({
    queryKey: ["tags", axiosPublic],
    queryFn: async () => {
      const { data } = await axiosPublic("/tags");
      return data;
    },
  });
  console.log(tags);

  if (isLoading) return <Loader />;

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
        setTag("");
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
      {!currentUser?.badge === "gold" ? (
        <>
          <div className="h-[calc(100vh-48px)] flex justify-center items-center">
            <div className="text-center max-w-xl mx-auto flex flex-col gap-3">
              <h3 className="text-xl md:text-2xl text-red-500 font-bold">
                Limit Exceeded!
              </h3>
              <p className="text-sm md:text-base font-medium text-gray-600">
                You are not allowed to add more than 5 posts. If you wish to add
                more posts then you have to become a member of our forum.
              </p>
              <Link to="/membership">
                <AwesomeButton>Become a Member</AwesomeButton>
              </Link>
            </div>
          </div>
        </>
      ) : (
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
                  label="Select Tag"
                  onChange={(e) => setTag(e.target.value)}
                  fullWidth
                >
                  {tags?.map((item) => (
                    <MenuItem key={item?._id} value={item?.tag.toLowerCase()}>
                      {item?.tag}
                    </MenuItem>
                  ))}
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
      )}
    </>
  );
};
export default AddPost;
