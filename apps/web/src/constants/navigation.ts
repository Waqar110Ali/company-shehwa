export interface NavigationItem {
  label: string;
  href: string;
}

export const navigation: NavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Technologies", href: "/technologies" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
];