import React from 'react';
import { motion } from 'framer-motion';
import svgList from '../constants/icons';

const AnimatedCoding = () => {
  const doubledSvgList = [...svgList, ...svgList];

  return (
    <div className="w-full sm:h-[276px] h-fit relative flex justify-center items-center bg-transparent overflow-hidden">
      <div className="relative w-[360px] h-[360px] grid grid-cols-5 gap-4">
        {doubledSvgList.map((svg, index) => (
          <motion.div
            key={index}
            className="w-full h-full flex justify-center items-center"
            initial={{ y: 0 }}
            animate={{ y: -360 }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            <motion.div
              className="relative w-12 h-12"
              whileHover={{ 
                scale: 1.2, 
                rotate: 10,
                transition: { duration: 0.2 }
              }}
              whileTap={{ 
                scale: 0.8, 
                rotate: -10,
                transition: { duration: 0.2 }
              }}
            >
              <motion.img
                src={svg}
                alt={`Tech Icon ${index + 1}`}
                className="w-full h-full object-contain"
                style={{
                  filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.2))"
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCoding;