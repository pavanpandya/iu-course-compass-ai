import { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu, LogIn, BookOpen } from "lucide-react";

const Header: FC = () => {
  return (
    <header className="bg-iu-crimson text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-full bg-white p-1">
            <div className="text-iu-crimson font-bold text-xl">IU</div>
          </div>
          <div>
            <h1 className="text-xl font-bold">Course Compass</h1>
            <p className="text-xs opacity-90">Indiana University Bloomington</p>
          </div>
        </Link>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:block">
            <ul className="flex items-center gap-6">
              <li>
                <Link to="/search" className="hover:underline">
                  Course Search
                </Link>
              </li>
              <li>
                <Link to="/enrolled-courses" className="hover:underline">
                  My Courses
                </Link>
              </li>
              <li>
                <Link to="/recommendations" className="hover:underline">
                  Recommendations
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="hover:underline">
                  AI Assistant
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="flex items-center gap-2">
            <Button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground">
              <LogIn className="h-4 w-4 mr-2" /> Sign In
            </Button>
            <Button className="hover:bg-accent hover:text-accent-foreground md:hidden" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
