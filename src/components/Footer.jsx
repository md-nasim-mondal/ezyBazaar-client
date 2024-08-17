import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className='bg-white rounded-t-lg shadow dark:bg-gray-600 mx-6 mb-0'>
      <div className='w-full mx-auto p-4 md:py-8'>
        <div className='sm:flex sm:items-center sm:justify-between max-w-screen-xl mx-auto'>
          <Link
            to='/'
            className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'>
            {/* <img
              src={logo}
              className='h-8 md:h-10 lg:h-12'
              alt='petLoversHub Logo '
            /> */}

            logo
          </Link>
          <ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
            <li>
              <a href='#' className='hover:underline me-4 md:me-6'>
                About
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline me-4 md:me-6'>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline me-4 md:me-6'>
                Licensing
              </a>
            </li>
            <li>
              <a href='#' className='hover:underline'>
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
        <span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
          © 2024{" "}
          <a href='#' className='hover:underline'>
            EzyBazaar
          </a>
          All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;