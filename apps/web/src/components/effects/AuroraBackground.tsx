import type { ReactNode } from "react";

interface AuroraBackgroundProps {
  children: ReactNode;
}

export default function AuroraBackground({
  children,
}: AuroraBackgroundProps) {
  return (
    <section className="relative overflow-hidden bg-[#050816]">
      {/* Blue Blob */}

      <div
        className="
        absolute
        left-[-250px]
        top-[-180px]
        h-[520px]
        w-[520px]
        rounded-full
        bg-blue-600/30
        blur-[140px]
      "
      />

      {/* Purple Blob */}

      <div
        className="
        absolute
        right-[-220px]
        bottom-[-0px]
        h-[500px]
        w-[500px]
        rounded-full
        bg-violet-600/30
        blur-[140px]
      "
      />

      {/* Cyan */}

      <div
        className="
        absolute
        left-1/2
        top-1/2
        h-[350px]
        w-[350px]
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-cyan-500/20
        blur-[120px]
      "
      />

      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}