import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const Main = () => {
  const location = useLocation();
  const [showComponents, setShowComponents] = useState(false);
  const { setShowSidebar, setUserDropDownOpen, user } = useAuth();
  useEffect(() => {
    if (
      location?.pathname.toLowerCase() === "/signup" ||
      location?.pathname.toLowerCase() === "/"
    ) {
      setShowComponents(false);
      setShowSidebar(false);
    } else {
      setShowComponents(true);
      setShowSidebar(true);
    }
  }, [location?.pathname, setShowSidebar]);
  return (
    <div className='relative md:flex dark:bg-gray-900'>
      <div className='min-h-screen hidden md:block'>
        {showComponents && user && <Sidebar />}
      </div>
      <div className='flex-1 max-h-screen overflow-y-scroll flex flex-col'>
        {showComponents && user && <Navbar />}
        <div
          onClick={() => setUserDropDownOpen(false)}
          className={`md:max-w-full ${user && showComponents && 'p-6 bg-gray-200 dark:bg-gray-900'}
         mx-auto  dark:text-white w-full`}>
          <Outlet />
        </div>
        {showComponents && user && <Footer />}
      </div>
    </div>
  );
};

export default Main;
