
import Title from "../../../components/Dashboard/Title";
import Loader from "../../../components/shared/Loader";
import usePosts from "../../../hooks/usePosts";
import Post from "./Post";

const Posts = () => {
  const {posts, isLoading} = usePosts();

  if (isLoading) return <Loader />

  return (
    <div>
      <Title
        heading="Explore Diverse Perspectives"
        subheading="Engage, Share, and Discover Insights from our Community's Posts"
      />
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {
            posts?.map(post => <Post key={post?._id} post={post} />)
        }
      </div>
    </div>
  );
};
export default Posts;
