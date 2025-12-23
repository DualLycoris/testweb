<template>
  <SectionBlock title="登录" subtitle="登录后即可提交留言与访问更多功能">
    <el-card class="card" shadow="hover">
      <el-form :model="form" label-position="top" @submit.prevent>
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="username" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" autocomplete="current-password" show-password />
        </el-form-item>
        <div class="actions">
          <el-button type="primary" :loading="loading" @click="submit">登录</el-button>
          <RouterLink to="/register">没有账号？去注册</RouterLink>
        </div>
      </el-form>
    </el-card>
  </SectionBlock>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import SectionBlock from '@/components/SectionBlock.vue'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)
const form = reactive({ username: '', password: '' })

async function submit() {
  if (!form.username.trim() || !form.password) {
    ElMessage.warning('请填写用户名和密码')
    return
  }
  loading.value = true
  try {
    await auth.login({ username: form.username.trim(), password: form.password })
    const redirect = (route.query.redirect as string | undefined) ?? '/'
    router.push(redirect)
  } catch {
    ElMessage.error('登录失败，请检查账号或密码')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.card {
  max-width: 460px;
  margin: 0 auto;
  border-radius: 14px;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
</style>

