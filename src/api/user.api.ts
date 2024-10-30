import { User } from "src/types/user.type";
import { SuccessResponseApi } from "src/types/utils.type";
import http from "src/utils/http";

interface BodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'createdAt' | "updatedAt" | "email"> {
  password?: string,
  newPassword?: string
}

const userApi = {
  getProfile: () => http.get<SuccessResponseApi<User>>('/me'),
  updateProfile: (body: BodyUpdateProfile) => http.put<SuccessResponseApi<User>>("/user", body),
  uploadAvatar: (body: FormData) => http.post<SuccessResponseApi<string>>("/user/upload-avatar", body, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export default userApi