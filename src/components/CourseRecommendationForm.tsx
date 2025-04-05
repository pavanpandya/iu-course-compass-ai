
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Course, careerPaths } from "@/data/mockData";

interface CourseRecommendationFormProps {
  onRecommend: (courses: Course[]) => void;
  courses: Course[];
}

const CourseRecommendationForm: React.FC<CourseRecommendationFormProps> = ({ 
  onRecommend, 
  courses 
}) => {
  const [careerGoal, setCareerGoal] = useState("");
  const [preferredSubjects, setPreferredSubjects] = useState("");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [enrollmentType, setEnrollmentType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDayToggle = (day: string) => {
    setAvailableDays(prev => {
      if (prev.includes(day)) {
        return prev.filter(d => d !== day);
      } else {
        return [...prev, day];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      // Find career path that matches the selected goal
      const selectedCareerPath = careerPaths.find(
        (path) => path.title.toLowerCase() === careerGoal.toLowerCase()
      );

      // Get the recommended course codes
      const recommendedCourseCodes = selectedCareerPath?.recommendedCourses || [];

      // Filter courses based on recommended codes
      let recommendedCourses = courses.filter((course) =>
        recommendedCourseCodes.includes(course.code)
      );

      // If preferred subjects are specified, prioritize courses that match
      if (preferredSubjects) {
        const subjects = preferredSubjects.toLowerCase().split(",").map(s => s.trim());
        
        // Sort recommended courses by how well they match preferred subjects
        recommendedCourses = recommendedCourses.sort((a, b) => {
          const aMatches = subjects.filter(subject => 
            a.name.toLowerCase().includes(subject) || 
            a.description.toLowerCase().includes(subject)
          ).length;
          
          const bMatches = subjects.filter(subject => 
            b.name.toLowerCase().includes(subject) || 
            b.description.toLowerCase().includes(subject)
          ).length;
          
          return bMatches - aMatches;
        });
      }

      // If available days are specified, filter for courses on those days
      if (availableDays.length > 0) {
        recommendedCourses = recommendedCourses.filter((course) =>
          course.schedule.days.some((day) => availableDays.includes(day))
        );
      }

      // Return the recommended courses
      onRecommend(recommendedCourses);
      setIsLoading(false);
    }, 1500);
  };

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="careerGoal">Career Goal</Label>
        <Select value={careerGoal} onValueChange={setCareerGoal} required>
          <SelectTrigger id="careerGoal">
            <SelectValue placeholder="Select your career goal" />
          </SelectTrigger>
          <SelectContent>
            {careerPaths.map((path) => (
              <SelectItem key={path.id} value={path.title}>
                {path.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="preferredSubjects">
          Preferred Subjects or Skills (comma-separated)
        </Label>
        <Textarea
          id="preferredSubjects"
          placeholder="e.g., Machine Learning, Statistics, Programming"
          value={preferredSubjects}
          onChange={(e) => setPreferredSubjects(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Available Days</Label>
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map((day) => (
            <Button
              key={day}
              type="button"
              variant={availableDays.includes(day) ? "default" : "outline"}
              onClick={() => handleDayToggle(day)}
              className="flex-1"
            >
              {day}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="enrollmentType">Enrollment Type</Label>
        <Select value={enrollmentType} onValueChange={setEnrollmentType} required>
          <SelectTrigger id="enrollmentType">
            <SelectValue placeholder="Select enrollment type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fulltime">Full-time (12+ credits)</SelectItem>
            <SelectItem value="parttime">Part-time (< 12 credits)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Generating Recommendations..." : "Get Course Recommendations"}
      </Button>
    </form>
  );
};

export default CourseRecommendationForm;
