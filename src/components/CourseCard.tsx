
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Calendar, Users, Book, Award } from "lucide-react";
import { Course } from "@/data/mockData";

interface CourseCardProps {
  course: Course;
  onViewDetails: (course: Course) => void;
  onAddToCart: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onViewDetails, onAddToCart }) => {
  // Calculate availability percentage
  const availabilityPercentage = Math.round((course.availability.enrolled / course.availability.total) * 100);
  
  // Determine availability status and color
  const getAvailabilityStatus = () => {
    if (availabilityPercentage >= 100) return { text: "Full", color: "bg-red-500" };
    if (availabilityPercentage >= 90) return { text: "Almost Full", color: "bg-amber-500" };
    return { text: "Available", color: "bg-green-500" };
  };
  
  const availability = getAvailabilityStatus();
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{course.code}</p>
            <CardTitle className="text-lg mt-1">{course.name}</CardTitle>
          </div>
          <Badge variant={course.mode === "Online" ? "outline" : "default"} className="ml-2">
            {course.mode}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="py-2 flex-grow">
        <div className="space-y-3 text-sm">
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
              {course.term} {course.year} • {course.credits} {course.credits === 1 ? "credit" : "credits"}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-iu-crimson" />
            <div className="flex items-center gap-1 flex-grow">
              <div className="h-2 w-full bg-gray-200 rounded-full">
                <div
                  className={`h-2 rounded-full ${availability.color}`}
                  style={{ width: `${Math.min(availabilityPercentage, 100)}%` }}
                />
              </div>
              <span className="whitespace-nowrap text-xs">
                {course.availability.enrolled}/{course.availability.total}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Book className="h-4 w-4 text-iu-crimson" />
            <span className="flex items-center gap-1">
              Rating: 
              <span className="font-semibold">{course.ocq.overall.toFixed(1)}/5</span>
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-3 border-t">
        <Button variant="outline" className="flex-1" onClick={() => onViewDetails(course)}>
          View Details
        </Button>
        <Button className="flex-1" onClick={() => onAddToCart(course)}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
