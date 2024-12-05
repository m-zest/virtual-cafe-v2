import React from 'react';
import { motion } from 'framer-motion';

interface RoomBackgroundProps {
  imageUrl: string;
  children: React.ReactNode;
}

export default function RoomBackground({ imageUrl, children }: RoomBackgroundProps) {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="fixed inset-0 w-full h-full"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80 backdrop-blur-sm" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}