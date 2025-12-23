<template>
  <SectionBlock title="我们的服务" subtitle="提供全方位的技术解决方案，助力企业实现数字化转型">
    <el-tabs v-model="active">
      <el-tab-pane label="人工智能" name="ai">
        <ServicePanel :panel="panels.ai" />
      </el-tab-pane>
      <el-tab-pane label="物联网" name="iot">
        <ServicePanel :panel="panels.iot" />
      </el-tab-pane>
      <el-tab-pane label="云计算" name="cloud">
        <ServicePanel :panel="panels.cloud" />
      </el-tab-pane>
      <el-tab-pane label="大数据" name="bigdata">
        <ServicePanel :panel="panels.bigdata" />
      </el-tab-pane>
      <el-tab-pane label="技术咨询" name="consulting">
        <ServicePanel :panel="panels.consulting" />
      </el-tab-pane>
    </el-tabs>
  </SectionBlock>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'

import SectionBlock from '@/components/SectionBlock.vue'

const active = ref('ai')

type Item = { t: string; d: string }
type Panel = { title: string; desc: string; items: Item[] }

const ServicePanel = defineComponent({
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
  ai: {
    title: '人工智能解决方案',
    desc: '我们提供先进的AI技术，包括机器学习、深度学习、自然语言处理等，帮助企业实现智能化转型。',
    items: [
      { t: '智能推荐系统', d: '基于用户行为和偏好，构建个性化推荐算法，提升用户体验和转化率。' },
      { t: '图像识别与分析', d: '提供图像识别、物体检测、人脸识别等视觉AI能力，应用于安防、质检等场景。' },
      { t: '语音识别与处理', d: '支持语音转文字、语音合成、声纹识别等功能，应用于智能客服、语音助手等。' },
      { t: '智能客服系统', d: '基于NLP技术的智能客服机器人，7x24小时在线服务，提升服务效率。' }
    ]
  },
  iot: {
    title: '物联网平台',
    desc: '构建完整的物联网生态系统，实现设备互联、数据采集和智能控制。',
    items: [
      { t: '设备接入与管理', d: '支持多种协议和设备类型，提供统一的设备管理平台。' },
      { t: '实时数据监控', d: '实时采集设备数据，提供可视化监控大屏，随时掌握设备状态。' },
      { t: '远程控制与操作', d: '支持远程设备控制，实现远程操作和维护，降低运维成本。' },
      { t: '数据分析与预测', d: '基于设备数据进行智能分析，预测故障和维护需求。' }
    ]
  },
  cloud: {
    title: '云计算服务',
    desc: '提供稳定可靠的云计算基础设施，支持弹性扩展和高可用性。',
    items: [
      { t: '云服务器部署', d: '提供高性能云服务器，支持快速部署和弹性扩容。' },
      { t: '容器化解决方案', d: '基于Docker和Kubernetes的容器化部署方案，提升应用部署效率。' },
      { t: '云存储服务', d: '提供安全可靠的云存储服务，支持多种存储类型和访问方式。' },
      { t: 'CDN加速服务', d: '全球CDN节点，加速内容分发，提升用户体验。' }
    ]
  },
  bigdata: {
    title: '大数据分析',
    desc: '挖掘数据价值，提供数据分析和商业智能解决方案。',
    items: [
      { t: '数据采集与清洗', d: '多源数据采集，自动化数据清洗和预处理流程。' },
      { t: '数据仓库建设', d: '构建企业级数据仓库，实现数据统一管理和分析。' },
      { t: '实时数据分析', d: '流式数据处理，支持实时数据分析和监控。' },
      { t: '可视化报表', d: '丰富的可视化组件，生成直观的数据报表和仪表盘。' }
    ]
  },
  consulting: {
    title: '技术咨询',
    desc: '提供专业的技术咨询服务，帮助企业制定数字化转型战略。',
    items: [
      { t: '技术架构设计', d: '根据业务需求，设计合理的技术架构方案。' },
      { t: '数字化转型规划', d: '制定数字化转型路线图，明确实施步骤和目标。' },
      { t: '技术选型建议', d: '基于业务场景，提供技术选型和方案建议。' },
      { t: '培训与支持', d: '提供技术培训和持续的技术支持服务。' }
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
