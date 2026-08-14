export interface FeaturedProject {
  id: number;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  status: "Completed" | "In Progress";
  github: string;
  demo: string;
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: 1,
    name: "AI Company Management Platform",
    category: "Enterprise",
    description:
      "A complete AI-powered company management platform with employee management, task tracking and freelancing portal.",
    technologies: [
      "React",
      "NestJS",
      "MongoDB",
      "TypeScript",
    ],
    status: "In Progress",
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    name: "AI Tourism Guide",
    category: "Artificial Intelligence",
    description:
      "AI chatbot that helps tourists discover attractions, food, hotels and routes.",
    technologies: [
      "React",
      "Python",
      "FastAPI",
      "OpenAI",
    ],
    status: "Completed",
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    name: "AI Attendance System",
    category: "Computer Vision",
    description:
      "YOLO-powered attendance system with face detection, reporting and analytics.",
    technologies: [
      "Python",
      "YOLO",
      "OpenCV",
      "MongoDB",
    ],
    status: "Completed",
    github: "#",
    demo: "#",
  },
];