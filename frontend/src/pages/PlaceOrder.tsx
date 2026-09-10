import React, { useState } from 'react'
import { useShop } from '../context/ShopContext';
import { CreditCard, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { cartitem } = useShop();
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const subtotal = cartitem.reduce(
    (total, item) => total + item.product[0].price * item.quantity,
    0
  );

  const shippingFee = 10;
  const total = subtotal + shippingFee;
      const navigate = useNavigate();

  return (
    <div className="border-t pt-10 pb-20">

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

        {/* Delivery Information */}
        <div className="w-full lg:w-1/2">

          <div className="flex items-center gap-2 mb-8">
            <h2 className="text-2xl text-gray-700">
              DELIVERY INFORMATION
            </h2>

            <span className="w-10 h-[1px] bg-gray-700"></span>
          </div>

          <div className="flex flex-col gap-4">

            {/* First & Last Name */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="First name"
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-gray-500"
              />

              <input
                type="text"
                placeholder="Last name"
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-gray-500"
              />
            </div>

            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-gray-500"
            />

            <input
              type="text"
              placeholder="Street"
              className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-gray-500"
            />

            {/* City & State */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="City"
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-gray-500"
              />

              <input
                type="text"
                placeholder="State"
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-gray-500"
              />
            </div>

            {/* Zipcode & Country */}
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Zipcode"
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-gray-500"
              />

              <input
                type="text"
                placeholder="Country"
                className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-gray-500"
              />
            </div>

            <input
              type="text"
              placeholder="Phone"
              className="w-full border border-gray-300 rounded px-4 py-3 outline-none focus:border-gray-500"
            />

          </div>
        </div>


        {/* Right Side */}
        <div className="w-full lg:w-1/2 lg:max-w-md">

          {/* Cart Totals */}
          <div>

            <div className="flex items-center gap-2 mb-6">
              <h2 className="text-2xl text-gray-700">
                CART TOTALS
              </h2>

              <span className="w-10 h-[1px] bg-gray-700"></span>
            </div>

            <div className="flex flex-col gap-4 text-sm">

              <div className="flex justify-between text-gray-600">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>

              <div className="flex justify-between text-gray-600">
                <p>Shipping Fee</p>
                <p>${shippingFee.toFixed(2)}</p>
              </div>

              <div className="border-t pt-4 flex justify-between font-semibold text-gray-800">
                <p>Total</p>
                <p>${total.toFixed(2)}</p>
              </div>

            </div>

          </div>


{/* Payment Method Selection */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

  {/* Stripe */}
  <div
    onClick={() => setPaymentMethod("stripe")}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200
      ${
        paymentMethod === "stripe"
          ? "border-emerald-500 bg-emerald-50"
          : "border-gray-200 bg-white hover:border-gray-400"
      }
    `}
  >
    <div
      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0
        ${
          paymentMethod === "stripe"
            ? "border-emerald-500"
            : "border-gray-400"
        }
      `}
    >
      {paymentMethod === "stripe" && (
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
      )}
    </div>

    <CreditCard
      className={`w-5 h-5 ${
        paymentMethod === "stripe"
          ? "text-emerald-600"
          : "text-gray-500"
      }`}
    />

    <span
      className={`text-sm font-medium ${
        paymentMethod === "stripe"
          ? "text-emerald-700"
          : "text-gray-600"
      }`}
    >
      Stripe
    </span>
  </div>


  {/* Razorpay */}
  <div
    onClick={() => setPaymentMethod("razorpay")}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200
      ${
        paymentMethod === "razorpay"
          ? "border-emerald-500 bg-emerald-50"
          : "border-gray-200 bg-white hover:border-gray-400"
      }
    `}
  >
    <div
      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0
        ${
          paymentMethod === "razorpay"
            ? "border-emerald-500"
            : "border-gray-400"
        }
      `}
    >
      {paymentMethod === "razorpay" && (
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
      )}
    </div>

    <Wallet
      className={`w-5 h-5 ${
        paymentMethod === "razorpay"
          ? "text-emerald-600"
          : "text-gray-500"
      }`}
    />

    <span
      className={`text-sm font-medium ${
        paymentMethod === "razorpay"
          ? "text-emerald-700"
          : "text-gray-600"
      }`}
    >
      Razorpay
    </span>
  </div>


  {/* Cash on Delivery */}
  <div
    onClick={() => setPaymentMethod("cod")}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all duration-200
      ${
        paymentMethod === "cod"
          ? "border-emerald-500 bg-emerald-50"
          : "border-gray-200 bg-white hover:border-gray-400"
      }
    `}
  >
    <div
      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0
        ${
          paymentMethod === "cod"
            ? "border-emerald-500"
            : "border-gray-400"
        }
      `}
    >
      {paymentMethod === "cod" && (
        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
      )}
    </div>

    <Wallet
      className={`w-5 h-5 ${
        paymentMethod === "cod"
          ? "text-emerald-600"
          : "text-gray-500"
      }`}
    />

    <span
      className={`text-sm font-medium ${
        paymentMethod === "cod"
          ? "text-emerald-700"
          : "text-gray-600"
      }`}
    >
      Cash on Delivery
    </span>
  </div>

</div>

          <button
          onClick={()=>navigate('/orders')}
            className="w-full mt-8 bg-black text-white py-3 rounded hover:bg-gray-800 transition"
          >
            PLACE ORDER
          </button>

        </div>

      </div>

    </div>
  );
};

export default PlaceOrder;

