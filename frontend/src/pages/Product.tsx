import { useNavigate, useParams } from "react-router-dom";
import { useShop } from "../context/ShopContext";
import { useEffect, useMemo, useState } from "react";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { products, addtocart } = useShop();

  const singleproduct = products.find(
    (item) => item._id === productId
  );


  const [mainImage, setMainImage] = useState("");
  const [sizeproduct, setSizeproduct] = useState('');

console.log('singleproduct',singleproduct);



  const similarcategory = useMemo(() => {
    if (!singleproduct) return []
    return products
      .filter(
        (item) =>
          item.category === singleproduct.category &&
          item._id !== singleproduct._id
      )
      .slice(0, 5);
  }, [products, singleproduct]);

 const productImages = useMemo(
  () => singleproduct?.image?.map((item) => item.url) ?? [],
  [singleproduct]
);

  useEffect(() => {
     // eslint-disable-next-line react-hooks/set-state-in-effect
     setMainImage(productImages[0]);
  setSizeproduct("");
   
  }, [productId,singleproduct]);

  // -----------------------------
  // Scroll To Top
  // -----------------------------

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [productId]);

  // -----------------------------
  // Product Not Found
  // -----------------------------

  if (!singleproduct) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  // -----------------------------
  // Image Helper
  // -----------------------------

  const getOptimizedImage = (
    url: string,
    width: number
  ) => {
    if (!url) return "";

    return url.replace(
      "/upload/",
      `/upload/w_${width},c_limit,q_auto,f_auto/`
    );
  };

  // -----------------------------
  // Add To Cart
  // -----------------------------

  const handleAddToCart = () => {
    if (singleproduct.sizes?.length && !sizeproduct) {
      alert("Please select a size");
      return;
    }

    addtocart(singleproduct, sizeproduct);
  };


  const outOfStock =singleproduct.sizes.every((item)=>item.stock===0)

  console.log('sizeproduct',sizeproduct);
  
  return (
    <div>
      {/* =========================
          PRODUCT
      ========================= */}

      <div className="flex flex-col md:flex-row gap-8">

        {/* =========================
            PRODUCT IMAGES
        ========================= */}

        <div className="flex flex-col-reverse md:flex-row gap-4 w-full md:w-1/2">

          {/* Small Images */}

          {productImages.length > 0 && (
            <div className="flex md:flex-col gap-3 w-full md:w-24">

              {productImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setMainImage(image)}
                  className={`w-20 h-20 border rounded-lg overflow-hidden cursor-pointer transition ${
                    mainImage === image
                      ? "border-black"
                      : "border-gray-200 hover:border-black"
                  }`}
                >
                  <img
                    src={getOptimizedImage(image, 150)}
                    alt={`${singleproduct.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

            </div>
          )}

          {/* Main Image */}

          <div className="w-full md:flex-1 flex justify-center">

            {mainImage ? (
              <img
                src={getOptimizedImage(mainImage, 800)??productImages[0]}
                alt={singleproduct.name}
                className="w-full max-h-[500px] rounded-2xl object-contain"
              />
            ) : (
              <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-2xl">
                <p className="text-gray-400">
                  No image available
                </p>
              </div>
            )}

          </div>

        </div>

        {/* =========================
            PRODUCT DETAILS
        ========================= */}

        <div className="w-full md:w-1/2">

          {/* Product Name */}

          <h1 className="text-2xl font-medium text-gray-800">
            {singleproduct.name}
          </h1>

          {/* Rating */}

          <div className="flex items-center gap-1 mt-3">
            ⭐⭐⭐⭐⭐
          </div>

          {/* Price */}

          <p className="text-2xl font-medium mt-5">
            ${singleproduct.price}
          </p>

          {/* Description */}

          <p className="text-gray-500 mt-5 leading-6">
            {singleproduct.description}
          </p>

          {/* =========================
              SIZE
          ========================= */}

          {singleproduct.sizes.length > 0 && (
            <div className="mt-6">

              <p className="font-medium mb-3">
                Select Size
              </p>

              <div className="flex flex-wrap gap-3">

              {singleproduct.sizes.map((item, index) => {
  const outOfStock = item.stock === 0 ;
              
  return (
    <button
      key={`${item.size}-${index}`}
      type="button"
      disabled={outOfStock}
      onClick={() => setSizeproduct(item.size)}
      className={`border rounded-xl px-4 py-2 transition-all duration-200 ${
        outOfStock
          ? "border-gray-200 text-gray-400 cursor-not-allowed"
          : sizeproduct === item.size
          ? "border-black bg-black text-white font-medium cursor-pointer"
          : "border-gray-300 text-gray-700 hover:border-black cursor-pointer"
      }`}
    >
      {item.size}

      {outOfStock && (
        <span className="block text-xs">
          Out of Stock
        </span>
      )}
    </button>
  );
})}

              </div>

            </div>
          )}

          {/* =========================
              ADD TO CART
          ========================= */}


         
      <button
  type="button"
  onClick={handleAddToCart}
  disabled={outOfStock}
  className={`px-8 py-3 mt-8 text-sm transition ${
    outOfStock
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-black text-white cursor-pointer hover:bg-gray-800"
  }`}
>
  {outOfStock ? "OUT OF STOCK" : "ADD TO CART"}
</button>

          {/* =========================
              PRODUCT INFORMATION
          ========================= */}

          <div className="border-t mt-8 pt-6">

            <div className="text-sm text-gray-500 flex flex-col gap-1">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>

          </div>

        </div>

      </div>

      {/* =========================
          DESCRIPTION
      ========================= */}

      <div className="mt-20">

        <div className="flex">
          <b className="border px-5 py-3 text-sm">
            Description
          </b>

          <p className="border px-5 py-3 text-sm">
            Reviews (122)
          </p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">

          <p>
            {singleproduct.description}
          </p>

          <p>
            E-commerce websites typically display products
            or services along with detailed information.
          </p>

        </div>

      </div>

      {/* =========================
          RELATED PRODUCTS
      ========================= */}

      <div className="flex items-center mt-10 justify-center gap-2 text-3xl">

        <p className="text-gray-500 font-normal">
          RELATED
        </p>

        <p>PRODUCTS</p>

        <span className="w-8 h-[2px] bg-gray-500"></span>

      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-5 gap-4">

        {similarcategory.map((item) => {

          const image =item.image?.[0]?.url;

          return (
            <div
              key={item._id}
              className="cursor-pointer"
              onClick={() => navigate(`/product/${item._id}`)}
            >

              {/* Image */}

              <div className="overflow-hidden bg-gray-100">

                {image ? (
                  <img
                    src={getOptimizedImage(image, 500)}
                    alt={item.name}
                    className="w-full h-[300px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-[300px] flex items-center justify-center">
                    <p className="text-gray-400">
                      No image
                    </p>
                  </div>
                )}

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
          );
        })}

      </div>

    </div>
  );
};

export default Product;