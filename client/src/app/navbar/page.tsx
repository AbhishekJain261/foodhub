import NavLeftTabs from "@/components/nav-left-tab";
import NavRightTabs from "@/components/nav-right-tabs";
import react from "react";

const Navbar = () => {
  return (
    <div className="grid grid-cols-12 grid-rows-5 gap-4">
      <div className="row-span-5 flex justify-center border-r h-screen mt-3">
        <NavLeftTabs />
      </div>
      <div className="w-full row-span-4 col-span-11 mt-3">
        <NavRightTabs />
      </div>
    </div>
  );
};

export default Navbar;
