import moment from "moment";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  return (
    <div className="mx-auto">
      <h2>{product?.title}</h2>
      <img src={product?.image} alt={product?.title} />
      <p>{product?.description}</p>
      <p>Price: ${product?.price}</p>
      <p>Brand: {product?.brandName}</p>
      <p>Category: {product?.category}</p>
      <p>Ratings: {product?.ratings}</p>
      <p>
        Created At:{" "}
        {/* {moment(product?.createdAt).format("MMMM DD, YYYY [at] hh:mm A")} */}
        {moment(product?.createdAt).format("MMMM DD, YYYY")}
      </p>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.any,
};

export default ProductCard;
