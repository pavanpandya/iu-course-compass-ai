"use client";

import { FC, useState } from "react";
import { API_BASE_URL } from "@/config";
import { Button } from "@/components/ui/button";
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
}

const CourseRecommendationForm: React.FC<CourseRecommendationFormProps> = ({
  onRecommend,
}) => {
  const [careerGoal, setCareerGoal] = useState("");
  const [preferredSubjects, setPreferredSubjects] = useState("");
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [enrollmentType, setEnrollmentType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDayToggle = (day: string) => {
    setAvailableDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/recommendations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          career_goal: careerGoal,
          subject: preferredSubjects,
          enrollment_type: enrollmentType,
          available_days: availableDays,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onRecommend(data.recommendations || []);
      } else {
        console.error("Error fetching recommendations:", data);
        onRecommend([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      onRecommend([]);
    }

    setIsLoading(false);
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
          {daysOfWeek.map((day) => {
            const isSelected = availableDays.includes(day);
            return (
              <Button
                key={day}
                type="button"
                variant={isSelected ? "default" : "outline"}
                className={
                  isSelected
                    ? "flex-1 hover:bg-primary/90"
                    : "flex-1 hover:bg-accent hover:text-accent-foreground"
                }
                onClick={() => handleDayToggle(day)}
              >
                {day}
              </Button>
            );
          })}
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
            <SelectItem value="parttime">Part-time (&lt; 12 credits)</SelectItem>
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