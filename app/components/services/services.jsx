'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const servicesData = [
  {
    title: 'Preconstruction Planning',
    description: 'Comprehensive planning and strategic analysis to ensure project success from inception. We focus on cost estimation, scheduling, and risk assessment.',
    image: '/images/services/preconstruction.jpg'
  },
  {
    title: 'Architectural Modelling',
    description: 'State-of-the-art 3D modeling and visualization services utilizing advanced BIM technology for precise and detailed architectural designs.',
    image: '/images/services/architectural.jpg'
  },
  {
    title: 'Construction Management',
    description: 'Expert project oversight and coordination ensuring timely delivery, quality standards, and efficient resource management throughout construction.',
    image: '/images/services/construction-management.jpg'
  }
];

const Services = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-20px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1,
        duration: 0.3
      },
    },
  };

  return (
    <section id="services" className="relative w-full py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-48 -right-48 w-96 h-96 bg-yellow-100/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="mb-16 sm:mb-24 text-center max-w-3xl mx-auto"
        >
          <span className="text-sm font-semibold tracking-wider text-yellow-500 uppercase mb-3 block">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 text-[#1B2431] uppercase tracking-wide">
            Services
          </h2>
          <motion.div 
            className="w-24 h-1 bg-[#FFD700] mx-auto mb-6"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 96, opacity: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: 0.1,
              ease: "easeOut"
            }}
          />
          <p className="text-gray-600 text-lg leading-relaxed">
            Delivering excellence in construction through innovative solutions and unparalleled expertise
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          ref={containerRef}
          style={{ opacity }}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="bg-white overflow-hidden group rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative h-52 overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-8">
                <h3 className="text-xl font-bold mb-4 text-[#1B2431] group-hover:text-yellow-500 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center">
                  <motion.div
                    className="w-12 h-[2px] bg-yellow-500 mr-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                  <span className="text-sm font-semibold text-yellow-500 uppercase tracking-wider">
                    Learn More
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
