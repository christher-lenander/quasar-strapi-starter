export interface UserResponse {
  id: number;
  username: string;
  email: string | null;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
