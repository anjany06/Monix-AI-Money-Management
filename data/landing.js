import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
  LineChart,
  Wallet,
  Layers,
  DollarSign,
  Lightbulb,
  ScanLine,
} from "lucide-react";

// Stats Data
export const statsData = [
  {
    value: "50K+",
    label: "Active Users",
  },
  {
    value: "$2B+",
    label: "Transactions Tracked",
  },
  {
    value: "99.9%",
    label: "Uptime",
  },
  {
    value: "4.9/5",
    label: "User Rating",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <LineChart className="h-8 w-8 text-cyan-400" />,
    title: "Intelligent Reporting",
    description:
      "Explore comprehensive breakdowns of your expenses through machine learning analysis",
  },
  {
    icon: <ScanLine className="h-8 w-8 text-cyan-400" />,
    title: "Quick Receipt Capture",
    description: "Instantly capture receipt information from receipt using AI",
  },
  {
    icon: <Wallet className="h-8 w-8 text-cyan-400" />,
    title: "Financial Planning",
    description:
      "Set up and track spending limits with smart, personalized suggestions",
  },
  {
    icon: <Layers className="h-8 w-8 text-cyan-400" />,
    title: "Unified Account Management",
    description:
      "Control all your financial accounts and cards from a single dashboard",
  },
  {
    icon: <DollarSign className="h-8 w-8 text-cyan-400" />,
    title: "Global Currency Support",
    description:
      "Handle different world currencies with instant exchange rate updates",
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-cyan-400" />,
    title: "Smart Financial Tips",
    description:
      "Receive instant money tips and suggestions without lifting a finger",
  },
];

// How It Works Data
export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "1. Create Your Account",
    description:
      "Get started in minutes with our simple and secure sign-up process",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "2. Track Your Spending",
    description:
      "Automatically categorize and track your transactions in real-time",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "3. Get Insights",
    description:
      "Receive AI-powered insights and recommendations to optimize your finances",
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote:
      "Welth has transformed how I manage my business finances. The AI insights have helped me identify cost-saving opportunities I never knew existed.",
  },
  {
    name: "Michael Chen",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "The receipt scanning feature saves me hours each month. Now I can focus on my work instead of manual data entry and expense tracking.",
  },
  {
    name: "Emily Rodriguez",
    role: "Financial Advisor",
    image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
      "I recommend Welth to all my clients. The multi-currency support and detailed analytics make it perfect for international investors.",
  },
];
