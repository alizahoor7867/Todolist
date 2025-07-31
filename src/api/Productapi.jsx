import React, { useEffect, useState } from 'react';
import SingleProduct from './SingleProduct';

const Productapi = () => {
  const [products, setProducts] = useState([]);
  const [expanded, setExpanded] = useState({}); // Track read-more state per product

  const api = 'https://dummyjson.com/products';

  const getproduct = async () => {
    const response = await fetch(api);
    const data = await response.json();
    setProducts(data.products);
  };

  useEffect(() => {
    getproduct();
  }, []);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container grid mx-auto grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {products.map((item) => (
        <SingleProduct
          key={item.id}
          {...item}
            isExpanded={!!expanded[item.id]}
            toggleExpand={() => toggleExpand(item.id)}
        />
      ))}
    </div>
  );
};

export default Productapi;
