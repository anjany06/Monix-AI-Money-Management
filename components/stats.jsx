"use client";
import { statsData } from "@/data/landing";
import React, { use, useRef, useState } from "react";

const StatsSection = () => {
  const [visible, setVisible] = useState(false);
  const [currentValues, setCurrentValues] = useState([0, 0, 0, 0]);
  const sectionRef = useRef(null);

  //Parsing Data values to get numbers and formats
  const parsedStats = statsData.map((stat) => {
    //special case for rating "4.9/5"
    if (stat.value.includes("/5")) {
      //Just get the number before "/5"
      const numericValue = parseFloat(stat.value.split("/")[0]);
      return { numericValue, prefix: "", suffix: "/5" };
    }
    //For all other cases, just get the number
    let numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ""));
    const prefix = stat.value.match(/[^0-9.]+/g)?.[0] || "";
    const suffix = stat.value.replace(prefix, "").replace(/[0-9.]/g, "") || "";
    return { numericValue, prefix, suffix };
  });

  //Detect when the section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
      }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  //animate the numbers when visible
  useEffect(() => {
    if (!visible) return;

    const duration = 2000; //2 secnds
    const startTime = Date.now();

    //Special case for 4.9/5 rating, starts from 4.0
    const startedValues = parsedStats.map((stat, index) => {
      if (stat.suffix === "/5") {
        return 4.0; //Start for 4.0 for rating
      }
      return 0; //for others
    });
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth easing
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(1 - progress, 3);

      //Calculate current values
      const newValues = parsedStats.map((stat, index) => {
        if (stat.suffix === "/5") {
          //for rating, go from 4.0 to 4.9
          return 4 + 0.9 * easedProgress;
        }
        return stat.numericValue * easedProgress;
      });
      setCurrentValues(newValues);

      if (progress === 1) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [visible]);

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
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
