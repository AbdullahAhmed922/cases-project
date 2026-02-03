"use client";

import { useEffect, useState } from "react";
import { Search, Gavel, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { User } from "@/types";

export default function JudgePage() {
    const [judges, setJudges] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJudges = async () => {
            try {
                const allUsers = await api.get<User[]>("/user");
                const judgeUsers = allUsers.filter(u => u.role === 'judge');
                setJudges(judgeUsers);
            } catch (error) {
                console.error("Failed to fetch judges:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJudges();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Judges Directory</h2>
                    <p className="text-muted-foreground">View and manage the panel of judges.</p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search judges..." className="pl-9" />
                </div>
            </div>

            {loading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 rounded-xl bg-muted/50 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {judges.length === 0 ? (
                        <div className="col-span-full text-center py-10 text-muted-foreground">
                            No judges found in the system.
                        </div>
                    ) : (
                        judges.map((judge) => (
                            <Card key={judge._id} className="bg-card/85 border-border/70 backdrop-blur hover:shadow-md transition-all">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Gavel className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">{judge.name}</CardTitle>
                                        <CardDescription className="flex items-center gap-1">
                                            <Badge variant="outline" className="text-xs">
                                                Active Judge
                                            </Badge>
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        {judge.email}
                                    </div>
                                    <div className="pt-2 border-t border-border/50 flex justify-between items-center text-xs">
                                        <span>ID: {judge._id.substring(0, 8)}...</span>
                                        <span className="text-primary font-medium">View Profile →</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
