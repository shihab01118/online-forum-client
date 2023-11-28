/* eslint-disable no-unused-vars */
import { useSearchParams } from "react-router-dom";
import Title from "../../../components/Dashboard/Title";
import Loader from "../../../components/shared/Loader";
import Post from "./Post";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";

const Posts = ({ count }) => {
  const axiosPublic = useAxiosPublic();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sorted, setSorted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useSearchParams();
  const tag = params.get("tag");

  const itemsPerPage = 5;
  const numberOfPages = Math.ceil(count / itemsPerPage);

  const pages = [];
  for (let i = 1; i <= numberOfPages; i++) {
    pages.push(i);
  }

  // const { data: posts, isLoading } = useQuery({
  //   queryKey: ["posts", axiosPublic, currentPage, itemsPerPage],
  //   queryFn: async () => {
  //     const { data } = await axiosPublic(
  //       `/posts?page=${currentPage - 1}&size=${itemsPerPage}`
  //     );
  //     return data;
  //   },
  // });

  useEffect(() => {
    setIsLoading(true);
    axiosPublic(`/posts?page=${currentPage - 1}&size=${itemsPerPage}`).then(
      (res) => {
        setPosts(res.data);
        setIsLoading(false);
      }
    );
  }, [axiosPublic, currentPage, itemsPerPage]);

  useEffect(() => {
    setIsLoading(true);
    axiosPublic(
      `/posts/sort/popularity?page=${currentPage - 1}&size=${itemsPerPage}`
    ).then((res) => {
      setSorted(res.data);
      setIsLoading(false);
    });
  }, [axiosPublic, currentPage, itemsPerPage]);

  // console.log(pages);

  useEffect(() => {
    if (tag) {
      const filtered = posts?.filter((item) => item?.tag === tag.toLowerCase());
      setFilteredPosts(filtered);
    }
  }, [posts, tag]);

  if (isLoading) return <Loader />;

  const handleSortByPopularity = () => {
    // const res = await axiosPublic(
    //   `/posts/sort/popularity?page=${currentPage - 1}&size=${itemsPerPage}`
    // );
    setPosts(sorted);
  };

  return (
    <div className="my-16">
      <Title
        heading="Explore Diverse Perspectives"
        subheading="Engage, Share, and Discover Insights from our Community's Posts"
      />
      <div className="w-fit ml-auto my-6">
        <Button
          onClick={handleSortByPopularity}
          style={{ textTransform: "capitalize" }}
          variant="contained"
        >
          Sort By Popularity
        </Button>
      </div>
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
