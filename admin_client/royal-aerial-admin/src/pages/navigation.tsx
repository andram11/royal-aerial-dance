import LogoIcon from "../assets/LogoIcon";
import UserIcon from "../assets/UserIcon";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <>
      <div className="flex items-center justify-between bg-tertiary">
        <div className="mb-4">
          <Link to="/admin">
            <LogoIcon />
          </Link>
        </div>
        <div className="flex items-center space-x-4 ml-auto text-base mr-6">
          <div className="text-primary font-bold">
            <a href="https://documenter.getpostman.com/view/10964312/2sAXjF7Zp4">
              Docs
            </a>
          </div>
          <div className="text-secondary font-bold">
            <Link to='/courses'>COURSES</Link>
              
           
          </div>
          <div className="mb-2">
            <UserIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
