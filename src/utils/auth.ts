import { User } from "src/types/user.type"

export const localStorageEventTarget = new EventTarget()

export const setAccessTokenToLocalStorage = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken)
}
export const setRefreshTokenToLocalStorage = (refreshToken: string) => {
  localStorage.setItem("refreshToken", refreshToken)
}

export const clearLocalStorage = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("profile")
  const clearLocalStorage = new Event('clearLS')
  localStorageEventTarget.dispatchEvent(clearLocalStorage)
}

export const getAccessTokenFromLocalStorage = () => localStorage.getItem('accessToken') || ""
export const getRefreshTokenFromLocalStorage = () => localStorage.getItem('refreshToken') || ""

export const getProfileFromLocalStorage = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
export const setProfileToLocalStorage = (profile: User) =>
  localStorage.setItem('profile', JSON.stringify(profile))

