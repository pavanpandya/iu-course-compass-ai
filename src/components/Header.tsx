import { FC, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu, LogIn, LogOut } from "lucide-react";

const Header: FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(auth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    navigate("/signin");
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-full bg-iu-crimson p-1">
            <div className="text-white font-bold text-xl">IU</div>
          </div>
          <div>
            <h1 className="text-iu-crimson text-xl font-bold">Course Compass</h1>
            <p className="text-black font-semibold text-xs opacity-90">Indiana University Bloomington</p>
          </div>
        </Link>

        {/* Right side: nav + user */}
        <div className="flex items-center gap-6">
          {/* Desktop nav */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link to="/search" className="text-iu-crimson font-bold hover:text-red-700">Course Search</Link>
            <Link to="/enrolled-courses" className="text-iu-crimson font-bold hover:text-red-700">My Courses</Link>
            <Link to="/recommendations" className="text-iu-crimson font-bold hover:text-red-700">Recommendations</Link>
            <Link to="/chatbot" className="text-iu-crimson font-bold hover:text-red-700">AI Assistant</Link>
          </nav>

          {/* User/Login */}
          <div className="relative" ref={menuRef}>
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="rounded-full p-2 border border-gray-300 hover:bg-gray-100 w-10 h-10 flex items-center justify-center"
                >
                  <User className="h-5 w-5 text-black" />
                </Button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2 rounded-md"
                    >
                      <LogOut className="h-4 w-4" /> Log Out
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link to="/signin">
                <Button variant="outline" className="text-black bg-white/10 border-black/20 hover:bg-white/20 hover:text-iu-crimson transition-colors duration-200">
                  <LogIn className="h-4 w-4 mr-2" /> Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            className="md:hidden hover:bg-accent hover:text-accent-foreground"
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow-md p-4 absolute w-full z-40">
          <ul className="space-y-4">
            <li><Link to="/search" onClick={() => setMenuOpen(false)} className="block text-iu-crimson font-bold">Course Search</Link></li>
            <li><Link to="/enrolled-courses" onClick={() => setMenuOpen(false)} className="block text-iu-crimson font-bold">My Courses</Link></li>
            <li><Link to="/recommendations" onClick={() => setMenuOpen(false)} className="block text-iu-crimson font-bold">Recommendations</Link></li>
            <li><Link to="/chatbot" onClick={() => setMenuOpen(false)} className="block text-iu-crimson font-bold">AI Assistant</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
