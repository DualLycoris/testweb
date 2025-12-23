<template>
  <div class="grid">
    <el-skeleton v-if="loading" :rows="5" animated />
    <el-empty v-else-if="items.length === 0" description="暂无新闻" />
    <el-card v-else v-for="n in items" :key="n.id" class="card" shadow="hover" @click="goDetail(n.id)">
      <div class="media">
        <el-image v-if="n.image_url" :src="n.image_url" fit="cover" class="img" />
        <div v-else class="placeholder">NEWS</div>
      </div>
      <div class="body">
        <div class="title">{{ n.title }}</div>
        <div class="meta">{{ formatTime(n.published_at) }}</div>
        <div class="summary">{{ n.summary || sliceText(n.content) }}</div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { api } from '@/api/client'

type NewsItem = {
  id: number
  title: string
  summary: string
  content: string
  published_at: string
  image_url: string | null
  video_url: string | null
}

type Page<T> = {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

const router = useRouter()
const loading = ref(false)
const items = ref<NewsItem[]>([])

function sliceText(text: string) {
  const s = (text || '').replace(/\s+/g, ' ').trim()
  return s.length > 80 ? `${s.slice(0, 80)}...` : s
}

function formatTime(iso: string) {
  const dt = new Date(iso)
  return isNaN(dt.getTime()) ? iso : dt.toLocaleDateString('zh-CN')
}

function goDetail(id: number) {
  router.push(`/news/${id}`)
}

async function fetchNews() {
  loading.value = true
  try {
    const { data } = await api.get<Page<NewsItem>>('/api/news/?page_size=6')
    items.value = data.results
  } finally {
    loading.value = false
  }
}

onMounted(fetchNews)
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.card {
  border-radius: 14px;
  cursor: pointer;
  overflow: hidden;
}

.media {
  height: 160px;
  background: #0b1220;
}

.img {
  width: 100%;
  height: 160px;
}

.placeholder {
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 800;
  letter-spacing: 2px;
}

.body {
  padding: 12px 14px 14px;
}

.title {
  font-weight: 900;
  color: #0b1220;
  line-height: 1.4;
}

.meta {
  margin-top: 6px;
  font-size: 12px;
  color: #667085;
}

.summary {
  margin-top: 10px;
  color: #475467;
  line-height: 1.7;
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>

