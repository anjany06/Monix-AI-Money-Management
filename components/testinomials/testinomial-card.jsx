"use client";

import { Star, StarHalf, Quote } from "lucide-react";
import { useState } from "react";

const TestimonialCard = ({ name, role, content, rating, image, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="text-cyan-400 fill-cyan-400 drop-shadow-[0_0_3px_rgba(34,211,238,0.5)]"
          size={16}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="text-cyan-400 fill-cyan-400 drop-shadow-[0_0_3px_rgba(34,211,238,0.5)]"
          size={16}
        />
      );
    }

    return stars;
  };

  return (
    <div
      className={[
        "relative flex flex-col p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl transition-all duration-300",
        isHovered
          ? "bg-white/10 shadow-[0_0_25px_rgba(34,211,238,0.15)] transform scale-[1.02]"
          : "",
        className || "",
      ].join(" ")}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -top-2 -left-2">
        <Quote
          className={[
            "text-cyan-400/40 opacity-80 transition-all duration-300",
            isHovered ? "opacity-100 text-cyan-400/80" : "",
          ].join(" ")}
          size={40}
        />
      </div>

      <div className="flex items-center mb-4 z-10">
        <div
          className={[
            "h-12 w-12 rounded-full overflow-hidden border-2 border-white/10 transition-all duration-300",
            isHovered
              ? "border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              : "",
          ].join(" ")}
        >
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>
        <div className="ml-4">
          <h4
            className={[
              "font-medium text-white transition-all duration-300",
              isHovered ? "text-cyan-300" : "",
            ].join(" ")}
          >
            {name}
          </h4>
          <p className="text-gray-400 text-sm">{role}</p>
        </div>
      </div>

      <p className="text-gray-300 mb-4 z-10">{content}</p>

      <div className="flex mt-auto">{renderStars()}</div>
    </div>
  );
};

export default TestimonialCard;
