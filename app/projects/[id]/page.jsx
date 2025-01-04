'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '../../components/header/header';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP, FaInstagram, FaArrowDown, FaArrowUp, FaChevronUp } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const projects = [
  {
    id: '1',
    title: 'PROJECT 1',
    description: `Our infrastructure development project showcases our commitment to building sustainable and efficient transportation solutions. This project involved the construction of a major highway overpass, demonstrating our expertise in large-scale infrastructure work.

    The project required careful planning and coordination with multiple stakeholders, including local government authorities and environmental agencies. We implemented innovative construction techniques to minimize disruption to existing traffic flow while maintaining the highest safety standards.`,
    images: [
      '/images/projects/infrastructure.jpg',
      '/images/projects/commercial.jpg',
      '/images/projects/residential.jpg',
      '/images/projects/industrial.jpg'
    ],
  },
  {
    id: '2',
    title: 'PROJECT 2',
    description: `This commercial construction project represents our vision for modern business spaces. The development includes state-of-the-art office facilities, retail spaces, and underground parking, all designed with sustainability in mind.

    Our team worked closely with architects and designers to create a space that combines functionality with aesthetic appeal. The project incorporates smart building technology and energy-efficient systems throughout.`,
    images: [
      '/images/projects/commercial.jpg',
      '/images/projects/infrastructure.jpg',
      '/images/projects/residential.jpg',
      '/images/projects/industrial.jpg'
    ],
  },
  {
    id: '3',
    title: 'PROJECT 3',
    description: `The residential complex project showcases our expertise in creating high-end living spaces. This multi-story development combines luxury amenities with sustainable living practices, setting new standards in residential construction.

    The project features a mix of apartment sizes, communal spaces, and recreational facilities. We implemented advanced construction techniques to ensure optimal space utilization and energy efficiency.`,
    images: [
      '/images/projects/residential.jpg',
      '/images/projects/infrastructure.jpg',
      '/images/projects/commercial.jpg',
      '/images/projects/industrial.jpg'
    ],
  },
  {
    id: '4',
    title: 'PROJECT 4',
    description: `This industrial development project demonstrates our capability to create modern manufacturing facilities. The project involved constructing a state-of-the-art industrial complex with advanced automation systems and efficient workflow design.

    We worked closely with industrial engineers to optimize the layout for maximum productivity while maintaining strict safety standards. The facility incorporates modern technology throughout its operations.`,
    images: [
      '/images/projects/industrial.jpg',
      '/images/projects/infrastructure.jpg',
      '/images/projects/commercial.jpg',
      '/images/projects/residential.jpg'
    ],
  }
];

const ProjectImageSlider = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      effect="fade"
      pagination={{ 
        clickable: true,
        dynamicBullets: true
      }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      className="w-full h-full rounded-xl shadow-2xl"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full group">
            <img
              src={image}
              alt={`Project Image ${index + 1}`}
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (isMobile) {
        setShowScrollToTop(scrollY > 300);
      } else {
        setShowScrollButton(scrollY < 200);
      }
    };

    checkMobile();
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  const scrollToProject = () => {
    const projectSection = document.getElementById('project-content');
    if (projectSection) {
      projectSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800">Project not found</h2>
          <Link href="/projects" className="mt-4 text-yellow-500 hover:text-yellow-600">
            Return to Projects
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      {/* Project Title Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img 
            src={project.images[0]} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div 
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {project.title}
          </motion.h1>
          <motion.div 
            className="w-32 h-1 bg-yellow-500 mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </motion.div>
      </div>

      {/* Floating Scroll Buttons */}
      <AnimatePresence>
        {mounted && (
          <>
            {/* Desktop Scroll Down Button */}
            {!isMobile && showScrollButton && (
              <motion.button
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                onClick={scrollToProject}
                className="fixed bottom-8 right-8 z-50 bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-400 transition-colors duration-300 hover:scale-110 transform"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaArrowDown className="text-xl animate-bounce" />
              </motion.button>
            )}

            {/* Mobile Back to Top Button */}
            {isMobile && showScrollToTop && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="fixed bottom-6 right-6 z-50 flex flex-col gap-2"
              >
                <motion.button
                  onClick={scrollToTop}
                  className="bg-yellow-500 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-yellow-400 transition-all duration-300"
                  whileTap={{ scale: 0.95 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                >
                  <FaChevronUp className="text-lg" />
                </motion.button>
                <div className="text-xs text-center text-gray-600 font-medium bg-white/80 px-2 py-1 rounded-full shadow-sm backdrop-blur-sm">
                  Back to top
                </div>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      {/* Project Content */}
      <div id="project-content" className="w-full px-4 py-24">
        <motion.div 
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Project Description */}
            <motion.div 
              className="prose max-w-none"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {project.description.split('\n').map((paragraph, index) => (
                <motion.p 
                  key={index} 
                  className="mb-6 text-gray-600 leading-relaxed text-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  {paragraph.trim()}
                </motion.p>
              ))}
              
              {/* Back Button and Social */}
              <motion.div 
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <Link 
                  href="/projects"
                  className="inline-block w-full px-8 py-4 bg-yellow-500 text-black font-semibold rounded-full text-center hover:bg-yellow-400 transition-all transform hover:scale-105 hover:shadow-lg"
                >
                  Back to Projects
                </Link>

                {/* Social Media Icons */}
                <div className="flex justify-center gap-4 mt-8">
                  {[FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP, FaInstagram].map((Icon, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center hover:bg-yellow-500 transition-all transform hover:scale-110"
                      whileHover={{ y: -3 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Project Image Slider */}
            <motion.div 
              className="relative h-[600px]"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ProjectImageSlider images={project.images} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
