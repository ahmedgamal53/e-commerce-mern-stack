import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, Search, ShoppingCart, UserRound } from "lucide-react";
import { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { api } from '../api/axios';
import { useAuth } from '../context/AuthContext';
const Navbar = () => {

    const [visible,setvisible]=useState(false)
    const {cartitem}=useShop()
    const auth = useAuth()
    const setstatus = auth?.setstatus
    const status = auth?.status
const navigate=useNavigate()
const handelLogout=async()=>{
  try {
    await api.post("/api/user/userLogout")
    setstatus?.("unauthenticated")
    navigate("/login")
  } catch (error) {
    console.log(error);
    
  }
}

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
        <img src='../../public/logo.png' className='w-36'/>

<ul className="hidden sm:flex gap-5 text-sm text-gray-700">
   <NavLink
  to="/"
  className={({ isActive }) =>
    `flex flex-col relative items-center gap-1
    ${
      isActive
        ? "text-gray-700 after:absolute after:-bottom-0.5 after:h-[2px] after:bg-gray-700 after:w-2/3"
        : "text-slate-500"
    }`
  }
>
  <p>HOME</p>
</NavLink>

<NavLink
  to="/collection"
  className={({ isActive }) =>
    `flex flex-col relative items-center gap-1
    ${
      isActive
        ? "text-gray-700 after:absolute after:-bottom-0.5 after:h-[2px] after:bg-gray-700 after:w-2/3"
        : "text-slate-500"
    }`
  }
>
  <p>COLLECTION</p>
</NavLink>

<NavLink
  to="/about"
  className={({ isActive }) =>
    `flex flex-col relative items-center gap-1
    ${
      isActive
        ? "text-gray-700 after:absolute after:-bottom-0.5 after:h-[2px] after:bg-gray-700 after:w-2/3"
        : "text-slate-500"
    }`
  }
>
  <p>ABOUT</p>
</NavLink>

<NavLink
  to="/contact"
  className={({ isActive }) =>
    `flex flex-col relative items-center gap-1
    ${
      isActive
        ? "text-gray-700 after:absolute after:-bottom-0.5 after:h-[2px] after:bg-gray-700 after:w-2/3"
        : "text-slate-500"
    }`
  }
>
  <p>CONTACT</p>
</NavLink>
        </ul>

<div className="flex items-center gap-5">
  <Search className="w-5 h-5 cursor-pointer" />
    <div className="relative group">
{
  status==="authenticated"?(
    <div>
          <UserRound className="w-5 h-5 cursor-pointer" />

    </div>
  ):(
    <div>
<Link to='/login'>
    <UserRound className="w-5 h-5 cursor-pointer" />
      </Link>
    </div>
  )
}

      

    <div className="group-hover:block  hidden absolute right-0 pt-4">
      <div className="flex flex-col gap-2 w-36 px-5 py-3 bg-slate-100 text-gray-500">
        <p className="cursor-pointer hover:text-black">My Profile</p>
        <p 
        onClick={()=>navigate("/orders")}
        className="cursor-pointer hover:text-black">Orders</p>
        <p
        onClick={()=>handelLogout()}
        className="cursor-pointer hover:text-black">Logout</p>
      </div>
    </div>
  </div>


  <Link to="/cart" className="relative">
  <ShoppingCart className="w-5 h-5 cursor-pointer" />

  <p className="absolute -top-2 -right-2 flex items-center justify-center w-4 h-4 bg-black font-bold text-white rounded-full text-[11px] leading-none">
  {cartitem.length}
  </p>
</Link>

<Menu 
onClick={()=>setvisible(!visible)}

className="w-6 h-6 cursor-pointer sm:hidden " />



</div>

<div
  className={`absolute top-0 right-0 bottom-0 left-0 bg-white transition-all overflow-hidden ${
    visible ? "w-full" : "w-0"
  }`}
>
  <div className="flex flex-col text-gray-700">

    {/* Back */}
    <div
      onClick={() => setvisible(false)}
      className="flex items-center gap-2 px-5 py-4 border-b cursor-pointer"
    >
      <span className='font-bold text-2xl'>←</span>
      <p>Back</p>
    </div>

    {/* Links */}
    <NavLink
      onClick={() => setvisible(false)}
      to="/"
      className="px-5 py-4 border-b hover:bg-gray-50"
    >
      HOME
    </NavLink>

    <NavLink
      onClick={() => setvisible(false)}
      to="/collection"
      className="px-5 py-4 border-b hover:bg-gray-50"
    >
      COLLECTION
    </NavLink>

    <NavLink
      onClick={() => setvisible(false)}
      to="/about"
      className="px-5 py-4 border-b hover:bg-gray-50"
    >
      ABOUT
    </NavLink>

    <NavLink
      onClick={() => setvisible(false)}
      to="/contact"
      className="px-5 py-4 border-b hover:bg-gray-50"
    >
      CONTACT
    </NavLink>

  </div>
</div>

    </div>
    
  )
}

export default Navbar