import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import Particles from "./particles";
import Beam from "./beam";
import StatsGraph from "./statsGraph";
import FinanceCard from "./finance-card";

const HeroSection1 = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#1A1F2C] to-[#121418]">
      <Particles />

      {/* Beam effects */}
      <Beam className="top-20 left-20 w-80 h-80 opacity-30" />
      <Beam className="bottom-40 right-10 w-96 h-96 opacity-20" />
      <Beam className="top-60 right-1/4 w-64 h-64 opacity-30" />

      <div className="container relative mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 space-y-6">
            <h1 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold leading-tight neon-text animate-fade-in">
              Manage Your Money, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                The Smart Way
              </span>{" "}
              – With MoniX
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-lg animate-fade-in animate-delay-200">
              Your AI-powered finance partner for effortless budgeting, saving,
              and planning. Take control of your financial future today.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4 animate-fade-in animate-delay-300">
              <Button className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-cyan-400/30 hover:opacity-90 neon-glow px-6 py-6 transition-all">
                Get Started
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={18}
                />
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border border-cyan-400/30 text-cyan-400 hover:bg-cyan-950/30 hover:text-cyan-300 px-6 py-6 transition-all"
              >
                See Features
              </Button>
            </div>
          </div>

          <div className="relative z-10">
            <div className="relative">
              {/* Main card */}
              <div className="glass rounded-xl p-5 animate-float animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">
                    Financial Overview
                  </h3>
                  <div className="px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs">
                    LIVE
                  </div>
                </div>
                <StatsGraph />
              </div>

              {/* Floating cards */}
              <FinanceCard
                title="Total Balance"
                value="$12,845.00"
                trend="+2.4%"
                className="absolute -top-10 -left-10 w-48 animate-float"
                delay="animate-delay-200"
              />

              <FinanceCard
                title="This Month"
                value="$3,245.00"
                trend="-1.2%"
                className="absolute -bottom-12 -right-8 w-48 animate-float"
                delay="animate-delay-400"
              />

              <FinanceCard
                title="Savings Goal"
                value="68%"
                className="absolute top-20 -right-12 w-36 animate-float"
                delay="animate-delay-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection1;
