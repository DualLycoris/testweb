<template>
  <SectionBlock title="注册" subtitle="创建账号后即可提交留言">
    <el-card class="card" shadow="hover">
      <el-form :model="form" label-position="top" @submit.prevent>
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="username" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" autocomplete="email" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" autocomplete="new-password" show-password />
        </el-form-item>
        <div class="actions">
          <el-button type="primary" :loading="loading" @click="submit">注册</el-button>
          <RouterLink to="/login">已有账号？去登录</RouterLink>
        </div>
      </el-form>
    </el-card>
  </SectionBlock>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import SectionBlock from '@/components/SectionBlock.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)
const form = reactive({ username: '', email: '', password: '' })

async function submit() {
  if (!form.username.trim() || !form.password) {
    ElMessage.warning('请填写用户名和密码')
    return
  }
  if (form.password.length < 8) {
    ElMessage.warning('密码至少 8 位')
    return
  }
  loading.value = true
  try {
    await auth.register({ username: form.username.trim(), email: form.email.trim(), password: form.password })
    router.push('/')
  } catch {
    ElMessage.error('注册失败，用户名可能已存在')
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

