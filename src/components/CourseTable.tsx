
import React from "react";
import { Course } from "@/data/mockData";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CourseTableProps {
  courses: Course[];
  onViewDetails: (course: Course) => void;
  onUnenroll: (courseId: string) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({ 
  courses, 
  onViewDetails, 
  onUnenroll 
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Professor</TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.code}</TableCell>
              <TableCell>
                <div className="max-w-xs">
                  <p className="truncate font-medium" title={course.name}>
                    {course.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {course.term} {course.year} • {course.credits} {course.credits === 1 ? "credit" : "credits"}
                  </p>
                </div>
              </TableCell>
              <TableCell>{course.professor.name}</TableCell>
              <TableCell>
                {course.schedule.days.join(", ")} 
                <span className="block text-xs">
                  {course.schedule.startTime} - {course.schedule.endTime}
                </span>
              </TableCell>
              <TableCell>{course.location}</TableCell>
              <TableCell>
                <Badge variant={course.mode === "Online" ? "outline" : "default"}>
                  {course.mode}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetails(course)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onUnenroll(course.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
