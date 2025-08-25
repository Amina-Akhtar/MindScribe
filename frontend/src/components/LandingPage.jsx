import React from 'react'
import { motion } from 'framer-motion'
import Background from './Background';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8f5fd] flex flex-col items-center justify-center px-6 py-8">
  <Background />
        <motion.div 
          className="flex flex-col items-center"
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-[#5d4a7a] mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            MindScribe
          </motion.h1>
          <motion.div 
            className="w-40 h-1 bg-[#b3a0d9] rounded-full my-4"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          />
        </motion.div>

        <motion.h3 
          className="text-xl md:text-2xl text-[#6a6a6a] leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
        Journal your moments, express your ideas, start meaningful threads. Keep it personal or share with the world
        </motion.h3>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button 
            className="px-8 py-3 bg-[#b3a0d9] text-white rounded-full font-medium hover:bg-[#9c89c0] transition-all shadow-sm hover:shadow-md"
            whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(179, 160, 217, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/signin')}
          >
            Get Started
          </motion.button>
        </motion.div>
        </div>
  )
}

export default LandingPage