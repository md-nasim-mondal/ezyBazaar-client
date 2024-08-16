import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

const Main = () => {
  return (
    <div className='relative md:flex dark:bg-gray-900'>
      <div className='min-h-screen hidden md:block'>
        <Sidebar></Sidebar>
      </div>
      <div className='flex-1 max-h-screen overflow-y-scroll'>
        <Navbar />
        <div className='max-w-7xl mx-auto pt-24'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
