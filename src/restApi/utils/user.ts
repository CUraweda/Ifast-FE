
export interface Role {
  id: string;
  name: string;
  code: string;
  description: string;
  createdAt: string;
  }
  
  export interface Division {
    id: string,
    name: string,
    Code: string
  }
  export interface HirarkyLevel {
    id: string;
    hirarkyId: string;
    sequence: number;
    requiredRole: string;
    approverId: string;
    createdAt: string;
  }
  
  export interface Hirarky {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    levels: HirarkyLevel[];
  }
  
  export interface User {
    id: string;
    fullName: string;
    email: string;
    phoneWA: string;
    nik: number;
    signature: string | null;
    status: string | null;
    createdAt: string;
    divisionId: string;
    hirarkyId: string;
    roles: Role[];
    hirarky: Hirarky;
    division : Division
  }
  

  export interface UserResponse {
    status: boolean;
    message: string;
    data: User;
  }


  // src/restApi/utils/user.ts

export interface ListUsersData {
  total_items: number;
  page: number;
  limit: number;
  total_pages: number;
  items: User[];
}

export interface ListUsersResponse {
  status: boolean;
  message: string;
  data: ListUsersData;
}


export interface RoleReq {
  roles: string[];
}