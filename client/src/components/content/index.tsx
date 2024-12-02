import React, { useState } from "react";
import Search from "../search";
import Products from "../products";
import { RiSearchEyeLine } from "react-icons/ri";

const Content = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="flex gap-2 h-max justify-between w-full">
        <div className=" w-full relative">
          <div className="absolute top-[50%] -translate-y-1/2 left-4">
            <RiSearchEyeLine size={20} />
          </div>
          <Search onSearchChange={setSearchQuery} />
        </div>
        <div className="w-2/12 flex items-center justify-center h-max text-black rounded-[10px] mr-[10px]">
          <details className="dropdown w-full">
            <summary className="btn w-full">Filter</summary>
            <ul className="menu mt-2 dropdown-content bg-base-100 rounded-box z-[1] w-full p-2 shadow">
              <li>
                <a>Popularity</a>
              </li>
              <li>
                <a>Most Viewed</a>
              </li>
            </ul>
          </details>
        </div>
      </div>
    </>
  );
};

export default Content;
