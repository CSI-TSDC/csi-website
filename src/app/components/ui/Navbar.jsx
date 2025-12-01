'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      // Add blur effect after scrolling 50px
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const navLinks = [
    { href: '/#home', label: 'Home' },
    { href: '/#what-we-are', label: 'About Us' },
    { href: '/projects', label: 'Projects' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/team', label: 'Team' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Backdrop overlay - dims background when menu is open */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden"
          onClick={closeMenu}
        />
      )}

      <nav 
        id='nav' 
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300  ${
          (isHomePage && !isScrolled) ? 'bg-transparent' : 'bg-white/90 border-b border-black'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex flex-row justify-center items-center gap-6 w-max">
              <span>
                <img src="/assets/images/csi_logo.png" alt="Logo" className="h-14" />
              </span>
              <h1 className={`text-xl md:text-2xl font-bold font-youth-bold cursor-pointer transition-all duration-300 hover:scale-105 ${
                (isHomePage && !isScrolled) ? 'text-white' : 'text-black'
              }`}>
                CSI x TSDC 
              </h1>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <ul className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className={`text-sm md:text-base font-medium transition-colors duration-200 cursor-pointer py-2 px-3 rounded-md ${
                        (isHomePage && !isScrolled)
                          ? 'text-white hover:text-blue-400 hover:bg-white/5' 
                          : 'text-black hover:text-blue-600 hover:bg-black/5'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`transition-colors p-2 relative z-50 ${
                  (isHomePage && !isScrolled) ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-600'
                }`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-lg border-b transition-all duration-300 ease-in-out ${
              (isHomePage && !isScrolled)
                ? 'bg-black/95 border-white/10' 
                : 'bg-white/95 border-black/10'
            } ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <ul className="flex flex-col px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className={`block text-base font-medium transition-colors duration-200 cursor-pointer py-3 px-4 rounded-md ${
                      (isHomePage && !isScrolled)
                        ? 'text-white hover:text-blue-400 hover:bg-white/10'
                        : 'text-black hover:text-blue-600 hover:bg-black/10'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar

