import axios, { type InternalAxiosRequestConfig } from 'axios'

import { useAuthStore } from '@/stores/auth'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '',
  timeout: 15000
})

api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.accessToken) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${auth.accessToken}`
  }
  return config
})

let refreshPromise: Promise<string> | null = null

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const auth = useAuthStore()
    const original = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined
    const status = error?.response?.status
    if (!original || original._retry || status !== 401 || !auth.refreshToken) {
      throw error
    }

    original._retry = true
    refreshPromise =
      refreshPromise ??
      auth
        .refresh()
        .then((token) => token)
        .finally(() => {
          refreshPromise = null
        })

    const newAccessToken = await refreshPromise
    original.headers = original.headers ?? {}
    original.headers.Authorization = `Bearer ${newAccessToken}`
    return api.request(original)
  }
)
