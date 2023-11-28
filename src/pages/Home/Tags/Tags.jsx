import Chip from "@mui/material/Chip";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loader from "../../../components/shared/Loader";

const Tags = () => {
  const axiosPublic = useAxiosPublic();
  // const tags = [
  //   "Technology",
  //   "Science",
  //   "Art",
  //   "Design",
  //   "Programming",
  //   "Travel",
  //   "Food",
  //   "Health",
  //   "Business",
  //   "Education",
  // ];

  const {data: tags, isLoading} = useQuery({
    queryKey: ["tags", axiosPublic],
    queryFn: async () => {
      const {data} = await axiosPublic("/tags");
      return data;
    }
  })

  if(isLoading) return <Loader />

  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold text-center mb-4">Tags We Offer</h2>
      <div className="flex gap-2 flex-wrap justify-center">
        {tags.map((item) => (
          <Chip key={item?._id} label={item?.tag} color="primary" variant="outlined" />
        ))}
      </div>
    </div>
  );
};
export default Tags;
