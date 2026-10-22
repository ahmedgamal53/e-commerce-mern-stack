import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Collection from "./pages/Collection"
import About from "./pages/About"
import Product from "./pages/Product"
import Login from "./pages/Login"
import Cart from "./pages/Cart"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Signup from "./pages/Signup"
import ProtectedCart from './components/protectedCart'
import Contact from "./pages/Contact"
function App() {

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
      <Route path="/" element={<Home />} />
  <Route path="/collection" element={<Collection />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/product/:productId" element={<Product />} />
  <Route element={<ProtectedCart />} >

  <Route path="/cart" element={<Cart />} />
  </Route>

  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/place-order" element={<PlaceOrder />} />
  <Route path="/orders" element={<Orders />} />
  </Routes>
  <Footer/>
    </div>
  )
}

export default App
