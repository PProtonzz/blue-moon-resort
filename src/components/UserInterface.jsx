import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Volume2, VolumeX } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';
import Countdown from './Countdown';

const SocialIcon = ({ Icon, href, delay = 0 }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 rounded-full glassmorphism flex items-center justify-center text-white/70 pointer-events-auto shadow-lg relative overflow-hidden group"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay, type: "spring", stiffness: 100 }}
    whileHover={{ 
      scale: 1.15, 
      color: "white",
      boxShadow: "0 0 20px rgba(96, 165, 250, 0.6)",
      y: -5
    }}
    whileTap={{ scale: 0.9 }}
  >
    {/* Hover highlight layer */}
    <div className="absolute inset-0 bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <Icon size={20} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
  </motion.a>
);

const AlwaysVisibleMap = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 1 }}
      className="flex flex-col gap-3 pointer-events-auto"
    >
      <div className="glass-card w-[280px] h-[160px] overflow-hidden border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.3)] group cursor-pointer relative">
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
        <iframe 
          src="https://maps.google.com/maps?q=Blue+Moon+Resort,+Amravati,+Maharashtra,+India&t=k&z=14&ie=UTF8&iwloc=&output=embed" 
          className="w-full h-full border-0 grayscale-[30%] contrast-[1.1] opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
          title="Location Map"
        ></iframe>
      </div>
      
      <div className="flex items-center gap-2 text-white/80 transition-colors cursor-default">
        <MapPin size={18} className="text-blue-400 drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]" />
        <span className="text-sm font-light tracking-wider">Reosa Road, Amravati, Maharashtra 444602</span>
      </div>
    </motion.div>
  );
};

const UserInterface = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="w-full h-full flex flex-col justify-between p-6 sm:p-10 absolute inset-0 z-10 pointer-events-none">
      
      {/* Top Header (Volume Control Only) */}
      <header className="flex justify-end items-start w-full pointer-events-auto">
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="glassmorphism p-3 rounded-full hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <VolumeX size={20} className="text-white/80" /> : <Volume2 size={20} className="text-white/80" />}
        </motion.button>
      </header>

      {/* Main Center Content */}
      <main className="flex flex-col items-center md:items-start justify-center w-full max-w-7xl mx-auto flex-1 md:pl-10 relative">
        
        {/* Massive Logo -> Left on MD+ */}
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="mb-8 sm:mb-10 pointer-events-auto z-20 relative flex items-center justify-center md:justify-start group"
        >
          {/* Subtle glow (rim light style) */}
          <div className="absolute inset-0 bg-white/20 blur-[30px] rounded-full scale-110 pointer-events-none transition-all duration-1000 group-hover:bg-white/40" />
          
          <img 
            src="/logo.png" 
            alt="Blue Moon Logo" 
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 object-contain filter brightness-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] relative z-10" 
            onError={(e) => e.target.style.display='none'} 
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center md:text-left w-full"
        >
          <p className="text-blue-200/50 uppercase tracking-[0.4em] text-[9px] sm:text-[10px] mb-5 font-semibold">
            A New Era of Luxury is Arriving in Your Amravati
          </p>
          <div className="flex flex-col gap-0 mb-10">
            <h1 className="text-6xl sm:text-8xl md:text-[9rem] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-blue-400 tracking-tight leading-none text-glow drop-shadow-[0_10px_30px_rgba(37,99,235,0.3)]">
              Blue Moon
            </h1>
            <h1 className="text-4xl sm:text-6xl md:text-[5rem] font-light text-blue-100/70 tracking-[0.15em] uppercase leading-none mt-2 drop-shadow-md italic">
              Resort
            </h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full relative z-10 flex justify-center md:justify-start -ml-2"
        >
          <Countdown />
        </motion.div>
        
        {/* REFINED LAUNCHING TEXT */}
        <motion.div
          initial={{ opacity: 0, opacity: 0 }}
          animate={{ opacity: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
          className="mt-12 md:mt-16 w-full flex justify-center md:justify-start"
        >
          <div className="glass-card px-8 py-3 sm:py-4 border-white/10 bg-white/5 inline-flex items-center gap-4 hover:bg-white/10 transition-colors duration-500">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shadow-[0_0_10px_rgba(96,165,250,1)]" />
            <h2 className="text-sm sm:text-lg md:text-xl uppercase tracking-[0.3em] font-medium text-white/90">
              Launching 23 April 2026
            </h2>
          </div>
        </motion.div>
      </main>

      {/* Footer / Bottom Anchored Elements */}
      <footer className="flex flex-col md:flex-row justify-between items-end w-full gap-8 mt-auto pt-6">
        
        {/* Bottom Left: Map */}
        <AlwaysVisibleMap />

        {/* Bottom Right: Smooth Social Icons */}
        <div className="flex gap-4 md:mb-2 pointer-events-none">
          <SocialIcon Icon={FaInstagram} href="#" delay={1.1} />
          <SocialIcon Icon={FaFacebookF} href="#" delay={1.2} />
          <SocialIcon Icon={FaYoutube} href="#" delay={1.3} />
        </div>
      </footer>

    </div>
  );
};

export default UserInterface;
