import Mainbar from "@/components/homePageComponents/mainbar/Mainbar";
import Sidebar from "@/components/homePageComponents/sidebar/Sidebar";
import React from "react";

const HomePage = () => {
  return (
    <div className="">
      <div className="grid grid-cols-5 ">
        <div className="col-span-1 ">
          <Sidebar />
        </div>
        <div className="col-span-4">
          <Mainbar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
