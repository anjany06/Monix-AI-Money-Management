"use client";
import React, { useState, useEffect } from "react";

const StatsGraph = () => {
  // Sample data
  const data = [105, 40, 120, 35, 25, 90, 30, 55];
  const maxValue = Math.max(...data);

  // Animation state
  const [animated, setAnimated] = useState(false);

  // Trigger animation after component mounts
  useEffect(() => {
    // Small delay before starting animation
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-4 h-full w-full">
      <h3 className="text-sm font-medium text-gray-300 mb-3">
        Monthly Spending
      </h3>
      <div className="flex items-end justify-between h-32 gap-1">
        {data.map((value, index) => (
          <div
            key={index}
            className="relative flex-1 flex flex-col items-center"
          >
            {/* Animated bar */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "0",
                width: "100%",
                height: animated ? `${(value / maxValue) * 500}%` : "0%",
                backgroundColor: "#33C3F0",
                border: "1px solid rgba(255,255,255,0.5)",
                boxShadow: "0 0 10px rgba(51,195,240,0.5)",
                borderRadius: "3px",
                zIndex: 10,
                transition: `height 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.1}s`,
              }}
            />
            <span className="text-xs text-gray-400 mt-1 relative z-20">
              {String.fromCharCode(65 + index)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGraph;
