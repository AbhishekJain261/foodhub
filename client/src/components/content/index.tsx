import React, { useState } from "react";
import Search from "../search";
import { RiSearchEyeLine } from "react-icons/ri";
import FilteredList from "../filter-list";

const Content = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <div className="flex gap-2 h-max justify-between w-full">
        <div className=" w-full relative">
          <div className="absolute top-[50%] -translate-y-1/2 left-4">
            <RiSearchEyeLine size={20} />
          </div>
          <Search />
        </div>
        <FilteredList />
      </div>
    </>
  );
};

export default Content;
