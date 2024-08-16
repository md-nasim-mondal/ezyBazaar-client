import useAuth from "../../hooks/useAuth";
import avatarImg from "../../assets/images/placeholder.jpg";
import { CiLogin } from "react-icons/ci";

const UserMenuDropdown = () => {
  const { userDropDownOpen, setUserDropDownOpen, user, logOut } = useAuth();

  return (
    <div className='relative inline-block focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring'>
      {/* UserMenuDropdown toggle button */}
      <button
        onClick={() => setUserDropDownOpen(!userDropDownOpen)}
        className='relative z-10 flex items-center p-x-2 text-sm text-gray-600 bg-white border border-transparent rounded-t-md focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 dark:text-white dark:bg-gray-600 focus:outline-none'>
        <span>
          <a
            href='#'
            className='flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
            <img
              className='flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9'
              src={user?.photoURL || avatarImg}
              alt='jane avatar'
            />
            <div className='mx-1'>
              <h1 className='text-sm font-semibold text-gray-700 dark:text-gray-200'>
                {user?.displayName}
              </h1>
              <p className='text-sm text-gray-900 dark:text-gray-200'>
                {user?.email}
              </p>
            </div>
          </a>
        </span>
        <svg
          className='w-5 h-5 mx-1'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12 15.713L18.01 9.70299L16.597 8.28799L12 12.888L7.40399 8.28799L5.98999 9.70199L12 15.713Z'
            fill='currentColor'></path>
        </svg>
      </button>

      {/* UserMenuDropdown menu */}
      {userDropDownOpen && (
        <div
          onClick={() => setUserDropDownOpen(false)}
          className='absolute right-0 z-20 w-full  min-w-40 py-2 overflow-hidden origin-top-right bg-white rounded-b-md shadow-xl dark:bg-gray-600'>
          <a
            href='#'
            className='flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
            <span className='mx-1'>view profile</span>
          </a>

          <hr className='border-gray-200 dark:border-gray-700' />

          <a
            href='#'
            className='flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
            <span className='mx-1'>Settings</span>
          </a>

          <hr className='border-gray-200 dark:border-gray-700' />

          <a
            href='#'
            className='flex items-center p-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
            <span className='mx-1'>Help</span>
          </a>
          <hr className='border-gray-200 dark:border-gray-700' />
          <div
            onClick={logOut}
            className='flex items-center p-3 text-sm  capitalize transition-colors duration-300 transform hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
            <span className='mx-1'>Sign Out</span>{" "}
            <span className='bg-[#FFECEA] p-2 rounded-full w-8 h-8 flex items-center dark:hover:bg-black'>
              <CiLogin className='text-xl' />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenuDropdown;
