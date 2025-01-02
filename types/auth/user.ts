export interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  is_verified?: boolean;
  is_disabled: boolean;
}
export interface UserResponse {
  data: User;
  message?: string;
}
