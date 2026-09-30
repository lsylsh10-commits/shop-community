import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Community from './pages/Community.jsx'
import Header from './Header'
import Footer from './Footer'
import Shop from './pages/Shop.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Mypage from './pages/Mypage.jsx'
import ProductList from './pages/ProductList.jsx'
import BestNew from './pages/BestNew.jsx'
import Cart from './pages/cart.jsx'
import Login from './pages/login.jsx'

import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/shop" element={<Shop />} />

        <Route path="/shop/all" element={<ProductList />} />
        <Route path="/shop/best-new" element={<BestNew />} />
        <Route path="/shop/:id" element={<ProductDetail />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App