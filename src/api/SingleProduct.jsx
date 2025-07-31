import React from 'react';

const SingleProduct = ({
  title,
  category,
  price,
  discountPercentage,
  images,
  dimensions,
  rating,
  description,
  isExpanded,
  toggleExpand,
}) => {
  const discounted = (price + (price * discountPercentage) / 100).toFixed(2);
  const truncated = description.slice(0, 60);

  return (
    <div className="card shadow-md rounded p-3">
      <img
        src={images[0]}
        alt={title}
        className="card-img-top"
        style={{ height: '200px', objectFit: 'contain' }}
      />
      <div className="card-body p-2">
        <h5 className="font-bold">{title}</h5>
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-xs text-gray-500">
          {dimensions?.width} x {dimensions?.height} x {dimensions?.depth}
        </p>
        <p className="my-1 text-green-700 font-semibold">${price}{' '}
          <del className="text-gray-400">${discounted}</del>
        </p>
        <p className="text-yellow-500 text-sm">
          {'★'.repeat(Math.round(rating))}{' '}
          {'☆'.repeat(5 - Math.round(rating))}
        </p>
        <p className="text-sm">
          {isExpanded ? description : `${truncated}... `}
          <button onClick={toggleExpand} className="text-blue-600 hover:underline">
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default SingleProduct;
