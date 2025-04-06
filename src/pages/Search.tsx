import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseSearch from "@/components/CourseSearch";
import CourseCard from "@/components/CourseCard";
import CourseDetailModal from "@/components/CourseDetailModal";
import CartDrawer from "@/components/CartDrawer";
import { Course } from "@/data/mockData";
import { toast } from "sonner";
import CourseTable from "@/components/CourseTable";
import { Button } from "@/components/ui/button";
import { Grid, List } from "lucide-react";
import { API_BASE_URL } from "@/config";

interface SearchProps {
  onAddToCart?: (courseId: string) => void;
}

const Search: React.FC<SearchProps> = ({ onAddToCart = () => {} }) => {
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [viewMode, setViewMode] = useState<"card" | "table">("card");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${API_BASE_URL}/courses`);
        if (!res.ok) throw new Error("Failed to fetch courses");

        const json = await res.json();
        const data = json.courses;

        console.log("Fetched courses:", data);

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format: 'courses' is not an array");
        }

        setAllCourses(data);
        setSearchResults(data);
      } catch (error) {
        console.error("❌ Error fetching courses:", error);
        toast.error("Unable to load courses", {
          description: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

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

  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addToCart = (course: Course) => {
    if (cartItems.some(item => item.id === course.id)) {
      toast.error("Already in cart", {
        description: `${course.code} is already in your cart.`,
      });
      return;
    }

    const updatedCart = [...cartItems, course];
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    toast.success("Added to cart", {
      description: `${course.code} has been added to your cart.`,
    });

    onAddToCart(course.id);
  };

  const removeFromCart = (course: Course) => {
    const updatedCart = cartItems.filter(item => item.id !== course.id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

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

    cartItems.forEach(course => {
      if (!enrolledCourses.some(enrolled => enrolled.id === course.id)) {
        newEnrolledCourses.push(course);
        addedCount++;
      }
    });

    localStorage.setItem("enrolledCourses", JSON.stringify(newEnrolledCourses));

    toast.success(`Added ${addedCount} courses in your wishlist`, {
      description:addedCount > 0
          ? `You have successfully added ${addedCount} new courses in your wishlist.`
          : "Selected courses are already in your wishlist.",
    });

    clearCart();
  };

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

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold mb-6 md:mb-0">Course Search</h1>

          <div className="flex items-center border rounded-md">
            <Button
              className={`rounded-r-none h-9 px-3 ${
                viewMode === "card"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => setViewMode("card")}
            >
              <Grid className="h-4 w-4 mr-1" />
              Cards
            </Button>

            <Button
              className={`rounded-l-none h-9 px-3 ${
                viewMode === "table"
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4 mr-1" />
              Table
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <CourseSearch courses={allCourses} onSearch={setSearchResults} />
        </div>

        <div className="mb-4">
          <p className="text-gray-600">
            {searchResults.length} {searchResults.length === 1 ? "course" : "courses"} found
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
          </div>
        ) : searchResults.length > 0 ? (
          viewMode === "card" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onViewDetails={handleViewDetails}
                  onAddToCart={() => addToCart(course)}
                />
              ))}
            </div>
          ) : (
            <CourseTable
              courses={searchResults}
              onUnenroll={() => {}}
              addToCartButton
              onAddToCart={(courseId) => {
                const course = allCourses.find(c => c.id === courseId);
                if (course) addToCart(course);
              }}
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">No courses found</h3>
            <p className="text-gray-600 text-center max-w-md">
              We couldn't find any courses matching your search criteria. Try adjusting your filters or search term.
            </p>
          </div>
        )}
      </main>

      <CourseDetailModal
        course={selectedCourse}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={addToCart}
      />

      <Footer />
    </div>
  );
};

export default Search;
