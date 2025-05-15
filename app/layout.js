import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Footer from "@/components/footer";

// we are going to change the font later
const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "MONIX",
  description: "AI-Powered Personal Money Assistant",
  icons: {
    icon: "/monix-sm.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          {/* header */}
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          {/* footer */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
