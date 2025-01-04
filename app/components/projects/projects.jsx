'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <Link 
        href={`/projects/${project.id}`}
        className="group relative block bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        {/* Project Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Project Info - Centered */}
          <motion.div 
            className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 z-10 p-6"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h3 
              className="text-xl font-bold text-white mb-3"
              initial={{ y: 20 }}
              whileHover={{ y: 0 }}
            >
              {project.title}
            </motion.h3>
            <motion.p 
              className="text-sm text-gray-200 text-center max-w-xs"
              initial={{ y: 20 }}
              whileHover={{ y: 0 }}
            >
              {project.description}
            </motion.p>
            <motion.button
              className="mt-4 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-full opacity-0 group-hover:opacity-100 hover:bg-yellow-400 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Project
            </motion.button>
          </motion.div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <motion.span 
              className="inline-block px-3 py-1 bg-yellow-500 text-black text-sm font-semibold rounded-full"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {project.category}
            </motion.span>
          </div>

          {/* Project Number */}
          <motion.div 
            className="absolute bottom-4 right-4 text-2xl font-bold text-white"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {project.id.padStart(2, '0')}
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  const projects = [
    {
      id: '1',
      title: 'Infrastructure Development',
      description: 'Major highway overpass construction showcasing our infrastructure capabilities',
      image: '/images/projects/infrastructure.jpg',
      category: 'Infrastructure'
    },
    {
      id: '2',
      title: 'Commercial Construction',
      description: 'Large-scale commercial building development with modern safety standards',
      image: '/images/projects/commercial.jpg',
      category: 'Commercial'
    },
    {
      id: '3',
      title: 'Residential Complex',
      description: 'Multi-story residential complex with state-of-the-art facilities',
      image: '/images/projects/residential.jpg',
      category: 'Residential'
    },
    {
      id: '4',
      title: 'Industrial Development',
      description: 'Industrial facility construction with advanced technological integration',
      image: '/images/projects/industrial.jpg',
      category: 'Industrial'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="relative py-24 sm:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
    >
      {/* Background Decoration */}
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

      {/* Content Container */}
      <motion.div 
        className="relative w-full px-4"
        style={{ opacity, scale }}
      >
        {/* Section Title */}
        <div className="text-center mb-16">
          <motion.span 
            className="text-sm font-semibold tracking-wider text-yellow-500 uppercase mb-3 block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Portfolio
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1B2431] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            className="w-24 h-1 bg-yellow-500 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <motion.p 
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Discover our most impactful projects that showcase our expertise in construction and development.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-[1920px] mx-auto px-4">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-6 mt-12">
          <motion.button 
            className="w-12 h-12 rounded-full border-2 border-yellow-500 flex items-center justify-center text-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>
          <motion.button 
            className="w-12 h-12 rounded-full border-2 border-yellow-500 flex items-center justify-center text-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            →
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
