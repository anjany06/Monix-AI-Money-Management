"use client";
import { featuresData } from "@/data/landing";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";

const Features = () => {
  const [visibleItems, setVisibleItems] = useState({});
  const featuresRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            //Extract the index from the data attribute
            const index = parseInt(entry.target.dataset.index);
            setVisibleItems((prev) => ({
              ...prev,
              [index]: true,
            }));
            // Unobserve the element after it becomes visible
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null, //Viewport
        rootMargin: "0px",
        threshold: 0.15, //Trigger when 15% of the element is visible
      }
    );

    //Get all feature cards
    const featureCards = document.querySelectorAll(".feature-card");
    featureCards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      // Cleanup the observer on component unmount
      featureCards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);
  return (
    <section id="features" className="py-5 md:py-15" ref={featuresRef}>
      <div className="container mx-auto px-4 md:px-20">
        <div
          className={`feature-card text-center mb-6 md:mb-16 transition-all duration-700 ease-out ${
            visibleItems[-1]
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-8"
          }`}
          data-index="-1"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">
            Powerful Features
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Monix helps you take control of your finances with these powerful
            tools and capabilities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <Card
              key={index}
              data-index={index}
              className={`feature-card backdrop-blur-md bg-white/5 border border-white/20 shadow-lg transition-all duration-700 ease-out ${
                visibleItems[index]
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="space-y-4 pt-4">
                {feature.icon}
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
