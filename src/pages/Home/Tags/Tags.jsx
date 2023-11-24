import Chip from "@mui/material/Chip";

const Tags = () => {
  const tags = [
    "Technology",
    "Science",
    "Art",
    "Design",
    "Programming",
    "Travel",
    "Food",
    "Health",
    "Business",
    "Education",
  ];

  return (
    <div className="my-10">
      <h2 className="text-3xl font-bold text-center mb-4">Tags We Offer</h2>
      <div className="flex gap-2 flex-wrap justify-center">
        {tags.map((tag, index) => (
          <Chip key={index} label={tag} color="primary" variant="outlined" />
        ))}
      </div>
    </div>
  );
};
export default Tags;
