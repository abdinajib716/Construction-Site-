'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useScrollPosition } from '@/app/hooks/useScrollPosition';
import Search from './search';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isScrolled } = useScrollPosition();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate navigation loading state
    setIsLoading(false);
  }, []);

  const navItems = [
    { 
      label: 'HOME', 
      href: '#',
      isActive: true 
    },
    { 
      label: 'SERVICES', 
      href: '#services',
      dropdownItems: [
        { label: 'Residential', href: '#services/residential' },
        { label: 'Commercial', href: '#services/commercial' },
        { label: 'Industrial', href: '#services/industrial' },
      ]
    },
    { label: 'ABOUT', href: '#about' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-[#1B2431]/95 backdrop-blur-sm h-16 shadow-lg" 
          : "bg-[#1B2431] h-20"
      )}
    >
      <div className="flex justify-between items-center h-full">
        {/* Logo Section - Yellow Background */}
        <motion.div 
          className={cn(
            "bg-[#FFD700] h-full flex items-center px-4 sm:px-6",
            isScrolled ? "w-[180px] sm:w-[240px]" : "w-[200px] sm:w-[290px]"
          )}
          layout
        >
          <Link href="/" className="flex items-center gap-2 sm:gap-3">
            <motion.div 
              className={cn(
                "relative",
                isScrolled ? "w-7 h-7 sm:w-8 sm:h-8" : "w-8 h-8 sm:w-10 sm:h-10"
              )}
              layout
            >
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path
                  fill="currentColor"
                  d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2zm0 2.83L19.17 12H18v6h-4v-6H10v6H6v-6H4.83L12 4.83z"
                />
              </svg>
            </motion.div>
            <motion.div className="flex flex-col" layout>
              <span className={cn(
                "text-[#1B2431] font-bold tracking-tight",
                isScrolled ? "text-base sm:text-lg" : "text-lg sm:text-xl"
              )}>SPHERE</span>
              <span className={cn(
                "text-[#1B2431] tracking-wider",
                isScrolled ? "text-[10px] sm:text-xs" : "text-xs sm:text-sm"
              )}>CONSTRUCTIONS</span>
            </motion.div>
          </Link>
        </motion.div>

        <div className="flex items-center gap-4">
          {/* Search Component */}
          <Search />

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden px-4 py-2 text-gray-300 hover:text-[#FFD700] transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center pr-8">
            <ul className="flex items-center gap-8">
              {navItems.map((item, index) => (
                <li key={index} className="relative group">
                  {isLoading ? (
                    <div className="h-4 w-20 bg-gray-600 animate-pulse rounded"></div>
                  ) : (
                    <>
                      <Link 
                        href={item.href}
                        className={cn(
                          "text-sm tracking-wider transition-colors duration-200 flex items-center gap-1",
                          "text-gray-300 hover:text-[#FFD700]",
                          item.isActive && "text-[#FFD700]"
                        )}
                        onClick={() => item.dropdownItems && toggleDropdown(index)}
                      >
                        {item.label}
                        {item.dropdownItems && (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </Link>
                      
                      {/* Dropdown Menu */}
                      {item.dropdownItems && (
                        <div className="absolute top-full left-0 mt-2 w-48 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            {item.dropdownItems.map((dropdownItem, idx) => (
                              <Link
                                key={idx}
                                href={dropdownItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                              >
                                {dropdownItem.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </li>
              ))}
              
              {/* CTA Button */}
              <li>
                <Link
                  href="#contact"
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    "bg-[#FFD700] text-[#1B2431] hover:bg-[#FFD700]/90",
                    "transform hover:scale-105"
                  )}
                >
                  Get Quote
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#1B2431] border-t border-gray-700"
          >
            <ul className="px-4 py-2">
              {navItems.map((item, index) => (
                <li key={index} className="mb-2">
                  <div>
                    <button
                      onClick={() => item.dropdownItems ? toggleDropdown(index) : null}
                      className="w-full flex justify-between items-center py-2"
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "text-sm tracking-wider transition-colors duration-200",
                          "text-gray-300 hover:text-[#FFD700]",
                          item.isActive && "text-[#FFD700]"
                        )}
                      >
                        {item.label}
                      </Link>
                      {item.dropdownItems && (
                        <ChevronDown 
                          className={cn(
                            "w-4 h-4 text-gray-300 transition-transform duration-200",
                            activeDropdown === index && "transform rotate-180"
                          )}
                        />
                      )}
                    </button>
                    
                    {/* Mobile Dropdown */}
                    {item.dropdownItems && activeDropdown === index && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="ml-4 border-l border-gray-700"
                      >
                        {item.dropdownItems.map((dropdownItem, idx) => (
                          <Link
                            key={idx}
                            href={dropdownItem.href}
                            className="block py-2 pl-4 text-sm text-gray-400 hover:text-[#FFD700] transition-colors duration-200"
                          >
                            {dropdownItem.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </div>
                </li>
              ))}
              
              {/* Mobile CTA */}
              <li className="mt-4 mb-2">
                <Link
                  href="#contact"
                  className="block w-full text-center px-4 py-2 rounded-md text-sm font-medium bg-[#FFD700] text-[#1B2431] hover:bg-[#FFD700]/90 transition-all duration-200"
                >
                  Get Quote
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
