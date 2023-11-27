/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import Title from "../../../components/Dashboard/Title";
import Loader from "../../../components/shared/Loader";
import Post from "./Post";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";

const Posts = ({ count }) => {
  const axiosPublic = useAxiosPublic();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useSearchParams();
  const tag = params.get("tag");

  const itemsPerPage = 5;
  const numberOfPages = Math.ceil(count / itemsPerPage);

  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", axiosPublic, currentPage, itemsPerPage],
    queryFn: async () => {
      const { data } = await axiosPublic(
        `/posts?page=${currentPage - 1}&size=${itemsPerPage}`
      );
      return data;
    },
  });

  // console.log(pages);

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
      <div className="w-fit mx-auto mt-6">
        {pages?.map((page) => (
          <button
            onClick={() => setCurrentPage(page)}
            className={
              currentPage === page
                ? "btn btn-xs btn-circle mr-2 bg-[#1E88E5] text-white"
                : "btn btn-xs btn-circle mr-2 text-[#1E88E5]"
            }
            key={page}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

Posts.propTypes = {
  count: PropTypes.number,
};

export default Posts;
