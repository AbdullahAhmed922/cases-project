"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Briefcase, FileText, Scale } from "lucide-react";
import { cn } from "@/lib/utilis";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
    },
    {
        label: "Cases",
        icon: Briefcase,
        href: "/cases",
    },
    {
        label: "Assignments",
        icon: FileText,
        href: "/assignments",
    },
    {
        label: "Users",
        icon: Users,
        href: "/users",
    },
    {
        label: "Judge",
        icon: Scale,
        href: "/judge",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => pathname === href;

    return (
        <div className="flex flex-col h-full bg-white border-r border-slate-100 overflow-hidden">
            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-5 border-b border-slate-100/80">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-200/50">
                    <span className="text-white font-bold text-sm">CM</span>
                </div>
                <div>
                    <span className="font-bold text-base text-slate-800">
                        Case<span className="text-primary">Manager</span>
                    </span>
                    <p className="text-[10px] font-medium text-slate-400">Legal Management</p>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex-grow flex flex-col min-h-0 py-4">
                <div className="mb-3 px-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3">
                        Navigation
                    </p>
                </div>
                <nav className="space-y-0.5 px-3">
                    {routes.map((route) => {
                        const active = isActive(route.href);
                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "group flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-all duration-200",
                                    active
                                        ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-200/50"
                                        : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex items-center justify-center w-7 h-7 rounded-lg transition-colors",
                                        active
                                            ? "bg-white/20"
                                            : "bg-slate-100 group-hover:bg-slate-200/70"
                                    )}
                                >
                                    <route.icon className="h-3.5 w-3.5" />
                                </div>
                                <span className="flex-1">{route.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 px-5 py-4 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 text-center">
                    © 2024 CaseManager
                </p>
            </div>
        </div>
    );
}
