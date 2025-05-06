import React from 'react';

const steps = [
  {
    number: '01',
    title: 'Create Account',
    description: 'Sign up for free and connect your bank accounts securely.'
  },
  {
    number: '02',
    title: 'Set Financial Goals',
    description: 'Define your savings targets and investment objectives.'
  },
  {
    number: '03',
    title: 'Get Insights',
    description: 'Receive AI-powered recommendations tailored to your spending habits.'
  },
  {
    number: '04',
    title: 'Grow Your Wealth',
    description: 'Track your progress and watch your financial health improve.'
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 relative bg-monix-dark-light">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How <span className="text-monix-neon">It Works</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Getting started with Monix is easy. Follow these simple steps to begin your financial journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Line connector (except last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-14 left-[calc(50%+40px)] h-0.5 w-[calc(100%-80px)] bg-gradient-to-r from-monix-neon to-monix-violet"></div>
              )}
              
              <div className="text-center relative z-10">
                <div className="w-28 h-28 mx-auto mb-6 bg-gradient-to-br from-monix-neon to-monix-violet rounded-full flex items-center justify-center shadow-neon">
                  <div className="w-24 h-24 bg-monix-dark-light rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold bg-gradient-to-r from-monix-neon to-monix-violet bg-clip-text text-transparent">
                      {step.number}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#signup" 
            className="px-8 py-3 rounded-full bg-monix-violet text-white font-medium transition-all hover:shadow-violet hover:scale-105"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;