
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, X, LayoutGrid, List } from "lucide-react";
import { Course, departments, professors } from "@/data/mockData";
import { Separator } from "@/components/ui/separator";

interface CourseSearchProps {
  courses: Course[];
  onSearch: (results: Course[]) => void;
  onViewChange?: (view: 'card' | 'table') => void;
  currentView?: 'card' | 'table';
}

const CourseSearch: React.FC<CourseSearchProps> = ({ 
  courses, 
  onSearch, 
  onViewChange, 
  currentView = 'card' 
}) => {
  // Filter states
  const [term, setTerm] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [professorName, setProfessorName] = useState<string>("");
  const [courseNumber, setCourseNumber] = useState<string>("");
  const [keywords, setKeywords] = useState<string>("");
  const [mode, setMode] = useState<string>("");
  const [credits, setCredits] = useState<number[]>([1, 4]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  // Effect to search when filters change
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [term, level, department, professorName, courseNumber, keywords, mode, credits]);

  const handleSearch = () => {
    let results = [...courses];

    if (term) {
      results = results.filter((course) => course.term.toLowerCase() === term.toLowerCase());
    }

    if (level) {
      // Assuming graduate courses have numbers >= 500
      if (level === "graduate") {
        results = results.filter((course) => {
          const num = parseInt(course.number.replace(/\D/g, ''));
          return num >= 500;
        });
      } else {
        results = results.filter((course) => {
          const num = parseInt(course.number.replace(/\D/g, ''));
          return num < 500;
        });
      }
    }

    if (department) {
      results = results.filter((course) => 
        course.departmentCode.toLowerCase() === department.toLowerCase()
      );
    }

    if (professorName) {
      results = results.filter((course) =>
        course.professor.name.toLowerCase().includes(professorName.toLowerCase())
      );
    }

    if (courseNumber) {
      results = results.filter((course) =>
        course.number.toLowerCase().includes(courseNumber.toLowerCase())
      );
    }

    if (keywords) {
      const searchTerms = keywords.toLowerCase().split(" ");
      results = results.filter((course) =>
        searchTerms.some(
          (term) =>
            course.name.toLowerCase().includes(term) ||
            course.description.toLowerCase().includes(term)
        )
      );
    }

    if (mode) {
      results = results.filter(
        (course) => course.mode.toLowerCase() === mode.toLowerCase()
      );
    }

    if (credits.length === 2) {
      results = results.filter(
        (course) => course.credits >= credits[0] && course.credits <= credits[1]
      );
    }

    onSearch(results);
  };

  const clearFilters = () => {
    setTerm("");
    setLevel("");
    setDepartment("");
    setProfessorName("");
    setCourseNumber("");
    setKeywords("");
    setMode("");
    setCredits([1, 4]);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col gap-4">
        {/* Top row with main filters and view toggle */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search bar */}
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search courses by name or keywords..."
              className="pl-10"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          
          {/* Common filters */}
          <div className="flex gap-2">
            <Select value={term} onValueChange={setTerm}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Term</SelectItem>
                <SelectItem value="Fall">Fall</SelectItem>
                <SelectItem value="Spring">Spring</SelectItem>
                <SelectItem value="Summer">Summer</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any Department</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.code}>
                    {dept.code}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {onViewChange && (
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={currentView === 'card' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => onViewChange('card')}
                  className="rounded-none"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={currentView === 'table' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => onViewChange('table')}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Filter toggle and clear buttons */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            {isFilterExpanded ? "Hide" : "Show"} Advanced Filters
          </Button>
          {isFilterExpanded && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Clear All
            </Button>
          )}
        </div>

        {/* Expandable filters */}
        {isFilterExpanded && (
          <>
            <Separator />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div className="space-y-1">
                <label className="text-sm font-medium">Level</label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Level</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Professor</label>
                <Select value={professorName} onValueChange={setProfessorName}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select professor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Professor</SelectItem>
                    {professors.map((prof) => (
                      <SelectItem key={prof.id} value={prof.name}>
                        {prof.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Course Number</label>
                <Input
                  placeholder="e.g. B551, M365"
                  value={courseNumber}
                  onChange={(e) => setCourseNumber(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Mode</label>
                <Select value={mode} onValueChange={setMode}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Mode</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="in-person">In-Person</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1 col-span-full md:col-span-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Credits: {credits[0]} - {credits[1]}</label>
                </div>
                <Slider
                  defaultValue={[1, 4]}
                  min={1}
                  max={6}
                  step={1}
                  value={credits}
                  onValueChange={setCredits}
                  className="py-4"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseSearch;
