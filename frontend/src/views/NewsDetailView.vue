<template>
  <SectionBlock :title="news?.title ?? '新闻详情'">
    <el-skeleton v-if="loading" :rows="8" animated />
    <el-empty v-else-if="!news" description="未找到新闻" />
    <div v-else class="detail">
      <div class="meta">{{ formatTime(news.published_at) }}</div>
      <el-image v-if="news.image_url" :src="news.image_url" fit="cover" class="cover" />
      <video v-if="news.video_url" class="video" controls :src="news.video_url" />
      <div class="content">{{ news.content }}</div>
    </div>
  </SectionBlock>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { api } from '@/api/client'
import SectionBlock from '@/components/SectionBlock.vue'

type NewsItem = {
  id: number
  title: string
  summary: string
  content: string
  published_at: string
  image_url: string | null
  video_url: string | null
}

const props = defineProps<{ id: string }>()

const loading = ref(false)
const news = ref<NewsItem | null>(null)

function formatTime(iso: string) {
  const dt = new Date(iso)
  return isNaN(dt.getTime()) ? iso : dt.toLocaleString('zh-CN')
}

async function fetchNews() {
  loading.value = true
  try {
    const { data } = await api.get<NewsItem>(`/api/news/${props.id}/`)
    news.value = data
  } finally {
    loading.value = false
  }
}

onMounted(fetchNews)
</script>

<style scoped>
.detail {
  max-width: 820px;
  margin: 0 auto;
}

.meta {
  text-align: center;
  color: #667085;
  margin-bottom: 12px;
}

.cover {
  width: 100%;
  height: 320px;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 14px;
}

.video {
  width: 100%;
  height: 360px;
  border-radius: 14px;
  background: #0b1220;
  margin-bottom: 14px;
}

.content {
  white-space: pre-wrap;
  line-height: 1.9;
  color: #101828;
}
</style>

