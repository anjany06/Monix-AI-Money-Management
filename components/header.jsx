"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ArrowUpRight, LayoutDashboard, PenBox } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  SignInButton,
  Show,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import Image from "next/image";

// ─── Landing page floating glass navbar ───
const LandingNavbar = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-4 left-0 right-0 z-50 flex justify-center transition-all duration-500 px-4",
        scrolled ? "top-2" : "top-4"
      )}
    >
      <div
        className={cn(
          "liquid-glass flex items-center justify-between w-full max-w-7xl rounded-full px-6 py-3 transition-all duration-500",
          scrolled
            ? "bg-black/40 backdrop-blur-3xl shadow-2xl"
            : "bg-transparent"
        )}
      >
        <div className="flex items-center gap-2">
          <Link href="/">
            <span className="font-heading italic font-bold text-2xl tracking-tighter text-white">
              MONIX<span className="text-[#34d399]">.</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Home", "Features", "How It Works", "Testimonials"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <Link
          href="/dashboard"
          className="liquid-glass-strong rounded-full px-5 py-2 text-sm font-semibold text-white flex items-center gap-2 group transition-transform active:scale-95"
        >
          Start Free
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </nav>
  );
};

// ─── App navbar (dashboard, account, transaction pages) ───
const AppNavbar = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-4 left-0 right-0 z-50 flex justify-center transition-all duration-500 px-4",
        scrolled ? "top-2" : "top-4"
      )}
    >
      <div
        className={cn(
          "liquid-glass flex items-center justify-between w-full max-w-7xl rounded-full px-6 py-3 transition-all duration-500",
          scrolled
            ? "bg-black/40 backdrop-blur-3xl shadow-2xl"
            : "bg-transparent"
        )}
      >
        <div className="flex items-center gap-2">
          <Link href="/">
            <span className="font-heading italic font-bold text-2xl tracking-tighter text-white">
              MONIX<span className="text-[#34d399]">.</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Show when="signed-in">
            <Link href="/dashboard" className="liquid-glass-strong rounded-full px-5 py-2 text-sm font-semibold text-white flex items-center gap-2 group transition-transform active:scale-95">
              <LayoutDashboard size={16} />
              <span className="hidden md:inline">Dashboard</span>
            </Link>

            <Link href="/transaction/create" className="liquid-glass-strong rounded-full px-5 py-2 text-sm font-semibold text-white flex items-center gap-2 group transition-transform active:scale-95">
              <PenBox size={16} />
              <span className="hidden md:inline">Add Transaction</span>
            </Link>
          </Show>

          <Show when="signed-out">
            <SignInButton forceRedirectUrl="/dashboard">
              <button className="liquid-glass-strong rounded-full px-5 py-2 text-sm font-semibold text-white flex items-center gap-2 group transition-transform active:scale-95">
                Login
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </Show>
        </div>
      </div>
    </nav>
  );
};

// ─── Smart Header: picks the right navbar based on route ───
const Header = () => {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  if (isLandingPage) {
    return <LandingNavbar />;
  }

  return <AppNavbar />;
};

export default Header;
