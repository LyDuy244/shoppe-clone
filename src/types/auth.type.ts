import { User } from "src/types/user.type";
import { SuccessResponseApi } from "src/types/utils.type";

export type AuthResponse = SuccessResponseApi<{
  access_token: string,
  expires: string,
  user: User
}>