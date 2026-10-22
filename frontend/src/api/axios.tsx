import axios from "axios";


export const api=axios.create({
    baseURL:import.meta.env.PROD? "https://e-commerce-mern-stack-omega.vercel.app"
    : "http://localhost:3000",
    withCredentials:true
})