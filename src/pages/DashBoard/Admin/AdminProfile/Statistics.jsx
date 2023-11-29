import PropTypes from "prop-types";
import Chart from "react-apexcharts";

const Statistics = ({ userCount, postCount, commentCount }) => {

  return (
    <div className="mt-[55px]">
      <h2 className="text-xl font-semibold">Statistics</h2>
      <div className="w-fit mx-auto">
      <Chart
        options={{
          labels: ["Total Users", "Total Posts", "Total Comments"]
        }}
        series={[userCount, postCount, commentCount]}
        type="pie"
        width="500"
        height={500}
      />
      </div>
    </div>
  );
};

Statistics.propTypes = {
  userCount: PropTypes.number,
  postCount: PropTypes.number,
  commentCount: PropTypes.number,
};

export default Statistics;
