import Title from "../../../components/Dashboard/Title";
import Loader from "../../../components/shared/Loader";
import useGetAnnouncements from "../../../hooks/useGetAnnouncements";
import Announcement from "./Announcement";

const Announcements = () => {
  const { announcements, isLoading } = useGetAnnouncements();

  if (isLoading) return <Loader />;

  return (
    <>
      {announcements?.length > 0 && (
        <div className="my-16">
          <Title
            heading="Latest Announcements"
            subheading="Stay Updated with Important News and Updates"
          />
          <div className="mt-8 flex flex-col gap-6">
            {announcements?.map((announcement) => (
              <Announcement
                key={announcement._id}
                announcement={announcement}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default Announcements;
