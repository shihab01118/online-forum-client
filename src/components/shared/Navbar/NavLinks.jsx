import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <div className="hidden md:flex gap-8">
      <NavLink className="font-semibold text-[#757575]" to="/">Home</NavLink>
      <NavLink className="font-semibold text-[#757575]" to="/membership">Membership</NavLink>
    </div>
  );
};
export default NavLinks;
