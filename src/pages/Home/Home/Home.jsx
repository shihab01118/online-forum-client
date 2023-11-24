import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>DiscussHub | Home</title>
      </Helmet>
      <Banner />
    </>
  );
};
export default Home;
