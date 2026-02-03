"use client";

import * as React from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utilis";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    description?: string;
    className?: string;
}

export const Modal = ({
    isOpen,
    onClose,
    children,
    title,
    description,
    className,
}: ModalProps) => {
    // Prevent scrolling when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full",
                            "border-white/10 bg-[#0f172a] text-slate-100", // Dark mode default styling to match dashboard
                            className
                        )}
                    >
                        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
                            {title && (
                                <h2 className="text-lg font-semibold leading-none tracking-tight">
                                    {title}
                                </h2>
                            )}
                            {description && (
                                <p className="text-sm text-slate-400">
                                    {description}
                                </p>
                            )}
                        </div>

                        <div className="mt-4">
                            {children}
                        </div>

                        <button
                            onClick={onClose}
                            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </button>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
