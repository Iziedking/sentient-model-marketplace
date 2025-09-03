import * as React from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = React.HTMLAttributes<HTMLDivElement> & {
  title?: string;
  subtitle?: string;
};

export default function GlassCard({
  title,
  subtitle,
  className,
  children,
  ...rest
}: GlassCardProps) {
  return (
    <div
      {...rest}
      className={cn(
        "rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset,0_8px_30px_rgba(0,0,0,0.25)]",
        className
      )}
    >
      {(title || subtitle) && (
        <div className="mb-2">
          {title && <h3 className="font-medium text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-white/70">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
