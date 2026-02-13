"use client";

import { useState } from "react";
import { Search, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/api";

export default function JudgePage() {
    const [searchQuery, setSearchQuery] = useState("");

    const { data: allUsers = [], isLoading, isError, error } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: fetchUsers,
        staleTime: 300000
    });
    console.log("All Users:", allUsers);
    const judges = allUsers.filter((u) => u.role === "judge");
    console.log("Filtered Judges:" , judges);
    const filteredJudges = judges.filter((judge) => {
        const q = searchQuery.toLowerCase();
        return (
            judge._id.toLowerCase().includes(q) ||
            judge.name.toLowerCase().includes(q) ||
            judge.email.toLowerCase().includes(q) ||
            (judge.phone?.toLowerCase().includes(q) ?? false) ||
            (judge.createdAt?.toString().includes(q) ?? false) ||
            (judge.updatedAt?.toString().toLowerCase().includes(q) ?? false)
        );
    });

    if (isError) {
        const errorMessage = error instanceof Error ? error.message : "Failed to load judges";
        return <div>{errorMessage}</div>;
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Judges Directory</h2>
                    <p className="text-muted-foreground">
                        Judges are users with the &quot;judge&quot; role. Add a judge from the Users page.
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search judges..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-48 rounded-xl bg-muted/50 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredJudges.length === 0 ? (
                        <div className="col-span-full text-center py-10 text-muted-foreground">
                            No judges found. Create a user with the &quot;Judge&quot; role on the Users page.
                        </div>
                    ) : (
                        filteredJudges.map((judge) => (
                            <Card key={judge._id} className="bg-card/85 border-border/70 backdrop-blur hover:shadow-md transition-all">
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                                        {judge.name.charAt(0)}
                                    </div>
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">{judge.name}</CardTitle>
                                        <CardDescription className="flex items-center gap-1">
                                            <Badge variant="outline" className="text-xs">
                                                Judge
                                            </Badge>
                                        </CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        {judge.email}
                                    </div>
                                    {judge.phone && (
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            {judge.phone}
                                        </div>
                                    )}
                                    <div className="pt-2 border-t border-border/50 flex justify-between items-center text-xs">
                                        <span>ID: {judge._id.substring(0, 8)}...</span>
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
