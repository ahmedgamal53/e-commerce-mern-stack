import { useShop } from '../context/ShopContext';

const Orders = () => {
  const { cartitem } = useShop();

  return (
    <div className="border-t border-gray-200 pt-10 pb-20">

      {/* Title */}
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-medium text-gray-800">
          MY ORDERS
        </h1>

        <span className="w-10 h-[1px] bg-gray-700"></span>
      </div>

      {/* Orders */}
      <div className="flex flex-col gap-4">

        {cartitem.map((item) => {
          const product = item.product?.[0];

          if (!product || !product.image) {
            return null;
          }

          const imageUrl = Array.isArray(product.image)
            ? product.image[0]
            : product.image;

          return (
            <div
              key={`${item._id}-${item.size}`}
              className="flex flex-col sm:flex-row sm:items-center gap-5
              border-b border-gray-200 py-5"
            >

              {/* Product Image */}
              <div className="w-24 h-28 bg-gray-100 shrink-0 overflow-hidden">
                <img
                  src={imageUrl.replace(
                    "/upload/",
                    "/upload/w_500,c_limit,q_auto,f_auto/",
                  )}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Information */}
              <div className="flex-1">

                <p className="text-sm font-medium text-gray-800">
                  {product.name}
                </p>

                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                  <p>${product.price}</p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <p>
                    Size: {item.size}
                  </p>
                </div>

                <p className="text-xs text-gray-400 mt-3">
                  Date: {new Date().toLocaleDateString()}
                </p>

              </div>

              {/* Status */}
              <div className="flex items-center gap-2 sm:w-36">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>

                <p className="text-sm text-gray-600">
                  Ready to ship
                </p>
              </div>

              {/* Track Order */}
              <button
                className="border border-gray-300 px-5 py-2
                text-sm text-gray-700 rounded-md
                hover:bg-gray-900 hover:text-white
                transition"
              >
                Track Order
              </button>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default Orders