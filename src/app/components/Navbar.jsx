'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(prev => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  // navLinks can include both internal routes and page-section hash links
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#what-we-are', label: 'What We Are' },
    { href: '/projects', label: 'Projects' },
    { href: '/events', label: 'Events' },
    { href: '/team', label: 'Team' },        // ← navigates to /team page
    { href: '#contact', label: 'Contact' },
  ]

  // Handles navigation for hashes (smooth scroll) and normal routes (router.push)
  const handleNavClick = (e, href) => {
    // Keep default behaviour for external links
    if (href.startsWith('http')) return

    e.preventDefault()
    closeMenu()

    if (href.startsWith('#')) {
      // smooth scroll to section on same page
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // update hash without jumping (optional)
        history.replaceState(null, '', href)
      } else {
        // if section not found, still update hash
        history.replaceState(null, '', href)
      }
    } else {
      // navigate to page route (App Router)
      router.push(href)
    }
  }

  return (
    <>
      {/* Backdrop overlay when menu open (mobile) */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden"
          onClick={closeMenu}
        />
      )}

      <nav
        id="nav"
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? 'bg-black/20 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={(e) => handleNavClick(e, '#home')}
                className="text-white text-xl md:text-2xl font-bold cursor-pointer transition-transform hover:scale-105"
                aria-label="Go to home"
              >
                Logo
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <ul className="flex items-center space-x-8">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    {/* Use button-like anchor so we can intercept both hash and route clicks */}
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-white text-sm md:text-base font-medium hover:text-blue-400 transition-colors duration-200 cursor-pointer py-2 px-3 rounded-md hover:bg-white/5"
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
                className="text-white hover:text-blue-400 transition-colors p-2 relative z-50"
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
            className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10 transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <ul className="flex flex-col px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block text-white text-base font-medium hover:text-blue-400 transition-colors duration-200 cursor-pointer py-3 px-4 rounded-md hover:bg-white/10"
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
