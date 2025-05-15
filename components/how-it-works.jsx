"use client";
import React, { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Create Account",
    description:
      "Get started in minutes with our simple and secure sign-up process.",
  },
  {
    number: "02",
    title: "Track Your Spending",
    description:
      "Automatically categorize and track your transactions in real-time.",
  },
  {
    number: "03",
    title: "Get Insights",
    description:
      "Receive AI-powered recommendations tailored to your spending habits.",
  },
  {
    number: "04",
    title: "Grow Your Wealth",
    description: "Track your progress and watch your financial health improve.",
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

                //Also show the line connecting to the next step of this right
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
        rooMargin: "0px",
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
    <section id="how-it-works" className="py-24 relative" ref={sectionRef}>
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-indigo-600 rounded-full opacity-15 blur-[100px]"></div>

      <div className="container mx-auto px-4 md:px-20">
        <div
          className={`text-center mb-16 transform-all duration-700 ease-out ${
            visibleItems.header
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10"
          }`}
          data-id="header"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">
            How <span className="text-cyan-400">MoniX</span> Works
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Getting started with Monix is easy. Follow these simple steps to
            begin your financial journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {index < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-14 left-[calc(50%+40px)] h-0.5 bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2] origin-left transition-all duration-1000 ease-out"
                  style={{
                    width: visibleItems.lines[index]
                      ? "calc(100% - 80px)"
                      : "0%",
                    transitionDelay: `${index * 200 + 300}ms`,
                  }}
                ></div>
              )}

              <div
                className={`text-center relative z-10 transition-all duration-700 ease-out ${
                  visibleItems.steps[index]
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-16"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                data-id={`step-${index}`}
              >
                <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-[#00FFFF] to-[#600ab0] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.5)]">
                  <div className="w-24 h-24 bg-[#1A1F3C] rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2]">
                      {step.number}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
