import { Button, Card, Chip, TextField } from "@mui/material";
import useGetUser from "../../../../hooks/useGetUser";
import useAuth from "../../../../hooks/useAuth";
import { useState } from "react";
import axiosSecure from "../../../../api";
import toast from "react-hot-toast";

const ProfileLeft = () => {
  const { user } = useAuth();
  const currentUser = useGetUser();
  const [tag, setTag] = useState("");

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newTag = { tag };
    const { data } = await axiosSecure.post("/tags", newTag);
    if (data._id) {
      form.reset();
      toast.success("New Tag Added!");
    }
  };

  return (
    <Card elevation={4}>
      <div className="flex flex-col gap-2 justify-center  px-3 py-5">
        <div className="avatar w-fit mx-auto">
          <div className="w-24 rounded-full">
            <img src={user?.photoURL} />
          </div>
        </div>
        <div className="text-center mb-1">
          <p className="text-black font-semibold text-lg">
            {currentUser?.name}
          </p>
          <p className="text-[#757575] text-sm font-medium">
            {currentUser?.email}
          </p>
        </div>
        <Chip
          style={{
            width: "fit-content",
            margin: "0 auto",
            fontSize: "12px",
            fontWeight: 600,
          }}
          label="Admin"
          size="small"
          variant="outlined"
          color="secondary"
        />
        <hr className="my-4" />
        <p className="text-[#757575] leading-6 text-sm font-medium">
          <span className="font-medium text-base text-black">
            Description:{" "}
          </span>
          The Admin Profile Page provides administrators with an interface to
          view and manage their profile information. It also offers valuable
          statistical insights, allowing admins to track essential data for
          informed decision-making.
        </p>
        <hr className="my-3" />
        <div>
          <h2 className="text-lg font-semibold text-black mb-3">Add New Tag</h2>
          <form onSubmit={handleAdd}>
            <div className="flex justify-between gap-2">
              <TextField
                label="Tag Name"
                type="text"
                variant="outlined"
                onChange={(e) => setTag(e.target.value)}
                fullWidth
              />
              <Button type="submit" variant="contained">
                Add
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Card>
  );
};
export default ProfileLeft;
