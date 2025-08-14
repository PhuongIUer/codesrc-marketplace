import axios from "axios";
import type { UserResponse } from '../types/response';
import type { newUser, access_token, User } from '../types/user'
import type { RegisterResponse } from '../types/lecturer'

const api = axios.create({
  headers: {
    'ngrok-skip-browser-warning': 'true' 
  },
  baseURL: 'https://sole-pet-starfish.ngrok-free.app/api'
});

api.interceptors.request.use(async (config) => {
  
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - có thể token hết hạn');
    }
    return Promise.reject(error);
  }
);

export const userApi = {
  getUsers: (page: number, limit: number) => 
    api.get<UserResponse>('/users', { params: { page, limit } }),
  updateUser: (id: number, data: FormData) => api.patch(`/users/${id}/profile`, data),
  deleteUser: (id: number) => api.delete(`/auth/users/${id}`),
  registUser: (data: Partial<newUser>) => api.post<RegisterResponse>(`/auth/register`, data),
  updateCurrentUser: (data: FormData) => api.patch(`/users/current-profile`,data),
};

export const authApi = {
  login: (email: string, password: string) => api.post<access_token>('/auth/login', {email, password}),
  getProfile: () => api.get<User>('/auth/profile'),
  logout: () => api.post('/auth/logout'),
  changePass: (
    currentPassword: string,  
    newPassword: string,  
    confirmPassword: string
  ) => api.post('/auth/change-password',{currentPassword, newPassword, confirmPassword}),
};

export default authApi;

