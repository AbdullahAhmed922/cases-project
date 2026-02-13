"use client";

import { useState } from "react";
import { Plus, Trash2, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { Assignment, Case, User } from "@/types";
import { useQuery } from "@tanstack/react-query";

export default function AssignmentsPage() {
    const [selectedCase, setSelectedCase] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    const fetchData = async () => {
        const [assignmentsData, casesData, usersData] = await Promise.all([
            api.get<Assignment[]>("/assignment"),
            api.get<Case[]>("/case"),
            api.get<User[]>("/user"),
        ]);
        return { assignmentsData, casesData, usersData }
    };

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["assignments", "cases", "users"],
        queryFn: fetchData,
        staleTime: 300000
    })

    const assignments = data?.assignmentsData ?? [];
    const cases = data?.casesData ?? [];
    const users = data?.usersData ?? [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        const errorMessage = error instanceof Error ? error.message : "Failed to load data";
        return <div>{errorMessage}</div>;
    }

    const handleAssign = async () => {
        if (!selectedCase || !selectedUser) return;

        try {
            await api.post<Assignment, { caseId: string; userId: string }>("/assignment", {
                caseId: selectedCase,
                userId: selectedUser,
            });

            setSelectedCase("");
            setSelectedUser("");
            refetch();
        } catch (error) {
            console.error("Failed to create assignment:", error);
            alert("Failed to create assignment. Please try again.");
        }
    };

    const handleRemove = async (id: string) => {
        try {
            await api.delete(`/assignment/${id}`);
            refetch();
        } catch (error) {
            console.error("Failed to delete assignment:", error);
        }
    }

    const renderAssignment = (assignment: Assignment) => {
        const caseObj = typeof assignment.caseId === 'object' ? assignment.caseId : cases.find(c => c._id === assignment.caseId);
        const userObj = typeof assignment.userId === 'object' ? assignment.userId : users.find(u => u._id === assignment.userId);

        const caseTitle = caseObj ? caseObj.caseTitle : "Unknown Case";
        const userName = userObj ? userObj.name : "Unknown User";
        const userRole = userObj ? userObj.role : "";
        const userInitial = userName.charAt(0);

        return (
            <div key={assignment._id} className="flex items-center justify-between p-4 border border-border/50 rounded-xl bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/80 transition-all duration-200 group">
                <div className="flex items-center gap-3 flex-1">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                        {userInitial}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{userName}</p>
                        <div className="flex items-center gap-2">
                            <p className="text-xs text-muted-foreground truncate">Case: {caseTitle}</p>
                            {userRole && <Badge variant="outline" className="text-[10px] capitalize">{userRole}</Badge>}
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                    <Badge variant="outline" className="text-xs whitespace-nowrap">
                        {assignment.createdAt ? new Date(assignment.createdAt).toLocaleDateString() : 'Active'}
                    </Badge>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 hover:text-destructive group-hover:opacity-100 opacity-0 transition"
                        onClick={() => handleRemove(assignment._id)}
                    >
                        <Trash2 className="h-3 w-3" />
                    </Button>
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8 relative">
            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute top-8 left-6 h-40 w-40 bg-sky-400/15 blur-3xl opacity-50" />
                <div className="absolute bottom-10 right-6 h-32 w-32 bg-amber-300/20 blur-3xl opacity-50" />
            </div>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Case Assignments</h2>
                    <p className="text-muted-foreground">Link users to cases efficiently.</p>
                </div>
                <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur">
                    <span className="inline-block h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-medium text-muted-foreground">{assignments.length} active assignments</span>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <Card className="md:col-span-1 border border-border/70 bg-card/85 backdrop-blur shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Plus className="h-4 w-4" /> New Assignment
                        </CardTitle>
                        <CardDescription>Assign a User to a Case</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Select Case</label>
                            <select
                                value={selectedCase}
                                onChange={(e) => setSelectedCase(e.target.value)}
                                className="flex h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Choose a case...</option>
                                {cases.map(c => (
                                    <option key={c._id} value={c._id}>{c.caseTitle}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Select User</label>
                            <select
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                                className="flex h-10 w-full rounded-lg border border-input bg-card px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="">Choose a user...</option>
                                {users.filter(u => u.role === "judge" || u.role === "user").map(u => (
                                    <option key={u._id} value={u._id}>{u.name} ({u.role})</option>
                                ))}
                            </select>
                        </div>
                        <Button
                            className="w-full mt-4 bg-primary hover:bg-primary/90"
                            onClick={handleAssign}
                            disabled={!selectedCase || !selectedUser}
                        >
                            <CheckCircle className="mr-2 h-4 w-4" /> Assign Now
                        </Button>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 border border-border/70 bg-card/85 backdrop-blur shadow-lg">
                    <CardHeader>
                        <CardTitle>Active Assignments</CardTitle>
                        <CardDescription>{assignments.length} total assignments</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="space-y-3">
                                {[1, 2, 3].map(i => <div key={i} className="h-20 bg-muted/50 rounded-xl animate-pulse" />)}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {assignments.length === 0 ? (
                                    <div className="text-center py-8 text-muted-foreground">
                                        <p>No assignments yet. Create one to get started.</p>
                                    </div>
                                ) : (
                                    assignments.map(renderAssignment)
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
