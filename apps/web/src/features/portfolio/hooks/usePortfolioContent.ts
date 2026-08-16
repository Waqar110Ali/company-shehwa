// apps/web/src/features/portfolio/hooks/usePortfolioContent.ts
import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "../api/portfolio.api";
import type { PortfolioContent } from "../types/portfolio-content";

export function usePortfolioContent() {
  return useQuery<PortfolioContent>({
    queryKey: ["portfolio"],
    queryFn: async () => (await portfolioApi.getPortfolio()).data,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}