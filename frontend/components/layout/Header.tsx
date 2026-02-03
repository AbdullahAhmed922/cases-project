"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
    return (
        <div className="flex items-center p-4 border-b h-16 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border-white/60 dark:border-slate-800/80 shadow-sm">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
                <Menu />
            </Button>
            <div className="ml-auto flex items-center gap-x-4">
                <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                    Admin
                </Button>
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                    A
                </div>
            </div>
        </div>
    );
}
