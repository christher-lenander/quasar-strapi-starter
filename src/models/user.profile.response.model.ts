import { ImageResponse } from './image.response.model';
import { UserResponse } from './user.reponse.model';

export interface UserProfileResponse {
  id: number;
  firstName: string | null;
  lastName: string | null;
  user: UserResponse;
  photo: ImageResponse | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
