'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from "@/lib/utils";
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Scroll-based animations
  const { scrollY } = useScroll();
  const gradientOpacity = useTransform(scrollY, [0, 300], [0.3, 0.5]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.75;
      video.load();

      const handleCanPlay = () => {
        requestAnimationFrame(() => {
          setIsVideoReady(true);
          video.play().catch(console.log);
        });
      };

      video.addEventListener('canplay', handleCanPlay);
      return () => video.removeEventListener('canplay', handleCanPlay);
    }
  }, []);

  // Mouse follow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    })
  };

  return (
    <section ref={containerRef} className="relative h-[calc(100vh-80px)] mt-20 w-full overflow-hidden bg-[#1B2431] sm:h-screen sm:mt-0">
      {/* Video Background with subtle overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
          className={cn(
            "absolute top-0 left-0 h-full w-full object-cover scale-105",
            isVideoReady ? "opacity-100" : "opacity-0",
            "transition-all duration-700 filter brightness-[0.85]"
          )}
        >
          <source src="/videos/construction-video.mp4" type="video/mp4" />
        </video>

        {/* Thin overlays for depth */}
        <div className="absolute inset-0 bg-black/25" />
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40"
          style={{ opacity: gradientOpacity }}
        />
      </div>

      {/* Mouse Follow Light Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(255,215,0,0.1), 
            transparent 40%)`
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 -mt-20 max-w-[1200px] mx-auto text-center">
        <h1 className="text-center tracking-widest text-white uppercase w-full max-w-5xl mx-auto mb-12">
          <motion.span
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="block text-[1.5rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] xl:text-[2.8rem] leading-[1.2] font-semibold mb-2"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
          >
            Leaders in Quality
          </motion.span>
          <motion.span
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="block text-[1.5rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] xl:text-[2.8rem] leading-[1.2] font-semibold mb-2"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
          >
            Construction and
          </motion.span>
          <motion.span
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="block text-[1.5rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] xl:text-[2.8rem] leading-[1.2] font-semibold"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
          >
            Infrastructure
          </motion.span>
        </h1>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-white flex flex-col items-center mt-4 relative"
        >
          <span className="text-sm mb-3 tracking-[0.2em] opacity-90 font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
            SCROLL DOWN
          </span>
          <div className="relative">
            <button 
              onClick={scrollToServices}
              className="w-8 h-14 border-[2.5px] border-white/90 rounded-full flex items-start justify-center p-2 cursor-pointer hover:border-[#FFD700] transition-all duration-300 relative overflow-hidden group shadow-lg"
              aria-label="Scroll to services"
            >
              <div className="w-1.5 h-3 bg-white rounded-full animate-scroll-down group-hover:bg-[#FFD700] transition-colors duration-300" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/20 to-transparent"
                initial={{ y: '-100%' }}
                animate={{ y: '100%' }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear"
                }}
              />
            </button>
            <motion.div
              animate={{
                y: [0, 5, 0],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChevronDown className="w-7 h-7 mt-2 opacity-90 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
