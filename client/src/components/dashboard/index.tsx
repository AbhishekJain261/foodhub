import Link from "next/link";
import React from "react";
import { IoHome } from "react-icons/io5";
import { MdExplore } from "react-icons/md";

const Dashboard = () => {
  return (
    <div className="border-r px-5 mr-9 h-full">
      <div className="mb-5 home-icon">
        <Link href="/">
          <IoHome size={28} />
        </Link>
      </div>
      <div className="home-icon">
        <Link href="/">
          <MdExplore size={28} />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
