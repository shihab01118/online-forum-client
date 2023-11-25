import { Link } from "react-router-dom";
import logoImg from "../../assets/logo/logo.png";

const Logo = () => {
  return (
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
  );
};
export default Logo;
