"use client";

import { useEffect, useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateCaseModal } from "@/components/modals/CreateCaseModal";
import { api } from "@/lib/api";
import { Case, CreateCaseDto } from "@/types";

export default function CasesPage() {
    const [cases, setCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCase, setSelectedCase] = useState<Case | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);


    const fetchCases = async () => {
        try {
            const data = await api.get<Case[]>("/case");
            setCases(data);
        } catch (error) {
            console.error("Failed to fetch cases:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCases();
    }, []);

    const handleCreateCase = async (data: CreateCaseDto) => {
        try {
            const newCase = await api.post<Case, CreateCaseDto>("/case", data);
            setCases([...cases, newCase]);
        } catch (error) {
            console.error("Failed to create case:", error);
        }
    };
    // const handleViewDetails = async (caseId:string) => {
    //     try {
    //         await api.get<Case>(`/case/${caseId}`)
    //         console.log("Fetched case details for ID:", caseId);
    //     } catch (error) {
    //         console.error("Failed to fetch case details:", error);
    //     }
    // }

    // useEffect(() =>{ 
    //     caseDetails
    // })
    const getStatusColor = (status: string) => {
        if (!status) return "default";
        switch (status.toLowerCase()) {
            case "open": return "success";
            case "closed": return "outline";
            case "in progress": return "warning";
            default: return "default";
        }
    };

    const handleViewDetails = (caseId: string) => {
        const foundCase = cases.find(c => c._id === caseId);
        if (foundCase) {
            setSelectedCase(foundCase);
            setIsDetailsOpen(true);
        }
    };

    const handleStatusChange = async (newStatus: string) => {
        if (!selectedCase) return;

        try {
            const updatedCase = await api.patch<Case>(`/case/${selectedCase._id}/status`, { status: newStatus });
            setSelectedCase(updatedCase);
            setCases(cases.map(c => c._id === updatedCase._id ? updatedCase : c));
        } catch (error) {
            console.error("Failed to update status:", error);
            alert("Failed to update status. Please try again.");
        }
    };

    return (
        <div className="space-y-8">
            <CreateCaseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateCase}
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Cases</h2>
                    <p className="text-muted-foreground">Manage ongoing and past legal cases.</p>
                </div>
                <Button className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setIsModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Create Case
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search cases..." className="pl-9" />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-10">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3].map(i => <div key={i} className="h-64 rounded-xl bg-muted/50 animate-pulse" />)}
                    </div>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {cases.length === 0 ? (
                        <div className="col-span-full text-center py-20 text-muted-foreground">
                            No cases found. Create one to get started.
                        </div>
                    ) : (
                        cases.map((caseItem) => (
                            <Card key={caseItem._id} className="hover:shadow-lg hover:border-primary/40 transition-all cursor-pointer group bg-card/85 border-border/70 backdrop-blur">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <Badge variant={getStatusColor(caseItem.status)}>
                                            {caseItem.status}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground font-mono">#{caseItem._id.substring(0, 6)}</span>
                                    </div>
                                    <CardTitle className="mt-2 group-hover:text-primary transition-colors">
                                        {caseItem.caseTitle}
                                    </CardTitle>
                                    <CardDescription>{caseItem.caseType}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {caseItem.description}
                                    </p>
                                </CardContent>
                                <CardFooter className="text-xs text-muted-foreground flex justify-between">
                                    <span>{caseItem.updatedAt ? new Date(caseItem.updatedAt).toLocaleDateString() : 'Recently'}</span>
                                    <Button variant="ghost" size="sm" className="h-8 hover:bg-primary/10 hover:text-primary" onClick={() => handleViewDetails(caseItem._id)}>View Details</Button>
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </div>
            )}

            {isDetailsOpen && selectedCase && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-2xl">{selectedCase.caseTitle}</CardTitle>
                                    <CardDescription className="mt-2">{selectedCase.caseType}</CardDescription>
                                </div>
                                <Button 
                                    variant="ghost" 
                                    onClick={() => setIsDetailsOpen(false)}
                                    className="text-lg"
                                >
                                    ×
                                </Button>
                            </div>
                            <Badge variant={getStatusColor(selectedCase.status)} className="mt-4 w-fit">
                                {selectedCase.status}
                            </Badge>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-sm text-muted-foreground">Description</h3>
                                <p className="mt-2">{selectedCase.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-semibold text-sm text-muted-foreground">Case ID</h3>
                                    <p className="mt-2 font-mono text-sm">{selectedCase._id}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-sm text-muted-foreground">Last Updated</h3>
                                    <p className="mt-2">{selectedCase.updatedAt ? new Date(selectedCase.updatedAt).toLocaleDateString() : ''}</p>
                                </div>
                            </div>
                            <div className="border-t pt-4">
                                <h3 className="font-semibold text-sm text-muted-foreground mb-3">Update Status</h3>
                                <div className="flex gap-2">
                                    <Button 
                                        variant={selectedCase.status === 'open' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handleStatusChange('open')}
                                    >
                                        Open
                                    </Button>
                                    <Button 
                                        variant={selectedCase.status === 'in progress' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handleStatusChange('in progress')}
                                    >
                                        In Progress
                                    </Button>
                                    <Button 
                                        variant={selectedCase.status === 'closed' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handleStatusChange('closed')}
                                    >
                                        Closed
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button 
                                variant="outline" 
                                onClick={() => setIsDetailsOpen(false)}
                                className="w-full"
                            >
                                Close
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            )}
        </div>
    );
}
