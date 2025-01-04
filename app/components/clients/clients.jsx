'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaBuilding, FaHotel, FaIndustry, FaWarehouse, FaLandmark } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';

const clients = [
  {
    name: 'TIPOX',
    icon: <FaBuilding className="text-3xl md:text-4xl text-yellow-500 group-hover:text-yellow-400 transition-all duration-300 transform group-hover:scale-110" />,
    description: 'Leading Commercial Development'
  },
  {
    name: 'EXCIPIA',
    icon: <FaIndustry className="text-3xl md:text-4xl text-yellow-500 group-hover:text-yellow-400 transition-all duration-300 transform group-hover:scale-110" />,
    description: 'Industrial Solutions Provider'
  },
  {
    name: 'Vide',
    icon: <FaWarehouse className="text-3xl md:text-4xl text-yellow-500 group-hover:text-yellow-400 transition-all duration-300 transform group-hover:scale-110" />,
    description: 'Warehouse & Distribution'
  },
  {
    name: 'DEHOTEL',
    icon: <FaHotel className="text-3xl md:text-4xl text-yellow-500 group-hover:text-yellow-400 transition-all duration-300 transform group-hover:scale-110" />,
    description: 'Luxury Hotel Chain'
  },
  {
    name: 'UMBER & CO',
    icon: <FaLandmark className="text-3xl md:text-4xl text-yellow-500 group-hover:text-yellow-400 transition-all duration-300 transform group-hover:scale-110" />,
    description: 'Real Estate Development'
  }
];

const Clients = () => {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden w-full"
    >
      {mounted && (
        <>
          {/* Background Decorations */}
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
        </>
      )}

      <motion.div 
        className="relative w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity: mounted ? opacity : 0, scale: mounted ? scale : 0.8 }}
      >
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.span 
            className="text-sm font-semibold tracking-wider text-yellow-500 uppercase mb-3 block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Trusted Partners
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B2431] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Our Clients
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-yellow-500 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 max-w-[2000px] mx-auto">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <motion.div 
                className="relative bg-white rounded-xl shadow-lg p-6 text-center h-full backdrop-blur-sm bg-white/50"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-gray-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10">
                  <motion.div 
                    className="mb-6 flex justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  >
                    {client.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-lg font-bold text-gray-800 mb-3"
                    whileHover={{ scale: 1.05 }}
                  >
                    {client.name}
                  </motion.h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {client.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Clients;
