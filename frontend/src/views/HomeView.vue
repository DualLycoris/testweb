<template>
  <div>
    <section class="hero">
      <div class="hero-inner">
        <div class="hero-left">
          <div class="hero-title">技术创新，引领未来</div>
          <div class="hero-sub">专注于前沿技术的研发与应用，打造面向未来的智能化解决方案。</div>
          <div class="hero-actions">
            <RouterLink to="/contact">
              <el-button type="primary" size="large">联系我们</el-button>
            </RouterLink>
            <RouterLink to="/services">
              <el-button size="large">查看服务</el-button>
            </RouterLink>
          </div>
        </div>
        <div class="hero-right">
          <el-carousel height="320px" :interval="4500" indicator-position="outside">
            <el-carousel-item v-for="item in heroSlides" :key="item.key">
              <div class="slide">
                <video
                  v-if="item.type === 'video'"
                  class="slide-media"
                  :src="getSrc(item)"
                  muted
                  playsinline
                  autoplay
                  loop
                />
                <img v-else class="slide-media" :src="getSrc(item)" :alt="item.alt" />
                <div class="slide-caption">
                  <div class="slide-h">{{ item.h }}</div>
                  <div class="slide-p">{{ item.p }}</div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </section>

    <SectionBlock title="公司图片画廊" subtitle="精选项目与场景，支持点击预览大图">
      <el-row :gutter="12">
        <el-col v-for="img in gallery" :key="img.src" :xs="12" :sm="8" :md="6">
          <el-image class="gallery-img" :src="getSrc(img)" fit="cover" :preview-src-list="galleryPreviewList" />
        </el-col>
      </el-row>
    </SectionBlock>

    <SectionBlock title="视频展示" subtitle="展示核心能力与解决方案应用">
      <div class="video-grid">
        <el-card class="video-card" shadow="hover">
          <video class="video" controls :src="getSrc(videos[0])" />
        </el-card>
        <el-card class="video-card" shadow="hover">
          <video class="video" controls :src="getSrc(videos[1])" />
        </el-card>
      </div>
      
    </SectionBlock>

    <SectionBlock title="新闻动态" subtitle="最新资讯与进展，点击查看详情">
      <NewsList />
    </SectionBlock>

    <SectionBlock title="留言咨询" subtitle="登录后可提交留言，访客可浏览最新留言">
      <div class="msg-grid">
        <el-card class="msg-card" shadow="hover">
          <MessageForm @submitted="onSubmitted" />
        </el-card>
        <el-card class="msg-card" shadow="hover">
          <div class="msg-title">最新留言</div>
          <MessageList ref="messageListRef" />
        </el-card>
      </div>
    </SectionBlock>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

import MessageForm from '@/components/MessageForm.vue'
import MessageList from '@/components/MessageList.vue'
import NewsList from '@/components/NewsList.vue'
import SectionBlock from '@/components/SectionBlock.vue'

type MediaItem = {
  key?: string
  type?: 'image' | 'video'
  src: string
  remoteSrc?: string
  alt?: string
  h?: string
  p?: string
}


function getSrc(item: { src: string; remoteSrc?: string }) {
  return item.remoteSrc ? item.remoteSrc : item.src
}

const heroSlides: MediaItem[] = [
  { key: 'img-1', type: 'image', src: '/images/banner/banner-1.jpg', remoteSrc: '', alt: '技术创新', h: '技术创新，引领未来', p: '专注于前沿技术的研发与应用' },
  { key: 'img-2', type: 'image', src: '/images/banner/banner-2.jpg', remoteSrc: '', alt: '智能制造', h: '智能制造，高效生产', p: '打造智能化生产解决方案' },
  { key: 'img-3', type: 'image', src: '/images/banner/banner-3.jpg', remoteSrc: '', alt: '数字化转型', h: '数字化转型，赋能企业', p: '助力企业实现数字化转型升级' },
  { key: 'video-1', type: 'video', src: '/videos/banner-vid.mp4', remoteSrc: '', alt: '视频展示', h: '视频展示', p: '' }
]

const gallery: { src: string; remoteSrc?: string }[] = [
  { src: '/images/galary/galary-1.jpg', remoteSrc: '' },
  { src: '/images/galary/galary-2.jpg', remoteSrc: '' },
  { src: '/images/galary/galary-3.jpg', remoteSrc: '' },
  { src: '/images/galary/galary-4.jpg', remoteSrc: '' },
  { src: '/images/galary/galary-5.jpg', remoteSrc: '' },
  { src: '/images/galary/galary-6.jpg', remoteSrc: '' },
  { src: '/images/galary/galary-7.jpg', remoteSrc: '' },
  { src: '/images/galary/galary-8.jpg', remoteSrc: '' }
]

const videos: { src: string; remoteSrc?: string }[] = [
  { src: '/videos/vid-1.mp4', remoteSrc: '' },
  { src: '/videos/vid-2.mp4', remoteSrc: '' }
]

const galleryPreviewList = gallery.map(getSrc)

const messageListRef = ref<InstanceType<typeof MessageList> | null>(null)

function onSubmitted() {
  messageListRef.value?.refresh()
}
</script>

<style scoped>
.hero {
  padding: 46px 0;
  background: radial-gradient(1200px 600px at 20% 10%, rgba(37, 99, 235, 0.28), transparent 60%),
    radial-gradient(900px 500px at 80% 30%, rgba(59, 130, 246, 0.22), transparent 55%),
    linear-gradient(180deg, #0b1220, #0b1220);
  color: #fff;
}

.hero-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 18px;
  align-items: center;
}

.hero-title {
  font-size: 42px;
  font-weight: 900;
  letter-spacing: 1px;
  line-height: 1.15;
}

.hero-sub {
  margin-top: 14px;
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.8;
}

.hero-actions {
  margin-top: 18px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.slide {
  height: 320px;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background: #111827;
}

.slide-media {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
}

.slide-caption {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 14px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(6px);
}

.slide-h {
  font-weight: 900;
}

.slide-p {
  margin-top: 4px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 13px;
}

.gallery-img {
  width: 100%;
  height: 140px;
  border-radius: 12px;
  overflow: hidden;
}

.video-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.video-card {
  border-radius: 14px;
}

.video {
  width: 100%;
  height: 280px;
  border-radius: 12px;
  background: #0b1220;
}

.video-tip {
  margin-top: 10px;
  color: #667085;
  font-size: 12px;
}

.msg-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.msg-card {
  border-radius: 14px;
}

.msg-title {
  font-weight: 900;
  color: #0b1220;
  margin-bottom: 10px;
}

@media (max-width: 960px) {
  .hero-inner {
    grid-template-columns: 1fr;
  }
  .msg-grid {
    grid-template-columns: 1fr;
  }
  .video-grid {
    grid-template-columns: 1fr;
  }
}
</style>

