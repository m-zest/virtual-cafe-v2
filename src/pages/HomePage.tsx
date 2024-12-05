import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
        style={{ filter: 'brightness(0.4)' }}
      >
        <source
          src="/cover.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <motion.div 
        className="relative z-10 text-center text-white px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex items-center justify-center mb-6"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Coffee className="w-16 h-16 text-indigo-400" />
        </motion.div>
        <h1 className="text-6xl font-bold mb-6 tracking-tight">
          Virtual Café
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
          Experience unique themed rooms from around the world. Join us for drinks,
          conversations, and cultural experiences in our virtual spaces.
        </p>
        <motion.button
          onClick={() => navigate('/rooms')}
          className="group bg-white text-gray-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Enter Café
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
      </motion.div>

      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
    </div>
  );
}