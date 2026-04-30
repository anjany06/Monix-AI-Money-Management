import { SignInButton, Show, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const Header = async () => {
  await checkUser();
  return (
    <div className="fixed top-0 min-w-screen border-b bg-background/10 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/10">
      <nav className="mx-auto px-2 md:px-12 h-16 flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/monix-logo-1.png"}
            alt="logo"
            width={200}
            height={100}
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center space-x-4">
          <Show when="signedIn">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Button variant="outline">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            <Link href="/transaction/create">
              <Button className="flex items-center gap-2">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
          </Show>
          <Show when="signedOut">
            <SignInButton forceRedirectUrl="/dashboard">
              <button className="px-5 py-2 rounded-xl bg-blue-600 border-b-4 border-blue-800 text-white font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] active:border-b-0 active:translate-y-1 shadow-[0_5px_15px_rgba(0,0,0,0.25)]">
                Login
              </button>
            </SignInButton>
          </Show>
          <Show when="signedIn">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-15 h-15",
                },
              }}
            />
          </Show>
        </div>
      </nav>
    </div>
  );
};

export default Header;

