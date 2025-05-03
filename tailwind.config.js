/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Rajdhani", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
        fadeIn: {
          from: {
            opacity: 0,
            transform: "translateY(20px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "fade-in": "fadeIn 1s ease-out forwards",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".glass": {
          "backdrop-filter": "blur(16px)",
          "background-color": "rgba(255, 255, 255, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          "box-shadow": "0 4px 30px rgba(0, 0, 0, 0.1)",
        },
        ".neon-glow": {
          position: "relative",
          "box-shadow":
            '0 0 5px theme("colors.primary.DEFAULT"), 0 0 10px theme("colors.primary.DEFAULT"), 0 0 15px theme("colors.secondary.DEFAULT")',
        },
        ".neon-text": {
          "text-shadow":
            '0 0 5px theme("colors.primary.DEFAULT"), 0 0 10px theme("colors.primary.DEFAULT"), 0 0 15px theme("colors.secondary.DEFAULT")',
        },
        ".beam-bg": {
          "background-image":
            "radial-gradient(circle at 50% 50%, rgba(51, 195, 240, 0.1) 0%, rgba(51, 195, 240, 0) 70%)",
        },
        // Add animation utilities
        ".animate-accordion-down": {
          animation: "accordion-down 0.2s ease-out",
        },
        ".animate-accordion-up": { animation: "accordion-up 0.2s ease-out" },
        ".animate-float": { animation: "float 6s ease-in-out infinite" },
        ".animate-pulse-slow": { animation: "pulse 4s ease-in-out infinite" },
        ".animate-fade-in": { animation: "fadeIn 1s ease-out forwards" },

        // Add delay utilities
        ".animate-delay-100": { "animation-delay": "100ms" },
        ".animate-delay-200": { "animation-delay": "200ms" },
        ".animate-delay-300": { "animation-delay": "300ms" },
        ".animate-delay-400": { "animation-delay": "400ms" },
        ".animate-delay-500": { "animation-delay": "500ms" },
      };

      addUtilities(newUtilities);
    },
  ],
};
