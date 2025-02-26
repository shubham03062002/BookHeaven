import React from 'react'
import Navbar from './components/Navbar'
import Footer from "./components/Footer"
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import AllBooks from './pages/AllBooks'
import Cart from './pages/Cart'
import Profile from "./pages/Profile"
import BookDetails from './pages/BookDetails'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Myorders from './pages/Myorders'
import AdmDash from './pages/AdmDash'
import AddBook from './pages/AddBook'
import EditBook from "./pages/EditBook"
import AdminOrders from './pages/AdminOrders'

const App = () => {
  return (
    <div><Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/books' element={<AllBooks/>}></Route>
      <Route path='/cart' element={<Cart/>}></Route>
      <Route path='/profile' element={<Profile/>}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/orders" element={<Myorders />} />
      <Route path="/admin-dashboard" element={<AdmDash />} />
      <Route path="/add-book" element={<AddBook />} />
      <Route path="/edit-book/:bookid" element={<EditBook />} />
      <Route path="/admin-orders" element={<AdminOrders />} />
      <Route path="/book/:id" element={<BookDetails />} />
    </Routes>
    
    <Footer/></div>
  )
}

export default App