import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import toast from "react-hot-toast"

const ProtectedCart = () => {
// eslint-disable-next-line react-hooks/rules-of-hooks
const auth = useAuth()
const status = auth?.status

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (  status === "unauthenticated") {

    toast.error("please login")
    return  <Navigate to="/login" replace />
    
  }



  return <Outlet/>
}

export default ProtectedCart