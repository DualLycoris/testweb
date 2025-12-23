<template>
  <SectionBlock title="器" subtitle="工欲善其事，必先利其器">
    <el-tabs v-model="active">
      <el-tab-pane label="超限智造" name="superlimit">
        <QiPanel :panel="panels.superlimit" />
      </el-tab-pane>
      <el-tab-pane label="数字岐黄" name="digital">
        <QiPanel :panel="panels.digital" />
      </el-tab-pane>
      <el-tab-pane label="知心慧语" name="wisdom">
        <QiPanel :panel="panels.wisdom" />
      </el-tab-pane>
      <el-tab-pane label="新农业" name="agriculture">
        <QiPanel :panel="panels.agriculture" />
      </el-tab-pane>
      <el-tab-pane label="皮肤健康" name="skin">
        <QiPanel :panel="panels.skin" />
      </el-tab-pane>
    </el-tabs>
  </SectionBlock>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'

import SectionBlock from '@/components/SectionBlock.vue'

const active = ref('superlimit')

type Item = { t: string; d: string }
type Panel = { title: string; desc: string; items: Item[] }

const QiPanel = defineComponent({
  props: {
    panel: { type: Object as () => Panel, required: true }
  },
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
  superlimit: {
    title: '超限智造',
    desc: '超限智造代表着超越传统制造边界的智能化解决方案，融合先进技术与创新思维，打造下一代智能制造系统。',
    items: [
      { t: '智能生产线', d: '集成AI、物联网、机器人技术，实现生产过程的全面自动化和智能化。' },
      { t: '数字孪生', d: '构建物理工厂的数字镜像，实现虚拟仿真、预测性维护和优化决策。' },
      { t: '柔性制造', d: '支持多品种、小批量生产，快速响应市场需求变化，提高生产灵活性。' },
      { t: '智能决策', d: '基于大数据和AI算法，实现生产计划、质量管控、设备维护的智能决策。' }
    ]
  },
  digital: {
    title: '数字岐黄',
    desc: '数字岐黄将传统中医智慧与现代数字技术相结合，通过AI、大数据等技术手段，传承和发展中医药文化。',
    items: [
      { t: '中医智能诊断', d: '运用AI技术辅助中医诊断，结合望闻问切四诊信息，提供诊断建议。' },
      { t: '中药知识库', d: '构建数字化中药知识库，整合经典方剂、药材信息、配伍禁忌等知识。' },
      { t: '体质辨识系统', d: '通过数据分析进行中医体质辨识，提供个性化健康调理方案。' },
      { t: '健康管理平台', d: '提供基于中医理论的健康管理平台，实现预防保健和慢病管理。' }
    ]
  },
  wisdom: {
    title: '知心慧语',
    desc: '知心慧语是智能化的心理服务和情感交流平台，运用AI技术提供心理健康支持和情感陪伴。',
    items: [
      { t: '智能心理咨询', d: '基于NLP技术的智能心理咨询系统，提供24小时在线心理支持和疏导。' },
      { t: '情感分析', d: '通过文本、语音分析用户情感状态，及时发现心理问题并提供干预建议。' },
      { t: '心理健康评估', d: '提供专业的心理健康评估工具，帮助用户了解自身心理状态。' },
      { t: '个性化建议', d: '根据用户情况提供个性化的心理健康建议和训练方案。' }
    ]
  },
  agriculture: {
    title: '新农业',
    desc: '新农业运用物联网、大数据、AI等先进技术，推动农业现代化，实现精准农业和智慧农业。',
    items: [
      { t: '智慧农场', d: '通过传感器、无人机等技术，实现农田环境的实时监测和精准管理。' },
      { t: '精准灌溉', d: '基于土壤湿度、气象数据，实现精准灌溉，节约水资源，提高产量。' },
      { t: '病虫害识别', d: '运用图像识别技术，自动识别作物病虫害，及时预警和防治。' },
      { t: '农产品溯源', d: '建立完整的农产品溯源体系，保障食品安全，提升产品价值。' },
      { t: '生物化学农药', d: '研发和应用生物与化学结合的低残留农药，提高防治效果并降低环境影响。' }
    ]
  },
  skin: {
    title: '皮肤健康',
    desc: '皮肤健康平台运用AI图像识别和数据分析技术，提供专业的皮肤健康管理和护理建议。',
    items: [
      { t: '皮肤检测分析', d: '通过AI图像分析，检测皮肤状态、问题识别，提供专业的皮肤评估报告。' },
      { t: '个性化护肤方案', d: '根据个人肤质和问题，提供个性化的护肤产品推荐和护理方案。' },
      { t: '皮肤健康追踪', d: '长期追踪皮肤状态变化，记录护理效果，优化护肤策略。' },
      { t: '专业咨询', d: '连接专业皮肤科医生，提供在线咨询和诊疗建议服务。' }
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
