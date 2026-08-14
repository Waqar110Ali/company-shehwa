import type { FileItem } from "../types/file";

export const files: FileItem[] = [
  {
    id: "1",
    name: "Company Logo.png",
    type: "image",
    size: "2.4 MB",
    uploadedBy: "Waqar Ali",
    uploadedAt: "Today",
    favorite: true,
    shared: true,
    url: "",
    thumbnail:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400",
  },

  {
    id: "2",
    name: "HR Policies.pdf",
    type: "pdf",
    size: "4.8 MB",
    uploadedBy: "Sarah",
    uploadedAt: "Yesterday",
    favorite: false,
    shared: true,
    url: "",
  },

  {
    id: "3",
    name: "Marketing Plan.docx",
    type: "document",
    size: "1.7 MB",
    uploadedBy: "John",
    uploadedAt: "3 days ago",
    favorite: false,
    shared: false,
    url: "",
  },

  {
    id: "4",
    name: "Presentation.pptx",
    type: "document",
    size: "8.2 MB",
    uploadedBy: "Emma",
    uploadedAt: "1 week ago",
    favorite: true,
    shared: false,
    url: "",
  },

  {
    id: "5",
    name: "Project Videos",
    type: "folder",
    size: "--",
    uploadedBy: "Waqar Ali",
    uploadedAt: "Today",
    favorite: false,
    shared: true,
    url: "",
  },
];