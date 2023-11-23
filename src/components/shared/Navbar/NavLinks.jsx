import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <div className="hidden md:flex gap-8">
      <NavLink className="font-semibold" to="/">Home</NavLink>
      <NavLink className="font-semibold" to="/membership">Membership</NavLink>
    </div>
  );
};
export default NavLinks;
