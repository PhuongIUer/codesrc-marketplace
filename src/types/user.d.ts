export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  userName: string;
  avatar: string | null;
}

export interface updateUser {
  avatar: File | string | null;
  userName: string; 
}

export interface newUser {
  email: string
  password: string
  userName: string
}

export interface access_token {
  access_token: string
}
