import Container from "./Container";
import { IoNotificationsOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import UserMenuDropdown from "./DropDown/UserDropDown";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import Drawer from "./Drawer/Drawer";
import toast from "react-hot-toast";
import { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  const {
    searchText,
    setSearchText,
    setCurrentPage,
    smallDevice,
    setShowSearchField,
    showSearchField,
    user,
  } = useAuth();

  const inputRef = useRef(null);
  const handleSearchProduct = (e) => {
    e.preventDefault();
    if (searchText.trim() === "") {
      return toast.error("Cannot Perform Empty Search!");
    }
    setSearchText(searchText.trim());
    setCurrentPage(1);
  };

  // Clear Search Text after a search
  const clearSearchText = () => {
    setSearchText("");
    if (inputRef.current) inputRef.current.value = "";
    setCurrentPage(1);
  };

  if (smallDevice) {
    return (
      <div className='w-full bg-[#F2F2F2] dark:bg-[#191E24] z-10 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
          <Container>
            <div className='flex flex-row  items-center justify-between gap-3 md:gap-0 relative'>
              <Link to={"/home"}>
                <h1 className='my-5 text-2xl font-medium text-[#4285F3] text-center'>
                  EzyBazaar
                </h1>
              </Link>
              <div
                className=' absolute right-[10%] -bottom-[100%] md:hidden dark:bg-gray-600
               p-4 rounded-lg'>
                {showSearchField && (
                  <>
                    {/* Search Products */}
                    <form
                      onSubmit={handleSearchProduct}
                      className='sm:col-span-2 lg:col-span-2 xl:col-span-1 flex gap-2 items-center justify-start text-ezyBazaar-secondary'>
                      <div className='flex gap-2 w-full items-center relative pl-2 pr-6 bg-transparent rounded-lg border border-ezyBazaar-secondary'>
                        <label className='font-medium' htmlFor='search'>
                          <FaSearch />
                        </label>
                        <input
                          ref={inputRef}
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                          className='px-2 rounded-r-lg py-2 bg-transparent w-full border-l border-ezyBazaar-secondary focus:outline-0'
                          placeholder='Search Products'
                          type='text'
                          name='search'
                          id='search'
                        />
                        <div className='absolute right-0 flex gap-2'>
                          {searchText !== "" && (
                            <button
                              title='Clear Search Field'
                              onClick={clearSearchText}
                              className='text-2xl hover:text-ezyBazaar-primary transition-all duration-500 z-10'
                              type='button'>
                              <MdClear />
                            </button>
                          )}
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
              <div>
                {user && (
                  <>
                    <div className='flex flex-row items-center gap-3'>
                      <div
                        onClick={() => setShowSearchField(!showSearchField)}
                        className='font-medium border-2 p-3.5 border-gray-200 rounded-full'>
                        <FaSearch className='text-2xl' />
                      </div>
                      <div className='border-r-2 pr-6 hidden md:block'>
                        <span>
                          <IoNotificationsOutline className='text-2xl w-12 h-12 border rounded-full p-2 dark:text-white' />
                        </span>
                      </div>
                      <div>
                        <div className='flex items-center gap-1 font-semibold'>
                          <Drawer />
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
    <div className='w-full bg-[#F2F2F2] dark:bg-[#191E24] z-10 shadow-sm'>
      <div className='py-4 border-b-[1px] relative'>
        <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
            <div>
              <Link to={"/home"}>
                <h1 className='lg:text-[40px] text-2xl font-medium text-[#4285F3] text-center'>
                  EzyBazaar
                </h1>
              </Link>
            </div>
            <div>
              {/* Search Products */}
              <form
                onSubmit={handleSearchProduct}
                className='sm:col-span-2 lg:col-span-2 xl:col-span-1 lg:flex gap-2 items-center justify-start text-ezyBazaar-secondary hidden'>
                <div className='flex gap-2 w-full items-center relative pl-2 pr-6 bg-transparent rounded-lg border border-ezyBazaar-secondary'>
                  <label className='font-medium' htmlFor='search'>
                    <FaSearch />
                  </label>
                  <input
                    ref={inputRef}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className='px-2 rounded-r-lg py-2 bg-transparent w-full border-l border-ezyBazaar-secondary focus:outline-0'
                    placeholder='Search Products'
                    type='text'
                    name='search'
                    id='search'
                  />
                  <div className='absolute right-0 flex gap-2'>
                    {searchText !== "" && (
                      <button
                        title='Clear Search Field'
                        onClick={clearSearchText}
                        className='text-2xl hover:text-ezyBazaar-primary transition-all duration-500 z-10'
                        type='button'>
                        <MdClear />
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div className=' absolute right-[35%] -bottom-[90%] lg:hidden dark:bg-gray-600 p-4 rounded-lg'>
              {showSearchField && (
                <>
                  {/* Search Products */}
                  <form
                    onSubmit={handleSearchProduct}
                    className='sm:col-span-2 lg:col-span-2 xl:col-span-1 flex gap-2 items-center justify-start text-ezyBazaar-secondary'>
                    <div className='flex gap-2 w-full items-center relative pl-2 pr-6 bg-transparent rounded-lg border border-ezyBazaar-secondary'>
                      <label className='font-medium' htmlFor='search'>
                        <FaSearch />
                      </label>
                      <input
                        ref={inputRef}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        className='px-2 rounded-r-lg py-2 bg-transparent w-full border-l border-ezyBazaar-secondary focus:outline-0'
                        placeholder='Search Products'
                        type='text'
                        name='search'
                        id='search'
                      />
                      <div className='absolute right-0 flex gap-2'>
                        {searchText !== "" && (
                          <button
                            title='Clear Search Field'
                            onClick={clearSearchText}
                            className='text-2xl hover:text-ezyBazaar-primary transition-all duration-500 z-10'
                            type='button'>
                            <MdClear />
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </>
              )}
            </div>
            <div>
              {user && (
                <>
                  <div className='flex flex-row items-center gap-3'>
                    <div className='border-r-2 pr-6 hidden lg:block'>
                      <span>
                        <IoNotificationsOutline className='text-2xl w-12 h-12 border rounded-full p-2 dark:text-white' />
                      </span>
                    </div>
                    <div
                      onClick={() => setShowSearchField(!showSearchField)}
                      className='font-medium border-2 p-2 border-gray-200 rounded-full lg:hidden'>
                      <FaSearch className='text-2xl' />
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
