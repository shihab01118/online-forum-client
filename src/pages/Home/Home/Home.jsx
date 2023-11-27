import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Tags from "../Tags/Tags";
import Container from "../../../components/shared/Container";
import Posts from "../Posts/Posts";
import Announcements from "../Announcements/Announcements";
import { useLoaderData } from "react-router-dom";

const Home = () => {
  const {count} = useLoaderData();
  console.log(count);
  return (
    <>
      <Helmet>
        <title>DiscussHub | Home</title>
      </Helmet>
      <Banner />
      <Container>
        <Tags />
        <Announcements />
        <Posts count={count} />
      </Container>
    </>
  );
};
export default Home;
