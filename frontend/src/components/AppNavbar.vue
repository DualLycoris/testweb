<template>
  <header class="navbar">
    <div class="container">
      <RouterLink class="brand" to="/">
        <span class="brand-title">道器智造</span>
      </RouterLink>

      <nav class="desktop-nav">
        <RouterLink v-for="item in nav" :key="item.to" class="nav-link" :to="item.to" active-class="active">
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="right">
        <template v-if="auth.isAuthed">
          <span class="user">{{ auth.user?.username }}</span>
          <el-button size="small" @click="onLogout">退出</el-button>
        </template>
        <template v-else>
          <RouterLink class="auth-link" to="/login">登录</RouterLink>
          <RouterLink class="auth-link" to="/register">注册</RouterLink>
        </template>
        <el-button class="mobile-toggle" text @click="drawer = true">菜单</el-button>
      </div>
    </div>

    <el-drawer v-model="drawer" title="导航" direction="rtl" size="70%">
      <div class="drawer-links">
        <RouterLink
          v-for="item in nav"
          :key="item.to"
          class="drawer-link"
          :to="item.to"
          @click="drawer = false"
        >
          {{ item.label }}
        </RouterLink>
      </div>
      <div class="drawer-auth">
        <template v-if="auth.isAuthed">
          <div class="drawer-user">{{ auth.user?.username }}</div>
          <el-button type="danger" @click="onLogout">退出</el-button>
        </template>
        <template v-else>
          <el-button type="primary" @click="go('/login')">登录</el-button>
          <el-button @click="go('/register')">注册</el-button>
        </template>
      </div>
    </el-drawer>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const drawer = ref(false)

const nav = [
  { label: '首页', to: '/' },
  { label: '道', to: '/dao' },
  { label: '器', to: '/qi' },
  { label: '玩', to: '/wan' },
  { label: '关于我们', to: '/about' },
  { label: '产品展示', to: '/products' },
  { label: '服务介绍', to: '/services' },
  { label: '联系我们', to: '/contact' }
]

function go(to: string) {
  drawer.value = false
  router.push(to)
}

function onLogout() {
  auth.logout()
  drawer.value = false
  router.push('/')
}

onMounted(() => {
  auth.init()
})
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: #0b1220;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  color: #fff;
  text-decoration: none;
}

.brand-title {
  font-weight: 700;
  letter-spacing: 1px;
}

.desktop-nav {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.nav-link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  padding: 6px 8px;
  border-radius: 8px;
}

.nav-link.active {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user {
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
}

.auth-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 13px;
}

.mobile-toggle {
  display: none;
}

.drawer-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.drawer-link {
  text-decoration: none;
  color: #0b1220;
  font-weight: 600;
}

.drawer-auth {
  margin-top: 18px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.drawer-user {
  font-weight: 600;
}

@media (max-width: 900px) {
  .desktop-nav {
    display: none;
  }
  .mobile-toggle {
    display: inline-flex;
  }
}
</style>

