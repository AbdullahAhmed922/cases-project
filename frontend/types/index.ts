export interface User {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Case {
    _id: string;
    caseTitle: string;
    caseType: string;
    description?: string;
    status: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Assignment {
    _id: string;
    caseId: string | Case;
    userId: string | User;
    createdAt?: string;
}


export type CreateUserDto = Omit<User, '_id' | 'createdAt' | 'updatedAt'>;
export type CreateCaseDto = Omit<Case, '_id' | 'createdAt' | 'updatedAt'>;
export type CreateAssignmentDto = {
    caseId: string;
    userId: string;
};

