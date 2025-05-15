import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import Particles from "./particles";
import StatsGraph from "./statsGraph";
import FinanceCard from "./finance-card";
import Link from "next/link";

const HeroSection1 = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#1A1F2C] to-[#121418]">
      <Particles />

      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-[100px]"></div>
      <div className="absolute top-1/2 left-2/3 w-64 h-64 bg-cyan-400 rounded-full opacity-10 blur-[100px]"></div>

      <div className="container relative mx-auto px-4 md:px-20 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 space-y-6">
            {/* Change to fadeInUp for text elements */}
            <h1 className="font-orbitron text-4xl md:text-5xl lg:text-6xl font-bold leading-tight neon-text animate-fadeInUp">
              Manage Your Money, <br />
              <span className="text-cyan-400 neon-text inline-block animate-fadeInUp animate-delay-100">
                The Smart Way
              </span>{" "}
              –
              <span className="inline-block animate-fadeInUp animate-delay-200">
                With MoniX
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-lg animate-fadeInUp animate-delay-300">
              Your AI-powered finance partner for effortless budgeting, saving,
              and planning. Take control of your financial future today.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Button
                asChild
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-cyan-400/30 
                           hover:opacity-90 neon-glow px-6 py-6 transition-all animate-fadeInUp animate-delay-400"
              >
                <Link href="/dashboard">
                  Get Started
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </Link>
              </Button>

              <Button
                variant="outline"
                className="bg-transparent border border-cyan-400/30 text-cyan-400 hover:bg-cyan-950/30 
                           hover:text-cyan-300 px-6 py-6 transition-all animate-fadeInUp animate-delay-500"
              >
                See Features
              </Button>
            </div>
          </div>

          <div className="relative z-10 mt-15 lg:mt-0">
            <div className="relative">
              {/* Main card with better sequencing */}
              <div className="glass rounded-xl p-5 animate-fadeInUp animate-delay-300 min-h-[200px]">
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

              {/* Floating cards with sequential entrances and continued floating */}
              <FinanceCard
                title="Total Balance"
                value="$12,845.00"
                trend="+2.4%"
                className="absolute -top-18 -left-5 md:-left-10 w-48 opacity-0 animate-fadeInUp animate-delay-400"
                delay=""
                floatingAnimation="animate-float"
              />

              <FinanceCard
                title="This Month"
                value="$3,245.00"
                trend="-1.2%"
                className="absolute -bottom-12 -right-6 md:-right-8 w-48 opacity-0 animate-fadeInUp animate-delay-600"
                delay=""
                floatingAnimation="animate-float"
              />

              <FinanceCard
                title="Savings Goal"
                value="68%"
                className="absolute top-20 -right-12 w-36 opacity-0 animate-fadeInUp animate-delay-500"
                delay=""
                floatingAnimation="animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection1;
