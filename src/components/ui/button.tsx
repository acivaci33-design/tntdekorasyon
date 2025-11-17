"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "outline" | "ghost" | "subtle";
  size?: "sm" | "md" | "lg" | "icon";
}

const baseClasses =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium font-cta transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-60";

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-teal-700 text-white shadow-sm shadow-teal-900/20 hover:bg-teal-800",
  outline:
    "border border-slate-200/80 bg-white/80 text-slate-900 hover:bg-slate-50 shadow-sm",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100/80",
  subtle:
    "bg-slate-900/5 text-slate-900 hover:bg-slate-900/8",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-10 px-5 text-sm",
  lg: "h-11 px-6 text-sm",
  icon: "h-9 w-9",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, className, variant = "primary", size = "md", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
