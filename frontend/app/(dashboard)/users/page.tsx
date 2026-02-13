"use client";

import { useState } from "react";
import { Plus, Search, Mail, Phone, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CreateUserModal } from "@/components/modals/CreateUserModal";
import { api, fetchUsers } from "@/lib/api";
import { User, CreateUserDto } from "@/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function UsersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const queryClient = useQueryClient();
    // const fetchUsers = async () => {
    //     try {
    //         const data = await api.get<User[]>("/user");
    //         setUsers(data);
    //     } catch (error) {
    //         console.error("Failed to fetch users:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchUsers();
    // }, []);

    const { data = [], isLoading, isError, error } = useQuery<User[]>({
        queryKey: ["users"],
        queryFn: fetchUsers,
        staleTime: 300000
    })

    const { mutate } = useMutation<User, Error, CreateUserDto>({
        mutationFn: (data: CreateUserDto) => api.post<User>("/user", data),
        onSuccess: (newData: User) => {
            queryClient.setQueryData<User[]>(['users'], (oldQueryData) => {
                return oldQueryData ? [...oldQueryData, newData] : [newData];
            })
        }
    })

    const deleteMutation = useMutation<void, Error, string>({
        mutationFn: (id: string) => api.delete(`/user/${id}`),
        onSuccess: (_data, deletedId) => {
            queryClient.setQueryData<User[]>(['users'], (oldData) =>
                oldData ? oldData.filter(u => u._id !== deletedId) : []
            );
        }
    })

    if (isLoading) {
        return <div>Loading users...</div>;
    }
    if (isError) {
        const errorMesssage = error instanceof Error ? error.message : "Failed to Load Users";
        return <div>{errorMesssage}</div>
    }

    // const handleCreateUser = async (data: CreateUserDto) => {
    //     try {
    //         const newUser = await api.post<User, CreateUserDto>("/user", data);
    //         setUsers([...users, newUser]);
    //     } catch (error) {
    //         console.error("Failed to create user:", error);
    //     }
    // };


    // const handleRemove = async( id:string) => {
    //     try {
    //         await api.delete(`/user/${id}`);
    //         setUsers(users.filter(u => u._id !== id));

    //     } catch (error) {
    //         console.error("Failed to delete:",error)
    //     }
    // }

    return (
        <div className="space-y-8">
            <CreateUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={mutate}
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                    <p className="text-muted-foreground">Manage system users and their roles.</p>
                </div>
                <Button className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setIsModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Add User
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <div className="rounded-xl border bg-card/85 text-card-foreground shadow-sm backdrop-blur border-border/70 overflow-hidden">
                <div className="relative w-full overflow-auto">
                    {isLoading ? (
                        <div className="p-10 text-center animate-pulse">Loading users...</div>
                    ) : (
                        <table className="w-full caption-bottom text-sm text-left">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Name</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Role</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Contact</th>
                                    <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {(() => {
                                    const filteredUsers = data.filter((user) => {
                                        const q = searchQuery.toLowerCase();
                                        return (
                                            user.name.toLowerCase().includes(q) ||
                                            user.email.toLowerCase().includes(q) ||
                                            user.role.toLowerCase().includes(q) ||
                                            (user.phone?.toLowerCase().includes(q) ?? false)
                                        );
                                    });
                                    return filteredUsers.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-muted-foreground">No users found.</td>
                                        </tr>
                                    ) : (
                                        filteredUsers.map((user) => (
                                            <tr key={user._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <td className="p-4 align-middle font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                                            {user.name.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <div>{user.name}</div>
                                                            <div className="text-xs text-muted-foreground md:hidden">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle">
                                                    <Badge variant={user.role === 'admin' ? 'error' : user.role === 'judge' ? 'default' : 'outline'}>
                                                        {user.role}
                                                    </Badge>
                                                </td>
                                                <td className="p-4 align-middle">
                                                    <div className="flex flex-col gap-1 text-muted-foreground">
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <Mail className="h-3 w-3" /> {user.email}
                                                        </div>
                                                        {user.phone && (
                                                            <div className="flex items-center gap-2 text-xs">
                                                                <Phone className="h-3 w-3" /> {user.phone}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-4 align-middle text-right">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteMutation.mutate(user._id)}>
                                                        <Trash2 className="h-4 w-4" />

                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    );
                                })()}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
