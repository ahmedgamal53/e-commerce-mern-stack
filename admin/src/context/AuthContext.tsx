import { createContext, useContext, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { api } from "../api/axios";

type AuthStatus ="loading"| "authenticated" | "unauthenticated"

interface AuthContextType {
    status:AuthStatus,
    setstatus:Dispatch<SetStateAction<AuthStatus>>
}

const AuthContext=createContext<AuthContextType|null>(null)



export const AuthProvider = ({ children }:{children:ReactNode}) => {

    const [status,setstatus]=useState<AuthStatus>("loading")


const checkAuth=async ()=>{
    try {
        await api.get("/api/user/check-auth")
        setstatus("authenticated")
    } catch  {
        setstatus("unauthenticated")
    }
}
useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    checkAuth()
},[])




    return (
        <AuthContext.Provider value={{ status,setstatus }}>
            {children}
        </AuthContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth=()=> useContext(AuthContext)