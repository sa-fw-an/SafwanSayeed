/* eslint-disable react/display-name */
import React from 'react';
import { motion } from 'framer-motion';
import svgList from '../constants/icons';

// Memoized icon component to prevent unnecessary re-renders
const Icon = React.memo(({ svg, index }) => (
  <motion.div
    className="relative w-8 h-8 sm:w-12 sm:h-12"
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
    <img
      src={svg}
      alt={`Tech Icon ${index + 1}`}
      className="w-full h-full object-contain"
      style={{
        filter: "drop-shadow(0 0 2px rgba(0, 0, 0, 0.2))",
        willChange: "transform"
      }}
    />
  </motion.div>
));

const AnimatedCoding = () => {
  const SVGS_PER_ROW = 5;
  const ROW_HEIGHT = 64;
  const rows = Math.ceil(svgList.length / SVGS_PER_ROW);
  const contentHeight = rows * ROW_HEIGHT;
  const animationDuration = contentHeight / 12;

  const doubledSvgList = React.useMemo(() => [...svgList, ...svgList], []);

  return (
    <div className="w-full h-[276px] relative flex justify-center items-center bg-transparent overflow-hidden">
      <motion.div
        className="relative w-full max-w-[360px] h-full grid grid-cols-5 gap-4"
        initial={{ y: 0 }}
        animate={{ y: -contentHeight }}
        transition={{ 
          duration: animationDuration,
          repeat: Infinity,
          ease: 'linear'
        }}
        style={{ willChange: 'transform' }}
      >
        {doubledSvgList.map((svg, index) => (
          <div
            key={`${index}-${svg}`} // Unique key combining index and SVG path
            className="w-full h-full flex justify-center items-center"
          >
            <Icon svg={svg} index={index} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AnimatedCoding;