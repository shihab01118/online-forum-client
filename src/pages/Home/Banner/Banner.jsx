import banner from "../../../assets/images/banner.jpg";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const Banner = () => {
  return (
    <div className="relative">
      <div className="h-[80vh]">
        <img src={banner} alt="banner" className="w-full h-full object-cover" />
      </div>
      <div className="bg-gray-700 inset-0 absolute opacity-25"></div>
      <div className="w-full mt-8 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <div className="text-center mx-8 md:max-w-xl md:mx-auto ">
          <h2 className="text-4xl md:text-5xl font-bold">
            Welcome To Discuss<span className="text-[#196BF2]">Hub</span>
          </h2>
          <p className="text-xl text-gray-800 mt-4 mb-6">
            The most popular forum on the internet!
          </p>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "full",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search By Tags"
              name="search"
              inputProps={{ "aria-label": "search by tags" }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>
    </div>
  );
};
export default Banner;
