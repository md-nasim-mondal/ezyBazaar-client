import Container from "./Container";
import { IoNotificationsOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import UserMenuDropdown from "./DropDown/UserDropDown";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import Drawer from "./Drawer/Drawer";

const Navbar = () => {
  const { smallDevice } = useAuth();
  const user = true;
  if (smallDevice) {
    return (
      <div className='w-full bg-white dark:bg-gray-600 z-10 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
          <Container>
            <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
              {/* User Menu Drop Down */}
              {/* <div>{user && <UserMenuDropdown />}</div> */}

              <h1 className='my-5 text-[40px] font-medium text-[#4285F3] text-center'>
                LOGO
              </h1>

              <div>
                {user && (
                  <>
                    <div className='flex flex-row items-center gap-3'>
                      <div className='border-r-2 pr-6'>
                        <span>
                          <IoNotificationsOutline className='text-2xl w-12 h-12 border rounded-full p-2 dark:text-white' />
                        </span>
                      </div>
                      <div>
                        <div className='flex items-center gap-4 font-semibold'>
                          <Drawer />
                          <span className='text-[#152A16]'>
                            <ThemeToggle />
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
  return (
    <div className='w-full bg-white dark:bg-gray-600 z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
            <div>
              <h1 className='text-[40px] font-medium text-[#4285F3] text-center'>
                LOGO
              </h1>
            </div>
            <div>
              {user && (
                <>
                  <div className='flex flex-row items-center gap-3'>
                    <div className='border-r-2 pr-6'>
                      <span>
                        <IoNotificationsOutline className='text-2xl w-12 h-12 border rounded-full p-2 dark:text-white' />
                      </span>
                    </div>
                    <div>
                      <div className='flex items-center text-[#F15E4A] gap-4 font-semibold'>

                        {/* User Menu Drop Down */}
                        <div>{user && <UserMenuDropdown />}</div>
                        <span className='text-[#152A16]'>
                          <ThemeToggle />
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
