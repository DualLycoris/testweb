import { defineStore } from 'pinia'

import { api } from '@/api/client'

type User = {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
}

type TokenPair = {
  access: string
  refresh: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') ?? '',
    refreshToken: localStorage.getItem('refreshToken') ?? '',
    user: null as User | null,
    ready: false
  }),
  getters: {
    isAuthed: (s) => Boolean(s.accessToken)
  },
  actions: {
    async login(payload: { username: string; password: string }) {
      const { data } = await api.post<TokenPair>('/api/auth/token/', payload)
      this.accessToken = data.access
      this.refreshToken = data.refresh
      localStorage.setItem('accessToken', data.access)
      localStorage.setItem('refreshToken', data.refresh)
      await this.fetchMe()
    },
    async register(payload: { username: string; email?: string; password: string }) {
      await api.post('/api/auth/register/', payload)
      await this.login({ username: payload.username, password: payload.password })
    },
    async refresh() {
      const { data } = await api.post<{ access: string }>('/api/auth/token/refresh/', {
        refresh: this.refreshToken
      })
      this.accessToken = data.access
      localStorage.setItem('accessToken', data.access)
      return data.access
    },
    async fetchMe() {
      const { data } = await api.get<User>('/api/auth/me/')
      this.user = data
      this.ready = true
    },
    async init() {
      if (!this.accessToken) {
        this.ready = true
        return
      }
      try {
        await this.fetchMe()
      } catch {
        this.logout()
      } finally {
        this.ready = true
      }
    },
    logout() {
      this.accessToken = ''
      this.refreshToken = ''
      this.user = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  }
})

