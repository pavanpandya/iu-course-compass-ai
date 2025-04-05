
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Course } from "@/data/mockData";
import { useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CourseCard from "@/components/CourseCard";
import CourseTable from "@/components/CourseTable";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Layout, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const Enrolled: React.FC = () => {
  const location = useLocation();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>(() => {
    // Get enrolled courses from state or localStorage
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [selectedTerm, setSelectedTerm] = useState<string>("all");

  // Group courses by term
  const coursesByTerm = enrolledCourses.reduce((acc, course) => {
    const termKey = `${course.term} ${course.year}`;
    if (!acc[termKey]) {
      acc[termKey] = [];
    }
    acc[termKey].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  // Extract unique terms
  const terms = Object.keys(coursesByTerm);

  // Filter courses based on selected term
  const filteredCourses = selectedTerm === "all" 
    ? enrolledCourses 
    : coursesByTerm[selectedTerm] || [];

  // Handle course operations
  const handleViewDetails = (course: Course) => {
    // Implementation would typically open a modal
    console.log("View details:", course);
  };

  const handleUnenroll = (courseId: string) => {
    const updatedCourses = enrolledCourses.filter(course => course.id !== courseId);
    setEnrolledCourses(updatedCourses);
    localStorage.setItem('cartItems', JSON.stringify(updatedCourses));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Enrolled Courses</h1>
          <div className="flex items-center gap-4">
            <Select value={selectedTerm} onValueChange={setSelectedTerm}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Terms</SelectItem>
                {terms.map(term => (
                  <SelectItem key={term} value={term}>{term}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={viewMode === 'card' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('card')}
                className="rounded-none"
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('table')}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              <Layout className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">No courses enrolled</h3>
            <p className="text-gray-600 text-center max-w-md">
              You haven't enrolled in any courses yet. Browse the course catalog to get started.
            </p>
            <Button className="mt-4" onClick={() => window.location.href = '/search'}>
              Browse Courses
            </Button>
          </div>
        ) : (
          <div>
            {viewMode === 'card' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    onViewDetails={handleViewDetails} 
                    onAddToCart={() => handleUnenroll(course.id)} 
                  />
                ))}
              </div>
            ) : (
              <CourseTable 
                courses={filteredCourses}
                onViewDetails={handleViewDetails}
                onUnenroll={handleUnenroll}
              />
            )}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Enrolled;
