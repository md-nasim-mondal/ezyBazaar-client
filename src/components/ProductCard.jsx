import moment from "moment";
import { TbCurrencyTaka } from "react-icons/tb";
import PropTypes from "prop-types";
import { TiShoppingCart } from "react-icons/ti";
import { MdOutlineInfo } from "react-icons/md";

const ProductCard = ({ product }) => {
  const { image, name, price, category, brand } = product || {};
  return (
    <div className='shadow-lg shadow-slate-400 p-6 h-full rounded-2xl'>
      <div className='size-36 md:size-48 lg:size-60 cursor-pointer hover:scale-105 mx-auto'>
        <img src={image} alt={name} className="rounded-xl" />
      </div>
      <h3 className='md:text-lg lg:text-xl font-semibold text-red-600 text-center'>
        {name}
      </h3>
      <p className='md:text-lg lg:text-xl font-medium flex items-center justify-center'>
        Price: {price}
        <span className='font-bold'>
          <TbCurrencyTaka />
        </span>
        <span>(bdt)</span>
      </p>
      <p className='md:text-lg lg:text-xl text-center'>Category: {category}</p>
      <p className='md:text-lg lg:text-xl text-center'>Brand: {brand}</p>
      <p className='text-center'>
        Created At:{" "}
        {/* {moment(product?.createdAt).format("MMMM DD, YYYY [at] hh:mm A")} */}
        {moment(product?.creation_time).format("MMMM DD, YYYY")}
      </p>
      <div className='flex gap-2 justify-center mt-2 w-full'>
        <button className='flex items-center gap-1 px-4 py-2 text-sm text-white bg-red-500 rounded-lg transition duration-300 ease-in-out hover:bg-red-600'>
          <TiShoppingCart />
          Add to Cart
        </button>
        <button className='flex items-center gap-1 px-4 py-2 text-sm text-white bg-blue-500 rounded-lg transition duration-300 ease-in-out hover:bg-blue-600'>
          <MdOutlineInfo />
          Details
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.any,
};

export default ProductCard;
