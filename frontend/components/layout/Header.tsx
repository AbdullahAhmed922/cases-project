"use client";

import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
    const { user, logout } = useAuth();

    const roleColors: Record<string, string> = {
        admin: "bg-red-500",
        judge: "bg-emerald-500",
        user: "bg-indigo-500",
    };

    return (
        <div className="flex items-center p-4 border-b h-16 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border-white/60 dark:border-slate-800/80 shadow-sm">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
                <Menu />
            </Button>
            <div className="ml-auto flex items-center gap-x-4">
                {user && (
                    <>
                        <span className="text-xs text-muted-foreground hidden sm:inline">
                            {user.email}
                        </span>
                        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground capitalize">
                            {user.role}
                        </Button>
                        <div className={`w-8 h-8 rounded-full ${roleColors[user.role] || "bg-indigo-500"} flex items-center justify-center text-white font-bold text-sm`}>
                            {user.email.charAt(0).toUpperCase()}
                        </div>
                        <Button size="icon" variant="ghost" onClick={logout} className="text-muted-foreground hover:text-destructive" title="Logout">
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
