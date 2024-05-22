import Header from "./header/Header";
import Footer from "./footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container mx-auto px-4">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
