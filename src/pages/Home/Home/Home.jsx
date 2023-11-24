import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Tags from "../Tags/Tags";
import Container from "../../../components/shared/Container";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>DiscussHub | Home</title>
      </Helmet>
      <Banner />
      <Container>
      <Tags />
      </Container>
    </>
  );
};
export default Home;
