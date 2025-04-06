import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CourseRecommendationForm from "@/components/CourseRecommendationForm";
import CourseCard from "@/components/CourseCard";
import CourseDetailModal from "@/components/CourseDetailModal";
import CartDrawer from "@/components/CartDrawer";
import { Course } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { API_BASE_URL } from "@/config";

const Recommendations: React.FC = () => {
  const [recommendedCourses, setRecommendedCourses] = useState<Course[]>([]);
  const [careerGoal, setCareerGoal] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Course[]>([]);
  const [selectedTab, setSelectedTab] = useState("courses");
  const [roadmapUrl, setRoadmapUrl] = useState<string | null>(null);
  const [isFetchingRoadmap, setIsFetchingRoadmap] = useState(false);
  const [hasTriedFetchingRoadmap, setHasTriedFetchingRoadmap] = useState(false);

  const handleViewDetails = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
  };

  useEffect(() => {
    if (
      selectedTab === "roadmap" &&
      careerGoal &&
      !roadmapUrl &&
      !isFetchingRoadmap &&
      !hasTriedFetchingRoadmap
    ) {
      setIsFetchingRoadmap(true);
      fetch(`${API_BASE_URL}/roadmap`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "image/png",
        },
        body: JSON.stringify({ career_goal: careerGoal }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch roadmap");
          return res.blob();
        })
        .then((blob) => {
          const objectUrl = URL.createObjectURL(blob);
          setRoadmapUrl(objectUrl);
        })
        .catch(() => {
          toast.error("Unable to load roadmap.");
          setHasTriedFetchingRoadmap(true);
        })
        .finally(() => setIsFetchingRoadmap(false));
    }
  }, [selectedTab, careerGoal, roadmapUrl, isFetchingRoadmap, hasTriedFetchingRoadmap]);

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
        <h1 className="text-3xl font-bold mb-6">AI Course Recommendations & Roadmap</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Tell us about your goals</h2>
              <p className="text-gray-600 mb-6">
                Share your career ambitions, preferred subjects, and schedule constraints to get personalized course recommendations and tailored roadmap.
              </p>

              <CourseRecommendationForm
                onRecommend={(courses, goal) => {
                  setRecommendedCourses(courses);
                  setCareerGoal(goal);
                  setRoadmapUrl(null);
                  setHasTriedFetchingRoadmap(false);
                }}
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Your Recommendations</h2>

              {recommendedCourses.length > 0 ? (
                <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                  <TabsList>
                    <TabsTrigger value="courses">Course List</TabsTrigger>
                    <TabsTrigger value="career">Career Alignment</TabsTrigger>
                    <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                  </TabsList>

                  <TabsContent value="courses" className="mt-4">
                    <div className="space-y-6">
                      {recommendedCourses.map((course) => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          onViewDetails={handleViewDetails}
                          onAddToCart={addToCart}
                        />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="career" className="mt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-3">Career Path Progress</h3>
                      <p className="text-sm text-gray-600 mb-6">
                        See how these recommended courses align with your selected career path.
                      </p>

                      <div className="space-y-4">
                        {recommendedCourses.map((course) => (
                          <div
                            key={course.id}
                            className="bg-white p-4 rounded-lg border shadow-sm"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">
                                {course.code}: {course.name}
                              </h4>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                High Relevance
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              This course helps develop key skills in{" "}
                              <span className="font-medium">{course.department}</span>, essential for your career path.
                            </p>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500"
                                style={{
                                  width: `${85 + Math.floor(Math.random() * 16)}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="roadmap" className="mt-4">
                    <div className="flex justify-center items-center bg-gray-50 rounded-lg p-6 min-h-[300px]">
                      {isFetchingRoadmap ? (
                        <p className="text-gray-500">Loading roadmap...</p>
                      ) : roadmapUrl ? (
                        <Zoom>
                          <img
                            src={roadmapUrl}
                            alt="Career Roadmap"
                            className="max-w-full max-h-[600px] rounded-lg cursor-zoom-in"
                            loading="lazy"
                          />
                        </Zoom>
                      ) : hasTriedFetchingRoadmap ? (
                        <p className="text-red-500">Failed to load roadmap. Please try again later.</p>
                      ) : (
                        <p className="text-gray-500">Roadmap not available.</p>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
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
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-2">No recommendations yet</h3>
                  <p className="text-gray-600 text-center max-w-md">
                    Fill out the form with your career goals and preferences to receive personalized recommendations.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
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

export default Recommendations;