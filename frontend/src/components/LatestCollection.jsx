import { useShop } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

const LatestCollection = () => {
  const { products, loading } = useShop();
  console.log(
    "products",
    products.map((a) => Array.isArray(a.image)),
  );
  const navigate = useNavigate();
  return (
    <div className="  my-10 ">
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg px-6 py-5 flex flex-col items-center gap-3">
            <LoaderCircle size={32} className="animate-spin text-black" />

            <p className="text-sm text-gray-600">Loading...</p>
          </div>
        </div>
      )}

      <div className=" flex items-center justify-center gap-2 text-3xl">
        <p className="text-gray-500  font-normal">LATEST</p>
        <p>COLLECTIONS</p>

        <span className="w-8 h-[2px] bg-gray-500"></span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-5 gap-x-3 gap-y-8">
        {products.map((item) => {
          const outOfStock = item.sizes.every((size) => size.stock === 0);
          console.log(item);

          return (
            <div key={item._id} className="group cursor-pointer">
              <div className="overflow-hidden bg-gray-100 relative">
                <img
                  loading="lazy"
                  src={item.image[0].url.replace(
                    "/upload/",
                    "/upload/w_500,c_limit,q_auto,f_auto/",
                  )}
                  alt={item.name}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className={`w-full aspect-square object-cover group-hover:scale-105 transition duration-300 ${
                    outOfStock ? "opacity-60" : ""
                  }`}
                />

                {outOfStock && (
                  <div className="absolute  top-0 flex items-center justify-center">
                    <span className="bg-black text-white px-4 py-2 text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              <p className="mt-2 text-[12px] text-gray-700">{item.name}</p>

              <p className="text-[12px] text-gray-900">${item.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LatestCollection;
