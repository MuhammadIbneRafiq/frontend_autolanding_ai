import React from "react";
import { SquarePen } from "lucide-react";

const Sidebar = () => {
  return (
    <div
      className="border border-r-0"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <div className="p-4 h-full">
        <div className="flex flex-col h-full">
          <div className="flex-1  ">
            <div className="flex items-center justify-between border-b pb-2">
              <h1 className="font-semibold text-sm text-black dark:text-white">
                Chats
              </h1>
              <SquarePen className="w-5 h-5 text-black dark:text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="border-b pb-2">
              <h1 className="font-semibold text-sm text-black dark:text-white">
                Projects
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
