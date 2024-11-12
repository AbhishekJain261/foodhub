import React from "react";
import Search from "../search";
import Products from "../products";

const NavRightTabs = () => {
    return (
        <>
            <div className="flex gap-2 justify-between">
                <div className="w-10/12">
                    <Search />
                </div>
                <div className="w-2/12 flex items-center justify-center  text-black rounded-[10px] mr-[10px]">
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
            <div>
                <Products />
            </div>
        </>
    );
};

export default NavRightTabs;
