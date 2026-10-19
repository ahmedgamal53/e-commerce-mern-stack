import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
// The assets module is JavaScript and currently has no declaration file.
// import { products } from "../assets/assets";
import toast from "react-hot-toast";
import { api } from "../api/axios";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
};




interface ShopData  {
  products: Product[];
  cartitem: {
    _id: string;
    product: Product[];
    size: string;
    quantity: number;
    
  }[];
  setcartitem: React.Dispatch<
    React.SetStateAction<ShopData["cartitem"]>
  >; 
   addtocart: (product: Product, size: string) => void
  updatequantit:(productId:string,size:string,quantity:1|-1) => void
  deletitem:(productId:string,size:string)=>void
  getCart:()=>void,
  loading:boolean
};

const ShopContext = createContext<ShopData>({
  products: [],
  addtocart: () => {},
  cartitem: [],
  updatequantit: () => {},
  deletitem: () => {},
  getCart: () => {},
  setcartitem: () => {},
  loading: false,
});

const ShopContextProvider = ({ children }: PropsWithChildren) => {
const [cartitem, setcartitem] = useState<{
  _id: string;product:Product[];size:string;quantity:number
}[]>(()=> {
    const stored = localStorage.getItem("caritem");
    return stored ? JSON.parse(stored) : [];
  })
    const [products,setproducts]=useState<Product[]>([])
    const [loading,setloading]=useState(false)

  useEffect(() => {
    localStorage.setItem("caritem", JSON.stringify(cartitem));
  }, [cartitem]);

console.log('cartitem',cartitem);


const addtocart =async (product: Product, size: string) => {


  if(!size){
    toast.error("Select Product Size ")
    return
  }
  try {
    const res =await api.post("/api/cart/add",{
       productId: product._id,
      size: size,
    })

    if(!res.data.success){
      toast.error(res.data.message)
      return
    }

      if (res.data.success) {
      setcartitem(res.data.cart.items);

      toast.success(res.data.message);
    }

  } catch (error) {
    console.log("Backend error:", error.response?.data);
    
  }

}

const getCart=async()=>{
try { 
    setloading(true)

  const res =await api.get('/api/cart/get')
   if (res.data.success){
    setcartitem(res.data.cart.items)
   }
  
} catch (error) {
  console.log(error);
  
}finally{
  setloading(false)
}
}


const updatequantit=async(productId:string,size:string,quantity:1|-1)=>{


try {

  const res=await api.post('/api/cart/update',{
    productId,
    size,
    quantity
  })

        setcartitem(res.data.cart.items)
        toast.success(res.data.message);
    
} catch (error) {
  console.log(error);
  
}


} 

const deletitem=(productId:string,size:string)=>{
  const updatedCart = cartitem.filter(
    (item) => !(item._id === productId && item.size === size)
  );

  setcartitem(updatedCart);

  toast.success("Product removed from cart");
}


const getProductData=async()=>{
try {
  setloading(true)
  const res=await api.get('/api/product/list')
  setproducts(res.data.products)
  console.log("res",res);
  
} catch (error) {
  console.log(error);
}finally{
  setloading(false)
}
}

if(!loading){
  console.log(products);
  
}
useEffect(()=>{
  // eslint-disable-next-line react-hooks/set-state-in-effect
  getProductData()
  getCart()
},[])

    return(
       <ShopContext.Provider value={{ products,addtocart,cartitem,updatequantit,deletitem,getCart,setcartitem ,loading}}>
      {children}
    </ShopContext.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useShop=()=>useContext(ShopContext)
export default ShopContextProvider