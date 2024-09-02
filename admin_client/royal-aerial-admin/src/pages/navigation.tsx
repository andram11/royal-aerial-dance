import React from 'react';
import LogoIcon from "../assets/LogoIcon";
import UserIcon from "../assets/UserIcon";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  return (
    <div className="w-full bg-tertiary px-4">
      <div className="flex items-center justify-between">
        <div className="mb-4">
          <Link to="/admin">
            <LogoIcon />
          </Link>
        </div>
        <div className="flex items-center space-x-4 text-base">
          <div className="text-primary font-bold">
            <a href="https://documenter.getpostman.com/view/10964312/2sAXjF7Zp4">
              Docs
            </a>
          </div>
          <div className="text-secondary font-bold">
            <Link to="/admin/courses">COURSES</Link>
          </div>
          <div className="text-secondary font-bold">
            <Link to="/admin/transactions">TRANSACTIONS</Link>
          </div>
          <div className="mb-2">
            <UserIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
