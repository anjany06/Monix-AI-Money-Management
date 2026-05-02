"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import Link from "next/link";
import { ArrowUpRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { featuresData, howItWorksData, statsData, testimonialsData } from "../data/landing";

// ==========================================
// SVG MOTION GRAPHICS COMPONENTS
// ==========================================

const AnimatedLineChart = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const pathData = "M 0 150 C 50 140, 100 120, 150 130 C 200 140, 250 80, 300 90 C 350 100, 400 40, 450 60 C 500 80, 550 20, 600 10";
  const areaData = `${pathData} L 600 200 L 0 200 Z`;

  return (
    <div ref={ref} className="relative w-full h-[200px] mt-4">
      <svg viewBox="0 0 600 200" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(52, 211, 153, 0.2)" />
            <stop offset="100%" stopColor="rgba(52, 211, 153, 0)" />
          </linearGradient>
        </defs>
        <motion.path
          d={areaData}
          fill="url(#chartGradient)"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.path
          d={pathData}
          fill="transparent"
          stroke="#34d399"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
        {isInView && (
          <motion.circle
            cx="600"
            cy="10"
            r="6"
            fill="#34d399"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{
              scale: { delay: 1.8, duration: 2, repeat: Infinity, ease: "easeInOut" },
              opacity: { delay: 1.8, duration: 2, repeat: Infinity, ease: "easeInOut" },
              default: { delay: 1.8, duration: 0.3 }
            }}
            style={{ filter: "drop-shadow(0 0 8px rgba(52,211,153,0.8))" }}
          />
        )}
      </svg>
    </div>
  );
};

