import { IoSettingsOutline } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import FilterInput from "../FilterInput";
import MenuItem from "../MenuItem";
const Sidebar = () => {
  const { showSidebar } = useAuth();
  return (
    <>
      {/* Sidebar */}
      <div
        className={`z-10 hidden md:flex flex-col justify-between overflow-x-hidden w-64
           space-y-6 px-2 py-4 ${
             !showSidebar && "hidden"
           }  transition duration-200 ease-in-out border-r dark:border-gray-100 bg-white dark:bg-gray-600  min-h-screen dark:text-white`}>
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2  rounded-lg justify-center items-center mx-auto'>
              <h1 className='my-3 text-3xl font-medium text-[#4285F3]'>
                Filter Products
              </h1>
            </div>
          </div>

          <FilterInput />
        </div>

        <hr />
        <div>
          <MenuItem icon={IoSettingsOutline} label={"settings"} address={"#"} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
