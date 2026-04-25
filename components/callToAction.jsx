"use client";
import React from "react";
import { Rocket } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative w-full overflow-hidden py-24">
      {/* Background effects removed */}

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


            {/* CTA Button with 3D Depth */}
            <button
              className="relative px-6 md:px-8 py-4 rounded-xl bg-blue-600 border-b-4 border-blue-800 text-white text-md md:text-lg font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] active:border-b-0 active:translate-y-1 flex items-center justify-center space-x-2 shadow-[0_5px_15px_rgba(0,0,0,0.25)]"
            >
              <span>Launch Your Finance Journey</span>
              <Rocket className="ml-2 h-5 w-5 text-white drop-shadow-sm" />
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
