import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Tags from "../Tags/Tags";
import Container from "../../../components/shared/Container";
import Posts from "../Posts/Posts";
import Announcements from "../Announcements/Announcements";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>DiscussHub | Home</title>
      </Helmet>
      <Banner />
      <Container>
        <Tags />
        <Announcements />
        <Posts />
      </Container>
    </>
  );
};
export default Home;
