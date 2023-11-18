import React from 'react';

const recommendations = [
  {
    title: "Hello",
    description: "This is a description"
  }
];

const Recommendations: React.FC = () => {
  return (
    <div className="w-2/3 mx-auto p-4">
    <ProductList />
    </div>
  );
};

interface ProductProps {
  name: string;
  topFeatures: string;
  rating: number;
  comment: string;
  isTopProduct: boolean;
}

const Product: React.FC<ProductProps> = ({ name, topFeatures, rating, comment, isTopProduct }) => {
  return (
    <div className={`border p-4 ${isTopProduct ? 'bg-gray-200' : 'bg-white'}`}>
      {isTopProduct && (
        <img src="path_to_top_product_image.jpg" alt={name} className="w-full h-auto mb-4" />
      )}
      <h3 className="text-lg font-bold">{name} (Rating: {rating})</h3>
      <p>{topFeatures}</p>
      {isTopProduct && (
        <p className="mt-2">{comment}</p>
      )}
    </div>
  );
};

const products = [
  {
      "name": "Adult Folding Faux Fur Butterfly Chair, Gray",
      "topFeatures": "Soft faux fur, button-tufted backrest, foldable and portable, holds up to 225 lbs",
      "rating": 85,
      "comment": "Highly portable and stylish, but slightly higher in price."
  },
  {
      "name": "Mainstays All-Steel Metal Folding Chair, Double Braced, Gray",
      "topFeatures": "Contoured seat back, all-steel construction, 250 lbs weight capacity, folds flat for storage",
      "rating": 90,
      "comment": "Extremely durable and budget-friendly, but less portable due to its metal construction."
  },
  {
      "name": "Ozark Trail Basic Quad Folding Camp Chair with Cup Holder, Blue, Adult use",
      "topFeatures": "Steel frame, 225 lbs weight capacity, mesh cup holder, comes with a carry bag",
      "rating": 95,
      "comment": "Excellent for portability and affordability, ideal for outdoor use."
  }
]


const ProductList: React.FC = () => {
  // Sort products by rating
  const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);

  return (
    <div>
      {sortedProducts.map((product, index) => (
        <Product
          key={index}
          name={product.name}
          topFeatures={product.topFeatures}
          rating={product.rating}
          comment={product.comment}
          isTopProduct={index === 0} // Only the first product is the top product
        />
      ))}
    </div>
  );
};

export default Recommendations;


