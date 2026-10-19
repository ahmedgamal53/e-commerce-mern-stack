
import { useState, type FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";


const Login = () => {
const [email,setemail]=useState('')
const [password,setpassword]=useState('')

const auth = useAuth()

if (!auth) {
  return null
}

const { setstatus } = auth



  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const onSubmitHandler=async (e: FormEvent<HTMLFormElement>)=>{
        try {
        e.preventDefault()
        
       
        const res=await api.post('/api/user/admin',{
            email,
            password
        })
        setstatus("authenticated")
        console.log(res);
        
            navigate("/add")
            

        } catch (error) {
            console.log(error);
            
        }
    }
  return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form 
      onSubmit={onSubmitHandler}
      className="w-[90%] max-w-sm bg-white p-6 rounded-md shadow-md">
        
        <h1 className="text-xl font-semibold text-gray-800 mb-5">
          Admin Panel
        </h1>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Email Address
          </label>

          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            className="
              w-full
              border border-gray-200
              rounded-md
              px-3 py-2
              text-sm
              outline-none
            focus:border-gray-400
              transition
            "
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
             value={password}
            onChange={(e)=>setpassword(e.target.value)}
            
            className="
              w-full
              border border-gray-200
              rounded-md
              px-3 py-2
              text-sm
              outline-none
              focus:border-gray-400
              transition
            "
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="
            w-full
            bg-black
            text-white
            py-2
            rounded-md
            text-sm
            font-medium
            hover:bg-gray-800
            transition
          "
        >
          Login
        </button>

      </form>
    </div>
  )
}

export default Login