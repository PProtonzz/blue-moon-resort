import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';

const TARGET_DATE = new Date('2026-04-23T00:00:00+05:30'); // April 23, 2026, 00:00 IST

const Digit = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center mx-1 sm:mx-2 pointer-events-auto group">
      <motion.div 
        className="glass-card w-16 h-20 sm:w-24 sm:h-28 flex items-center justify-center relative overflow-hidden border-t-blue-400/30"
        whileHover={{ y: -5, boxShadow: '0 0 25px rgba(96, 165, 250, 0.6)', scale: 1.05 }}
        initial={{ opacity: 0, rotateX: 45, y: 50 }}
        animate={{ opacity: 1, rotateX: 0, y: 0 }}
        transition={{ duration: 1.2, type: 'spring', bounce: 0.4 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-400/20 to-transparent opacity-50"></div>
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: 30, scale: 0.5, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, scale: 1.5, filter: "blur(8px)" }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 120, damping: 15 }}
            className="text-4xl sm:text-5xl font-bold text-white text-glow block relative z-10 font-[Inter]"
          >
            {value.toString().padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </motion.div>
      <span className="mt-3 text-xs sm:text-[13px] tracking-[0.25em] text-blue-200/80 uppercase font-medium group-hover:text-white transition-colors duration-300">
        {label}
      </span>
    </div>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      if (now >= TARGET_DATE) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: differenceInDays(TARGET_DATE, now),
        hours: differenceInHours(TARGET_DATE, now) % 24,
        minutes: differenceInMinutes(TARGET_DATE, now) % 60,
        seconds: differenceInSeconds(TARGET_DATE, now) % 60
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-start items-center mt-8 sm:mt-12">
      <Digit value={timeLeft.days} label="Days" />
      <span className="text-3xl text-blue-300/50 mb-6">:</span>
      <Digit value={timeLeft.hours} label="Hours" />
      <span className="text-3xl text-blue-300/50 mb-6">:</span>
      <Digit value={timeLeft.minutes} label="Mins" />
      <span className="text-3xl text-blue-300/50 mb-6">:</span>
      <Digit value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

export default Countdown;
