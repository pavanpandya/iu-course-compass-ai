
// Mock data for IU Course Compass AI

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  departmentCode: string;
  number: string;
  credits: number;
  term: string;
  year: number;
  description: string;
  professor: Professor;
  location: string;
  schedule: {
    days: string[];
    startTime: string;
    endTime: string;
  };
  mode: "Online" | "In-Person" | "Hybrid";
  availability: {
    total: number;
    enrolled: number;
  };
  prerequisites: string[];
  textbooks: string[];
  ocq: OCQRating;
  gradeDistribution: GradeDistribution;
}

export interface Professor {
  id: string;
  name: string;
  department: string;
  email: string;
  avgRating: number;
}

export interface OCQRating {
  overall: number;
  difficulty: number;
  workload: number;
  organization: number;
  comments: {
    text: string;
    date: string;
    rating: number;
  }[];
}

export interface GradeDistribution {
  A: number;
  B: number;
  C: number;
  D: number;
  F: number;
  Withdraw: number;
}

export interface Department {
  id: string;
  name: string;
  code: string;
}

// Mock professors
export const professors: Professor[] = [
  {
    id: "p1",
    name: "Dr. Emily Johnson",
    department: "Computer Science",
    email: "emjohns@indiana.edu",
    avgRating: 4.7,
  },
  {
    id: "p2",
    name: "Dr. Michael Chen",
    department: "Statistics",
    email: "mchen@indiana.edu",
    avgRating: 4.2,
  },
  {
    id: "p3",
    name: "Dr. Sarah Williams",
    department: "Informatics",
    email: "swillia@indiana.edu",
    avgRating: 4.9,
  },
  {
    id: "p4",
    name: "Dr. Robert Davis",
    department: "Mathematics",
    email: "rdavis@indiana.edu",
    avgRating: 3.8,
  },
  {
    id: "p5",
    name: "Dr. Jessica Patel",
    department: "Data Science",
    email: "jpatel@indiana.edu",
    avgRating: 4.5,
  },
];

// Mock Departments
export const departments: Department[] = [
  { id: "d1", name: "Computer Science", code: "CSCI" },
  { id: "d2", name: "Data Science", code: "DSCI" },
  { id: "d3", name: "Informatics", code: "INFO" },
  { id: "d4", name: "Statistics", code: "STAT" },
  { id: "d5", name: "Mathematics", code: "MATH" },
  { id: "d6", name: "Business", code: "BUS" },
  { id: "d7", name: "Economics", code: "ECON" },
];

