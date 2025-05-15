import React from "react";

const FinanceCard = ({
  title,
  value,
  trend,
  trendIcon,
  className = "",
  delay = "animate-delay-100",
  floatingAnimation,
}) => {
  return (
    <div
      className={`glass rounded-lg p-4 ${className} animate-fade-in ${delay}  ${floatingAnimation}`}
    >
      <h3 className="text-sm font-medium text-gray-300 mb-1">{title}</h3>
      <div className="flex items-end justify-between">
        <p className="text-xl font-semibold text-white">{value}</p>
        {trend && (
          <div
            className={`flex items-center text-sm ${trend.startsWith("+") ? "text-green-400" : "text-red-400"}`}
          >
            {trendIcon}
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinanceCard;
