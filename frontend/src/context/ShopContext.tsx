import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
// The assets module is JavaScript and currently has no declaration file.
// @ts-expect-error: products is supplied by the untyped assets module.
import { products } from "../assets/assets";
import toast from "react-hot-toast";

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

type ShopData = {
  products: Product[];
  cartitem: {
    _id: string;
    product: Product[];
    size: string;
    quantity: number;
  }[];
  addtocart: (product: Product, size: string) => void
  updatequantit:(productId:string,size:string,action:number) => void
  deletitem:(productId:string,size:string)=>void
};

const ShopContext = createContext<ShopData>({
  products: [],
  addtocart: () => {},
  cartitem: [],
  updatequantit: () => {},
  deletitem:()=>{}
});

const ShopContextProvider = ({ children }: PropsWithChildren) => {
const [cartitem, setcartitem] = useState<{
  _id: string;product:Product[];size:string;quantity:number
}[]>(()=> {
    const stored = localStorage.getItem("caritem");
    return stored ? JSON.parse(stored) : [];
  })


  useEffect(() => {
    localStorage.setItem("caritem", JSON.stringify(cartitem));
  }, [cartitem]);



const addtocart = (product: Product, size: string) => {


  if(!size){
    toast.error("Select Product Size ")
    return
  }
  const itemincart=cartitem.find((item)=>item._id===product._id&&item.size===size )

  if(itemincart){
  
    updatequantit(itemincart._id,itemincart.size,1)
    toast.success('Update quantity ')
  }else{
    setcartitem([...cartitem, 
      { _id: product._id, product: [product], size, quantity: 1 }])
      toast.success('Add to cart Successfully ')

  }
  
}

const updatequantit=(productId:string,size:string,action=1|-1)=>{
  setcartitem((prev)=>
  prev.map((item)=>
  item._id===productId &&item.size===size?{...item,quantity:item.quantity +action}:item
  ).filter((item)=>item.quantity>0)
  )
} 

const deletitem=(productId:string,size:string)=>{
  const updatedCart = cartitem.filter(
    (item) => !(item._id === productId && item.size === size)
  );

  setcartitem(updatedCart);

  toast.success("Product removed from cart");
}



    return(
       <ShopContext.Provider value={{ products,addtocart,cartitem,updatequantit,deletitem }}>
      {children}
    </ShopContext.Provider>
    )
}
// eslint-disable-next-line react-refresh/only-export-components
export const useShop=()=>useContext(ShopContext)
export default ShopContextProvider