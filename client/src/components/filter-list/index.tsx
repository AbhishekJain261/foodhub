import { setFilter } from "@/redux/filterSlice";
import React from "react";
import { useDispatch } from "react-redux";

const FilteredList = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    dispatch(setFilter(selectedValue));
    console.log(selectedValue, "hello");
  };

  return (
    <div className="w-2/12 flex items-center justify-center h-max text-black rounded-[10px] mr-[10px]">
      <select
        name="filter"
        id="filter"
        className="h-[45px] border border-[#000] px-5 rounded-[10px] w-full"
        onChange={(e)=>{
          console.log('e>>>>>>>>',e.target.value);
          
          handleFilterChange(e)
        }
        }
        
        defaultValue="" // Set default value here
      >
        <option value="" disabled>
          Select One
        </option>
        <option value="popularity">Popularity</option>
        <option value="totalViews">Most Viewed</option>
      </select>
    </div>
  );
};

export default FilteredList;
