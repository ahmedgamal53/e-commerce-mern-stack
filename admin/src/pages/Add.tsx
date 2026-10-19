import { LoaderCircle, Upload } from "lucide-react";
import { useState } from "react";
import { api } from "../api/axios";
import toast from "react-hot-toast";

const Add = () => {
   const [images, setImages] = useState<(File  | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const [imagePreviews, setImagePreviews] = useState<(string | null)[]>([
  null,
  null,
  null,
  null,
]);

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState<{size:string,stock:number}[]>([]);
  const [bestSeller, setBestSeller] = useState(false);
const [loading, setLoading] = useState(false);

const [errors, setErrors] = useState<{
  productName?: string;
  description?: string;
  price?: string;
  sizes?: string;
  images?: string;
}>({});


const validate = () => {
  const newErrors: typeof errors = {};

  if (!productName.trim()) {
    newErrors.productName = "Product name is required";
  }

  if (!description.trim()) {
    newErrors.description = "Product description is required";
  }

  if (!price || Number(price) <= 0) {
    newErrors.price = "Product price is required";
  }

  if (sizes.length === 0) {
    newErrors.sizes = "Please select at least one size";
  }

  const hasImage = images.some((image) => image !== null);

  if (!hasImage) {
    newErrors.images = "Please upload at least one image";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setImages((prev) => {
    const newImages = [...prev];
    newImages[index] = file;
    return newImages;
    });

    setImagePreviews((prev)=>{
        const newPreviews =[...prev]
        newPreviews[index]=imageUrl
        return newPreviews
    })

    };




    const toggleSize = (size: string) => {
  setSizes((prev) => {
    const exists = prev.find((item) => item.size === size);

    if (exists) {
      return prev.filter((item) => item.size !== size);
    }

    return [...prev, { size, stock: 0 }];
  });
};



  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
 if (!validate()) {
    return;
  }
   try {
setLoading(true);


    const formData =new FormData()


       formData.append("name", productName);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("price", price);
    formData.append("bestseller", String(bestSeller));

    formData.append("sizes",JSON.stringify(sizes))
    
    images.forEach((image,index)=>{
        if(image){
            formData.append(`image${index+1}`,image)
        }
    })

     const res =await api.post('/api/product/add',formData )

     if(res.data.success){
         toast.success("product Added")
        setProductName("")
        setBestSeller(false)
        setPrice('')
        setDescription("")
        setImagePreviews([null,null,null,null])
        setImages([null,null,null,null])
        setSizes([])
        setCategory("Men")
        setSubCategory("Topwear")
     }
    console.log('res',res);
   } catch (error) {
     console.log("Error:", error);
   }finally{
    setLoading(false);
   }

   
    
   
  };


  

  return (
    <div className="w-full min-h-screen bg-white px-8 py-8">

{loading && (
  <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px] flex items-center justify-center">
    <div className="bg-white rounded-lg shadow-lg px-6 py-5 flex flex-col items-center gap-3">
      <LoaderCircle
        size={32}
        className="animate-spin text-black"
      />

      <p className="text-sm text-gray-600">
        Adding product...
      </p>
    </div>
  </div>
)}

      <form onSubmit={handleSubmit} className="w-full max-w-2xl">
        {/* Upload Image */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Upload Image
          </p>

          <div className="flex gap-2">
            {images.map((image, index) => (
              <label
                key={index}
                className="w-20 h-20 border border-gray-200 rounded-sm
                flex items-center justify-center cursor-pointer
                overflow-hidden bg-gray-50 hover:border-gray-400 transition"
              >
                {image ? (
                  <img
                    src={imagePreviews[index]||""}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400">
                   <Upload size={22} strokeWidth={1.5} />
                    <span className="text-[10px] mt-1">Upload</span>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => handleImageChange(e, index)}
                />
              </label>
            ))}

            
          </div>
          {errors.images && (
  <p className="text-xs text-red-500 mt-1">
    {errors.images}
  </p>
)}
        </div>

        {/* Product Name */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product name
          </label>

          <input
            type="text"
            placeholder="Type here"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full h-10 border border-gray-300 rounded-sm
            px-3 text-sm outline-none
            focus:border-gray-500"
          />
          {errors.description && (
  <p className="text-xs text-red-500 mt-1">
    {errors.productName }
  </p>
)}
        </div>

        {/* Product Description */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product description
          </label>

          <textarea
            placeholder="Write content here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-sm
            px-3 py-2 text-sm outline-none resize-none
            focus:border-gray-500"
          />

          {errors.description && (
  <p className="text-xs text-red-500 mt-1">
    {errors.description}
  </p>
)}
        </div>

        {/* Category / Sub Category / Price */}
        <div className="flex gap-5 mb-5">
          {/* Category */}
          <div className="w-28">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-sm
              px-2 text-sm outline-none bg-white"
            >
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>

    
          </div>

          {/* Sub Category */}
          <div className="w-28">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub category
            </label>

            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-sm
              px-2 text-sm outline-none bg-white"
            >
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Winterwear</option>
            </select>
          </div>

          {/* Price */}
          <div className="w-20">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Price
            </label>

            <input
              type="number"
              placeholder="25"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-sm
              px-2 text-sm outline-none focus:border-gray-500"
            />

            {errors.price && (
  <p className="text-xs text-red-500 mt-1">
    {errors.price}
  </p>
)}
          </div>
        </div>

        {/* Product Sizes */}
        <div className="mb-5">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Product Sizes
          </p>

          <div className="flex gap-2">
            {["S", "M", "L", "XL", "XXL"].map((size) => {
              const selected = sizes.some((item) => item.size === size);

              return (
                <button
                  type="button"
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`w-9 h-8 text-xs border rounded-sm transition
                    ${
                      selected
                        ? "bg-gray-800 text-white border-gray-800"
                        : "bg-gray-100 text-gray-600 border-transparent"
                    }
                  `}
                >
                  {size}
                </button>
              );
            })}
          </div>
          {errors.sizes && (
  <p className="text-xs text-red-500 mt-1">
    {errors.sizes}
  </p>
)}

 {/* Stock لكل مقاس */}
  <div className="mt-4 space-y-3">
    {sizes.map((item) => (
      <div
        key={item.size}
        className="flex items-center gap-3"
      >
        <span className="w-10 text-sm font-medium">
          {item.size}
        </span>

        <input
          type="number"
          min="0"
          placeholder="Stock"
          value={item.stock}
          onChange={(e) => {
            const stock = Number(e.target.value);

            setSizes((prev) =>
              prev.map((sizeItem) =>
                sizeItem.size === item.size
                  ? { ...sizeItem, stock }
                  : sizeItem
              )
            );
          }}
          className="w-24 h-9 border border-gray-300 rounded-sm px-2 text-sm outline-none focus:border-gray-500"
        />
      </div>
    ))}
  </div>
        </div>

        {/* Best Seller */}
        <div className="flex items-center gap-2 mb-6">
          <input
            id="bestSeller"
            type="checkbox"
            checked={bestSeller}
            onChange={(e) => setBestSeller(e.target.checked)}
            className="w-3.5 h-3.5 accent-black"
          />

          <label
            htmlFor="bestSeller"
            className="text-xs text-gray-600 cursor-pointer"
          >
            Add to bestseller
          </label>
        </div>

        {/* Add Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-20 h-10 bg-black text-white
          text-sm font-medium hover:bg-gray-800 transition"
        >
           {loading ?    "Adding..." : "ADD"}
        </button>
      </form>
    </div>
  );
}

export default Add