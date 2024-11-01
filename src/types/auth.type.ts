import { User } from "src/types/user.type";
import { SuccessResponseApi } from "src/types/utils.type";

export type AuthResponse = SuccessResponseApi<{
  access_token: string,
  expires: string,
  refresh_token: string,
  expires_refresh_token: string,
  user: User
}>

export type RefreshTokenResponse = SuccessResponseApi<{ access_token: string }>
