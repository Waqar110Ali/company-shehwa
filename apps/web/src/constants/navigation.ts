export interface NavigationItem {
  label: string;
  href: string;
}

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Technologies", href: "/#technologies" },
  // Both currently point at the same section (FeaturedProjects) —
  // see the note in HomePage.tsx. Update these once there's a real
  // distinction between "Portfolio" and "Projects" content.
  { label: "Portfolio", href: "/#projects" },
  { label: "Projects", href: "/#projects" },
  { label: "Team", href: "/#team" },
  // No section exists for this yet — link currently resolves to
  // nothing (no scroll happens, silently does nothing).
  { label: "Career", href: "/#career" },
  { label: "Contact", href: "/#contact" },
];