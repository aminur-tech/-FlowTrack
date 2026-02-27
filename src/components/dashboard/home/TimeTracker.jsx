import React, { useState, useEffect } from "react";
import { Pause, Play, Square } from "lucide-react";

const TimeTracker = () => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(5048); // Matches your 01:24:08

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = (s) => {
    const h = Math.floor(s / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  return (
    <div className="relative overflow-hidden w-full max-w-[320px] bg-[#022c22] rounded-[2rem] p-7 shadow-2xl border border-white/5">
      
      {/* Wavy Background Pattern (matches image_351ac5.png) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full scale-150 rotate-12">
           <path fill="#10b981" d="M38.5,-66.2C50.1,-58.3,59.8,-47.9,67.6,-36C75.4,-24.2,81.4,-10.8,81.3,2.6C81.2,16.1,75,29.5,66.4,41.2C57.7,52.8,46.5,62.7,33.8,69.5C21.1,76.3,6.8,80,-7.7,79.5C-22.3,79,-37.1,74.3,-49.6,65.8C-62.1,57.3,-72.3,45,-77.9,30.9C-83.5,16.8,-84.6,0.9,-81,-13.7C-77.4,-28.4,-69.1,-41.8,-57.8,-50.3C-46.5,-58.8,-32.2,-62.4,-19.1,-67.2C-5.9,-72,6.1,-78,19.1,-78C32.1,-78,46,-72,38.5,-66.2Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="w-full text-left mb-6">
          <h3 className="text-white text-lg font-semibold tracking-wide">Time Tracker</h3>
        </div>

        {/* Timer Display */}
        <div className="mb-8">
          <span className="text-white text-5xl font-light tabular-nums tracking-tight">
            {formatTime(seconds)}
          </span>
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4">
          <button 
            onClick={() => setIsActive(!isActive)}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-[#064e3b] transition-transform active:scale-90 hover:bg-gray-100 shadow-lg"
          >
            {isActive ? <Pause size={28} fill="currentColor" stroke="none"/> : <Play size={28} className="ml-1" fill="currentColor" stroke="none" />}
          </button>
          
          <button 
            onClick={() => { setIsActive(false); setSeconds(0); }}
            className="w-14 h-14 flex items-center justify-center rounded-full bg-red-500 text-white transition-transform active:scale-90 hover:bg-red-600 shadow-lg"
          >
            <Square size={24} fill="currentColor" stroke="none" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker;