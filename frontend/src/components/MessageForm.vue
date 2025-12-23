<template>
  <el-form :model="form" label-position="top" @submit.prevent>
    <el-row :gutter="16">
      <el-col :xs="24" :sm="12">
        <el-form-item label="姓名 *">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-form-item label="邮箱 *">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-form-item label="电话">
          <el-input v-model="form.phone" placeholder="请输入电话" />
        </el-form-item>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-form-item label="主题 *">
          <el-input v-model="form.subject" placeholder="请输入主题" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="留言内容 *">
          <el-input v-model="form.content" type="textarea" :rows="5" placeholder="请输入留言内容" />
        </el-form-item>
      </el-col>
    </el-row>
    <div class="actions">
      <el-button type="primary" :loading="loading" @click="submit">提交留言</el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { api } from '@/api/client'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: '',
  content: ''
})

const emit = defineEmits<{ submitted: [] }>()

function validate() {
  if (!form.name.trim()) return '请填写姓名'
  if (!form.email.trim()) return '请填写邮箱'
  if (!form.subject.trim()) return '请填写主题'
  if (!form.content.trim()) return '请填写留言内容'
  return ''
}

async function submit() {
  if (!auth.isAuthed) {
    router.push({ path: '/login', query: { redirect: router.currentRoute.value.fullPath } })
    return
  }

  const err = validate()
  if (err) {
    ElMessage.warning(err)
    return
  }

  loading.value = true
  try {
    await api.post('/api/messages/', { ...form })
    ElMessage.success('留言提交成功！我们会尽快与您联系。')
    form.name = ''
    form.email = ''
    form.phone = ''
    form.subject = ''
    form.content = ''
    emit('submitted')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: flex-end;
}
</style>

