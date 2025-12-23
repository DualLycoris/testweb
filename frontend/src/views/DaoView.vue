<template>
  <SectionBlock title="道" subtitle="道法自然，技术之道">
    <el-tabs v-model="active">
      <el-tab-pane v-for="tab in tabs" :key="tab.key" :label="tab.label" :name="tab.key">
        <div class="block">
          <h3 class="h3">{{ tab.title }}</h3>
          <p class="p">{{ tab.desc }}</p>
          <div class="items">
            <el-card v-for="it in tab.items" :key="it.title" class="item" shadow="hover">
              <div class="it">{{ it.title }}</div>
              <div class="id">{{ it.desc }}</div>
            </el-card>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </SectionBlock>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import SectionBlock from '@/components/SectionBlock.vue'

const active = ref('quantum')

const tabs = [
  {
    key: 'quantum',
    label: '量子思维',
    title: '量子思维',
    desc: '量子思维代表着我们对不确定性和概率性的深刻理解。在技术领域，我们借鉴量子力学的思维方式，认识到系统状态的叠加性和观测的影响。',
    items: [
      { title: '叠加态思维', desc: '在技术方案设计时，考虑多种可能性的叠加，不局限于单一方案，保持开放性和灵活性。' },
      { title: '概率性决策', desc: '基于概率和统计的方法进行技术选型和决策，在不确定性中寻找最优解。' },
      { title: '观测影响系统', desc: '认识到监控和观测本身会影响系统性能，在设计中平衡可观测性和系统效率。' },
      { title: '纠缠与关联', desc: '理解系统组件之间的关联性，设计时考虑整体性和关联影响。' }
    ]
  },
  {
    key: 'laozi',
    label: '老子思维',
    title: '老子思维',
    desc: '老子思维体现了"道法自然"、"无为而治"的哲学智慧。在技术研发中，我们追求简洁、自然、平衡的解决方案。',
    items: [
      { title: '道法自然', desc: '技术方案应该符合自然规律，简洁明了，避免过度设计，追求本质和简洁。' },
      { title: '无为而治', desc: '通过良好的架构设计，让系统能够自我调节和管理，减少人工干预，提高自动化程度。' },
      { title: '上善若水', desc: '技术应该像水一样，灵活适应环境，能够绕过障碍，找到最优路径。' },
      { title: '平衡和谐', desc: '在性能、成本、可维护性、可扩展性之间找到平衡，追求系统的和谐统一。' }
    ]
  },
  {
    key: 'finance',
    label: '金融物理',
    title: '金融物理',
    desc: '金融物理将物理学的思维方法应用于金融和技术领域，通过数学模型和物理原理来理解和优化系统行为。',
    items: [
      { title: '风险建模', desc: '借鉴金融风险管理的思维，对技术系统的风险进行建模和量化分析。' },
      { title: '系统动力学', desc: '运用物理学的动力学原理，理解系统的演化规律和反馈机制。' },
      { title: '优化理论', desc: '应用数学优化方法，在约束条件下寻找系统的最优配置和参数。' },
      { title: '复杂网络', desc: '运用复杂网络理论，分析和优化分布式系统的拓扑结构和信息流动。' }
    ]
  },
  {
    key: 'other',
    label: '其他',
    title: '其他思维模式',
    desc: '除了上述思维模式，我们还融合了多种跨学科的思维方式，形成独特的技术创新方法论。',
    items: [
      { title: '系统思维', desc: '从整体角度思考问题，理解系统各部分的相互作用和整体涌现性。' },
      { title: '演化思维', desc: '借鉴生物进化理论，通过迭代、变异、选择来优化技术方案。' },
      { title: '博弈思维', desc: '在多方参与的系统中，运用博弈论思维来分析和设计最优策略。' },
      { title: '信息论思维', desc: '从信息的角度理解系统，优化信息的传递、存储和处理效率。' }
    ]
  }
]
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
