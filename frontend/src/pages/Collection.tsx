import { useState } from "react";
import { useShop } from "../context/ShopContext"
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const Collection = () => {
  const {products}=useShop()
  const navigate = useNavigate();
  console.log('product',[...new Set(products?.map((item)=>item.category))]);
  const [category,setcategory]=useState('All')
  const [subCategory,setsubCategory]=useState('All')
  const [sortType,setsortType]=useState('relevant')
  const [search,setsearch]=useState('')

console.log(products?.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase())));






const filter=products?.filter((item)=>{
const categoryMatch =
category==="All"||item.category===category

const subCategoryMatch =
subCategory==="All" ||item.subCategory===subCategory
const SearchMAtch=
item.name.toLowerCase().includes(search.toLowerCase())

return categoryMatch&&subCategoryMatch &&SearchMAtch


}).sort((a,b)=>{
   if (sortType === "low-high") {
      return a.price - b.price;
    }

    if (sortType === "high-low") {
      return b.price - a.price;
    }
    return 0;
})









  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
  <div className="min-w-60">

  <p className="text-xl my-2 font-medium">
    FILTERS
  </p>

  <div className="border border-gray-200 p-4 mt-5">

    <h2 className="text-sm font-semibold mb-4">
      CATEGORIES
    </h2>

    <div className="flex flex-col gap-3">
      {["All", ...new Set(products?.map((item) => item.category))].map(
        (item, index) => (
          <div key={index} className="flex items-center gap-3">

            <input
              type="checkbox"
              value={item}
              id={`for-${index}`}
              checked={category === item}
              onChange={(e) => setcategory(e.target.value)}
              className="cursor-pointer"
            />

            <label
              htmlFor={`for-${index}`}
              className="text-sm text-gray-600 cursor-pointer"
            >
              {item}
            </label>

          </div>
        )
      )}
    </div>

  </div>


  <div className="border border-gray-200 p-4 mt-5">

    <h2 className="text-sm font-semibold mb-4">
      TYPE
    </h2>

    <div className="flex flex-col gap-3">
      {["All", ...new Set(products.map((item) => item.subCategory))].map(
        (item, index) => (
          <div key={index} className="flex items-center gap-3">

            <input
              type="checkbox"
              value={item}
              id={`subCategory-${index}`}
              checked={subCategory === item}
              onChange={(e) => setsubCategory(e.target.value)}
              className="cursor-pointer"
            />

            <label
              htmlFor={`subCategory-${index}`}
              className="text-sm text-gray-600 cursor-pointer"
            >
              {item}
            </label>

          </div>
        )
      )}
    </div>

  </div>
</div>


{/* Right Side */}

<div className="flex-1">
      <div className="flex justify-between text-base sm:text-2xl mb-4">
          <div className=" flex items-center justify-center gap-2 text-3xl">
        <p className="text-gray-500  font-normal">LATEST</p>
        <p>COLLECTIONS</p>

        <span className="w-8 h-[2px] bg-gray-500"></span>
      </div>

      <select 
      value={sortType}
      onChange={(e)=>setsortType(e.target.value)}
      className="border-2 border-gray-300 text-sm px-2 outline-none">
  <option value="relevant">Sort by: Relevant</option>
  <option value="low-high">Sort by: Low to High</option>
  <option value="high-low">Sort by: High to Low</option>
</select>

      </div> 

{/* search */}
<div className="flex items-center  border rounded-2xl mx-auto  border-gray-300 px-3 py-2 w-full max-w-md">
  <input
    type="text"
    placeholder="Search"
    value={search}
    onChange={(e)=>setsearch(e.target.value)}
    className="flex-1 outline-none px-2 font-semibold text-sm"
  />

  <Search
    size={20}
    className="text-gray-500"
  />
</div>

{filter && filter.length > 0 ? (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-5 gap-x-3 gap-y-8">
    {filter.slice(0, 10).map((item) => {
      
      const outOfStock = item.sizes.every(
        (size) => size.stock === 0
      );

      return (
        <div key={item._id} className="group cursor-pointer">

          <div className="overflow-hidden bg-gray-100 relative">

            <img
              loading="lazy"
              src={item.image[0].url.replace(
                "/upload/",
                "/upload/w_500,c_limit,q_auto,f_auto/"
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

          <p className="mt-2 text-[12px] text-gray-700">
            {item.name}
          </p>

          <p className="text-[12px] text-gray-900">
            ${item.price}
          </p>

        </div>
      );
    })}
  </div>
) : (
  <div className="flex justify-center items-center py-20">
    <p className="text-gray-500 text-lg">
      No products found
    </p>
  </div>
)}
</div>

    </div>
  )
}

export default Collection