
import { useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { LoaderCircle, Trash2 } from "lucide-react";
import { api } from "../api/axios";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();

  const { cartitem,setcartitem, updatequantit,loading } = useShop();



const subtotal =cartitem.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  


const deletitem=async(productId:string,size:string)=>{
  try {
    const res=await api.delete('/api/cart/delete',{
    data:{
        productId,
      size
    }
    })
    
      if (res.data.success) {
        toast.success(res.data.message)
        setcartitem((prev)=>
        prev.filter((item)=>
        !(item.product._id ===productId &&item.size===size)
        )
      )
      }

  } catch (error) {
    console.log(error);
    
  }
}

  
  return (
    <div className="pt-10 pb-20">

{loading && (
  <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg px-6 py-5 flex flex-col items-center gap-3">
      <LoaderCircle
        size={32}
        className="animate-spin text-black"
      />

      <p className="text-sm text-gray-600">
         loading...
      </p>
    </div>
  </div>
)}

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-medium tracking-wide text-gray-800">
            YOUR CART
          </h1>

          <span className="w-10 h-[1px] bg-gray-800"></span>
        </div>

        <p className="text-sm text-gray-500 mt-2">
          Review your items before checkout
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Cart Items */}
        <div className="flex-1">
          {cartitem.length === 0 ? (
            <div className="border border-gray-200 rounded-xl py-20 text-center">
              <p className="text-gray-500 text-lg">
                Your cart is empty
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartitem?.map((item) => {
                const product = Array.isArray(item.product)
                  ? item.product[0]
                  : item.product;
                const productPrice = Number(product?.price ?? 0);

                return (
                  <div
                    key={`${item._id}-${item.size}`}
                    className="flex gap-5 p-4 border border-gray-200 rounded-xl hover:shadow-sm transition"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-28 sm:w-32 sm:h-36 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={product?.image[0]?.url?.replace(
                          "/upload/",
                          "/upload/w_500,c_limit,q_auto,f_auto/"
                        )}
                        alt={product?.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between gap-4">
                          <h2 className="text-sm sm:text-base font-medium text-gray-800">
                            {product?.name}
                          </h2>

                          {/* Delete */}
                          <button
                            onClick={() =>
                              product?._id && deletitem(product._id, item.size)
                            }
                            className="text-gray-400 cursor-pointer hover:text-red-500 text-xl transition"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                          ${productPrice.toFixed(2)}
                        </p>

                        {/* Size */}
                        <div className="mt-3">
                          <span className="inline-flex items-center gap-2 border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-600">
                            Size:
                            <span className="font-medium text-gray-800">
                              {item.size}
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                          <button
                            onClick={() =>
                              product?._id &&
                              updatequantit(product._id, item.size, -1)
                            }
                            className="w-8 h-8 text-gray-500 hover:bg-gray-100"
                          >
                            −
                          </button>

                          <span className="w-10 text-center text-sm">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              product?._id &&
                              updatequantit(product._id, item.size, 1)
                            }
                            className="w-8 h-8 text-gray-500 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>

                        <p className="font-medium text-gray-800">
                          ${(productPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="w-full lg:w-[350px]">
          <div className="border border-gray-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-lg font-medium text-gray-800 mb-6">
              ORDER SUMMARY
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span>$10.00</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-base font-medium text-gray-800">
                <span>Total</span>
                <span>${(subtotal + 10).toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate("/place-order")}
              className="w-full mt-7 bg-black text-white py-3 rounded-md text-sm hover:bg-gray-800 transition"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

