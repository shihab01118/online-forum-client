import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <ScaleLoader color="#1E88E5" size={100} />
    </div>
  );
};
export default Loader;