const AnimatedDonutChart = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const arcs = [
    { color: "#34d399", radius: 75, strokeWidth: 10, dashArray: "300 1000", delay: 0, rotateDuration: 8 },
    { color: "rgba(255,255,255,0.4)", radius: 60, strokeWidth: 8, dashArray: "180 1000", delay: 0.2, rotateDuration: 12 },
    { color: "rgba(255,255,255,0.2)", radius: 45, strokeWidth: 6, dashArray: "100 1000", delay: 0.4, rotateDuration: 6 },
  ];

  return (
    <div ref={ref} className="relative w-full h-[200px] flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-48 h-48 transform -rotate-90">
        {arcs.map((arc, i) => (
          <motion.circle
            key={i}
            cx="100"
            cy="100"
            r={arc.radius}
            fill="transparent"
            stroke={arc.color}
            strokeWidth={arc.strokeWidth}
            strokeDasharray={arc.dashArray}
            strokeLinecap="round"
            initial={{ strokeDashoffset: 1000, rotate: 0 }}
            animate={isInView ? { strokeDashoffset: 0, rotate: 360 } : { strokeDashoffset: 1000, rotate: 0 }}
            transition={{
              strokeDashoffset: { duration: 1.5, delay: arc.delay, ease: "easeOut" },
              rotate: { duration: arc.rotateDuration, repeat: Infinity, ease: "linear" }
            }}
            style={{ transformOrigin: "100px 100px" }}
          />
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
        <motion.div
          className="text-white/60 text-xs font-semibold uppercase tracking-widest"
          initial={{ filter: "blur(5px)", opacity: 0 }}
          animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Budget
        </motion.div>
        <motion.div
          className="text-white font-heading italic text-3xl"
          initial={{ filter: "blur(5px)", opacity: 0 }}
          animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          80%
        </motion.div>
      </div>
    </div>
  );
};

const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);
  useEffect(() => {
    setanimacles(Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.15 + 0.15,
    })));
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, opacity: p.opacity, willChange: "transform" }}
          animate={{ y: [0, -15, 0, 15, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

const GridFlowSVG = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <circle cx="40" cy="40" r="2" fill="rgba(52, 211, 153, 0.5)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

const ReceiptScanLine = () => {
  return (
    <div className="relative w-full h-[240px] flex items-center justify-center">
      <div className="w-48 h-56 border border-white/20 rounded-lg relative overflow-hidden bg-white/5">
        <div className="absolute top-4 left-4 right-4 h-2 bg-white/20 rounded" />
        <div className="absolute top-10 left-4 w-20 h-2 bg-white/10 rounded" />
        <div className="absolute top-14 left-4 w-32 h-2 bg-white/10 rounded" />
        <div className="absolute bottom-8 left-4 right-4 h-10 border-t border-dashed border-white/20 flex items-center justify-between">
          <span className="w-16 h-2 bg-white/20 rounded" />
          <span className="w-12 h-2 bg-[#34d399]/60 rounded" />
        </div>

        <motion.div
          className="absolute left-0 right-0 h-1 bg-[#34d399] shadow-[0_0_15px_rgba(52,211,153,0.8)]"
          style={{ willChange: "transform" }}
          animate={{ y: [0, 224, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute bottom-1 left-0 right-0 h-10 bg-gradient-to-t from-[#34d399]/30 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};

// ==========================================
// UTILITY COMPONENTS
// ==========================================

const TypewriterText = ({ text, delay = 0 }) => {
  return (
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: "100%" }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, delay: delay / 1000, ease: "linear" }}
      className="overflow-hidden whitespace-nowrap"
    >
      {text}
    </motion.div>
  );
};

const BlurText = ({ text, children, className, delay = 0 }) => {
  const content = text || children;
  const words = typeof content === "string" ? content.split(" ") : [];

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.1,
            ease: [0.21, 0.47, 0.32, 0.98]
          }}
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </span>
  );
};

// ==========================================
// PAGE SECTIONS
// ==========================================

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen bg-black flex flex-col justify-center pt-32 pb-24 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black">
        <video
          className="absolute inset-0 w-full h-full object-cover object-left md:object-center opacity-80"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_094440_a3592600-bd1e-49e5-9bce-a73662061d83.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/20 pointer-events-none" /> */}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-16 text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass inline-flex items-center gap-2 rounded-full px-3 py-1 mb-8"
        >
          <span className="bg-white text-black px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">New</span>
          <span className="text-xs text-white/80 pr-2">AI Receipt Scanning is now live.</span>
        </motion.div>

        <h1 className="text-6xl md:text-8xl font-heading italic leading-[1] tracking-[-3px] max-w-3xl mb-6">
          <BlurText>Your Money. Finally Under Control.</BlurText>
        </h1>

        <motion.p
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mb-10 font-light"
        >
          MONIX tracks every dollar, scans every receipt, and reveals what your money is actually doing — powered by Gemini AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row items-start gap-4 mb-20"
        >
          <button className="liquid-glass-strong rounded-full px-8 py-4 text-base font-semibold flex items-center gap-2 group transition-all hover:scale-105 active:scale-95 text-white">
            Get Started Free
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          {/* <button className="flex items-center gap-3 text-white/70 hover:text-white transition-colors px-6 py-4 group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors">
              <Play className="w-4 h-4 fill-white text-white" />
            </div>
            Watch Demo
          </button> */}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
};

const StatsBar = () => {
  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "$2.4M", label: "Tracked Monthly" },
    { value: "98%", label: "Accuracy Rate" },
    { value: "4.9★", label: "App Rating" },
  ];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="bg-black py-12 border-t border-white/5">
      <div ref={ref} className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="text-4xl font-heading italic text-[#34d399] mb-2">{stat.value}</div>
              <div className="text-white/50 text-sm tracking-wider uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesChess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="bg-black py-32 text-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-24">
          <span className="liquid-glass rounded-full px-4 py-1.5 text-sm font-medium text-white/70 mb-6 inline-block">Features</span>
          <h2 className="text-5xl md:text-6xl font-heading italic"><BlurText>Everything your wallet needs.</BlurText></h2>
        </div>

        <div className="space-y-32" ref={ref}>
          {/* Row 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div className="flex-1" initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
              <h3 className="text-4xl font-heading italic mb-4">Scan any receipt. Zero typing.</h3>
              <p className="text-white/60 text-lg mb-8 font-light">Point your camera, tap once. Gemini AI reads the receipt, categorizes the expense, and logs it instantly. Works on paper, email, and digital receipts.</p>
              <button className="liquid-glass-strong rounded-full px-6 py-3">See it in action</button>
            </motion.div>
            <motion.div className="flex-1 w-full" initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
              <div className="liquid-glass rounded-2xl p-8 max-w-md mx-auto">
                <ReceiptScanLine />
              </div>
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <motion.div className="flex-1" initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              <h3 className="text-4xl font-heading italic mb-4">Budgets that actually alert you.</h3>
              <p className="text-white/60 text-lg mb-8 font-light">Set a budget per category. Hit 80%? MONIX pings you before the damage is done. Real-time awareness, not month-end regret.</p>
              <button className="liquid-glass-strong rounded-full px-6 py-3">Set your budget</button>
            </motion.div>
            <motion.div className="flex-1 w-full" initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="liquid-glass rounded-2xl p-8 max-w-md mx-auto">
                <AnimatedDonutChart />
              </div>
            </motion.div>
          </div>

          {/* Row 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div className="flex-1" initial={{ opacity: 0, x: -50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
              <h3 className="text-4xl font-heading italic mb-4">AI insights every month.</h3>
              <p className="text-white/60 text-lg mb-8 font-light">At month's end, Gemini synthesizes your data into a personalized report — what you overspent, where you saved, what to do next month.</p>
              <button className="liquid-glass-strong rounded-full px-6 py-3">View sample insight</button>
            </motion.div>
            <motion.div className="flex-1 w-full" initial={{ opacity: 0, x: 50 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
              <div className="liquid-glass rounded-2xl p-6 max-w-md mx-auto aspect-video relative overflow-hidden font-mono text-[10px] sm:text-xs text-[#34d399]/80 flex flex-col gap-2 justify-center">
                <TypewriterText text="> Analyzing spending patterns..." delay={200} />
                <TypewriterText text="> Food & Dining increased by 14% this month." delay={2000} />
                <TypewriterText text="> Insight: Suburban Cafe visits are driving peaks." delay={3500} />
                <TypewriterText text="> Recommendation: Set a $200 cap on weekend dining." delay={5500} />
                <motion.div
                  className="w-1.5 h-3 bg-[#34d399] mt-1"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesGrid = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="bg-black py-24 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="liquid-glass rounded-full px-4 py-1.5 text-sm font-medium text-white/70 mb-6 inline-block">Why Us</span>
          <h2 className="text-5xl font-heading italic"><BlurText>The difference is in the details.</BlurText></h2>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresData.map((f, i) => (
            <motion.div
              key={i}
              className="liquid-glass rounded-2xl p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="liquid-glass-strong rounded-full w-14 h-14 flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="how-it-works" className="relative bg-black py-32 text-white overflow-hidden min-h-[600px] flex items-center">
      <GridFlowSVG />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />

      <div className="relative z-20 container mx-auto px-4 max-w-4xl text-center" ref={ref}>
        <span className="liquid-glass rounded-full px-4 py-1.5 text-sm font-medium text-white/70 mb-6 inline-block">How It Works</span>
        <h2 className="text-5xl md:text-6xl font-heading italic mb-20"><BlurText>From transaction to insight. In seconds.</BlurText></h2>

        <div className="space-y-12 relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />

          {howItWorksData.map((step, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
            >
              <div className="liquid-glass-strong rounded-full w-14 h-14 flex items-center justify-center z-10 mb-6 bg-black">
                {step.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-3">{step.title}</h3>
              <p className="text-white/60 text-lg max-w-md">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="bg-[#030712] py-24 text-white relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ filter: "url(#noiseFilter)" }}>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          className="liquid-glass rounded-3xl p-12 md:p-16 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16 text-center">
            {statsData.map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-heading italic text-[#34d399] mb-3">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
          <AnimatedLineChart />
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % testimonialsData.length);
        setTimeout(() => setIsTransitioning(false), 100);
      }, 400);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const navigate = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActive(index);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 400);
  };

  const t = testimonialsData[active];

  return (
    <section className="bg-black py-24 text-white" ref={ref}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="liquid-glass rounded-full px-4 py-1.5 text-sm font-medium text-white/70 mb-6 inline-block">What They Say</span>
          <h2 className="text-5xl font-heading italic"><BlurText>Real people. Real results.</BlurText></h2>
        </div>

        {/* Testimonial Card */}
        <motion.div
          className="liquid-glass rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row">
            {/* Image */}
            <div className="md:w-[280px] lg:w-[320px] shrink-0 relative overflow-hidden">
              <div
                className="w-full h-64 md:h-full transition-all duration-700 ease-in-out"
                style={{
                  opacity: isTransitioning ? 0.4 : 1,
                  transform: isTransitioning ? "scale(1.05)" : "scale(1)",
                  filter: isTransitioning ? "blur(6px)" : "blur(0px)",
                }}
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/40 md:block hidden pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden pointer-events-none" />
            </div>

            {/* Content */}
            <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-between">
              <div>
                {/* Quote */}
                <div
                  className="text-2xl md:text-3xl lg:text-[32px] font-light leading-snug md:leading-[1.3] tracking-tight text-white/90 mb-10 min-h-[140px] md:min-h-[180px] transition-all duration-700 ease-in-out"
                  style={{
                    filter: isTransitioning ? "blur(8px)" : "blur(0px)",
                    opacity: isTransitioning ? 0.3 : 1,
                  }}
                >
                  "{t.quote}"
                </div>

                {/* Author */}
                <div
                  className="transition-all duration-700 ease-in-out"
                  style={{
                    filter: isTransitioning ? "blur(6px)" : "blur(0px)",
                    opacity: isTransitioning ? 0.3 : 1,
                  }}
                >
                  <div className="text-lg font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-[#34d399]">{t.role}</div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10">
                {/* Dots */}
                <div className="flex gap-2">
                  {testimonialsData.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => navigate(i)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === active
                          ? "w-8 bg-[#34d399]"
                          : "w-3 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex gap-3">
                  <button
                    onClick={() => navigate((active - 1 + testimonialsData.length) % testimonialsData.length)}
                    className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    <ChevronLeft size={18} className="text-white/70" />
                  </button>
                  <button
                    onClick={() => navigate((active + 1) % testimonialsData.length)}
                    className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    <ChevronRight size={18} className="text-white/70" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CtaFooter = () => {
  return (
    <section className="relative bg-black pt-32 pb-8 text-white overflow-hidden">
      {/* <FloatingParticles /> */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 50%, rgba(52,211,153,0.05) 0%, transparent 60%)" }} />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-7xl font-heading italic leading-[0.85] mb-8">
          <BlurText>Start tracking.</BlurText>
          <br />
          <BlurText delay={0.2}>Stop guessing.</BlurText>
        </h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-12">Join 10,000+ people who finally understand their money. Free forever, up to 2 accounts.</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-32">
          <Link href="/dashboard" className="liquid-glass-strong rounded-full px-8 py-4 text-base font-medium flex items-center gap-2 hover:bg-white/10 transition-colors">
            Create Free Account <ArrowUpRight size={18} />
          </Link>
          <button className="bg-white text-black rounded-full px-8 py-4 text-base font-medium hover:bg-white/90 transition-colors">
            See Pricing
          </button>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-white/30 text-xs">
          <div>© 2026 MONIX. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================

export default function LandingPage() {
  return (
    <div className="bg-black min-h-screen text-foreground font-body">
      {/* We assume the Navbar is either in layout.js or we could include it here. 
          For perfect isolation, we use the modified Header. */}
      <Hero />
      <FeaturesChess />
      <FeaturesGrid />
      <HowItWorks />
      <StatsSection />
      <Testimonials />
      <CtaFooter />
    </div>
  );
}