// Mock courses
export const courses: Course[] = [
  {
    id: "c1",
    name: "Introduction to Artificial Intelligence",
    code: "CSCI-B551",
    department: "Computer Science",
    departmentCode: "CSCI",
    number: "B551",
    credits: 3,
    term: "Spring",
    year: 2024,
    description:
      "Introduction to the basic principles and techniques of artificial intelligence. Topics include problem solving, knowledge representation, machine learning, and natural language processing.",
    professor: professors[0],
    location: "Luddy Hall 1106",
    schedule: {
      days: ["Monday", "Wednesday"],
      startTime: "10:00",
      endTime: "11:15",
    },
    mode: "In-Person",
    availability: {
      total: 120,
      enrolled: 98,
    },
    prerequisites: ["CSCI-C200", "CSCI-C343"],
    textbooks: ["Artificial Intelligence: A Modern Approach by Stuart Russell and Peter Norvig"],
    ocq: {
      overall: 4.6,
      difficulty: 3.8,
      workload: 4.2,
      organization: 4.5,
      comments: [
        {
          text: "One of the best courses I've taken at IU! Dr. Johnson's lectures are engaging and the projects are challenging but rewarding.",
          date: "12/15/2023",
          rating: 5,
        },
        {
          text: "Heavy workload but worth it. You learn a lot about AI fundamentals.",
          date: "12/10/2023",
          rating: 4,
        },
      ],
    },
    gradeDistribution: {
      A: 45,
      B: 30,
      C: 15,
      D: 5,
      F: 3,
      Withdraw: 2,
    },
  },
  {
    id: "c2",
    name: "Data Mining",
    code: "DSCI-D590",
    department: "Data Science",
    departmentCode: "DSCI",
    number: "D590",
    credits: 3,
    term: "Fall",
    year: 2024,
    description:
      "Explores topics in data mining and knowledge discovery in databases (KDD). Topics include feature selection, feature extraction, supervised learning, unsupervised learning, and mining text and web data.",
    professor: professors[4],
    location: "Luddy Hall 1120",
    schedule: {
      days: ["Tuesday", "Thursday"],
      startTime: "14:30",
      endTime: "15:45",
    },
    mode: "Hybrid",
    availability: {
      total: 80,
      enrolled: 76,
    },
    prerequisites: ["CSCI-C343", "MATH-M365"],
    textbooks: ["Introduction to Data Mining by Tan, Steinbach, and Kumar"],
    ocq: {
      overall: 4.3,
      difficulty: 4.0,
      workload: 4.5,
      organization: 4.1,
      comments: [
        {
          text: "Dr. Patel really knows her stuff. The projects are challenging but she's always available for help.",
          date: "05/10/2023",
          rating: 4.5,
        },
        {
          text: "Tons of work but you learn practical skills that look great on a resume.",
          date: "05/08/2023",
          rating: 4,
        },
      ],
    },
    gradeDistribution: {
      A: 35,
      B: 32,
      C: 8,
      D: 3,
      F: 1,
      Withdraw: 1,
    },
  },
  {
    id: "c3",
    name: "Statistical Analysis",
    code: "STAT-S520",
    department: "Statistics",
    departmentCode: "STAT",
    number: "S520",
    credits: 4,
    term: "Spring",
    year: 2024,
    description:
      "Basic statistical theory, probability distributions, sampling distributions, confidence intervals, hypothesis testing, and simple linear regression with applications.",
    professor: professors[1],
    location: "Ballantine Hall 305",
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      startTime: "09:00",
      endTime: "10:15",
    },
    mode: "In-Person",
    availability: {
      total: 60,
      enrolled: 54,
    },
    prerequisites: ["MATH-M211", "MATH-M212"],
    textbooks: ["Statistical Inference by Casella and Berger"],
    ocq: {
      overall: 4.0,
      difficulty: 4.2,
      workload: 4.4,
      organization: 3.8,
      comments: [
        {
          text: "Dr. Chen explains complex statistical concepts clearly, but the exams are tough.",
          date: "12/18/2023",
          rating: 4,
        },
        {
          text: "Excellent course for building a foundation in statistics. Be prepared to work hard.",
          date: "12/15/2023",
          rating: 4.5,
        },
      ],
    },
    gradeDistribution: {
      A: 20,
      B: 24,
      C: 10,
      D: 4,
      F: 2,
      Withdraw: 4,
    },
  },
  {
    id: "c4",
    name: "Human-Computer Interaction Design",
    code: "INFO-I541",
    department: "Informatics",
    departmentCode: "INFO",
    number: "I541",
    credits: 3,
    term: "Fall",
    year: 2024,
    description:
      "Core principles and methods of human-computer interaction design, including user research, prototyping, evaluation, and the design of interactive systems.",
    professor: professors[2],
    location: "Luddy Hall 2000",
    schedule: {
      days: ["Tuesday", "Thursday"],
      startTime: "11:30",
      endTime: "12:45",
    },
    mode: "In-Person",
    availability: {
      total: 45,
      enrolled: 40,
    },
    prerequisites: ["INFO-I308"],
    textbooks: ["Interaction Design: Beyond Human-Computer Interaction by Sharp, Rogers, and Preece"],
    ocq: {
      overall: 4.8,
      difficulty: 3.5,
      workload: 4.0,
      organization: 4.9,
      comments: [
        {
          text: "Dr. Williams is the best professor I've had at IU. Her course is practical and she brings in real-world projects.",
          date: "05/12/2023",
          rating: 5,
        },
        {
          text: "Great balance of theory and practice. The group projects are excellent resume builders.",
          date: "05/10/2023",
          rating: 4.8,
        },
      ],
    },
    gradeDistribution: {
      A: 25,
      B: 12,
      C: 3,
      D: 0,
      F: 0,
      Withdraw: 0,
    },
  },
  {
    id: "c5",
    name: "Linear Algebra",
    code: "MATH-M365",
    department: "Mathematics",
    departmentCode: "MATH",
    number: "M365",
    credits: 3,
    term: "Spring",
    year: 2024,
    description:
      "Introduction to linear algebra, including systems of linear equations, matrices, determinants, vector spaces, and linear transformations. Applications to computer science and data analysis.",
    professor: professors[3],
    location: "Rawles Hall 102",
    schedule: {
      days: ["Monday", "Wednesday", "Friday"],
      startTime: "13:00",
      endTime: "13:50",
    },
    mode: "Online",
    availability: {
      total: 100,
      enrolled: 82,
    },
    prerequisites: ["MATH-M211"],
    textbooks: ["Linear Algebra and Its Applications by David C. Lay"],
    ocq: {
      overall: 3.7,
      difficulty: 4.5,
      workload: 4.3,
      organization: 3.5,
      comments: [
        {
          text: "Dr. Davis knows the material well but lectures can be hard to follow sometimes.",
          date: "12/18/2023",
          rating: 3.5,
        },
        {
          text: "Challenging course but essential for data science. Make use of office hours.",
          date: "12/14/2023",
          rating: 4,
        },
      ],
    },
    gradeDistribution: {
      A: 30,
      B: 35,
      C: 12,
      D: 3,
      F: 2,
      Withdraw: 18,
    },
  },
  {
    id: "c6",
    name: "Machine Learning",
    code: "CSCI-B555",
    department: "Computer Science",
    departmentCode: "CSCI",
    number: "B555",
    credits: 3,
    term: "Fall",
    year: 2024,
    description:
      "Theory and practice of constructing algorithms that learn from data. Focuses on supervised and unsupervised learning, neural networks, and deep learning applications.",
    professor: professors[0],
    location: "Luddy Hall 1106",
    schedule: {
      days: ["Monday", "Wednesday"],
      startTime: "14:00",
      endTime: "15:15",
    },
    mode: "Hybrid",
    availability: {
      total: 75,
      enrolled: 75,
    },
    prerequisites: ["CSCI-B551", "MATH-M365", "STAT-S520"],
    textbooks: ["Pattern Recognition and Machine Learning by Christopher Bishop"],
    ocq: {
      overall: 4.7,
      difficulty: 4.5,
      workload: 4.6,
      organization: 4.8,
      comments: [
        {
          text: "Challenging but incredibly rewarding. Dr. Johnson is brilliant and passionate about ML.",
          date: "12/15/2023",
          rating: 5,
        },
        {
          text: "One of the most valuable courses for a career in tech. Heavy workload but worth it.",
          date: "12/10/2023",
          rating: 4.5,
        },
      ],
    },
    gradeDistribution: {
      A: 38,
      B: 25,
      C: 10,
      D: 2,
      F: 0,
      Withdraw: 0,
    },
  },
];

