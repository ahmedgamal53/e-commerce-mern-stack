import { useEffect, useState } from "react";
import { api } from "../api/axios";
import { Package, MapPin, CreditCard, UserRound } from "lucide-react";

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

  const [orderData,setOrderData]=useState<Order[]>([])
    const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAllOrders = async () => {
    try {
      setError("");

      const res = await api.get("/api/order/list");

      setOrderData(res.data.orders ?? []);
    } catch (error) {
      console.log(error);
      setError("Failed to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

const updateOrderStatus = async (
  orderId: string,
  status: string
) => {
  try {
    await api.patch(`/api/order/status`, {
      status,
      orderId
    });

    setOrderData((prev) =>
      prev.map((order) =>
        order._id === orderId
          ? { ...order, status }
          : order
      )
    );
  } catch (error) {
    console.log(error);
  }
};


  useEffect(()=>{
// eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAllOrders()
  },[])



    const totalRevenue = orderData.reduce(
    (total, order) => total + Number(order.amount || 0),
    0
  );

  const totalItems = (order: Order) =>
    order.items.reduce((total, item) => total + item.quantity, 0);

  return (
     <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">
          All Orders
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage and track all customer orders.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-3">
              <Package className="h-5 w-5 text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="mt-1 text-2xl font-semibold text-gray-800">
                {loading ? "—" : orderData.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-50 p-3">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Order Value</p>
              <p className="mt-1 text-2xl font-semibold text-gray-800">
                {loading ? "—" : `$${totalRevenue.toFixed(2)}`}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-50 p-3">
              <Package className="h-5 w-5 text-purple-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="mt-1 text-2xl font-semibold text-gray-800">
                {loading
                  ? "—"
                  : orderData.reduce(
                      (total, order) => total + totalItems(order),
                      0
                    )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="flex flex-col gap-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="mb-5 flex justify-between gap-4">
                <div className="space-y-3">
                  <div className="h-4 w-40 rounded bg-gray-200" />
                  <div className="h-3 w-28 rounded bg-gray-100" />
                </div>

                <div className="h-7 w-24 rounded-full bg-gray-200" />
              </div>

              <div className="flex gap-4 border-t border-gray-100 py-5">
                <div className="h-24 w-20 rounded-lg bg-gray-200" />

                <div className="flex-1 space-y-3 pt-2">
                  <div className="h-4 w-36 rounded bg-gray-200" />
                  <div className="h-3 w-24 rounded bg-gray-100" />
                  <div className="h-3 w-20 rounded bg-gray-100" />
                </div>
              </div>

              <div className="h-12 rounded-lg bg-gray-100" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
          <p className="text-sm text-red-600">{error}</p>

          <button
            onClick={fetchAllOrders}
            className="mt-4 rounded-lg bg-gray-900 px-5 py-2 text-sm text-white hover:bg-gray-700"
          >
            Try Again
          </button>
        </div>
      ) : orderData.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-16 text-center">
          <Package className="mx-auto h-10 w-10 text-gray-300" />

          <h2 className="mt-4 font-medium text-gray-800">
            No orders yet
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Customer orders will appear here.
          </p>
        </div>
      ) : (
        /* Orders List */
        <div className="flex flex-col gap-6">
          {orderData.map((order) => {
            const customer = order.address;
            const itemCount = totalItems(order);

            return (
              <div
                key={order._id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                {/* Order Header */}
                <div className="flex flex-col gap-4 border-b border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div>
                    <p className="font-semibold text-gray-800">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {order.date
                        ? new Date(order.date).toLocaleDateString()
                        : "Date unavailable"}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                  <select
  value={order.status}
  onChange={(e) =>
    updateOrderStatus(order._id, e.target.value)
  }
  className={`rounded-lg border px-3 py-2 text-sm font-medium outline-none cursor-pointer ${
    order.status === "Delivered"
      ? "border-green-200 bg-green-50 text-green-700"
      : order.status === "Cancelled"
        ? "border-red-200 bg-red-50 text-red-700"
        : order.status === "Out for Delivery"
          ? "border-purple-200 bg-purple-50 text-purple-700"
          : "border-gray-200 bg-white text-gray-700"
  }`}
>
  <option value="Order Placed">Order Placed</option>
  <option value="Packing">Packing</option>
  <option value="Out for Delivery">Out for Delivery</option>
  <option value="Delivered">Delivered</option>
  <option value="Cancelled">Cancelled</option>
</select>

                    <span className="text-sm text-gray-500">
                      {itemCount} {itemCount === 1 ? "item" : "items"}
                    </span>
                  </div>
                </div>

                {/* Order Products */}
                <div className="divide-y divide-gray-100 px-4 sm:px-6">
                  {order.items.map((item, index) => (
                    <div
                      key={`${item.product}-${item.size}-${index}`}
                      className="flex gap-4 py-5"
                    >
                      {/* Product Image */}
                      <div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-28 sm:w-24">
                        {item.image?.[0]?.url ? (
                          <img
                            src={item.image[0].url.replace(
                              "/upload/",
                              "/upload/w_500,c_limit,q_auto,f_auto/"
                            )}
                            alt={item.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Package className="h-7 w-7 text-gray-300" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex min-w-0 flex-1 flex-col justify-center">
                        <p className="font-medium text-gray-800">
                          {item.name}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                          Size: {item.size}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>

                        <p className="mt-2 text-sm text-gray-600">
                          ${Number(item.price).toFixed(2)} each
                        </p>
                      </div>

                      {/* Item Total */}
                      <div className="flex shrink-0 items-center">
                        <p className="font-semibold text-gray-800">
                          $
                          {(
                            Number(item.price) * item.quantity
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer & Payment */}
                <div className="grid grid-cols-1 gap-6 border-t border-gray-200 p-4 sm:grid-cols-2 sm:p-6">
                  {/* Customer Details */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <UserRound className="h-4 w-4 text-gray-500" />

                      <h3 className="text-sm font-semibold text-gray-800">
                        Customer Details
                      </h3>
                    </div>

                    <p className="text-sm text-gray-700">
                      {[customer?.firstName, customer?.lastName]
                        .filter(Boolean)
                        .join(" ") || "Name unavailable"}
                    </p>

                    {customer?.phone && (
                      <p className="mt-1 text-sm text-gray-500">
                        {customer.phone}
                      </p>
                    )}

                    <div className="mt-3 flex items-start gap-2">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                      <div className="text-sm text-gray-500">
                        {[
                          customer?.street,
                          customer?.city,
                        ]
                          .filter(Boolean)
                          .join(", ") || "Address unavailable"}
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-gray-500" />

                      <h3 className="text-sm font-semibold text-gray-800">
                        Payment Details
                      </h3>
                    </div>

                    <p className="text-sm text-gray-600">
                      Method: {order.paymentMethod || "N/A"}
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                      Payment Status:{" "}
                      <span
                        className={
                          order.payment
                            ? "font-medium text-green-600"
                            : "font-medium text-orange-600"
                        }
                      >
                        {order.payment ? "Paid" : "Pending"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Order Footer */}
                <div className="flex flex-col gap-3 border-t border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <p className="text-sm text-gray-500">
                    {itemCount} total {itemCount === 1 ? "item" : "items"}
                  </p>

                  <div className="text-left sm:text-right">
                    <p className="text-sm text-gray-500">
                      Order Total (including shipping, if applicable)
                    </p>

                    <p className="mt-1 text-xl font-semibold text-gray-900">
                      ${Number(order.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  
  )
}

export default Orders