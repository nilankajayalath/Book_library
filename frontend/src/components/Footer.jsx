import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="relative bg-[#1c1c1c] text-[#eaeaea] pt-12 pb-8 px-6 md:px-20 overflow-hidden shadow-[0_-5px_15px_rgba(0,0,0,0.3)]">
      {/* Glowing light effect */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#fbbf24] via-[#e76f51] to-[#fbbf24] animate-pulse" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left z-10 relative">

        {/* Library Motto & Brand */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-[#fbbf24] font-serif">MyLibrary</h1>
          <p className="italic text-[#ccc]">"Turning pages, shaping minds."</p>
          <div className="w-10 h-[2px] bg-[#e76f51] mx-auto md:mx-0 rounded"></div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-[#e76f51]">Explore</h3>
          <ul className="space-y-1 text-[#bbb]">
            <li><Link to="/" className="hover:text-[#fbbf24] transition duration-300">Home</Link></li>
            <li><Link to="/add-book" className="hover:text-[#fbbf24] transition duration-300">Add Book</Link></li>
            <li><Link to="/login" className="hover:text-[#fbbf24] transition duration-300">Login</Link></li>
            <li><Link to="/signup" className="hover:text-[#fbbf24] transition duration-300">Sign Up</Link></li>
          </ul>
        </div>

        {/* Social Links & Signature */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#e76f51]">Connect</h3>
          <div className="flex justify-center md:justify-start gap-5 text-2xl text-[#ccc]">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-[#fbbf24] transition duration-300"><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#fbbf24] transition duration-300"><FaLinkedin /></a>
            <a href="mailto:nilanka@example.com" className="hover:text-[#fbbf24] transition duration-300"><FaEnvelope /></a>
          </div>
          <p className="text-sm italic text-[#aaa] mt-2">
            Crafted with soul by <Link to="/yourlink" className="text-[#fbbf24] hover:underline">Nilanka Jayalath</Link>
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-[#444] pt-4 text-center text-sm text-[#777]">
        © {new Date().getFullYear()} MyLibrary. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
