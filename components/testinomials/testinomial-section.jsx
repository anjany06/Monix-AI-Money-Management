"use client";

import { useEffect, useRef, useState } from "react";
import TestimonialCard from "./testinomial-card";

const testimonials = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Tech Entrepreneur",
    content:
      "MoniX transformed how I manage my startup's finances. The AI predictions saved us from several poor investment decisions.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "Financial Analyst",
    content:
      "As someone who works with financial data daily, I'm impressed. MoniX's algorithms are surprisingly accurate with market trends.",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Michael Reeves",
    role: "Small Business Owner",
    content:
      "Budgeting used to be my worst nightmare until I found MoniX. Now I can see exactly where my business is heading financially.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=150&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Jamie Curtis",
    role: "Freelancer",
    content:
      "The expense tracking and income predictions help me plan my finances months ahead. Essential for anyone with irregular income.",
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=150&auto=format&fit=crop",
  },
];

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 px-6 md:px-10 overflow-hidden"
    >
  
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2
            className={[
              "text-3xl md:text-4xl font-bold text neon-text pb-1 transition-opacity duration-1000",
              !isVisible ? "opacity-0" : "opacity-100",
            ].join(" ")}
          >
            What Our Users Say
          </h2>

          <p
            className={[
              "text-gray-400 mt-4 max-w-2xl mx-auto transition-all duration-1000 delay-200",
              !isVisible
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0",
            ].join(" ")}
          >
            Join thousands of users who trust MoniX for their financial planning
            and insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={[
                "transition-all duration-700 ease-out",
                !isVisible
                  ? "opacity-0 translate-y-8"
                  : "opacity-100 translate-y-0",
              ].join(" ")}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <TestimonialCard
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                rating={testimonial.rating}
                image={testimonial.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
