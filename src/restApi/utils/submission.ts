export interface submissionType {
    id: string,
    userId : string,
    number: string,
    createdAt: string,
    updatedAt : string,
    projectId: string,
    date: string,
    activity: string,
    description: string,
    status: string,
    typeId: string,
    approval: approvalType[]
    type: typeSubmissionType
    totalAmount: number
}

export interface approvalType {
    id: string,
    submissionId : string,
    sequence: number,
    requiredRole: string,
    status: string,
    approverId: string,
    comment?: string
    createdAt: string
}

export interface typeSubmissionType {
    id: string,
    name: string,
    code: string,
    description: string,
    createdAt: string
}

export interface submissionList {
    total_items: number;
    page: number;
    limit: number;
    total_pages: number;
    items: submissionType[];
}

export interface submissionResponse {
  status: boolean;
  message: string;
  data: submissionList;
}

export interface createSubmission {
    projectId: string,
    date: string,
    activity: string,
    description: string,
    typeId: string
    status: string
}