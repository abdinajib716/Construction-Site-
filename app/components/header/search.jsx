'use client';

import { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    // Implement your search logic here
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
    setIsLoading(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-300 hover:text-[#FFD700] transition-colors duration-200"
        aria-label="Search"
      >
        <SearchIcon className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-12 w-72 bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full p-4 pr-12 text-gray-900 placeholder-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <SearchIcon className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </form>
            {searchQuery && (
              <div className="border-t border-gray-100 max-h-64 overflow-y-auto">
                {/* Add search results here */}
                <div className="p-4 text-sm text-gray-500">
                  No results found for "{searchQuery}"
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
