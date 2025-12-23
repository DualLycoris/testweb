<template>
  <SectionBlock title="玩" subtitle="在玩中创新，在创新中玩">
    <el-tabs v-model="active">
      <el-tab-pane label="心理健康" name="mental">
        <WanPanel :panel="panels.mental" />
      </el-tab-pane>
      <el-tab-pane label="社会话题" name="social">
        <WanPanel :panel="panels.social" />
      </el-tab-pane>
      <el-tab-pane label="教育&文化" name="education">
        <WanPanel :panel="panels.education" />
      </el-tab-pane>
      <el-tab-pane label="文旅休闲" name="tourism">
        <WanPanel :panel="panels.tourism" />
      </el-tab-pane>
    </el-tabs>
  </SectionBlock>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'

import SectionBlock from '@/components/SectionBlock.vue'

const active = ref('mental')

type Item = { t: string; d: string }
type Panel = { title: string; desc: string; items: Item[] }

const WanPanel = defineComponent({
  props: { panel: { type: Object as () => Panel, required: true } },
  template: `
    <div class="block">
      <h3 class="h3">{{ panel.title }}</h3>
      <p class="p">{{ panel.desc }}</p>
      <div class="items">
        <el-card v-for="it in panel.items" :key="it.t" class="item" shadow="hover">
          <div class="it">{{ it.t }}</div>
          <div class="id">{{ it.d }}</div>
        </el-card>
      </div>
    </div>
  `
})

const panels: Record<string, Panel> = {
  mental: {
    title: '心理健康',
    desc: '关注心理健康，提供专业的心理支持和健康管理服务，帮助人们建立积极健康的生活态度。',
    items: [
      { t: '心理测评', d: '提供专业的心理健康测评工具，帮助用户了解自身心理状态和情绪变化。' },
      { t: '情绪管理', d: '通过科学的方法和工具，帮助用户识别、理解和管理情绪，提升情绪调节能力。' },
      { t: '压力缓解', d: '提供压力管理技巧和放松训练，帮助用户缓解工作生活压力，保持心理平衡。' },
      { t: '心理成长', d: '通过心理课程和训练，促进个人心理成长，提升自我认知和人际交往能力。' }
    ]
  },
  social: {
    title: '社会话题',
    desc: '关注社会热点话题，促进理性讨论和思想交流，推动社会进步和文明发展。',
    items: [
      { t: '热点讨论', d: '围绕社会热点话题，组织理性讨论，促进不同观点的交流与碰撞。' },
      { t: '社会观察', d: '深入观察社会现象，分析社会问题，提供有价值的思考和建议。' },
      { t: '公益参与', d: '组织公益活动，鼓励社会参与，传递正能量，推动社会和谐发展。' },
      { t: '思想交流', d: '搭建思想交流平台，促进不同背景人群的对话，增进理解与共识。' }
    ]
  },
  education: {
    title: '教育&文化',
    desc: '传承优秀文化，推动教育创新，通过科技手段让学习和文化传播更加生动有趣。',
    items: [
      { t: '文化传承', d: '运用数字技术传承和弘扬优秀传统文化，让经典文化焕发新的生命力。' },
      { t: '创新教育', d: '探索教育新模式，运用AI、VR等技术，提供个性化、互动式的学习体验。' },
      { t: '知识分享', d: '搭建知识分享平台，让知识传播更加便捷，促进学习型社会建设。' },
      { t: '文化体验', d: '通过沉浸式体验，让用户感受不同文化的魅力，拓宽文化视野。' }
    ]
  },
  tourism: {
    title: '文旅休闲',
    desc: '结合文化与旅游，提供丰富的休闲体验，让旅行成为文化探索和心灵放松的旅程。',
    items: [
      { t: '文化之旅', d: '设计深度文化体验路线，让旅行者深入了解当地文化和历史底蕴。' },
      { t: '智慧旅游', d: '运用AI和大数据技术，提供个性化旅游推荐和智能导览服务。' },
      { t: '休闲体验', d: '提供多样化的休闲活动，让人们在忙碌之余享受生活的美好。' },
      { t: '特色探索', d: '发现和推荐特色景点和体验，让旅行更加有趣和难忘。' }
    ]
  }
}
</script>

<style scoped>
.block {
  max-width: 980px;
  margin: 0 auto;
}

.h3 {
  margin: 6px 0 12px;
  color: #0b1220;
}

.p {
  color: #475467;
  line-height: 1.9;
}

.items {
  margin-top: 14px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.item {
  border-radius: 14px;
}

.it {
  font-weight: 900;
  color: #0b1220;
  margin-bottom: 6px;
}

.id {
  color: #475467;
  line-height: 1.8;
}

@media (max-width: 900px) {
  .items {
    grid-template-columns: 1fr;
  }
}
</style>
