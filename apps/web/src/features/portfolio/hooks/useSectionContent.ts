// apps/web/src/features/home/hooks/useSectionContent.ts
import { usePortfolioContent } from "@/features/portfolio/hooks/usePortfolioContent";
import type { PortfolioContent } from "@/features/portfolio/types/portfolio-content";

// Falls back to your static constants until the DB has real data (or if the fetch fails)
export function useSectionContent<K extends keyof PortfolioContent>(key: K, fallback: PortfolioContent[K]) {
  const { data } = usePortfolioContent();
  return data?.[key] ?? fallback;
}