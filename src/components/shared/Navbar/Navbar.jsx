import { Link } from "react-router-dom";
import logoImg from "../../../assets/logo/logo.png";
import Container from "../Container";
import NavLinks from "./NavLinks";
import Dropdown from "./Dropdown";
import useAuth from "../../../hooks/useAuth";
import { AwesomeButton } from "react-awesome-button";
import MenuDropdown from "./MenuDropdown";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useGetAnnouncements from "../../../hooks/useGetAnnouncements";

const Navbar = () => {
  const { user } = useAuth();
  const { announcements } = useGetAnnouncements();

  return (
    <nav className="w-full fixed bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
            <div className="flex items-center gap-3">
              <MenuDropdown />
              {/* Logo */}
              <Link to="/">
                <div className="flex gap-2 items-center">
                  <img
                    src={logoImg}
                    className="hidden md:block"
                    alt="logo"
                    width="32"
                    height="32"
                  />
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    Discuss<span className="text-[#1E88E5]">Hub</span>
                  </h2>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-5 md:gap-8">
              <NavLinks />
              <Badge
                style={{ cursor: "pointer" }}
                badgeContent={announcements?.length}
                color="primary"
              >
                <NotificationsIcon
                  style={{ fontSize: "26px" }}
                  color="action"
                />
              </Badge>
              {user ? (
                <Dropdown />
              ) : (
                <Link to="/login">
                  <AwesomeButton>Join Now</AwesomeButton>
                </Link>
              )}
            </div>
          </div>
        </Container>
      </div>
    </nav>
  );
};
export default Navbar;
