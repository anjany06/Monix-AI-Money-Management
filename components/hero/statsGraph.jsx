import React from "react";

const StatsGraph = () => {
  // Sample data
  const data = [15, 40, 20, 35, 25, 42, 30, 45];
  const maxValue = Math.max(...data);

  return (
    <div className="glass rounded-lg p-4 h-full w-full animate-fade-in animate-delay-300">
      <h3 className="text-sm font-medium text-gray-300 mb-3">
        Monthly Spending
      </h3>
      <div className="flex items-end justify-between h-32 gap-1">
        {data.map((value, index) => (
          <div
            key={index}
            className="relative flex-1 flex flex-col items-center"
          >
            <div
              className="w-full bg-gradient-to-t from-cyan-500/30 to-blue-500/50 rounded-sm animate-pulse-slow"
              style={{
                height: `${(value / maxValue) * 100}%`,
                animationDelay: `${index * 0.1}s`,
              }}
            />
            <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-cyan-500/0 to-cyan-500/0 hover:from-cyan-400/20 hover:to-cyan-500/30 transition-all duration-300 rounded-sm" />
            <span className="text-xs text-gray-400 mt-1">
              {String.fromCharCode(65 + index)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsGraph;
