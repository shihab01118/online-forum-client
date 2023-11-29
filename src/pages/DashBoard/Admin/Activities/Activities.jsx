import { Helmet } from "react-helmet-async";
import Title from "../../../../components/Dashboard/Title";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api";
import Loader from "../../../../components/shared/Loader";
import ReportedComment from "./ReportedComment";

const Activities = () => {
  const {
    data: reportedComments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reportedComments", axiosSecure],
    queryFn: async () => {
      const { data } = await axiosSecure("/reportedComments");
      return data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>Dashboard - Activities</title>
      </Helmet>
      {reportedComments.length ? (
        <div>
          <Title
            heading="Admin Control Center"
            subheading="Review, Manage, and Act on Reported Activities"
          />
          <div className="mt-6">
            <div className="grid md:grid-cols-2 gap-5">
              {reportedComments?.map((item) => (
                <ReportedComment
                  key={item?._id}
                  item={item}
                  refetch={refetch}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[calc(100vh-48px)] flex justify-center items-center">
          <div className="text-center">
            <p className="text-red-500 font-medium text-lg mb-3 capitalize">
              {" "}
              No Activities Found!{" "}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
export default Activities;
