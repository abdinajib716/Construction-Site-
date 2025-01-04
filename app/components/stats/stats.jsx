'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

const StatsCounter = ({ end, duration = 2000, label, icon: Icon, startCounting }) => {
  const [count, setCount] = useState(0);
  const countingStarted = useRef(false);
  const counterRef = useRef(null);
  const isInView = useInView(counterRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!startCounting || countingStarted.current) return;
    
    countingStarted.current = true;
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, startCounting]);

  return (
    <motion.div 
      ref={counterRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="relative flex flex-col items-center p-4 bg-white/50 backdrop-blur-sm rounded-sm group"
    >
      <motion.div 
        className="text-yellow-500 mb-2 transform transition-all duration-300 group-hover:scale-110"
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
      </motion.div>
      <motion.span 
        className="text-xl sm:text-2xl font-bold text-[#1B2431] mb-1 tabular-nums relative"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {count}
        <motion.span 
          className="absolute -right-2 top-0 h-full w-[2px] bg-yellow-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </motion.span>
      <span className="text-xs sm:text-sm text-gray-600 font-medium text-center">
        {label.replace('\n', ' ')}
      </span>
      <motion.div 
        className="absolute inset-0 border-2 border-yellow-500/0 group-hover:border-yellow-500/20 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

const Stats = () => {
  const [startCounting, setStartCounting] = useState(false);
  const statsRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCounting(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      value: 2035,
      label: 'Year Established',
      icon: (props) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 002 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z" />
        </svg>
      )
    },
    {
      value: 206,
      label: 'Projects Completed',
      icon: (props) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z" />
        </svg>
      )
    },
    {
      value: 870,
      label: 'Contractors Appointed',
      icon: (props) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      )
    },
    {
      value: 26,
      label: 'Awards Won',
      icon: (props) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zm-2 3V7h2v1c0 .55.45 1 1 1s1-.45 1-1z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white w-full">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-48 right-0 w-96 h-96 bg-yellow-100/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute -bottom-48 -left-48 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div 
        ref={statsRef}
        style={{ opacity, scale }}
        className="w-full px-4"
      >
        <div className="max-w-2xl mx-auto text-center mb-8">
          <span className="text-sm font-semibold tracking-wider text-yellow-500 uppercase mb-2 block">
            Our Impact
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#1B2431]">
            Building Success Through Numbers
          </h2>
          <div className="w-16 h-0.5 bg-yellow-500 mx-auto mb-4" />
          <p className="text-sm text-gray-600 leading-relaxed">
            Our track record speaks for itself. Here's a glimpse of our achievements.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 w-full max-w-[1400px] mx-auto px-4">
          {stats.map((stat, index) => (
            <StatsCounter
              key={index}
              end={stat.value}
              label={stat.label}
              icon={stat.icon}
              startCounting={startCounting}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Stats;
