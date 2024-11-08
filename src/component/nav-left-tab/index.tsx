import React from 'react';
import { IoHome } from "react-icons/io5";
import { MdExplore } from "react-icons/md";

const NavLeftTabs = () => {
  return (
    <div>
        <div className='mt-3'><IoHome size={34}  /></div>
        <div className='mt-5'><MdExplore size={34}  /></div>
    </div>
  );
}

export default NavLeftTabs;
