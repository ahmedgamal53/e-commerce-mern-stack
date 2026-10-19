import {  Route, Routes } from "react-router-dom"

import Login from "./components/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminLayout from "./components/AdminLayout"

// eslint-disable-next-line react-refresh/only-export-components
export const backendUrl=import.meta.env.VITE_BACKEND_URL

const App = () => {



  return (
  <Routes>

      {/* Login */}
      <Route path="/login" element={<Login/>} />

      {/* Admin */}
      <Route element={<ProtectedRoute />}>
        // eslint-disable-next-line react-hooks/static-components, react-hooks/static-components
        <Route path="/*" element={<AdminLayout />} />
      </Route>

    </Routes>
  
  )
}

export default App