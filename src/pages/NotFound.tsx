import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Home } from "lucide-react";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center px-4 py-16">
          <div className="inline-flex items-center justify-center p-6 bg-red-50 rounded-full text-iu-crimson mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          
          <h1 className="text-5xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! This page doesn't exist in our course catalog.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>
            
            <Button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground" asChild>
              <Link to="/search">
                <Search className="mr-2 h-4 w-4" /> Browse Courses
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
