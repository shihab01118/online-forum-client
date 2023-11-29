import PropTypes from "prop-types";
import { FaComment, FaList, FaUsers } from "react-icons/fa";

const Stats = ({ userCount, postCount, commentCount }) => {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-gradient-to-r from-[#0096c7] to-[#90D6EA] h-28 rounded shadow-md text-white text-center flex justify-center items-center">
        <div>
          <h3 className="text-xl font-semibold mb-3">Total Users</h3>
          <div className="w-fit mx-auto">
            <div className="flex gap-3 items-center">
              <FaUsers size={32} />
              <p className="text-3xl font-semibold">{userCount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#06BC6B] to-[#49F3B5] h-28 rounded shadow-md text-white flex justify-center items-center">
        <div>
          <h3 className="text-xl font-semibold mb-3">Total Posts</h3>
          <div className="w-fit mx-auto">
            <div className="flex gap-3 items-center">
              <FaList size={24} />
              <p className="text-3xl font-semibold">{postCount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#FF9D08] to-[#FFD008] h-28 rounded shadow-md text-white flex justify-center items-center">
        <div>
          <h3 className="text-xl font-semibold mb-3">Total Comments</h3>
          <div className="w-fit mx-auto">
            <div className="flex gap-3 items-center">
              <FaComment size={32} />
              <p className="text-3xl font-semibold">{commentCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Stats.propTypes = {
  userCount: PropTypes.number,
  postCount: PropTypes.number,
  commentCount: PropTypes.number,
};

export default Stats;
