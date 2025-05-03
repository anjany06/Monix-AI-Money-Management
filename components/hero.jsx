"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your Finances <br />
          with Intelligence
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashbaord">
            <Button className="px-8" size="lg">
              Get Started
            </Button>
          </Link>
          <Link href="/dashbaord">
            <Button className="px-8" variant="outline" size="lg">
              Watch Demo
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
