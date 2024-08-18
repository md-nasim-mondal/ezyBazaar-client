import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { imageUpload } from "../api/utils";
import useAuth from "../hooks/useAuth";
import SocialLogin from "../components/SocialLogin";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/home";
  const [isLoading, setIsLoading] = useState(false);
  const { createUser, updateUserProfile, setUser, loading, signInWithGoogle } =
    useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    const accepted = e.target.terms.checked;

    if (password.length < 6) {
      return toast.error("Password length should be minimum 6 digit");
    }
    if (!accepted) {
      return toast.error("Please accept our terms of service!");
    }

    try {
      setIsLoading(true);
      // 1. Upload image and get image url
      const image_url = await imageUpload(image);

      // 2. User Registration
      const result = await createUser(email, password);

      // 3. Save username and photo in firebase
      await updateUserProfile(name, image_url);

      // Optimistic UI update
      setUser({ ...result?.user, photoURL: image_url, displayName: name });

      navigate(from);
      toast.success("SignUp Successful");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      navigate(from);
      toast.success("LogIn Successful With Google");
      setIsLoading(false);
    } catch (err) {
      // console.log(err)
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  if (loading)
    return <p className='text-center my-24 dark:text-white'>Loading...</p>;

  return (
    <div className='flex flex-col lg:flex-row justify-center items-center min-h-screen mx-auto xl:gap-24 bg-white p-4'>
      <div className='flex flex-col max-w-lg p-4 md:p-6 border-2 rounded-xl '>
        <div className='mb-4 text-start'>
              <Link to={"/home"}>
                <h1 className='text-[40px] font-medium text-[#4285F3] text-center'>
                  EzyBazaar
                </h1>
              </Link>
          <h1 className='my-3 text-3xl font-bold'>Sign Up To Your Account</h1>
          <p className='text-lg'>
            Welcome Back! By click the sign up button, you&apos;re agree to
            Zenitood Terms and Service and acknowledge the{" "}
            <span className='text-[#4285F3] underline'>
              <a href='#'>Privacy and Policy</a>
            </span>
          </p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='block mb-2  text-[#152A16] font-semibold'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='@username'
                required
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500'
                data-temp-mail-org='0'
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='block mb-2 text-[#152A16] font-semibold'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter your email'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500'
                data-temp-mail-org='0'
              />
            </div>

            <div>
              <label
                htmlFor='image'
                className='block mb-2 text-[#152A16] font-semibold'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500'
              />
            </div>

            <div className='relative'>
              <div className='flex justify-between'>
                <label
                  htmlFor='password'
                  className='mb-2 text-[#152A16] font-semibold'>
                  Password
                </label>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='Enter your password'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500'
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-[3%] top-[58%]'>
                {showPassword ? (
                  <IoEyeOutline className='text-xl' />
                ) : (
                  <IoEyeOffOutline className='text-xl' />
                )}
              </div>
            </div>
          </div>

          <div className='flex items-start mb-5'>
            <div className='flex items-center h-5'>
              <input
                id='terms'
                type='checkbox'
                name='terms'
                className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300'
                required
              />
              <label htmlFor='terms' className='ms-2 text-[#4285F3]'>
                <a href='#' className='hover:underline'>
                  Accept Terms of Services
                </a>
              </label>
            </div>
          </div>

          <div className='text-center'>
            <button
              disabled={isLoading}
              type='submit'
              className='bg-[#4285F3] w-[60%] rounded-lg py-3 text-white disabled:cursor-not-allowed cursor-pointer'>
              {isLoading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
        <p className='px-6 py-3  text-center text-[#152A16] font-medium'>
          Already Have an Account?{" "}
          <Link to='/' className='underline hover:text-rose-500 text-[#4285F3]'>
            Login
          </Link>
        </p>

        <div className='flex items-center py-4'>
          <div className='flex-1 dark:bg-gray-700'>
            <hr />
          </div>
          <p className='px-0.5 text-[#5C635A]'>Or Continue With Social Login</p>
          <div className='flex-1'>
            <hr />
          </div>
        </div>
        <SocialLogin
          handleGoogleSignIn={handleGoogleSignIn}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default SignUp;
