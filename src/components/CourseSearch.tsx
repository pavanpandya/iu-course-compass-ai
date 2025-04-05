
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Course } from "@/data/mockData";
import { Search, Filter, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface CourseSearchProps {
  courses: Course[];
  onSearch: (filteredCourses: Course[]) => void;
}

const CourseSearch: React.FC<CourseSearchProps> = ({ courses, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [term, setTerm] = useState<string>("all");
  const [department, setDepartment] = useState<string>("all");
  const [creditRange, setCreditRange] = useState<number[]>([0, 5]);
  const [mode, setMode] = useState<string>("all");
  const [level, setLevel] = useState<string>("all");

  // Extract unique values for filters
  const terms = ["all", ...Array.from(new Set(courses.map(course => course.term)))];
  
  const departments = ["all", ...Array.from(new Set(courses.map(course => {
    const deptCode = course.code.split('-')[0];
    return deptCode;
  })))];

  const modes = ["all", ...Array.from(new Set(courses.map(course => course.mode)))];
  const levels = ["all", "100", "200", "300", "400", "Graduate"];

  // Apply filters
  useEffect(() => {
    let result = courses;
    
    // Apply text search
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(
        course =>
          course.name.toLowerCase().includes(lowerCaseSearch) ||
          course.code.toLowerCase().includes(lowerCaseSearch) ||
          course.description.toLowerCase().includes(lowerCaseSearch) ||
          course.professor.name.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    // Apply term filter
    if (term !== "all") {
      result = result.filter(course => course.term === term);
    }
    
    // Apply department filter
    if (department !== "all") {
      result = result.filter(course => course.code.startsWith(department));
    }
    
    // Apply credits filter
    result = result.filter(
      course => course.credits >= creditRange[0] && course.credits <= creditRange[1]
    );
    
    // Apply mode filter
    if (mode !== "all") {
      result = result.filter(course => course.mode === mode);
    }
    
    // Apply level filter
    if (level !== "all") {
      const levelNumber = parseInt(level);
      if (!isNaN(levelNumber)) {
        result = result.filter(course => {
          const courseNumber = parseInt(course.code.split('-')[1]);
          return courseNumber >= levelNumber && courseNumber < levelNumber + 100;
        });
      } else if (level === "Graduate") {
        result = result.filter(course => {
          const courseNumber = parseInt(course.code.split('-')[1]);
          return courseNumber >= 500;
        });
      }
    }
    
    onSearch(result);
  }, [searchTerm, courses, term, department, creditRange, mode, level, onSearch]);

  const resetFilters = () => {
    setSearchTerm("");
    setTerm("all");
    setDepartment("all");
    setCreditRange([0, 5]);
    setMode("all");
    setLevel("all");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search courses by name, code, description, or professor..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-9 w-9"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="term-filter">Term</Label>
            <Select value={term} onValueChange={setTerm}>
              <SelectTrigger id="term-filter">
                <SelectValue placeholder="Select term" />
              </SelectTrigger>
              <SelectContent>
                {terms.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t === "all" ? "All Terms" : t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="department-filter">Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger id="department-filter">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d === "all" ? "All Departments" : d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="mode-filter">Course Mode</Label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger id="mode-filter">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                {modes.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m === "all" ? "All Modes" : m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <Filter className="h-4 w-4" />
                {isOpen ? "Hide Advanced Filters" : "Show Advanced Filters"}
              </Button>
            </CollapsibleTrigger>
            
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
          
          <CollapsibleContent className="space-y-4 mt-4">
            <div>
              <Label className="mb-2 block">Credits: {creditRange[0]} - {creditRange[1]}</Label>
              <Slider
                defaultValue={[0, 5]}
                max={5}
                step={1}
                value={creditRange}
                onValueChange={setCreditRange}
              />
            </div>
            
            <div>
              <Label htmlFor="level-filter">Course Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger id="level-filter">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l === "all" ? "All Levels" : 
                        l === "Graduate" ? "Graduate (500+)" : 
                        `${l} Level`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Days</Label>
              <div className="flex flex-wrap gap-4 mt-2">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox id={day} />
                    <Label htmlFor={day}>{day.substring(0, 3)}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <Label>Time of Day</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="morning" />
                  <Label htmlFor="morning">Morning (8AM-12PM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="afternoon" />
                  <Label htmlFor="afternoon">Afternoon (12PM-5PM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="evening" />
                  <Label htmlFor="evening">Evening (5PM-10PM)</Label>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default CourseSearch;
