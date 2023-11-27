/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import Title from "../../../components/Dashboard/Title";
import Loader from "../../../components/shared/Loader";
import usePosts from "../../../hooks/usePosts";
import Post from "./Post";
import { useEffect, useState } from "react";

const Posts = () => {
  const { posts, isLoading } = usePosts();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [params, setParams] = useSearchParams();
  const tag = params.get("tag");
  console.log(tag);
  useEffect(() => {
    if (tag) {
      const filtered = posts?.filter((item) => item?.tag === tag.toLowerCase());
      setFilteredPosts(filtered);
    }
  }, [posts, tag]);

  if (isLoading) return <Loader />;

  return (
    <div className="my-16">
      <Title
        heading="Explore Diverse Perspectives"
        subheading="Engage, Share, and Discover Insights from our Community's Posts"
      />
      {tag ? (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts?.map((post) => (
            <Post key={post?._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts?.map((post) => (
            <Post key={post?._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Posts;
