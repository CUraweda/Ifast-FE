export interface submissionType {
  id: string;
  userId: string;
  number: string;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  date: string;
  activity: string;
  description: string;
  status: string;
  typeId: string;
  approval: approvalType[];
  type: typeSubmissionType;
  project: typeSubmissionType;
  totalAmount: number;
  submissionDetail: detailSubmission[]
}

export interface detailSubmission {
    id: string,
    submissionId: string
    name: string,
    qty : number
    category: category
    amount: number
    evidence: string
}

export interface category {
    id: string
    name: string,
    code: string
}

export interface approvalType {
  id: string;
  submissionId: string;
  sequence: number;
  requiredRole: string;
  status: string;
  approverId: string;
  comment?: string;
  createdAt: string;
}

export interface typeSubmissionType {
  id: string;
  name: string;
  code: string;
  description: string;
  createdAt: string;
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
export interface getOneSubmissionResponse {
  status: boolean;
  message: string;
  data: submissionType;
}

export interface createSubmission {
  projectId: string;
  date: string;
  activity: string;
  description: string;
  typeId: string;
  status: string;
}

export interface submissionDetail {
  submissionId?: string |  undefined;
  name: string;
  qty: number;
  categoryId: string;
  amount: number;
}
