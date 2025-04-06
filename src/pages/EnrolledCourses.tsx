import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Course } from "@/data/mockData";
import { ChevronDown, List, Grid } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import CourseTable from "@/components/CourseTable";
import CourseDetailModal from "@/components/CourseDetailModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

const EnrolledCourses: React.FC = () => {
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [validationStep, setValidationStep] = useState(0);
  const [validationStatus, setValidationStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const terms = ["all", ...Array.from(new Set(enrolledCourses.map(course => course.term)))];
  const filteredCourses = selectedTerm === "all" ? enrolledCourses : enrolledCourses.filter(course => course.term === selectedTerm);

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

  useEffect(() => {
    if (validationStatus === "valid" && !sessionStorage.getItem("confettiShown")) {
      setShowConfetti(true);
      sessionStorage.setItem("confettiShown", "true");
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [validationStatus]);

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

  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsDetailModalOpen(true);
  };

  const validateCourses = async () => {
    setValidationStep(0);
    setValidationStatus("idle");
    setErrorMessages([]);
    setIsDialogOpen(true);

    // Step 1: Check credit count
    await new Promise(res => setTimeout(res, 500));
    const totalCredits = filteredCourses.reduce((acc, c) => acc + c.credits, 0);
    if (totalCredits < 12) {
      setErrorMessages(["You need at least 12 credits."]);
      setValidationStatus("invalid");
      return;
    }
    setValidationStep(1);

    // Step 2: Check for time clashes
    await new Promise(res => setTimeout(res, 700));
    const hasClash = filteredCourses.some((course, i) =>
      filteredCourses.some((other, j) => {
        if (i !== j) {
          const c1 = course.schedule;
          const c2 = other.schedule;

          if (
            Array.isArray(c1.days) &&
            Array.isArray(c2.days) &&
            c1.startTime &&
            c1.endTime &&
            c2.startTime &&
            c2.endTime
          ) {
            const sameDay = c1.days.some(day => c2.days.includes(day));
            const timeOverlap = !(c1.endTime <= c2.startTime || c1.startTime >= c2.endTime);
            return sameDay && timeOverlap;
          }
        }
        return false;
      })
    );

    if (hasClash) {
      setErrorMessages(["There is a time conflict between courses."]);
      setValidationStatus("invalid");
      return;
    }
    setValidationStep(2);

    // Step 3: Check for prerequisites
    await new Promise(res => setTimeout(res, 700));
    const unmetPrereqs = filteredCourses.filter(course =>
      course.prerequisites?.some(prereq => !enrolledCourses.find(c => c.code === prereq))
    );
    if (unmetPrereqs.length > 0) {
      setErrorMessages(["You do not meet the prerequisites for some courses."]);
      setValidationStatus("invalid");
      return;
    }

    setValidationStep(3);
    await new Promise(res => setTimeout(res, 500));
    setValidationStatus("valid");
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {showConfetti && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          <Confetti width={width || window.innerWidth} height={height || window.innerHeight} numberOfPieces={300} />
        </div>
      )}

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
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
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
                {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"}{" "}
                {selectedTerm === "all" ? "enrolled" : `enrolled for ${selectedTerm}`}
              </p>
            </div>

            <Button onClick={validateCourses} className="mb-6">
              Validate Courses
            </Button>

            {viewMode === "card" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onViewDetails={() => handleViewDetails(course)}
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
              <CourseTable courses={filteredCourses} onUnenroll={handleUnenroll} />
            )}
          </>
        )}

        {/* Validation Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Course Validation</DialogTitle>
              <DialogDescription>
                Checking your enrollment status...
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-4">
              {["Minimum 12 credits", "No time clash", "Prerequisites met"].map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: validationStep >= index ? 1 : 0.3, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                  className={`p-3 border rounded-md ${
                    validationStep > index
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  }`}
                >
                  {validationStep > index ? "✅" : "⏳"} {step}
                </motion.div>
              ))}

              {validationStatus === "invalid" && (
                <div className="text-red-500 mt-2 space-y-1">
                  {errorMessages.map((msg, i) => (
                    <p key={i}>❌ {msg}</p>
                  ))}
                </div>
              )}

              {validationStatus === "valid" && (
                <div className="text-green-600 font-semibold text-center text-lg mt-4">
                  🎉 All checks passed! Ready to Enroll.
                </div>
              )}
            </div>

            <DialogFooter className="mt-4">
              {validationStatus === "valid" ? (
                <div className="w-full">
                  <Button disabled className="w-full">
                    Ready to Enroll 🚀
                  </Button>
                  <p className="text-xs text-muted-foreground mt-1 text-center">
                    This feature will be available in the next update.
                  </p>
                </div>
              ) : (
                <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Course Detail Modal */}
        <CourseDetailModal
          course={selectedCourse}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          onAddToCart={() => {}}
        />
      </main>

      <Footer />
    </div>
  );
};

export default EnrolledCourses;