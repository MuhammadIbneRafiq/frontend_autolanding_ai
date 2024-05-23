import Mainbar from "./mainbar/Mainbar";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="px-10">
      <Header />
      <div className="grid grid-cols-5 ">
        <div className="col-span-1 ">
          <Sidebar />
        </div>
        <div className="col-span-4">
          <Mainbar>
            <main>
              <Outlet />
            </main>
          </Mainbar>
        </div>
      </div>
    </div>
  );
};

export default Layout;
