import React, { useEffect, useState } from "react";
import { useShop } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const BestSeller = () => {
  const { products } = useShop();
  const navigate = useNavigate();
  const [bestSeller, setbestSeller] = useState();
  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setbestSeller(bestProduct.slice(0, 5));
    console.log(bestSeller);
  }, []);
  return (
    <div className="  my-10 ">
      <div className=" flex items-center justify-center gap-2 text-3xl">
        <p className="text-gray-500  font-normal">BEST</p>
        <p>SELLERS</p>

        <span className="w-8 h-[2px] bg-gray-500"></span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-5 gap-x-3 gap-y-8">
        {bestSeller
          ?.map((item) => (
            <div key={item._id} className="group cursor-pointer">
              <div className="overflow-hidden bg-gray-100">
                <img
                  loading="lazy"
                  key={products._id}
                  src={
                    Array.isArray(item.image)
                      ? item.image[0].replace(
                          "/upload/",
                          "/upload/w_500,c_limit,q_auto,f_auto/",
                        )
                      : item.image.replace(
                          "/upload/",
                          "/upload/w_500,c_limit,q_auto,f_auto/",
                        )
                  }
                  alt={item.name}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <p className="mt-2 text-[12px] text-gray-700">{item.name}</p>

              <p className="text-[12px] text-gray-900">${item.price}</p>
            </div>
          ))
          .slice(0, 10)}
      </div>
    </div>
  );
};

export default BestSeller;
