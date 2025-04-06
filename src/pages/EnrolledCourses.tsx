import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Course } from "@/data/mockData";
import { ChevronDown, List, Grid } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import CourseTable from "@/components/CourseTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const EnrolledCourses: React.FC = () => {
  // State for enrolled courses
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  
  // Get unique terms from the enrolled courses
  const terms = ["all", ...Array.from(new Set(enrolledCourses.map(course => course.term)))];
  
  // Filter courses by selected term
  const filteredCourses = selectedTerm === "all" 
    ? enrolledCourses 
    : enrolledCourses.filter(course => course.term === selectedTerm);

  // Load enrolled courses from localStorage on component mount
  useEffect(() => {
    const savedCourses = localStorage.getItem("enrolledCourses");
    if (savedCourses) {
      try {
        setEnrolledCourses(JSON.parse(savedCourses));
      } catch (error) {
        console.error("Failed to parse enrolled courses:", error);
        toast.error("Failed to load your enrolled courses");
      }
    }
  }, []);

  // Remove course from enrolled courses
  const handleUnenroll = (courseId: string) => {
    const courseToRemove = enrolledCourses.find(course => course.id === courseId);
    if (!courseToRemove) return;
    
    const updatedCourses = enrolledCourses.filter(course => course.id !== courseId);
    setEnrolledCourses(updatedCourses);
    localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));
    
    toast.success("Course removed", {
      description: `${courseToRemove.code} has been removed from your course wishlist.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Course Wishlist</h1>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Select value={selectedTerm} onValueChange={setSelectedTerm}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by term" />
              </SelectTrigger>
              <SelectContent>
                {terms.map(term => (
                  <SelectItem key={term} value={term}>
                    {term === "all" ? "All Terms" : term}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
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
        </div>
        
        {enrolledCourses.length === 0 ? (
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
            <h3 className="text-xl font-bold mb-2">No courses added</h3>
            <p className="text-gray-600 text-center max-w-md mb-4">
              You haven't added any courses yet. Go to Course Search to find and add them to your wishlist.
            </p>
            <Button asChild>
              <a href="/search">Browse Courses</a>
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-gray-600">
                {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"} {selectedTerm === "all" ? "enrolled" : `enrolled for ${selectedTerm}`}
              </p>
            </div>
            
            {viewMode === "card" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    onViewDetails={() => {}} 
                    actionButton={
                      <Button
                        className="w-full border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                        onClick={() => handleUnenroll(course.id)}
                      >
                        Remove from Wishlist
                      </Button>
                    }
                  />
                ))}
              </div>
            ) : (
              <CourseTable 
                courses={filteredCourses} 
                onUnenroll={handleUnenroll} 
              />
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default EnrolledCourses;
