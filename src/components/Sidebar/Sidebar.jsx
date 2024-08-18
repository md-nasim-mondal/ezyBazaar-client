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
        className={`z-10 hidden md:flex flex-col justify-between overflow-x-hidden w-52 lg:w-64
           space-y-6 px-2 py-4 ${
             !showSidebar && "hidden"
           }  transition duration-200 ease-in-out border-r bg-sky-200 dark:border-zinc-800 dark:bg-zinc-800  min-h-screen dark:text-white`}>
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2  rounded-lg justify-center items-center mx-auto'>
              <h1 className='my-3 text-xl lg:text-3xl font-medium text-green-600'>
                Filter Products
              </h1>
            </div>
          </div>

          <FilterInput />
        </div>

        <hr />
        <div>
          <MenuItem icon={IoSettingsOutline} label={"Reset All Filter"} address={"#"} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
