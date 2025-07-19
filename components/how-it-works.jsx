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
    accentColor: "from-blue-500 to-cyan-500",
    glowColor: "blue-500", // For glow effects
  },
  {
    number: "02",
    title: "Track Your Spending",
    description:
      "Automatically categorize and track your transactions in real-time.",
    icon: BarChart3,
    accentColor: "from-emerald-500 to-teal-500",
    glowColor: "emerald-500",
  },
  {
    number: "03",
    title: "Get Insights",
    description:
      "Receive AI-powered recommendations tailored to your spending habits.",
    icon: Lightbulb,
    accentColor: "from-yellow-500 to-orange-500",
    glowColor: "yellow-500",
  },
  {
    number: "04",
    title: "Grow Your Wealth",
    description: "Track your progress and watch your financial health improve.",
    icon: TrendingUp,
    accentColor: "from-purple-500 to-pink-500",
    glowColor: "purple-500",
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
      {/* Enhanced background effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-indigo-600 rounded-full opacity-15 blur-[100px]"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-20 relative z-10">
        <div
          className={`text-center mb-20 transition-all duration-700 ease-out ${
            visibleItems.header
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
              <div key={index} className="relative group perspective-1000">
                {/* Enhanced Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 left-[calc(100%+1rem)] w-8 h-0.5 items-center justify-center z-20">
                    <div
                      className={`w-full h-px bg-gradient-to-r from-primary/60 via-primary/40 to-transparent transition-all duration-700 ${
                        visibleItems.lines[index]
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0"
                      }`}
                    ></div>
                    <ArrowRight
                      className={`absolute right-0 w-4 h-4 text-primary/70 transition-all duration-500 ${
                        visibleItems.lines[index]
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2"
                      }`}
                      style={{ transitionDelay: `${index * 200 + 400}ms` }}
                    />
                  </div>
                )}

                <div
                  className={`step-card-3d h-full transform-gpu transition-all duration-700 ease-out ${
                    visibleItems.steps[index]
                      ? "opacity-100 translate-y-0 rotate-x-0"
                      : "opacity-0 translate-y-20 rotate-x-12"
                  }`}
                  style={{
                    transitionDelay: `${index * 200}ms`,
                    transformStyle: "preserve-3d",
                  }}
                  data-id={`step-${index}`}
                >
                  <Card className="relative h-full backdrop-blur-md bg-white/5 border border-white/20 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-500 overflow-hidden">
                    {/* Hover background glow with native color */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.accentColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`}
                    ></div>

                    {/* Enhanced border glow on hover */}
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.accentColor} opacity-0 group-hover:opacity-20 blur-sm scale-105 transition-opacity duration-500`}
                    ></div>

                    <CardHeader className="relative z-10 text-center pb-6 pt-8">
                      {/* Icon Container with colorful background and enhanced glow */}
                      <div className="relative mx-auto mb-6">
                        {/* Outer glow effect */}
                        <div
                          className={`absolute inset-0 w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${step.accentColor} opacity-0 group-hover:opacity-40 blur-lg scale-125 transition-all duration-500`}
                        ></div>

                        <div
                          className={`relative w-16 h-16 mx-auto rounded-xl bg-gradient-to-br ${step.accentColor} p-0.5 shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}
                          style={{
                            filter: `drop-shadow(0 0 10px ${
                              step.glowColor === "blue-500"
                                ? "#3b82f6"
                                : step.glowColor === "emerald-500"
                                  ? "#10b981"
                                  : step.glowColor === "yellow-500"
                                    ? "#eab308"
                                    : "#a855f7"
                            }40)`,
                            transition: "all 0.5s ease",
                          }}
                        >
                          <div className="w-full h-full rounded-xl bg-gray-900/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-gray-900/60 transition-colors duration-500">
                            <IconComponent className="w-7 h-7 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                          </div>
                        </div>

                        {/* Step number overlay with matching glow */}
                        <div
                          className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br ${step.accentColor} flex items-center justify-center text-xs font-bold text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}
                          style={{
                            filter: `drop-shadow(0 0 8px ${
                              step.glowColor === "blue-500"
                                ? "#3b82f6"
                                : step.glowColor === "emerald-500"
                                  ? "#10b981"
                                  : step.glowColor === "yellow-500"
                                    ? "#eab308"
                                    : "#a855f7"
                            }60)`,
                          }}
                        >
                          {step.number}
                        </div>
                      </div>

                      <CardTitle className="text-lg font-semibold text-white group-hover:text-primary transition-colors duration-300">
                        {step.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="relative z-10 text-center pt-0 pb-8 px-6">
                      <p className="text-white/70 text-sm leading-relaxed group-hover:text-white/85 transition-colors duration-300">
                        {step.description}
                      </p>
                    </CardContent>

                    {/* Bottom accent line with native color */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-${step.glowColor}/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    ></div>
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
