"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CreateCaseDto } from "@/types";

interface CreateCaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateCaseDto) => void;
}

export const CreateCaseModal = ({ isOpen, onClose, onSubmit }: CreateCaseModalProps) => {
    const [formData, setFormData] = useState<CreateCaseDto>({
        caseTitle: "",
        caseType: "",
        description: "",
        status: "Open",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
        setFormData({ caseTitle: "", caseType: "", description: "", status: "Open" }); // Reset form
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create New Case"
            description="Enter the details of the new legal case."
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Case Title</label>
                    <Input
                        name="caseTitle"
                        value={formData.caseTitle}
                        onChange={handleChange}
                        placeholder="Case Title"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Case Type</label>
                    <Input
                        name="caseType"
                        value={formData.caseType}
                        onChange={handleChange}
                        placeholder="e.g. Civil, Criminal, Corporate"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Brief description of the case..."
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">Create Case</Button>
                </div>
            </form>
        </Modal>
    );
};
