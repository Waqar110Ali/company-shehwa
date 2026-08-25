// apps/web/src/features/home/hooks/useSectionContent.ts
import { usePortfolioContent } from "@/features/portfolio/hooks/usePortfolioContent";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio-content";

export function useSectionContent<K extends keyof PortfolioContent>(
  key: K,
  fallback: PortfolioContent[K],
) {
  const { data } = usePortfolioContent();
  const value = data?.[key];

  if (value === undefined || value === null) return fallback;

  // Empty arrays from an unseeded portfolio should not wipe section defaults.
  if (Array.isArray(fallback) && Array.isArray(value) && value.length === 0) {
    return fallback;
  }

  // If the fallback is an array but the fetched value isn't (bad/legacy DB data), use the fallback instead of crashing.
  if (Array.isArray(fallback) && !Array.isArray(value)) return fallback;

  // If the fallback is a plain object but the fetched value isn't, same protection.
  if (
    !Array.isArray(fallback) &&
    typeof fallback === "object" &&
    (typeof value !== "object" || Array.isArray(value))
  ) {
    return fallback;
  }

  return value as PortfolioContent[K];
}