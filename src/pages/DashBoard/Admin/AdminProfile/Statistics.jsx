import PropTypes from "prop-types";
// import Chart from "react-apexcharts";

const Statistics = ({ userCount, postCount, commentCount }) => {
  console.log(userCount, postCount, commentCount);

  return (
    <div>
      {/* <Chart></Chart> */}
    </div>
  );
};

Statistics.propTypes = {
  userCount: PropTypes.number,
  postCount: PropTypes.number,
  commentCount: PropTypes.number,
};

export default Statistics;
