"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateCaseModal } from "@/components/modals/CreateCaseModal";
import { api } from "@/lib/api";
import { Case, CreateCaseDto } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCases } from "@/lib/api";

export default function CasesPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCase, setSelectedCase] = useState<Case | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const queryClient = useQueryClient();


    // const fetchCases = async () => {
    //     try {
    //         const data = await api.get<Case[]>("/case");
    //         setCases(data);
    //     } catch (error) {
    //         console.error("Failed to fetch cases:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchCases();
    // }, []);

    const { data = [], isLoading, isError, error, isFetching } = useQuery<Case[]>({
        queryKey: ["cases"],
        queryFn: fetchCases,
        staleTime: 300000
    })

    // const handleCreateCase = async (data: CreateCaseDto) => {
    //     try {
    //         const newCase = await api.post<Case, CreateCaseDto>("/case", data);
    //         setCases([...cases, newCase]);
    //     } catch (error) {
    //         console.error("Failed to create case:", error);
    //     }
    // };

    const { mutate } = useMutation<Case, Error, CreateCaseDto>({
        mutationFn: (data: CreateCaseDto) => api.post<Case>("/case", data),
        onSuccess: (newCase: Case) => {
            queryClient.setQueryData<Case[]>(['cases'], (oldCases) => {
                return oldCases ? [...oldCases, newCase] : [newCase];
            })
        }
    });

    console.log({ data, isLoading, isError, error, isFetching });

    const handleStatusChange = useMutation<Case, Error, { caseId: string, newStatus: string }>({
        mutationFn: ({ caseId, newStatus }: { caseId: string, newStatus: string }) => api.patch<Case>(`/case/${caseId}`, { status: newStatus }),
        onSuccess: (updateCase: Case) => {
            queryClient.setQueryData<Case[]>(['cases'], (oldcases) => {
                return oldcases ? oldcases.map(c => c._id === updateCase._id ? updateCase : c) : [updateCase];
            })
            setSelectedCase(updateCase)
        }
    })

    const handleViewDetails = (caseId: string) => {
        const foundCase = data.find(c => c._id === caseId);
        if (foundCase) {
            setSelectedCase(foundCase);
            setIsDetailsOpen(true);
        }
    };

    const getStatusColor = (status: string) => {
        if (!status) return "default";
        switch (status.toLowerCase()) {
            case "open": return "success";
            case "closed": return "outline";
            case "in progress": return "warning";
            default: return "default";
        }
    };

    if (isLoading) {
        return <div>Loading cases...</div>;
    }
    if (isError) {
        const errorMessage = error instanceof Error ? error.message : "Failed to load cases";
        return <div>{errorMessage}</div>
    }
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

    return (
        <div className="space-y-8">
            <CreateCaseModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={mutate}
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
            {isLoading ? (
                <div className="p-10 text-center animate-pulse">Loading cases...</div>
            ) : (
                <>
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search cases..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {(() => {
                            const filteredCases = data.filter((cases) => {
                                const c = searchQuery.toLowerCase();
                                return (
                                    cases._id.toLowerCase().includes(c) ||
                                    (cases.createdAt?.toString().toLowerCase().includes(c) ?? false) ||
                                    (cases.updatedAt?.toString().toLowerCase().includes(c) ?? false) ||
                                    cases.caseTitle.toLowerCase().includes(c) ||
                                    cases.caseType.toLowerCase().includes(c) ||
                                    (cases.description?.toLowerCase().includes(c) ?? false) ||
                                    cases.status.toLowerCase().includes(c)
                                );
                            });
                            if (filteredCases.length === 0) {
                                return (
                                    <div className="col-span-full text-center py-20 text-muted-foreground">
                                        No cases found. Create one to get started.
                                    </div>
                                );
                            }
                            return filteredCases.map((caseItem) => (
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
                            ));
                        })()}
                    </div>
                </>
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
                                        onClick={() => handleStatusChange.mutate({ caseId: selectedCase._id, newStatus: 'open' })}
                                    >
                                        Open
                                    </Button>
                                    <Button
                                        variant={selectedCase.status === 'in progress' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handleStatusChange.mutate({ caseId: selectedCase._id, newStatus: 'in progress' })}
                                    >
                                        In Progress
                                    </Button>
                                    <Button
                                        variant={selectedCase.status === 'closed' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => handleStatusChange.mutate({ caseId: selectedCase._id, newStatus: 'closed' })}
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
