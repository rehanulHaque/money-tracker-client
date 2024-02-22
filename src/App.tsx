import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import axios from 'axios'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/ProtectedRoute"

axios.defaults.baseURL = 'http://localhost:3000'

const App = () => {
  return (
    <>
    <ToastContainer/>
     <Navbar/>
     <Routes>
      <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
     </Routes>
    </>
  )
}

export default App
