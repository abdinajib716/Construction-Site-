'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState, useEffect } from 'react';
import Image from "next/image";
import Hero from './components/hero/hero';
import { motion, AnimatePresence } from 'framer-motion';
import { BsArrowUpCircleFill } from 'react-icons/bs';
import { FaArrowUp } from 'react-icons/fa';

// Lazy load components that are below the fold
const Services = dynamic(() => import('./components/services/services'), {
  loading: () => <div className="h-screen"></div>
});
const About = dynamic(() => import('./components/about/about'), {
  loading: () => <div className="h-screen"></div>
});
const Stats = dynamic(() => import('./components/stats/stats'), {
  loading: () => <div className="h-96"></div>
});
const Projects = dynamic(() => import('./components/projects/projects'), {
  loading: () => <div className="h-screen"></div>
});
const Clients = dynamic(() => import('./components/clients/clients'), {
  loading: () => <div className="h-96"></div>
});
const Contact = dynamic(() => import('./components/contact/contact'), {
  loading: () => <div className="h-96"></div>
});

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const buttonVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.5,
      rotate: -180
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.5,
      rotate: 180,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const arrowVariants = {
    initial: {
      y: 0
    },
    hover: {
      y: -3,
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between relative">
      <Hero />
      <Suspense fallback={<div className="h-screen"></div>}>
        <Services />
      </Suspense>
      <Suspense fallback={<div className="h-screen"></div>}>
        <About />
      </Suspense>
      <Suspense fallback={<div className="h-96"></div>}>
        <Stats />
      </Suspense>
      <Suspense fallback={<div className="h-screen"></div>}>
        <Projects />
      </Suspense>
      <Suspense fallback={<div className="h-96"></div>}>
        <Clients />
      </Suspense>
      <Suspense fallback={<div className="h-96"></div>}>
        <Contact />
      </Suspense>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            whileHover="hover"
            whileTap="tap"
            onClick={scrollToTop}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="fixed bottom-8 right-8 z-50 cursor-pointer"
          >
            <div className="relative">
              {/* Pulse Effect */}
              <motion.div
                className="absolute inset-0 bg-yellow-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Main Button */}
              <motion.div
                className="relative w-14 h-14 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg flex items-center justify-center overflow-hidden"
                animate={{
                  boxShadow: isHovered 
                    ? "0 8px 20px rgba(234, 179, 8, 0.3)"
                    : "0 4px 12px rgba(234, 179, 8, 0.2)",
                }}
              >
                <motion.div
                  variants={arrowVariants}
                  className="text-white"
                >
                  <BsArrowUpCircleFill className="text-3xl" />
                </motion.div>
              </motion.div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      <footer className="w-full flex justify-center text-sm text-gray-600 py-4">
        <p>&copy; {new Date().getFullYear()} Sphere Constructions</p>
      </footer>
    </main>
  );
}
