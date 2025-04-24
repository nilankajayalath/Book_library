import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const { user, logout } = useAuthStore()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    const { message } = await logout()
    toast.success(message)
    setMenuOpen(false)
  }

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <nav className='bg-[#252422] text-[#FFFCF2] px-4 md:px-12 py-4 md:py-6'>
      <div className='flex justify-between items-center'>

        {/* Logo */}
        <Link to="/" onClick={() => setMenuOpen(false)}>
          <label className='font-semibold tracking-wider text-lg lg:text-xl cursor-pointer'>
            MyLibrary
          </label>
        </Link>

        {/* Toggle Button */}
        <div className='md:hidden'>
          <button onClick={toggleMenu} className='text-2xl'>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menu Items */}
        <div className={`md:flex md:items-center space-y-4 md:space-y-0 md:space-x-5 md:text-lg absolute md:static bg-[#252422] left-0 right-0 top-[70px] px-4 py-6 md:p-0 transition-all duration-300 z-50 ${menuOpen ? 'block' : 'hidden'}`}>
          {user ? (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <p className='bg-[#403D39] px-3 py-2 rounded'>Home</p>
              </Link>
              <Link to="/add-book" onClick={() => setMenuOpen(false)}>
                <p className='bg-[#403D39] px-3 py-2 rounded'>Add Book</p>
              </Link>
              <Link to="/book/123" onClick={() => setMenuOpen(false)}>
                <p className='bg-[#403D39] px-3 py-2 rounded'>View Book</p>
              </Link>
              <button onClick={handleLogout}>Logout ({user.username})</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <p>Add Book</p>
              </Link>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <p>Log In</p>
              </Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>
                <p className='bg-[#403D39] px-3 py-2 rounded'>Sign Up</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
