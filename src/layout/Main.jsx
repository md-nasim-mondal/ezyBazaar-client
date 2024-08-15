import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <div className='max-w-7xl mx-auto'>
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
