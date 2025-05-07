import React from "react";

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
  return (
    <section id="how-it-works" className="py-24 relative ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
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
                <div className="hidden lg:block absolute top-14 left-[calc(50%+40px)] h-0.5 w-[calc(100%-80px)] bg-gradient-to-r from-[#00FFFF] to-[#8A2BE2]"></div>
              )}

              <div className="text-center relative z-10">
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
