import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'
import Partners from './pages/Partners'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ForgotPassword from './pages/ForgotPassword'
// New imports
import Loans from './pages/Loans'
import RegisterFarmer from './pages/RegisterFarmer'
import KYC from './pages/KYC'
import EMICalculator from './pages/EMICalculator'
import Schemes from './pages/Schemes'
import AgriScore from './pages/AgriScore'
import AdminPanel from './pages/AdminPanel'
import AdminLogin from './pages/AdminLogin'
import AdminRegister from './pages/AdminRegister'
import FarmerPortal from './pages/FarmerPortal'
import MerchantPortal from './pages/MerchantPortal'
import Products from './pages/Products'
import ApplyLoan from './pages/ApplyLoan'
import MerchantDashboard from './pages/MerchantDashboard'
import Feedback from './pages/Feedback'
import BankPortal from './pages/BankPortal'
import Chatbot from './components/Chatbot'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [pathname])
  return null
}

export default function App() {
  const { pathname } = useLocation()
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(pathname)
  const isAdmin = pathname.startsWith('/admin')
  const hideLayout = isAdmin || isAuthPage

  return <>
    <ScrollToTop />
    {!hideLayout && <Navbar />}
    <main><Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/product" element={<Product />} />
      <Route path="/partners" element={<Partners />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Protected Routes (Require Login) */}
      <Route path="/loans" element={<ProtectedRoute><Loans /></ProtectedRoute>} />
      <Route path="/apply-loan" element={<ProtectedRoute><ApplyLoan /></ProtectedRoute>} />
      <Route path="/kyc" element={<ProtectedRoute><KYC /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/merchant-dashboard" element={<ProtectedRoute><MerchantDashboard /></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
      
      {/* Public/Semi-Public Routes */}
      <Route path="/farmer" element={<FarmerPortal />} />
      <Route path="/merchant" element={<MerchantPortal />} />
      <Route path="/products" element={<Products />} />
      <Route path="/register-farmer" element={<RegisterFarmer />} />
      <Route path="/emi-calculator" element={<EMICalculator />} />
      <Route path="/schemes" element={<Schemes />} />
      <Route path="/agri-score" element={<AgriScore />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin-register" element={<AdminRegister />} />
      <Route path="/bank-portal" element={<BankPortal />} />
      
      <Route path="*" element={<Home />} />
    </Routes></main>
    {!hideLayout && <Chatbot />}
    {!hideLayout && <Footer />}
  </>
}
