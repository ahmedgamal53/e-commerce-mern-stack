import { useEffect, useState } from "react"
import { api } from "../api/axios";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";


interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  sizes: string[];
  bestseller: boolean;
  image: {
    public_id: string;
    url: string;
  }[];
  date: number;
}


const List = () => {
        const [loading,setloading]=useState(false)
        const [list,setlist]=useState<Product[]>([])
    const fetchList=async()=>{
        try {
            setloading(true)
            const res=await api.get("/api/product/list")
            setlist(res.data.products)
            
        } catch (error) {
            console.log(error);
            
        }finally{
            setloading(false)
        }
    }
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchList()
    },[])


const deleteProduct=async(id:string)=>{
  try {
    await api.delete(`/api/product/${id}`)
    await fetchList()
    toast.success("Product deleted successfully")
  } catch (error) {
    console.log(error);
    
  }
}

  return (
    <div className="relative">
      {/* Loading */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg px-6 py-5 flex flex-col items-center gap-3">
            <LoaderCircle
              size={32}
              className="animate-spin text-black"
            />

            <p className="text-sm text-gray-600">
              Loading...
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-800">
          Product List
        </h2>

        <p className="text-sm text-gray-500">
          Manage your products
        </p>
      </div>

      {/* Products */}
      <div className="border border-gray-200 rounded-sm">
        {/* Header */}
        <div className="grid grid-cols-[80px_1fr_120px_120px_100px] gap-4 px-4 py-3 bg-gray-50 border-b text-sm font-medium text-gray-600">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        {/* Rows */}
        {list.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-[80px_1fr_120px_120px_100px] gap-4 px-4 py-4 border-b last:border-b-0 items-center"
          >
            {/* Image */}
            <div className="w-14 h-14 border border-gray-200 rounded overflow-hidden">
              <img
                src={product.image[0]?.url.replace(
                          "/upload/",
                          "/upload/w_500,c_limit,q_auto,f_auto/",
                        )}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <div>
              <p className="text-sm font-medium text-gray-800">
                {product.name}
              </p>

              <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                {product.description}
              </p>
            </div>

            {/* Category */}
            <div>
              <p className="text-sm text-gray-600">
                {product.category}
              </p>

              <p className="text-xs text-gray-400">
                {product.subCategory}
              </p>
            </div>

            {/* Price */}
            <p className="text-sm text-gray-700">
              ${product.price}
            </p>

            {/* Action */}
            <button
              type="button"
              onClick={()=>deleteProduct(product._id)}
              className="text-sm cursor-pointer text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}

        
        {!loading && list.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  );

}

export default List