import React, { useState, useRef } from 'react';

const RotaryDial = () => {
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const dialSize = 220;
  const numbers = [7, 6, 5, 4, 3, 2, 1, 0, 9, 8];

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startY.current = e.clientY;
    setIsAnimating(false);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const deltaY = startY.current - e.clientY;
    const newRotation = Math.min(Math.max(deltaY * 2, -150), 0);
    setRotation(newRotation);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    setIsAnimating(true);
    setRotation(0);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    isDragging.current = true;
    startY.current = e.touches[0].clientY;
    setIsAnimating(false);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isDragging.current) return;
    const deltaY = startY.current - e.touches[0].clientY;
    const newRotation = Math.min(Math.max(deltaY * 2, -150), 0);
    setRotation(newRotation);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    setIsAnimating(true);
    setRotation(0);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('isafwansayeed@gmail.com');
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        .rotary-dial-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          touch-action: none; /* Prevents default touch actions */
        }
        .rotary-dial {
          position: relative;
          border-radius: 50%;
          background: #34495e;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          cursor: pointer;
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: center;
          touch-action: none;
        }
        .center-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #e74c3c;
          z-index: 2;
        }
        .finger-wheel {
          position: left;
          top: 35%;
          left: 90%;
          transform: translateX(-50%);
          width: 80px;
          height: 20px;
          background: #7f8c8d;
          border-radius: 10px;
          z-index: 3;
        }
        .number {
          position: absolute;
          color: #ecf0f1;
          font-size: 1.4rem;
          font-weight: bold;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-origin: center;
        }
        .copy-container {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          margin-top: 1rem;
          padding: 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          transition: background 0.3s;
        }
        .copy-container:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .copy-text {
          color: #ecf0f1;
          font-size: 1rem;
          font-weight: bold;
        }
        @media (max-width: 768px) {
          .rotary-dial {
            width: 200px !important;
            height: 200px !important;
          }
          .number {
            font-size: 1.2rem;
          }
        }
      `}</style>

      <div className="rotary-dial-container">
        <div
          className="rotary-dial"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isAnimating ? 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
            width: dialSize,
            height: dialSize,
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="center-circle" />
          <div className="finger-wheel" />
          {numbers.map((num, index) => {
            const angle = (index * 36) - 90;
            const radius = dialSize / 2 - 35;
            return (
              <div
                key={num}
                className="number"
                style={{
                  transform: `
                    rotate(${angle}deg) 
                    translate(${radius}px) 
                    rotate(${-angle}deg)
                  `,
                }}
              >
                {num}
              </div>
            );
          })}
        </div>

        <div className="copy-container" onClick={handleCopy}>
          <svg 
            className="w-6 h-6" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            {hasCopied ? (
              <path 
                d="M20 6L9 17l-5-5" 
                stroke="#4CAF50"
              />
            ) : (
              <path 
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" 
                stroke="#ecf0f1"
              />
            )}
          </svg>
          <span className="copy-text">isafwansayeed@gmail.com</span>
        </div>
      </div>
    </>
  );
};

export default RotaryDial;