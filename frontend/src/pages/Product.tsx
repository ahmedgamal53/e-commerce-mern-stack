import { Link, useNavigate, useParams } from 'react-router-dom'
import { useShop } from '../context/ShopContext';
import { useEffect, useState } from 'react';

const Product = () => {
  const { productId } = useParams();
    const navigate = useNavigate();
  
  const { products,addtocart } = useShop();
  const singleproduct = products.find((item) => item._id === productId);

  if (!singleproduct) {
    return <div>Product not found</div>;
  }

  console.log('singleproduct',singleproduct);
  

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [mainImage, setMainImage] = useState(singleproduct.image[0] ?? "");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [sizeproduct,setsizeproduct]=useState('')
  const productImages = singleproduct.image ;

  console.log('category',products.filter((item)=>item.category===singleproduct.category));

  const similarcategory=products.filter((item)=>item.category===singleproduct.category &&item._id !==singleproduct._id).slice(0,5)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"})
  },[productId])


  
  return (
    <div>
   <div className="flex flex-col md:flex-row gap-8">

  {/* Product Images */}
  <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-1/2">

    {/* Small Images */}
    {Array.isArray(productImages) && (
      <div className="flex md:flex-col gap-3 w-full md:w-24">
        {productImages.map((item, index) => (
          <div
            key={index}
            className="w-20 h-20  border border-gray-200 rounded-lg overflow-hidden cursor-pointer hover:border-black"
            onClick={() => setMainImage(item)}
          >
            <img
              src={item.replace(
                "/upload/",
                "/upload/w_150,c_limit,q_auto,f_auto/"
              )}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    )}

    {/* Main Image */}
 {
  Array.isArray(productImages)?(
   <div className="w-full  md:flex-1">
      <img
        src={
          (mainImage || productImages)?.replace(
            "/upload/",
            "/upload/w_800,c_limit,q_auto,f_auto/"
          )
        }
        alt={singleproduct.description}
        className="w-fit max-h-[500px]  rounded-2xl object-contain"
      />
    </div>
  ):(
       <div className="w-full  md:flex-1">
      <img
        src={
          ( productImages)?.replace(
            "/upload/",
            "/upload/w_800,c_limit,q_auto,f_auto/"
          )
        }
        alt={singleproduct.description}
        className="w-fit max-h-[500px]  rounded-2xl object-contain"
      />
    </div>
  )
 }

  </div>


  {/* Product Details */}
  <div className="w-full md:w-1/2">

    <h1 className="text-2xl font-medium text-gray-800">
      {singleproduct.name}
    </h1>

    <div className="flex items-center gap-1 mt-3">
      ⭐⭐⭐⭐⭐
    </div>

    <p className="text-2xl font-medium mt-5">
      ${singleproduct.price}
    </p>

    <p className="text-gray-500 mt-5 leading-6">
      {singleproduct.description}
    </p>


    {/* Size */}
    <div className="mt-6">
      <p className="font-medium mb-3">
        Select Size
      </p>

      <div className="flex gap-3">
        {singleproduct.sizes?.map((size, index) => (
          <button
            key={index}
            onClick={()=>setsizeproduct(size)}
className={`border rounded-xl cursor-pointer px-4 py-2 transition-all duration-200 ${
  sizeproduct === size
    ? "border-black bg-black text-white font-medium"
    : "border-gray-300 text-gray-700 hover:border-black"
}`}          >
            {size}
          </button>
        ))}
      </div>
    </div>


    {/* Add To Cart */}
    <button 
    onClick={()=>addtocart(singleproduct,sizeproduct)}
    className="bg-black cursor-pointer text-white px-8 py-3 mt-8 text-sm">
      ADD TO CART
    </button>


    {/* Product Information */}
    <div className="border-t mt-8 pt-6">

    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
  <p>100% Original product.</p>
  <p>Cash on delivery is available on this product.</p>
  <p>Easy return and exchange policy within 7 days.</p>
</div>

    </div>

  </div>

</div>



{/* Description & Review Section */}
<div className="mt-20">
  <div className="flex">
    <b className="border px-5 py-3 text-sm">Description</b>
    <p className="border px-5 py-3 text-sm">Reviews (122)</p>
  </div>

  <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
    <p>
      An e-commerce website is an online platform that facilitates the buying
      and selling of products.
    </p>

    <p>
      E-commerce websites typically display products or services along with
      detailed information.
    </p>
  </div>
  
    <div className=" flex items-center mt-10 justify-center gap-2 text-3xl">
        <p className="text-gray-500  font-normal">RELATED</p>
        <p>PRODUCTS</p>

        <span className="w-8 h-[2px] bg-gray-500"></span>
      </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-5 gap-4">
        {similarcategory.map((item) => (
          <div key={item._id} className="cursor-pointer">

            {/* Image */}
            <div className="overflow-hidden bg-gray-100">
              <img
              onClick={()=>navigate(`/product/${item._id}`)}
                src={Array.isArray(item.image)?item.image[0]:item.image}
                alt={item.name}
                className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Product Name */}
            <p className="pt-3 text-sm text-gray-700">
              {item.name}
            </p>

            {/* Price */}
            <p className="pt-1 text-sm font-medium text-gray-800">
              ${item.price}
            </p>

          </div>
        ))}
      </div>

</div>

</div>
  );
}

export default Product