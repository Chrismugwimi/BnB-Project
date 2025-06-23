// components/header.jsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, Compass, Briefcase, Globe, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-gray-100 bg-blue-950 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center mr-3 group-hover:bg-orange-600 transition-colors">
              <Home className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              My<span className="text-orange-500"> Bnb</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="flex items-center space-x-2 text-white font-medium border-b-2 border-orange-500 pb-1"
            >
              <Home className="w-4 h-4" />
              <span>Bnbs</span>
            </Link>
            <Link
              href="/experiences"
              className="flex items-center space-x-2 text-white hover:text-orange-500 transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Destinations</span>
            </Link>
            <Link
              href="/business"
              className="flex items-center space-x-2 text-white hover:text-orange-500 transition-colors"
            >
              <Briefcase className="w-4 h-4" />
              <span>Activities</span>
            </Link>
          </nav>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            <Link
              href="/list"
              className="text-sm font-medium text-white hover:text-orange-500 hidden sm:block transition-colors"
            >
              List my Bnb
            </Link>
            <Button variant="ghost" size="sm" className="p-2">
              <Globe className="text-white w-4 h-4" />
            </Button>
            <div className="flex items-center space-x-0 border border-gray-200 rounded-full p-1 hover:shadow-md transition-shadow bg-white">
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
