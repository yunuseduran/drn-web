'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { title: 'Anasayfa', href: '/' },
    { title: 'Hakkımızda', href: '/hakkimizda' },
    { title: 'Ne Yapıyoruz', href: '/ne-yapiyoruz' },
    { title: 'Ürünlerimiz', href: '/urunlerimiz' },
    { title: 'Nerede Yapıyoruz', href: '/nerede-yapiyoruz' },
    { title: 'Sürdürülebilirlik', href: '/surdurulebilirlik' },
    { title: 'İnsan Kaynakları', href: '/insan-kaynaklari' },
    { title: 'İletişim', href: '/iletisim' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="z-50 relative">
            <div className="w-36 md:w-48">
              <Image 
                src="/images/drn-moda-logo.png" 
                alt="DRN Moda Tekstil Logo" 
                width={200} 
                height={60}
                className={isScrolled ? 'brightness-50' : 'brightness-100'}
                priority
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link, index) => (
              <Link 
                key={index} 
                href={link.href}
                className={`font-medium hover:text-[#af8107] transition-colors ${
                  isScrolled ? 'text-gray-800' : 'text-white'
                }`}
              >
                {link.title}
              </Link>
            ))}
          </nav>
          
          {/* Language Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="#" 
              className={`font-medium hover:text-[#af8107] transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              TR
            </Link>
            <span className={isScrolled ? 'text-gray-400' : 'text-white/60'}>|</span>
            <Link 
              href="#" 
              className={`font-medium hover:text-[#af8107] transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              EN
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden z-50"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-[#af8107] flex flex-col justify-center items-center transition-all duration-300 md:hidden ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <nav className="flex flex-col items-center space-y-6">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.href}
              className="text-white text-xl font-medium hover:text-amber-200 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.title}
            </Link>
          ))}
          
          <div className="flex items-center space-x-4 mt-4">
            <Link href="#" className="text-white font-medium hover:text-amber-200 transition-colors">
              TR
            </Link>
            <span className="text-white/60">|</span>
            <Link href="#" className="text-white font-medium hover:text-amber-200 transition-colors">
              EN
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 