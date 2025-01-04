'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: 25, label: 'Years Experience', suffix: '+' },
  { value: 500, label: 'Projects Completed', suffix: '+' },
  { value: 100, label: 'Expert Workers', suffix: '%' },
  { value: 98, label: 'Client Satisfaction', suffix: '%' },
];

const FloatingStats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="absolute left-0 right-0 bottom-32 z-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="relative overflow-hidden rounded-xl backdrop-blur-md bg-black/30 p-6 text-center group hover:bg-black/40 transition-all duration-300"
            style={{
              boxShadow: '0 0 20px rgba(0,0,0,0.3), inset 0 0 10px rgba(255,215,0,0.1)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
              className="relative text-3xl md:text-4xl font-bold text-[#FFD700] drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
            >
              <CountUp end={stat.value} suffix={stat.suffix} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
              className="relative text-sm md:text-base text-white mt-2 font-medium tracking-wider drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]"
            >
              {stat.label}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Counter animation component
const CountUp = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;
    const duration = 2000; // 2 seconds

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end]);

  return <>{count}{suffix}</>;
};

export default FloatingStats;
