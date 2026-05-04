"use client";
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  User,
  BarChart3,
  Lightbulb,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Create Account",
    description:
      "Get started in minutes with our simple and secure sign-up process.",
    icon: User,
  },
  {
    number: "02",
    title: "Track Your Spending",
    description:
      "Automatically categorize and track your transactions in real-time.",
    icon: BarChart3,
  },
  {
    number: "03",
    title: "Get Insights",
    description:
      "Receive AI-powered recommendations tailored to your spending habits.",
    icon: Lightbulb,
  },
  {
    number: "04",
    title: "Grow Your Wealth",
    description: "Track your progress and watch your financial health improve.",
    icon: TrendingUp,
  },
];

const HowItWorksSection = () => {
  //Tracking which elements are visible
  const [visibleItems, setVisibleItems] = useState({
    header: false,
    steps: [false, false, false, false],
    lines: [false, false, false],
  });

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          //when an element enters the viewport
          if (entry.isIntersecting) {
            const id = entry.target.dataset.id;

            // if it is header
            if (id === "header") {
              setVisibleItems((prevState) => ({
                ...prevState,
                header: true,
              }));
            }

            // if it is a step
            if (id && id.startsWith("step-")) {
              const stepIndex = parseInt(id.split("-")[1]);
              setVisibleItems((prevState) => {
                const newSteps = [...prevState.steps];
                newSteps[stepIndex] = true;

                //Also show the line connecting to the next step
                const newLines = [...prevState.lines];
                if (stepIndex < steps.length - 1) {
                  newLines[stepIndex] = true;
                }

                return {
                  ...prevState,
                  steps: newSteps,
                  lines: newLines,
                };
              });
            }

            //Stop observing the element after it has been shown
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
      }
    );

    // Observe the header
    const headerElement = document.querySelector("[data-id='header']");
    if (headerElement) {
      observer.observe(headerElement);
    }

    // Observe each step
    const stepElements = document.querySelectorAll("[data-id^='step-']");
    stepElements.forEach((el) => observer.observe(el));

    // Clean up the observer on component unmount
    return () => {
      if (headerElement) {
        observer.unobserve(headerElement);
      }
      stepElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      id="how-it-works"
      className="py-24 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background effects removed */}

      <div className="container mx-auto px-4 md:px-20 relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-700 ease-out ${visibleItems.header
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
            }`}
          data-id="header"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">
            How MoniX Works
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Getting started with Monix is easy. Follow these simple steps to
            begin your financial journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative perspective-1000">
                {/* Enhanced Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 left-[calc(100%+1rem)] w-8 h-0.5 items-center justify-center z-20">
                    <div
                      className={`w-full h-px bg-gradient-to-r from-primary/60 via-primary/40 to-transparent transition-all duration-700 ${visibleItems.lines[index]
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0"
                        }`}
                    ></div>
                    <ArrowRight
                      className={`absolute right-0 w-4 h-4 text-primary/70 transition-all duration-500 ${visibleItems.lines[index]
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2"
                        }`}
                      style={{ transitionDelay: `${index * 200 + 400}ms` }}
                    />
                  </div>
                )}

                <div
                  className={`step-card-3d h-full transform-gpu transition-all duration-700 ease-out ${visibleItems.steps[index]
                      ? "opacity-100 translate-y-0 rotate-x-0"
                      : "opacity-0 translate-y-20 rotate-x-12"
                    }`}
                  style={{
                    transitionDelay: `${index * 200}ms`,
                    transformStyle: "preserve-3d",
                  }}
                  data-id={`step-${index}`}
                >
                  <Card className="relative h-full backdrop-blur-md bg-white/5 border border-white/20 shadow-lg transition-all duration-500 overflow-hidden">
                    <CardHeader className="relative z-10 text-center pb-6 pt-8">
                      {/* Icon Container with subtle 3D depth */}
                      <div className="relative mx-auto mb-6 w-16 h-16 group">
                        <div className="w-16 h-16 rounded-xl bg-blue-600 border-b-4 border-blue-800 shadow-[0_5px_15px_rgba(0,0,0,0.25)] flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1 transform-gpu">
                          <IconComponent className="w-7 h-7 text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110" />
                        </div>

                        {/* Step number overlay */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 border-2 border-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-md">
                          {step.number}
                        </div>
                      </div>

                      <CardTitle className="text-lg font-semibold text-white transition-colors duration-300">
                        {step.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="relative z-10 text-center pt-0 pb-8 px-6">
                      <p className="text-white/70 text-sm leading-relaxed transition-colors duration-300">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional floating elements for depth */}
        <div className="absolute top-20 right-10 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 left-16 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-8 w-1.5 h-1.5 bg-blue-400/35 rounded-full animate-pulse delay-500"></div>
      </div>
    </section>
  );
};

export default HowItWorksSection;