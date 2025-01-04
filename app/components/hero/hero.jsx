'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from "@/lib/utils";
import { ChevronDown } from 'lucide-react';
import { throttle } from 'lodash';

const Hero = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Initialize client-side features
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Simple intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVideoVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Simple video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playsInline = true;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.preload = "auto";
    
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.error('Video playback failed:', error);
      }
    };

    if (isVideoVisible) {
      playVideo();
    } else {
      video.pause();
    }

    return () => {
      video.pause();
      video.currentTime = 0;
    };
  }, [isVideoVisible]);

  // Optimized mouse follow effect - only on desktop
  const handleMouseMove = useCallback(
    throttle((e) => {
      if (!containerRef.current || window.innerWidth <= 768) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }, 100), // Increased throttle time
    []
  );

  useEffect(() => {
    if (!isClient || window.innerWidth <= 768) return;
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      handleMouseMove.cancel();
    };
  }, [handleMouseMove, isClient]);

  const scrollToServices = useCallback(() => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Scroll-based animations
  const { scrollY } = useScroll();
  const gradientOpacity = useTransform(scrollY, [0, 300], [0.3, 0.5]);

  return (
    <section ref={containerRef} className="relative h-[calc(100vh-80px)] mt-20 w-full overflow-hidden bg-[#1B2431] sm:h-screen sm:mt-0">
      {/* Video Background with optimized loading */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background color */}
        <div className="absolute inset-0 bg-[#1B2431]" />
        
        {/* Video */}
        <video
          ref={videoRef}
          playsInline
          muted
          loop
          autoPlay
          preload="auto"
          webkit-playsinline="true"
          x5-playsinline="true"
          className="absolute top-0 left-0 h-full w-full object-cover scale-105 filter brightness-[0.85]"
        >
          <source 
            src="/videos/construction-video.mp4"
            type="video/mp4"
          />
        </video>

        {/* Static overlay */}
        <div className="absolute inset-0 bg-black/25" />
        
        {/* Simplified gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 transition-opacity duration-300"
          style={{ opacity: scrollY.get() > 0 ? 0.5 : 0.3 }}
        />
      </div>

      {/* Mouse follow effect - only on desktop */}
      {isClient && window.innerWidth > 768 && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-75"
          style={{
            background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(255,215,0,0.08), 
              transparent 40%)`
          }}
        />
      )}
      
      {/* Content with optimized animations */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 -mt-20 max-w-[1200px] mx-auto text-center">
        {/* Simplified text animations */}
        <h1 className="text-center tracking-widest text-white uppercase w-full max-w-5xl mx-auto mb-12">
          <span className="block text-[1.5rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] xl:text-[2.8rem] leading-[1.2] font-semibold mb-2 animate-fade-in">
            Leaders in Quality
          </span>
          <span className="block text-[1.5rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] xl:text-[2.8rem] leading-[1.2] font-semibold mb-2 animate-fade-in-delay-1">
            Construction and
          </span>
          <span className="block text-[1.5rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem] xl:text-[2.8rem] leading-[1.2] font-semibold animate-fade-in-delay-2">
            Infrastructure
          </span>
        </h1>

        {/* Optimized Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-white flex flex-col items-center mt-4 relative"
        >
          <span className="text-sm mb-3 tracking-[0.2em] opacity-90 font-medium">
            SCROLL DOWN
          </span>
          <div className="relative">
            <button 
              onClick={scrollToServices}
              className="w-8 h-14 border-[2.5px] border-white/90 rounded-full flex items-start justify-center p-2 cursor-pointer hover:border-[#FFD700] transition-all duration-300 relative overflow-hidden group"
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
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ChevronDown className="w-7 h-7 mt-2 opacity-90" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
