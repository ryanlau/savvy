import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const Recommendations: React.FC = () => {
  return (
    <div className="mt-8 max-w-[900px]">
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
  thumbnail: string;
}

const Product: React.FC<ProductProps> = ({
  name,
  topFeatures,
  comment,
  isTopProduct,
  thumbnail,
}) => {
  return (
    <div
      className={`rounded-sm border px-4 ${
        isTopProduct ? "bg-gradient-to-b from-gray-200 to-white" : "bg-white"
      }`}
    >
      <div className="flex w-full">
        <img
          src={thumbnail}
          alt={name}
          className="w-[200px] aspect-square mb-4"
        />
        <div className="p-4 w-full">
          <div className="">
            <span className="text-xl">Savvy says: "</span>
            <br />
            <span className="l-5">{comment}</span>
            <br />
            <span className="text-lg">"</span>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <span className="text-lg">Top Features</span>
              {topFeatures.split(",").map((feature, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-xl">•</span>
                  <span className="ml-2">{feature}</span>
                </div>
              ))}
            </div>
            <div>
              <Button>Purchase</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const products = [
  {
    name: "Adult Folding Faux Fur Butterfly Chair, Gray",
    topFeatures:
      "Soft faux fur, button-tufted backrest, foldable and portable, holds up to 225 lbs",
    rating: 85,
    comment: "Highly portable and stylish, but slightly higher in price.",
    thumbnail:
      "https://i5.walmartimages.com/asr/fbd8e0f4-8345-49f1-8a08-30f3dd29101f.c2ba42cb0c56424bcd98dbdf2f03033f.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",
    price: 39.99,
  },
  {
    name: "Mainstays All-Steel Metal Folding Chair, Double Braced, Gray",
    topFeatures:
      "Contoured seat back, all-steel construction, 250 lbs weight capacity, folds flat for storage",
    rating: 90,
    comment:
      "Extremely durable and budget-friendly, but less portable due to its metal construction.",
    thumbnail:
      "https://i5.walmartimages.com/asr/b001c0c2-e3c9-47e8-8bc7-1dd780c8a9fd.6466069a64f110465351b780338f7bff.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",
    price: 12.88,
  },
  {
    name: "Ozark Trail Basic Quad Folding Camp Chair with Cup Holder, Blue, Adult use",
    topFeatures:
      "Steel frame, 225 lbs weight capacity, mesh cup holder, comes with a carry bag",
    rating: 95,
    comment:
      "Excellent for portability and affordability, ideal for outdoor use.",
    thumbnail:
      "https://i5.walmartimages.com/asr/9679f9b3-497d-42e1-bbec-130ffca28fc0.9566a2bd515072657b126183646e3ae5.jpeg?odnHeight=450&odnWidth=450&odnBg=ffffff",
    price: 9.97,
  },
];

const ProductList: React.FC = () => {
  // Sort products by rating
  const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);
  return (
    <div className="">
      <Accordion type="single" collapsible defaultValue="item-0">
        {sortedProducts.map((product, index) => (
          <AccordionItem value={`item-${index}`}>
            <AccordionTrigger>
              <div
                className={
                  index === 0
                    ? "flex justify-between w-full space-x-4 text-xl"
                    : "flex justify-between w-full space-x-4"
                }
              >
                <h1>{product.name}</h1>
                <div>${product.price}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Product
                key={index}
                name={product.name}
                topFeatures={product.topFeatures}
                rating={product.rating}
                comment={product.comment}
                isTopProduct={index === 0} // Only the first product is the top product
                thumbnail={product.thumbnail}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Recommendations;
