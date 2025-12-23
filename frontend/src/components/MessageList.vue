<template>
  <div class="list">
    <el-skeleton v-if="loading" :rows="4" animated />
    <el-empty v-else-if="items.length === 0" description="暂无留言" />
    <el-card v-else v-for="m in items" :key="m.id" class="card" shadow="hover">
      <div class="top">
        <div class="subject">{{ m.subject }}</div>
        <div class="time">{{ formatTime(m.created_at) }}</div>
      </div>
      <div class="meta">
        <span>{{ m.name }}</span>
        <span>{{ m.email }}</span>
        <span v-if="m.phone">{{ m.phone }}</span>
      </div>
      <div class="content">{{ m.content }}</div>
    </el-card>
    <div v-if="next" class="more">
      <el-button :loading="moreLoading" @click="loadMore">加载更多</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import { api } from '@/api/client'

type MessageItem = {
  id: number
  user_id: number
  name: string
  email: string
  phone: string
  subject: string
  content: string
  created_at: string
}

type Page<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const loading = ref(false)
const moreLoading = ref(false)
const page = ref<Page<MessageItem> | null>(null)
const items = ref<MessageItem[]>([])

const next = computed(() => page.value?.next ?? null)

function formatTime(iso: string) {
  const dt = new Date(iso)
  return isNaN(dt.getTime()) ? iso : dt.toLocaleString('zh-CN')
}

async function fetchFirst() {
  loading.value = true
  try {
    const { data } = await api.get<Page<MessageItem>>('/api/messages/')
    page.value = data
    items.value = data.results
  } finally {
    loading.value = false
  }
}

async function loadMore() {
  if (!next.value) return
  moreLoading.value = true
  try {
    const { data } = await api.get<Page<MessageItem>>(next.value)
    page.value = data
    items.value = [...items.value, ...data.results]
  } finally {
    moreLoading.value = false
  }
}

defineExpose({ refresh: fetchFirst })

onMounted(fetchFirst)
</script>

<style scoped>
.list {
  display: grid;
  gap: 12px;
}

.card {
  border-radius: 12px;
}

.top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  margin-bottom: 8px;
}

.subject {
  font-weight: 800;
  color: #0b1220;
}

.time {
  color: #667085;
  font-size: 12px;
}

.meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  color: #475467;
  font-size: 13px;
  margin-bottom: 10px;
}

.content {
  white-space: pre-wrap;
  line-height: 1.75;
  color: #101828;
}

.more {
  display: flex;
  justify-content: center;
  margin-top: 6px;
}
</style>

