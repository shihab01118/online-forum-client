import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      className="flex items-center px-4 py-2 text-[#757575]"
    >
      <Icon className="w-5 h-5" />

      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

MenuItem.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  icon: PropTypes.any,
};

export default MenuItem;
