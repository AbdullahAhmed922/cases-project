/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                        Dashboard
                    </h2>
                    <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening.</p>
                </div>
            </div>


            <div className="grid gap-6">

                <Card className="bg-slate-900/90 border-border/70 text-slate-100 max-w-5xl mx-auto w-full">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Link href="/cases"><button className="w-75 h-30 p-3 bg-linear-to-r from-sky-50 to-blue-50 text-sky-700 rounded-lg cursor-pointer hover:from-sky-100 hover:to-blue-100 transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-100 border border-sky-200/50 font-medium text-lg">
                            + Create New Case
                        </button></Link>
                        <Link href="/assignments"><button className="w-75 h-30 p-3 bg-linear-to-r from-amber-50 to-yellow-50 text-amber-700 rounded-lg cursor-pointer hover:from-amber-100 hover:to-yellow-100 transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-100 border border-amber-200/50 font-medium text-lg">
                            ↪ Assign Judge to Case
                        </button></Link>
                        <Link href="/users"><button className="w-75 h-30 p-3 bg-linear-to-r from-slate-50 to-gray-50 text-slate-700 rounded-lg cursor-pointer hover:from-slate-100 hover:to-gray-100 transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-100 border border-slate-200/50 font-medium text-lg">
                            + Add New User
                        </button></Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
