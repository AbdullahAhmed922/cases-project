"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateUserDto } from "@/types";

interface CreateUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateUserDto) => void;
}

export const CreateUserModal = ({ isOpen, onClose, onSubmit }: CreateUserModalProps) => {
    const [formData, setFormData] = useState<CreateUserDto>({
        name: "",
        email: "",
        role: "user",
        phone: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
        setFormData({ name: "", email: "", role: "user", phone: "" }); 
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add New User"
            description="Create a new user profile for the system."
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="user" className="bg-slate-900">User</option>
                        <option value="judge" className="bg-slate-900">Judge</option>
                        <option value="admin" className="bg-slate-900">Admin</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Phone (Optional)</label>
                    <Input
                        name="phone"
                        type="tel"
                        value={formData.phone || ""}
                        onChange={handleChange}
                        placeholder="+1 234 567 890"
                    />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">Create</Button>
                </div>
            </form>
        </Modal>
    );
};