// Career paths for recommendation system
export const careerPaths = [
  {
    id: "cp1",
    title: "Data Scientist",
    recommendedCourses: ["STAT-S520", "DSCI-D590", "CSCI-B555", "MATH-M365"],
    skills: ["Statistics", "Machine Learning", "Data Mining", "Programming"],
  },
  {
    id: "cp2",
    title: "AI Engineer",
    recommendedCourses: ["CSCI-B551", "CSCI-B555", "MATH-M365", "STAT-S520"],
    skills: ["Machine Learning", "Deep Learning", "Programming", "Algorithm Design"],
  },
  {
    id: "cp3",
    title: "UX Designer",
    recommendedCourses: ["INFO-I541", "INFO-I400", "INFO-I300", "CSCI-A290"],
    skills: ["User Research", "Prototyping", "Visual Design", "User Testing"],
  },
  {
    id: "cp4",
    title: "Software Engineer",
    recommendedCourses: ["CSCI-C343", "CSCI-P565", "CSCI-B551", "INFO-I427"],
    skills: ["Programming", "System Design", "Algorithms", "Software Architecture"],
  },
];

// Mock chat responses
export const chatResponses = {
  "data science courses": [
    "For a Data Science career, I'd recommend these courses:",
    "1. STAT-S520: Statistical Analysis with Dr. Chen",
    "2. DSCI-D590: Data Mining with Dr. Patel",
    "3. CSCI-B555: Machine Learning with Dr. Johnson",
    "4. MATH-M365: Linear Algebra with Dr. Davis",
    "Would you like details on any of these courses?"
  ].join("\n"),
  "ai courses": [
    "For AI specialization, these courses are excellent options:",
    "1. CSCI-B551: Introduction to AI with Dr. Johnson",
    "2. CSCI-B555: Machine Learning with Dr. Johnson",
    "3. INFO-I427: Search Informatics (recommended elective)",
    "4. CSCI-B657: Computer Vision (advanced option)",
    "Would you like me to check availability for any of these?"
  ].join("\n"),
  "best professors": [
    "Based on OCQ ratings, these professors are highly rated:",
    "1. Dr. Sarah Williams (4.9/5) - Informatics",
    "2. Dr. Emily Johnson (4.7/5) - Computer Science",
    "3. Dr. Jessica Patel (4.5/5) - Data Science",
    "Would you like to see courses taught by any of these professors?"
  ].join("\n")
};
