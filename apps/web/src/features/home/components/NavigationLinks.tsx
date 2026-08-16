import { Link, useLocation } from "react-router-dom";

import { navigation } from "../../../constants/navigation";

interface Props {
  className?: string;
  linkClassName?: string;
  activeClassName?: string;
  /** e.g. close a mobile menu after a click */
  onNavigate?: () => void;
}

export default function NavigationLinks({
  className,
  linkClassName = "text-slate-300 transition hover:text-white",
  activeClassName = "text-cyan-300",
  onNavigate,
}: Props) {
  const location = useLocation();

  function handleClick(e: React.MouseEvent, href: string) {
    onNavigate?.();

    if (href === "/") {
      // Already home — scroll to top instead of a no-op navigation.
      if (location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const [path, hash] = href.split("#");
    if (!hash) return;

    // Already on the target page — scroll smoothly instead of
    // letting the browser jump instantly to the hash.
    if (location.pathname === (path || "/")) {
      e.preventDefault();
      document
        .getElementById(hash)
        ?.scrollIntoView({ behavior: "smooth" });
    }
    // Otherwise, let the Link navigate to "/#hash" normally —
    // HomePage's own scroll-to-hash effect takes over once it mounts.
  }

  return (
    <nav className={className}>
      {navigation.map((item) => {
        const targetHash = item.href.split("#")[1];

        const isActive =
          item.href === "/"
            ? location.pathname === "/" && !location.hash
            : location.hash === `#${targetHash}`;

        return (
          <Link
            key={item.label}
            to={item.href}
            onClick={(e) => handleClick(e, item.href)}
            className={`${linkClassName} ${
              isActive ? activeClassName : ""
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}