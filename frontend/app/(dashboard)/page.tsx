/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
export default function DashboardPage() {
    return (
        <div className="space-y-8 animate-[fade-in_0.3s_ease-out]">
            {/* Overview Hub style */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <div className="section-accent-bar h-8" />
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Overview Hub
                    </span>
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                        Dashboard
                    </h2>
                    <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening.</p>
                </div>
            </div>

            <div className="grid gap-6">
                <Card className="dashboard-card max-w-5xl mx-auto w-full">
                    <CardHeader>
                        <CardTitle className="text-foreground">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Link href="/cases">
                            <button className="w-full h-28 p-4 bg-gradient-to-br from-indigo-50 to-blue-50 text-indigo-700 rounded-xl cursor-pointer hover:from-indigo-100 hover:to-blue-100 transition-all duration-200 ease-out hover:-translate-y-1 border border-indigo-200/50 font-medium text-lg shadow-sm">
                                + Create New Case
                            </button>
                        </Link>
                        <Link href="/assignments">
                            <button className="w-full h-28 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 text-amber-700 rounded-xl cursor-pointer hover:from-amber-100 hover:to-yellow-100 transition-all duration-200 ease-out hover:-translate-y-1 border border-amber-200/50 font-medium text-lg shadow-sm">
                                ↪ Assign Judge to Case
                            </button>
                        </Link>
                        <Link href="/users">
                            <button className="w-full h-28 p-4 bg-gradient-to-br from-emerald-50 to-teal-50 text-emerald-700 rounded-xl cursor-pointer hover:from-emerald-100 hover:to-teal-100 transition-all duration-200 ease-out hover:-translate-y-1 border border-emerald-200/50 font-medium text-lg shadow-sm">
                                + Add New User
                            </button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
