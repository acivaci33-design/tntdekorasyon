import * as React from "react";

import { cn } from "@/lib/utils";

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function GlassCard({ className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative h-full rounded-3xl border border-slate-100/80 bg-white/80 px-4 py-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 sm:px-5 sm:py-5 lg:px-6 lg:py-6",
        "hover:-translate-y-1.5 hover:border-sky-200/80 hover:bg-white/95 hover:shadow-[0_22px_70px_rgba(15,23,42,0.12)]",
        "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-[radial-gradient(circle_at_0_0,rgba(56,189,248,0.1),transparent_55%),radial-gradient(circle_at_100%_100%,rgba(251,191,36,0.12),transparent_55%)]",
        className,
      )}
      {...props}
    />
  );
}
