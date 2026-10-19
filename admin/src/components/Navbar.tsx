import { LogOut } from "lucide-react"
import { api } from "../api/axios";
import {  useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
const navigate=useNavigate()

const auth = useAuth()

if (!auth) {
  return null
}

const { setstatus } = auth

    const handelLogout=async()=>{
        try {
            await api.post("/api/user/logout")
            setstatus("unauthenticated");
            navigate("/login")
        } catch (error) {
            console.log(error);
            
        }
    }


  return (
 <header className="h-[73px] bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50">
      
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/logo.png"
          alt="Forever Admin"
          className="w-36 object-contain"
        />
      </div>

      {/* Right Side */}

       
      

        {/* Logout */}
        <button
          onClick={()=>handelLogout()}
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-lg
            bg-slate-800
            text-white
            text-sm font-medium
            hover:bg-slate-700
            active:scale-95
            transition-all
          "
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>

    </header>
  )
}

export default Navbar