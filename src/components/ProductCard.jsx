import moment from "moment";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  return (
    <div className="mx-auto w-[300px]">
      <h2>Title: {product?.name}</h2>
      <img src={product?.image} alt={product?.title} />
      <p>{product?.description.slice(0,100)}...</p>
      <p>Price: {product?.price} Taka</p>
      <p>Brand: {product?.brand}</p>
      <p>Category: {product?.category}</p>
      <p>Ratings: {product?.rating}</p>
      <p>
        Created At:{" "}
        {/* {moment(product?.createdAt).format("MMMM DD, YYYY [at] hh:mm A")} */}
        {moment(product?.creation_time).format("MMMM DD, YYYY")}
      </p>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.any,
};

export default ProductCard;
