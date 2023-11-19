"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface RecommendationsProps {
  recommendations: any[];
}

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
  rating
}) => {
  return (
    <div
      className={`rounded-sm px-4 ${
        isTopProduct ? "bg-gradient-to-b from-gray-100 to-white" : "bg-white"
      }`}
    >
      <div className="flex w-full">
        <Image
          src={thumbnail}
          alt={name}
          width={200}
          height={200}
          className="aspect-square mb-4"
        />

        <div className="p-4 w-full">
          {/* Tags */}
          
            <div className="flex space-x-2 mb-2">
            {isTopProduct && (
              <>
              <div className="bg-gray-900 text-white rounded-lg px-2 py-1 text-sm">
                Savvy Recommended
              </div>
              </>
              )}
              <div className="bg-gray-700 text-white rounded-lg px-2 py-1 text-sm">
                Savvy Rating: {rating}
              </div>

              <div className="bg-gray-500 text-white rounded-lg px-2 py-1 text-sm">
                Top Product
              </div>
              <div className="bg-gray-500 text-white rounded-lg px-2 py-1 text-sm">
                Best Seller
              </div>
              
            </div>
          

          <div className="">
            <p className="text-xl mb-1">Savvy says:</p>
            <p className="l-5 mb-2">{comment}</p>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <span className="text-lg">Top Features</span>
              {topFeatures &&
                topFeatures.split(";").map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-xl">•</span>
                    <span className="ml-2">{feature}</span>
                  </div>
                ))}
            </div>
            <div>
              <Button className="bg-[#ffc11f]">Purchase</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Recommendations(props: RecommendationsProps) {
  const sortedProducts = props.recommendations.sort(
    (a, b) => b.rating - a.rating
  );

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
                topFeatures={product.features}
                rating={product.rating}
                comment={product.explanation}
                isTopProduct={index === 0} // Only the first product is the top product
                thumbnail={product.img}
              />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
