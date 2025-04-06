import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Sparkles, MessageCircle, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Course, courses } from "@/data/mockData";
import { toast } from "sonner";
import CourseDetailModal from "@/components/CourseDetailModal";

const Index: React.FC = () => {
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart items:", error);
      }
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (course: Course) => {
    if (cartItems.some((item) => item.id === course.id)) {
      toast.error("Already in cart", {
        description: `${course.code} is already in your cart.`,
      });
      return;
    }
    setCartItems([...cartItems, course]);
    toast.success("Added to cart", {
      description: `${course.code} has been added to your cart.`,
    });
  };

  const removeFromCart = (course: Course) => {
    setCartItems(cartItems.filter((item) => item.id !== course.id));
    toast.info("Removed from cart", {
      description: `${course.code} has been removed from your cart.`,
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const handleEnroll = () => {
    const savedCourses = localStorage.getItem("enrolledCourses");
    let enrolledCourses: Course[] = [];

    if (savedCourses) {
      try {
        enrolledCourses = JSON.parse(savedCourses);
      } catch (error) {
        console.error("Failed to parse enrolled courses:", error);
      }
    }

    const newEnrolledCourses = [...enrolledCourses];
    let addedCount = 0;

    cartItems.forEach((course) => {
      if (!enrolledCourses.some((enrolled) => enrolled.id === course.id)) {
        newEnrolledCourses.push(course);
        addedCount++;
      }
    });

    localStorage.setItem("enrolledCourses", JSON.stringify(newEnrolledCourses));

    toast.success(`Added ${addedCount} courses in your wishlist`, {
      description:
        addedCount > 0
          ? `You have successfully added ${addedCount} new courses in your wishlist.`
          : "Selected courses are already in your wishlist.",
    });

    clearCart();
  };

  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const featuredCourses = courses.slice(0, 3);


  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="fixed top-4 right-4 z-50">
        <CartDrawer
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          onEnroll={handleEnroll}
        />
      </div>
      
      {/* Hero section */}
      <section className="hero-gradient text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find Your Perfect IU Courses
          </h1>
          <p className="text-xl md:text-2xl opacity-90 mb-8">
            Course Compass AI uses intelligent recommendations to help you choose the best classes for your academic journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              asChild 
              className="bg-white text-iu-crimson hover:bg-white/90 h-11 px-8"
            >
              <Link to="/search">
                <Search className="mr-2 h-5 w-5" /> Find Courses
              </Link>
            </Button>
            <Button 
              asChild 
              className="border border-white text-white hover:bg-white/10 h-11 px-8"
            >
              <Link to="/chatbot">
              <MessageCircle className="mr-2 h-5 w-5" /> Ask AI Assistant
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 px-4 bg-iu-cream">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Find, Compare, and Enroll with Ease</h2>
          
          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="recommend">Recommend</TabsTrigger>
              <TabsTrigger value="chat">AI Chat</TabsTrigger>
            </TabsList>
            
            <TabsContent value="search" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-iu-crimson mb-4">Unified Course Search</h3>
                  <p className="text-gray-700 mb-4">
                    Find courses across all IU departments with powerful filters for term, professor, credits, and more. See real student ratings and historical grade distributions all in one place.
                  </p>
                  <Button asChild>
                    <Link to="/search">
                      <Search className="mr-2 h-4 w-4" /> Browse All Courses
                    </Link>
                  </Button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-iu-crimson/10 p-3 rounded-md">
                      <BookOpen className="h-8 w-8 text-iu-crimson" />
                      <div>
                        <h4 className="font-medium">Course Details</h4>
                        <p className="text-sm text-gray-600">View complete course information, prerequisites, and textbooks.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-iu-crimson/10 p-3 rounded-md">
                      <Sparkles className="h-8 w-8 text-iu-crimson" />
                      <div>
                        <h4 className="font-medium">Student Reviews</h4>
                        <p className="text-sm text-gray-600">See real OCQ ratings and student feedback.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-iu-crimson/10 p-3 rounded-md">
                      <Search className="h-8 w-8 text-iu-crimson" />
                      <div>
                        <h4 className="font-medium">Advanced Filters</h4>
                        <p className="text-sm text-gray-600">Filter by term, department, professor, and more.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="recommend" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 bg-white p-6 rounded-lg shadow-lg border">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-iu-crimson/10 p-3 rounded-md">
                      <Sparkles className="h-8 w-8 text-iu-crimson" />
                      <div>
                        <h4 className="font-medium">AI-Powered Recommendations</h4>
                        <p className="text-sm text-gray-600">Get personalized course suggestions based on your goals.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-iu-crimson/10 p-3 rounded-md">
                      <BookOpen className="h-8 w-8 text-iu-crimson" />
                      <div>
                        <h4 className="font-medium">Career Path Alignment</h4>
                        <p className="text-sm text-gray-600">Courses mapped to your chosen career goals.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-iu-crimson/10 p-3 rounded-md">
                      <Search className="h-8 w-8 text-iu-crimson" />
                      <div>
                        <h4 className="font-medium">Schedule Optimization</h4>
                        <p className="text-sm text-gray-600">Find courses that fit your time constraints.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="order-1 md:order-2">
                  <h3 className="text-2xl font-bold text-iu-crimson mb-4">Smart Course Recommendations</h3>
                  <p className="text-gray-700 mb-4">
                    Tell us your career goals, preferred subjects, and schedule constraints, and we'll recommend the perfect set of courses to help you reach your objectives.
                  </p>
                  <Button asChild>
                    <Link to="/recommendations"
                    onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}>
                      <Sparkles className="mr-2 h-4 w-4" /> Get Recommendations
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chat" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-iu-crimson mb-4">AI Course Assistant</h3>
                  <p className="text-gray-700 mb-4">
                    Chat with our AI assistant to get instant answers about courses, professors, prerequisites, and more. It can suggest courses, explain requirements, and guide your academic decisions.
                  </p>
                  <Button asChild>
                    <Link to="/chatbot">
                      <MessageCircle className="mr-2 h-4 w-4" /> Start Chatting
                    </Link>
                  </Button>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-iu-crimson/10 p-3 rounded-md">
                      <MessageCircle className="h-8 w-8 text-iu-crimson" />
                      <div>
                        <h4 className="font-medium">Interactive Conversations</h4>
                        <p className="text-sm text-gray-600">Ask questions in natural language about any courses.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-iu-crimson/10 p-3 rounded-md">
                      <Search className="h-8 w-8 text-iu-crimson" />
                      <div>
                        <h4 className="font-medium">Instant Information</h4>
                        <p className="text-sm text-gray-600">Get quick answers about professors, prerequisites, and more.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 bg-iu-crimson/10 p-3 rounded-md">
                      <Sparkles className="h-8 w-8 text-iu-crimson" />
                      <div>
                        <h4 className="font-medium">Smart Suggestions</h4>
                        <p className="text-sm text-gray-600">Receive contextual recommendations based on your questions.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* Featured courses section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Courses</h2>
          <p className="text-center text-gray-600 mb-12">Explore some of our most popular courses this term</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredCourses.map(course => (
              <div key={course.id} className="border rounded-lg shadow-md overflow-hidden bg-white">
                <div className="p-4 border-b h-32 flex flex-col justify-center">
                  <p className="text-sm text-gray-500">{course.code}</p>
                  <h3 className="font-bold text-lg line-clamp-2 min-h-[3rem]">{course.name}</h3>
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-sm"><span className="font-medium">Professor:</span> {course.professor.name}</p>
                  <p className="text-sm"><span className="font-medium">Credits:</span> {course.credits}</p>
                  <p className="text-sm"><span className="font-medium">Term:</span> {course.term} {course.year}</p>
                  <p className="text-sm"><span className="font-medium">Rating:</span> {course.ocq.overall.toFixed(1)}/5.0</p>
                </div>
                <div className="p-4 flex items-center justify-between gap-2 border-t bg-gray-50">
                  <Button onClick={() => handleViewDetails(course)} className="w-full">
                    Details
                  </Button>
                  <Button onClick={() => addToCart(course)} className="w-full">
                    Add to Wishlist
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
            <div className="text-center mt-8">
            <Button asChild className="bg-white text-iu-crimson border border-iu-crimson hover:bg-red-900/10 h-11 px-8">
              <Link to="/search">View All Courses</Link>
            </Button>
            </div>
        </div>
      </section>
      
      {/* CTA section */}
      <section className="py-16 px-4 bg-iu-crimson text-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Perfect Schedule?</h2>
          <p className="text-xl opacity-90 mb-8">
            Start exploring courses, get AI recommendations, or chat with our intelligent assistant to plan your academic journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              asChild 
              className="bg-white text-iu-crimson hover:bg-white/90 h-11 px-8"
            >
              <Link to="/search">
                <Search className="mr-2 h-5 w-5" /> Find Courses
              </Link>
            </Button>
            <Button 
              asChild 
              className="border border-white text-white hover:bg-white/10 h-11 px-8"
            >
              <Link to="/chatbot">
              <MessageCircle className="mr-2 h-5 w-5" /> Ask AI Assistant
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />

      {/* Render the CourseDetailModal */}
      {isModalOpen && selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onAddToCart={addToCart}
        />
      )}
    </div>
  );
};

export default Index;
