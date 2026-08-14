import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export interface TeamMember {
  id: number;
  name: string;
  designation: string;
  department: string;
  skills: string[];
  image: string;
  github: string;
  linkedin: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "John Doe",
    designation: "CEO",
    department: "Management",
    skills: ["Leadership", "AI", "Business"],
    image: "https://placehold.co/400x400",
    github: "#",
    linkedin: "#",
  },
  {
    id: 2,
    name: "Jane Smith",
    designation: "Full Stack Developer",
    department: "Engineering",
    skills: ["React", "NestJS", "MongoDB"],
    image: "https://placehold.co/400x400",
    github: "#",
    linkedin: "#",
  },
  {
    id: 3,
    name: "Ali Khan",
    designation: "AI Engineer",
    department: "Artificial Intelligence",
    skills: ["Python", "YOLO", "OpenAI"],
    image: "https://placehold.co/400x400",
    github: "#",
    linkedin: "#",
  },
  {
    id: 4,
    name: "Sara Ahmed",
    designation: "UI/UX Designer",
    department: "Design",
    skills: ["Figma", "UX", "Tailwind"],
    image: "https://placehold.co/400x400",
    github: "#",
    linkedin: "#",
  },
];

export const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedin,
};