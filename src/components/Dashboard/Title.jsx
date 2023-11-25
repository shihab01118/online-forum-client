import PropTypes from "prop-types";

const Title = ({ heading, subheading }) => {
  return (
    <div className="text-center max-w-lg mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold uppercase mb-2">{heading}</h2>
      <p className="text-gray-600 font-medium">{subheading}</p>
    </div>
  );
};

Title.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

export default Title;
