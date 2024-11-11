import React from "react";
import Search from "../search";
import Products from "../products";

const NavRightTabs = () => {
  return (
    <>
      <div className="flex gap-2">
        <div className="w-10/12" style={{ width: "90%" }}>
          <Search className="!p-2" />
        </div>
        <div className="w-[10%]">
          <h1>Login</h1>
        </div>
      </div>
      <div>
        <Products />
      </div>
    </>
  );
};

export default NavRightTabs;
