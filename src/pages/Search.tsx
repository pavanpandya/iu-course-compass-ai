import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Course } from '../types';
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

interface SearchProps {
  onAddToCart: (courseId: string) => void;
}

const CourseCard: React.FC<{ course: Course; onAddToCart: () => void }> = ({ course, onAddToCart }) => {
  return (
    <Card className="bg-card text-card-foreground shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Instructor: {course.instructor}</p>
        <p>Credits: {course.credits}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge variant="secondary">Available</Badge>
        <Button onClick={onAddToCart}>Add to Cart</Button>
      </CardFooter>
    </Card>
  );
};

const Search: React.FC<SearchProps> = ({ onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [credits, setCredits] = useState<number[]>([0, 5]);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch courses from API or database here
    // Replace this with your actual data fetching logic
    const mockCourses: Course[] = [
      { id: '1', title: 'Introduction to React', description: 'Learn the basics of React', instructor: 'John Doe', credits: 3, term: 'Fall 2023' },
      { id: '2', title: 'Advanced JavaScript', description: 'Deep dive into JavaScript concepts', instructor: 'Jane Smith', credits: 4, term: 'Spring 2024' },
      { id: '3', title: 'Data Structures and Algorithms', description: 'Master data structures and algorithms', instructor: 'David Johnson', credits: 5, term: 'Fall 2023' },
    ];
    setCourses(mockCourses);
  }, []);

  const filteredCourses = courses.filter(course => {
    const searchTermMatch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const creditsMatch = course.credits >= credits[0] && course.credits <= credits[1];

    const termMatch = selectedTerm ? course.term === selectedTerm : true;

    const dateMatch = selectedDate ? course.term === format(selectedDate, 'MMMM yyyy') : true;

    return searchTermMatch && creditsMatch && termMatch && dateMatch;
  });

  const handleAddToCart = (course: Course) => {
    const courseId = course.id;
    onAddToCart(courseId);

    toast({
      title: "Course added to cart.",
      description: `${course.title} has been successfully added to your cart.`,
    })
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Course Search</h1>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-1">
          <Card className="bg-card text-card-foreground shadow-md">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <Input
                    type="text"
                    id="search"
                    placeholder="Search by course title, description, or instructor"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <Separator />

                <div>
                  <Label>Credits</Label>
                  <div className="flex items-center space-x-2">
                    <p>{credits[0]}</p>
                    <Slider
                      defaultValue={credits}
                      max={5}
                      step={1}
                      onValueChange={(value) => setCredits(value)}
                    />
                    <p>{credits[1]}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label>Term</Label>
                  <Select onValueChange={setSelectedTerm}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fall 2023">Fall 2023</SelectItem>
                      <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                      <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center" side="bottom">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) =>
                          date > new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3 grid gap-4 grid-cols-1 md:grid-cols-2">
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onAddToCart={() => handleAddToCart(course)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
