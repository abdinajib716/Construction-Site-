'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    id: '1',
    title: 'PROJECT 1',
    image: '/images/projects/infrastructure.jpg',
    blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...' // Add your blur data URL
  },
  {
    id: '2',
    title: 'PROJECT 2',
    image: '/images/projects/commercial.jpg',
    blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'
  },
  {
    id: '3',
    title: 'PROJECT 3',
    image: '/images/projects/residential.jpg',
    blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'
  },
  {
    id: '4',
    title: 'PROJECT 4',
    image: '/images/projects/industrial.jpg',
    blurDataUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'
  }
];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "100px" });
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = useCallback(() => {
    setIsImageLoaded(true);
  }, []);

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative w-full aspect-[4/3] overflow-hidden rounded-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/projects/${project.id}`} className="block w-full h-full">
        <div className="relative w-full h-full group">
          {/* Optimized Image Loading */}
          <div className="relative w-full h-full">
            <Image
              ref={imageRef}
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`
                object-cover transition-all duration-700
                ${isImageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
              `}
              loading="lazy"
              quality={75}
              placeholder="blur"
              blurDataURL={project.blurDataUrl}
              onLoad={handleImageLoad}
            />
          </div>

          {/* Overlay */}
          <motion.div 
            className="absolute inset-0 bg-black/50 flex items-center justify-center p-4"
            animate={{
              opacity: isHovered ? 0.7 : 0.4,
              backdropFilter: isHovered ? 'blur(4px)' : 'blur(0px)'
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.h3 
              className="text-white text-xl font-semibold text-center"
              animate={{
                y: isHovered ? 0 : 5,
                scale: isHovered ? 1.1 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              {project.title}
            </motion.h3>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
};

const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section id="projects" className="w-full py-20 bg-white" ref={containerRef}>
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity, scale }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
