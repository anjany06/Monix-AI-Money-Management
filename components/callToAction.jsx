"use client";
import React from "react";
import { Rocket } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative w-full overflow-hidden py-24">
      {/* Enhanced space-themed ambient effects with more blue */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-indigo-600 rounded-full opacity-15 blur-[100px]"></div>
      <div className="absolute top-1/2 left-2/3 w-64 h-64 bg-cyan-400 rounded-full opacity-10 blur-[100px]"></div>

      <div className="container mx-auto max-w-5xl px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Enhanced heading with stronger blue gradient */}
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight neon-text">
            Explore the Financial Universe
          </h2>

          {/* Enhanced subheading with blue accent */}
          <p className="text-xl text-blue-100 max-w-2xl">
            Launch your journey with MoniX and navigate through the stars of
            intelligent money management
          </p>

          {/* Enhanced glassy CTA Button with blue-focused space theme */}
          <div className="mt-8 relative group">
            {/* Enhanced animated gradient border with blue focus */}
            <div
              className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 opacity-70 
              group-hover:opacity-100 blur-md transition duration-500 animate-pulse-slow"
            ></div>

            {/* Enhanced glass button with blue glow */}
            <button
              className="relative px-4 md:px-8 py-5 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-blue-400/20
              text-white text-md md:text-lg font-semibold group-hover:bg-slate-800/80 transform transition duration-300
              hover:scale-105 flex items-center space-x-2 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            >
              <span>Launch Your Finance Journey</span>
              <Rocket className="ml-2 h-5 w-5 text-blue-300" />
              <span className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                <span className="absolute opacity-0 group-active:opacity-100 inset-0 flex justify-center items-center transition-opacity">
                  <span className="h-full w-full bg-blue-400/20 animate-ripple rounded-lg"></span>
                </span>
              </span>
            </button>
          </div>

          {/* Enhanced space-themed subtle text with blue hint */}
          <p className="text-sm text-blue-300 mt-6">
            No navigation coordinates required • Begin your 14-day exploration
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
