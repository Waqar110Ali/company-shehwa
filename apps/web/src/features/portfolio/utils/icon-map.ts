// apps/web/src/features/portfolio/utils/icon-map.ts
import {
  BrainCircuit, Globe, Smartphone, Database, Cloud, Code2,
  ShieldCheck, Rocket, Users, Headset, Clock3,
  FolderKanban, Award, Search, FileText, Palette, TestTube,
  Mail, Phone, MapPin, type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  BrainCircuit, Globe, Smartphone, Database, Cloud, Code2,
  ShieldCheck, Rocket, Users, Headset, Clock3,
  FolderKanban, Award, Search, FileText, Palette, TestTube,
  Mail, Phone, MapPin,
};

export const ICON_NAMES = Object.keys(ICON_MAP);

// Accepts either a stored string (from DB) or a component (from the static fallback constants)
export function getIcon(icon: string | LucideIcon): LucideIcon {
  return typeof icon === "string" ? (ICON_MAP[icon] ?? Code2) : icon;
}