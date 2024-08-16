import { FcGoogle } from "react-icons/fc";
import { GrFacebookOption } from "react-icons/gr";
import PropTypes from "prop-types";

const SocialLogin = ({ isLoading, handleGoogleSignIn }) => {
  return (
    <div className='flex justify-between items-center flex-wrap gap-4 mb-6'>
      <button
        disabled={isLoading}
        onClick={handleGoogleSignIn}
        className='flex justify-center text-base min-w-[178px] h-[55px] items-center space-x-2 disabled:cursor-not-allowed cursor-pointer rounded-lg shadow-lg bg-gradient-to-r from-[#E4E4E4] to-[#FFFFFF]'>
        <FcGoogle size={32} />
        <p>Google</p>
      </button>
      <button
        type='button'
        className='text-white bg-gradient-to-t min-w-[205px] h-[55px] from-[#298FFF] to-[#298FFF] font-medium rounded-xl text-base justify-center inline-flex items-center'>
        <GrFacebookOption className='text-xl' />
        Facebook
      </button>
    </div>
  );
};

SocialLogin.propTypes = {
  isLoading: PropTypes.bool,
  handleGoogleSignIn: PropTypes.func,
};

export default SocialLogin;
