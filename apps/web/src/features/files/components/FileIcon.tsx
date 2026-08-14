import {
  FileArchive,
  FileImage,
  FileSpreadsheet,
  FileText,
  Folder,
  Video,
} from "lucide-react";

interface Props {
  type: string;
}

export default function FileIcon({
  type,
}: Props) {
  switch (type) {
    case "folder":
      return (
        <Folder
          size={60}
          className="text-yellow-400"
        />
      );

    case "image":
      return (
        <FileImage
          size={60}
          className="text-cyan-400"
        />
      );

    case "video":
      return (
        <Video
          size={60}
          className="text-red-400"
        />
      );

    case "spreadsheet":
      return (
        <FileSpreadsheet
          size={60}
          className="text-green-400"
        />
      );

    case "archive":
      return (
        <FileArchive
          size={60}
          className="text-orange-400"
        />
      );

    default:
      return (
        <FileText
          size={60}
          className="text-blue-400"
        />
      );
  }
}