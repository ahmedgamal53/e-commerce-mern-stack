import { useEffect, useState } from "react";
import { api } from "../api/axios";

interface Image{
  url:string
}

interface OrderItem  {
  name: string,
  price:number,
  quantity:number,
  size:string,
  image: Image[],
  product:string
};

interface Addres {
  firstName:string,
  lastName:string,
  street:string,
  phone:string
city:string
}

type Order = {
  address: Addres;
  _id: string;
  items: OrderItem[];
  createdAt: string;
  amount: number;
  status: string;
  payment:boolean,
  paymentMethod:string,
  date:Date
};

const Orders = () => {
  const [orderData,setorderData]=useState<Order[]>([])
const [loading, setLoading] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

  const loadOrderData=async()=>{
    try {
      const res=await api.get("/api/order/userorders",{
        params:{page:currentPage}
      })
      
      setorderData(res.data.orders)
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log(error);
      
    } finally {
    setLoading(false);
  }
  }

  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadOrderData()
  },[currentPage])




return (
  <div className="border-t border-gray-200 pt-10 pb-20">
    {/* Title */}
    <div className="flex items-center gap-3 mb-8">
      <h1 className="text-2xl font-medium text-gray-800">
        MY ORDERS
      </h1>

      <span className="w-10 h-[1px] bg-gray-700" />
    </div>

    {/* Orders */}
    <div className="flex flex-col gap-6">


      {
      
      loading ? (
    Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="overflow-hidden rounded-xl border border-gray-200 p-4 sm:p-6 animate-pulse"
      >
        {/* Header Skeleton */}
        <div className="flex justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="flex-1 space-y-3">
            <div className="h-4 w-36 rounded bg-gray-200" />
            <div className="h-3 w-24 rounded bg-gray-100" />
          </div>

          <div className="h-4 w-20 rounded bg-gray-200" />
        </div>

        {/* Product Skeleton */}
        <div className="flex gap-4 py-5">
          <div className="h-24 w-20 shrink-0 rounded-lg bg-gray-200 sm:h-28 sm:w-24" />

          <div className="flex flex-1 flex-col justify-center gap-3">
            <div className="h-4 w-32 max-w-full rounded bg-gray-200" />
            <div className="h-3 w-20 rounded bg-gray-100" />
            <div className="h-3 w-24 rounded bg-gray-100" />
            <div className="h-4 w-16 rounded bg-gray-200" />
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="flex justify-between border-t border-gray-100 pt-4">
          <div className="h-3 w-24 rounded bg-gray-100" />
          <div className="h-8 w-24 rounded bg-gray-200" />
        </div>
      </div>
    ))
  ) : orderData.length === 0 ? (
    <p className="text-sm text-gray-500">
      You haven't placed any orders yet.
    </p>
  ) :
      orderData.length === 0 ? (
        <p className="text-sm text-gray-500">
          You haven't placed any orders yet.
        </p>
      ) : (
        orderData.map((order) => (
          <div
            key={order._id}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            {/* Order Header */}
            <div className="flex flex-col gap-3 border-b border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <p className="font-medium text-gray-800">
                  Order #{order._id.slice(-6).toUpperCase()}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-500"
                      : order.status === "Cancelled"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                  }`}
                />

                <span className="text-sm text-gray-700">
                  {order.status}
                </span>
              </div>
            </div>

            {/* Products */}
            <div className="divide-y divide-gray-100 px-4 sm:px-6">
              {order.items.map((item, index) => (
                <div
                  key={`${item.product}-${item.size}-${index}`}
                  className="flex gap-4 py-5"
                >
                  {/* Product Image */}
                  <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-28 sm:w-24">
                    <img
                      src={item.image?.[0]?.url?.replace(
                        "/upload/",
                        "/upload/w_500,c_limit,q_auto,f_auto/"
                      )}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex min-w-0 flex-1 flex-col justify-center">
                    <h3 className="font-medium text-gray-800">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      Size: {item.size}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-2 font-medium text-gray-800">
                      ${item.price} each
                    </p>
                  </div>

                  {/* Item Total */}
                  <div className="flex shrink-0 items-center">
                    <p className="font-medium text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="flex flex-col gap-3 border-t border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-sm text-gray-500">
                {order.items.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}{" "}
                item(s) in this order
              </p>

              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Total including shipping
                  </p>

                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    ${Number(order.amount).toFixed(2)}
                  </p>
                </div>

                <button
                  onClick={() => console.log(order._id)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-50"
                >
                  View Order
                </button>
              </div>
            </div>
          </div>


                
        ))
      )}

{totalPages > 1 && (
  <div className="mt-10 flex items-center justify-center gap-3">

    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
      className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      ← Previous
    </button>

    <span className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white">
      {currentPage}
    </span>

    <span className="text-sm text-gray-400">
      of {totalPages}
    </span>

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(currentPage + 1)}
      className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      Next →
    </button>

  </div>
)}
    </div>
  </div>
);

};

export default Orders