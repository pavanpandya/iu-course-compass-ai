
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/data/mockData";
import { X, Calendar, MapPin, Clock, Users, Award } from "lucide-react";
import GradeDistributionChart from "./GradeDistributionChart";

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (course: Course) => void;
}

const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!course) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">{course.code}</p>
              <DialogTitle className="text-2xl font-bold">{course.name}</DialogTitle>
              <DialogDescription className="mt-1">
                {course.term} {course.year} • {course.credits} {course.credits === 1 ? "credit" : "credits"}
              </DialogDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={course.mode === "Online" ? "outline" : "default"}>
                {course.mode}
              </Badge>
              <DialogClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="grades">Grade Distribution</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Course Information</h3>
                  <div className="mt-2 space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-iu-crimson" />
                      <span>{course.professor.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-iu-crimson" />
                      <span>{course.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-iu-crimson" />
                      <span>
                        {course.schedule.days.join(", ")} {course.schedule.startTime} - {course.schedule.endTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-iu-crimson" />
                      <span>
                        {course.term} {course.year}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-iu-crimson" />
                      <span>
                        {course.availability.enrolled}/{course.availability.total} enrolled
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">Prerequisites</h3>
                  <ul className="list-disc list-inside mt-2">
                    {course.prerequisites.map((prereq, index) => (
                      <li key={index} className="text-sm">{prereq}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">Textbooks</h3>
                  <ul className="list-disc list-inside mt-2">
                    {course.textbooks.map((book, index) => (
                      <li key={index} className="text-sm">{book}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">Description</h3>
                  <p className="mt-2 text-sm">{course.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg">Professor Information</h3>
                  <div className="mt-2 text-sm">
                    <p><span className="font-medium">Name:</span> {course.professor.name}</p>
                    <p><span className="font-medium">Department:</span> {course.professor.department}</p>
                    <p><span className="font-medium">Email:</span> {course.professor.email}</p>
                    <p><span className="font-medium">Rating:</span> {course.professor.avgRating.toFixed(1)}/5.0</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
              <Button onClick={() => onAddToCart(course)}>Add to Cart</Button>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Student Reviews (OCQ)</h3>
                  <p className="text-sm text-muted-foreground">
                    Online Course Questionnaire results
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <p className="font-bold text-xl">{course.ocq.overall.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">Overall</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-xl">{course.ocq.difficulty.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">Difficulty</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-xl">{course.ocq.workload.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">Workload</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-xl">{course.ocq.organization.toFixed(1)}</p>
                    <p className="text-xs text-muted-foreground">Organization</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Student Comments</h4>
                {course.ocq.comments.map((comment, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="bg-iu-crimson text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                          {comment.rating}
                        </div>
                        <p className="font-medium ml-2">Anonymous Student</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.date}</p>
                    </div>
                    <p className="text-sm">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="grades">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">Grade Distribution</h3>
                <p className="text-sm text-muted-foreground">
                  Historical grade distribution for {course.code} with {course.professor.name}
                </p>
              </div>

              <div className="h-64">
                <GradeDistributionChart grades={course.gradeDistribution} />
              </div>

              <div className="grid grid-cols-6 gap-2 text-center mt-4">
                {Object.entries(course.gradeDistribution).map(([grade, count]) => (
                  <div key={grade} className="rounded-md bg-gray-100 p-2">
                    <p className="font-medium">{grade}</p>
                    <p className="text-sm">
                      {count} ({Math.round((count / 
                        (course.gradeDistribution.A + 
                         course.gradeDistribution.B + 
                         course.gradeDistribution.C + 
                         course.gradeDistribution.D + 
                         course.gradeDistribution.F +
                         course.gradeDistribution.Withdraw)) * 100)}%)
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailModal;
