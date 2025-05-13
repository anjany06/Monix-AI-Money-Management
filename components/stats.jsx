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
