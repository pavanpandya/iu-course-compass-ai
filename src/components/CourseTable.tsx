import { FC } from "react";
import { Course } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingCart } from "lucide-react";

interface CourseTableProps {
  courses: Course[];
  onUnenroll: (courseId: string) => void;
  addToCartButton?: boolean;
  onAddToCart?: (courseId: string) => void;
}

const CourseTable: FC<CourseTableProps> = ({ 
  courses, 
  onUnenroll, 
  addToCartButton = false,
  onAddToCart = () => {}
}) => {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Course Name</TableHead>
            <TableHead>Professor</TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>Credits</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>Term</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell className="font-medium">{course.code}</TableCell>
              <TableCell>{course.name}</TableCell>
              <TableCell>{course.professor.name}</TableCell>
              <TableCell>
                {course.schedule.days.join(", ")} {course.schedule.startTime}-{course.schedule.endTime}
              </TableCell>
              <TableCell>{course.credits}</TableCell>
              <TableCell>
                <Badge className={course.mode === "Online" 
                  ? "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground" 
                  : "bg-[#900] text-white"}>
                  {course.mode}
                </Badge>
              </TableCell>
              <TableCell>{course.term}</TableCell>
              <TableCell className="text-right">
                {addToCartButton ? (
                  <Button
                    className="h-9 px-3 border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => onAddToCart(course.id)}
                  >
                    <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                    Add to Cart
                  </Button>
                ) : (
                  <Button
                    className="h-9 px-3 border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => onUnenroll(course.id)}
                  >
                    Unenroll
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
