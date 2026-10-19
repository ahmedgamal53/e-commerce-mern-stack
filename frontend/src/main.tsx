import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.tsx'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
 

 <BrowserRouter>
 <AuthProvider>
  <Toaster
  position="top-center"
  reverseOrder={false}
>
  
</Toaster>
  <ShopContextProvider>
    <App />
  </ShopContextProvider>
  </AuthProvider>
  </BrowserRouter>

)
