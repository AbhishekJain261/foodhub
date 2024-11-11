import React from "react";
import { IoHome } from "react-icons/io5";
import { MdExplore } from "react-icons/md";

const NavLeftTabs = () => {
    return (
        <div>
            <div className="mb-5 home-icon">
                <IoHome size={28} />
            </div>
            <div className="home-icon">
                <MdExplore size={28} />
            </div>
        </div>
    );
};

export default NavLeftTabs;
