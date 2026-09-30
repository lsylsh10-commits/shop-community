import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Community from './pages/Community.jsx'
import Header from './Header'
import Footer from './Footer'
import Shop from './pages/Shop.jsx'
import Mypage from './pages/Mypage.jsx'
import ProductList from './pages/ProductList.jsx'
import BestNew from './pages/BestNew.jsx'


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
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/shop/best-new" element={<BestNew />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}

export default App