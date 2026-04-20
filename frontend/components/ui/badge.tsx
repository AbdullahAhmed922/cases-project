import React from "react";
import { cn } from "@/lib/utilis";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
    variant?: "default" | "success" | "error" | "warning" | "info" | "outline";
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = "default", ...props }, ref) => {
        const variants = {
            default: "bg-primary/10 text-primary border border-primary/20 rounded-lg px-2",
            success: "bg-emerald-50 text-emerald-700 border border-emerald-200/50 rounded-lg px-2",
            error: "bg-red-50 text-red-700 border border-red-200/50 rounded-lg px-2",
            warning: "bg-amber-50 text-amber-700 border border-amber-200/50 rounded-lg px-2",
            info: "bg-blue-50 text-blue-700 border border-blue-200/50 rounded-lg px-2",
            outline: "bg-transparent border border-border text-muted-foreground rounded-lg px-2",
        };

        return (
            <span
                ref={ref}
                className={cn(
                    "inline-flex items-center text-xs font-medium py-0.5",
                    variants[variant],
                    className
                )}
                {...props}
            />
        );
    }
);

Badge.displayName = "Badge";

export { Badge };
