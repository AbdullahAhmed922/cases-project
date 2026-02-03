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
        color: "text-sky-500",
    },
    {
        label: "Cases",
        icon: Briefcase,
        href: "/cases",
        color: "text-violet-500",
    },
    {
        label: "Assignments",
        icon: FileText,
        href: "/assignments",
        color: "text-pink-700",
    },
    {
        label: "Users",
        icon: Users,
        href: "/users",
        color: "text-orange-700",
    },
    {
        label: "Judge",
        icon: Scale,
        href: "/judge",
        color: "text-emerald-500",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-gradient-to-b from-[#0b1223] via-[#0b1223] to-[#0f172a] text-slate-100">
            <div className="px-3 py-2 flex-1">
                <Link href="/" className="flex items-center pl-3 mb-10">
                    <h1 className="text-2xl font-bold tracking-tight">
                        Case<span className="text-primary">Manager</span>
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition border border-transparent hover:border-white/10 hover:bg-white/5",
                                pathname === route.href ? "text-white bg-white/10 border-white/10 shadow-[0_10px_40px_rgba(14,165,233,0.12)]" : "text-slate-300"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
