import React from "react";
import { cn } from "@/lib/utilis";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
    variant?: "default" | "success" | "error" | "warning" | "info" | "outline";
};

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = "default", ...props }, ref) => {
        const variants = {
            default: "bg-secondary text-secondary-foreground",
            success: "bg-green-500 text-white rounded-lg px-2",
            error: "bg-red-500 text-white rounded-lg px-2",
            warning: "bg-yellow-500 text-white rounded-lg px-2",
            info: "bg-blue-500 text-white rounded-lg px-2",
            outline: "bg-red-500 border border-input rounded-lg px-2 text-foreground",
        };

        return (
            <span
                ref={ref}
                className={cn(variants[variant], className)}
                {...props}
            />
        );
    }
);

Badge.displayName = "Badge";

export { Badge };
