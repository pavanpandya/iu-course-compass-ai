
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseSearch from "@/components/CourseSearch";
import CourseCard from "@/components/CourseCard";
import CourseTable from "@/components/CourseTable";
import CourseDetailModal from "@/components/CourseDetailModal";
import CartDrawer from "@/components/CartDrawer";
import { Course, courses } from "@/data/mockData";
import { toast } from "sonner";

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Course[]>(courses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Course[]>(() => {
    // Get cart items from localStorage if they exist
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');

  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const addToCart = (course: Course) => {
    // Check if course already exists in cart
    if (cartItems.some(item => item.id === course.id)) {
      toast.error("Already in cart", {
        description: `${course.code} is already in your cart.`,
      });
      return;
    }
    
    const updatedCart = [...cartItems, course];
    setCartItems(updatedCart);
    // Also store in localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    toast.success("Added to cart", {
      description: `${course.code} has been added to your cart.`,
    });
  };

  const removeFromCart = (course: Course) => {
    const updatedCart = cartItems.filter(item => item.id !== course.id);
    setCartItems(updatedCart);
    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    
    toast.info("Removed from cart", {
      description: `${course.code} has been removed from your cart.`,
    });
  };

  const clearCart = () => {
    setCartItems([]);
    // Clear localStorage
    localStorage.removeItem('cartItems');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="fixed top-4 right-4 z-50">
        <CartDrawer 
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      </div>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Course Search</h1>
        
        <div className="mb-8">
          <CourseSearch 
            courses={courses} 
            onSearch={setSearchResults} 
            onViewChange={setViewMode}
            currentView={viewMode}
          />
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600">
            {searchResults.length} {searchResults.length === 1 ? "course" : "courses"} found
          </p>
        </div>
        
        {searchResults.length > 0 ? (
          viewMode === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onViewDetails={handleViewDetails} 
                  onAddToCart={addToCart} 
                />
              ))}
            </div>
          ) : (
            <CourseTable
              courses={searchResults}
              onViewDetails={handleViewDetails}
              onUnenroll={addToCart}
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
