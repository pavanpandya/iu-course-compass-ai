import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu, LogIn, BookOpen } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="bg-white text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-full bg-iu-crimson p-1">
            <div className="text-white font-bold text-xl">IU</div>
          </div>
          <div>
            <h1 className="text-iu-crimson text-xl font-bold">Course Compass</h1>
            <p className="text-black font-semibold text-xs opacity-90">Indiana University Bloomington</p>
          </div>
        </Link>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li className="text-iu-crimson font-bold">
                <Link to="/search" className="hover:text-red-700">
                  Course Search
                </Link>
              </li>
              <li className="text-iu-crimson font-bold">
                <Link to="/enrolled-courses" className="hover:text-red-700">
                  My Courses
                </Link>
              </li>
              <li className="text-iu-crimson font-bold">
                <Link to="/recommendations" className="hover:text-red-700">
                  Recommendations
                </Link>
              </li>
              <li className="text-iu-crimson font-bold">
                <Link to="/chatbot" className="hover:text-red-700">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="text-black bg-white/10 border-black/20 hover:bg-white/20 hover:text-iu-crimson transition-colors duration-200"
            >
              <LogIn className="h-4 w-4 mr-2" /> Sign In
            </Button>
            <Button variant="ghost" className="md:hidden" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
