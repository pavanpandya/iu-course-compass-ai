"use client";

import { FC } from "react";
import { Course } from "@/data/mockData";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock, BookOpen } from "lucide-react";

interface CourseCardProps {
  course: Course;
  onViewDetails: (course: Course) => void;
  onAddToCart?: (course: Course) => void;
  actionButton?: React.ReactNode;
}

const CourseCard: FC<CourseCardProps> = ({
  course,
  onViewDetails,
  onAddToCart,
  actionButton
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
        <Badge 
          className={`mb-1 ${
            course.mode === "Online"
              ? "bg-muted text-foreground hover:bg-accent hover:text-accent-foreground"
              : "bg-[#900] text-white"
          }`}
        >
          {course.mode}
        </Badge>
          <Badge className="bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground">
            {course.term}
          </Badge>
        </div>
        <CardTitle className="flex flex-col gap-1 min-h-[2.75rem]">
          <span className="text-sm font-medium text-muted-foreground">
            {course.code}
          </span>
          {course.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            {course.professor.name}
          </div>
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {course.schedule.days.join(", ")}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            {course.schedule.startTime} - {course.schedule.endTime}
          </div>
          <div className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            {course.credits} {course.credits === 1 ? "credit" : "credits"}
          </div>
        </div>

        <p className="mt-3 line-clamp-3 text-sm">
          {course.description}
        </p>
      </CardContent>

      <CardFooter className="pt-0 flex items-center justify-between gap-2">
      <Button 
        className="w-full border border-border bg-muted text-foreground hover:bg-accent hover:text-accent-foreground"
        onClick={() => onViewDetails(course)}
      >
        Details
      </Button>
        {actionButton ? (
          actionButton
        ) : onAddToCart ? (
          <Button 
            className="w-full"
            onClick={() => onAddToCart(course)}
          >
            Add to Cart
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
