"use client";
import { statsData } from "@/data/landing";
import React, { useEffect, useRef, useState } from "react";

const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentValues, setCurrentValues] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);

  // Parse stats values to get numbers and formats
  const parsedStats = statsData.map((stat) => {
    // Special case for rating "4.9/5"
    if (stat.value.includes("/5")) {
      // Just get the number before "/5"
      const numericValue = parseFloat(stat.value.split("/")[0]);
      return { numericValue, prefix: "", suffix: "/5" };
    }

    // For all other cases, use the regular parsing
    let numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
    const prefix = stat.value.match(/^[^0-9]*/)[0] || "";
    const suffix = stat.value.replace(prefix, "").replace(/[0-9.]/g, "") || "";
    return { numericValue, prefix, suffix };
  });

  // Detect when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate the numbers when visible
  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    // Special case: For 4.9/5 rating, start from 4.0
    const startValues = parsedStats.map((stat, index) => {
      if (stat.suffix === "/5") {
        return 4.0; // Start from 4.0 for rating
      }
      return 0; // Start from 0 for all others
    });

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easing
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(1 - progress, 3);

      // Calculate current values
      const newValues = parsedStats.map((stat, index) => {
        if (stat.suffix === "/5") {
          // For rating, go from 4.0 to 4.9
          return 4 + 0.9 * easedProgress;
        }
        return stat.numericValue * easedProgress;
      });

      setCurrentValues(newValues);

      if (progress === 1) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Format the current values with prefixes and suffixes
  const formatValue = (value, index) => {
    const { prefix, suffix } = parsedStats[index];

    // For rating (4.9/5)
    if (suffix === "/5") {
      return `${value.toFixed(1)}${suffix}`;
    }

    // For percentages, show 1 decimal place
    if (suffix.includes("%")) {
      return `${prefix}${value.toFixed(1)}${suffix}`;
    }

    // For K+ and B+ values, show as integers
    return `${prefix}${Math.floor(value)}${suffix}`;
  };

  return (
    <section ref={sectionRef} className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="text-center"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.5s ease-out ${index * 100}ms`,
              }}
            >
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {isVisible ? formatValue(currentValues[index], index) : "0"}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
