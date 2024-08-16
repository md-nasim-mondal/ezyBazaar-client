import { AiOutlineAppstore, AiOutlineBars } from "react-icons/ai";
import MenuItem from "../MenuItem";
import { GoPeople } from "react-icons/go";
import { CiHeart, CiLogin, CiSearch } from "react-icons/ci";
import { IoDocumentTextOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineHelpCenter } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

const Drawer = () => {
  const { isOpen, setIsOpen, user, logOut } = useAuth();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Drawer init and toggle */}

      {/* Small Screen Navbar */}
      <div className='flex justify-between '>
        <button
          onClick={toggleDrawer}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'>
          <AiOutlineBars className='h-12 w-12' />
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className='fixed inset-0 bg-black opacity-60 z-30'></div>
      )}

      {/* Drawer component */}
      <div
        id='drawer-right-example'
        className={`fixed top-0 right-0 z-50  min-h-[50vh] overflow-y-auto transition-transform transform bg-white w-80 dark:bg-gray-800 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        tabIndex='-1'
        aria-labelledby='drawer-right-label'>
        <div className='flex flex-col justify-between min-h-[70vh]'>
          <div className='flex-1 flex flex-col justify-end bg-[#156BCA] relative'>
            <div
              onClick={() => setIsOpen(false)}
              className='text-3xl pl-5 pt-5 text-white'>
              X
            </div>
            <div className='ml-auto pr-4 pb-12'>
              <div>
                <img
                  src={user?.photoURL}
                  alt=''
                  className='w-36 h-36 rounded-full'
                />
              </div>
              <h4 className='text-white font-semibold leading-9 text-2xl my-1'>
                {user?.displayName}
              </h4>
              <p className='text-lg text-[#152A16]'>{user?.email}</p>
            </div>
          </div>
          {/* Nav Items */}
          <div>
            {/*  Menu Items */}
            <div className='space-y-5 p-4 pl-0 space-x-2'>
              <MenuItem
                label={"Home"}
                address={"/home"}
                icon={AiOutlineAppstore}
              />
              <MenuItem
                label={"New Listing"}
                address={"/new-listing"}
                icon={GoPeople}
              />
              <MenuItem label={"Search"} address={"/search"} icon={CiSearch} />
              <MenuItem
                label={"About"}
                address={"/about"}
                icon={IoDocumentTextOutline}
              />
              <MenuItem
                label={"Favorites"}
                address={"/favorites"}
                icon={CiHeart}
              />
              <hr />

              {/* Profile Menu */}
              <MenuItem
                label={"Help"}
                address={"/help"}
                icon={MdOutlineHelpCenter}
              />

              <MenuItem
                label={"Settings"}
                address={"/settings"}
                icon={IoSettingsOutline}
              />
              <div
                onClick={logOut}
                className='text-red-600 flex gap-4 pl-3 pb-4 text-lg'>
                <CiLogin className='text-2xl' /> Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
