import React from "react";
import Search from "../search";
import Products from "../products";

const NavRightTabs = () => {
  return (
    <>
      <div className="flex gap-2 justify-between">
        <div className="w-10/12" >
          <Search />
        </div>
        <div className="w-2/12 flex items-center justify-center bg-black text-white rounded-[10px] mr-[10px]" >
          <button className="text-center cursor-pointer">Filter</button>
        </div>
      </div>
      <div>
        <Products />
      </div>
    </>
  );
};

export default NavRightTabs;
