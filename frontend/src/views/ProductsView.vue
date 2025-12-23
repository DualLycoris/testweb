<template>
  <SectionBlock title="产品展示" subtitle="创新产品，助力企业数字化转型">
    <el-tabs v-model="active">
      <el-tab-pane label="平台产品" name="platform">
        <ProductGrid
          :items="[
            { icon: 'AI', title: 'AI智能平台', desc: '一站式AI开发和应用平台，提供模型训练、部署和管理能力。', points: ['模型训练与管理', 'API服务接口', '可视化建模工具'] },
            { icon: 'IoT', title: '物联网云平台', desc: '企业级物联网平台，支持海量设备接入和数据处理。', points: ['设备管理', '数据采集', '规则引擎'] },
            { icon: 'Cloud', title: '工业云平台', desc: '面向制造业的云平台，提供生产管理和数据分析能力。', points: ['生产监控', '质量追溯', '能耗管理'] }
          ]"
        />
      </el-tab-pane>
      <el-tab-pane label="软件产品" name="software">
        <ProductGrid
          :items="[
            { icon: 'MES', title: '制造执行系统', desc: '生产管理软件，实现生产过程的数字化管理。', points: ['生产计划', '工艺管理', '质量管控'] },
            { icon: 'WMS', title: '仓储管理系统', desc: '智能仓储管理软件，提升仓储效率。', points: ['库存管理', '出入库管理', '智能盘点'] },
            { icon: 'BI', title: '商业智能系统', desc: '数据分析和可视化平台，支持多维度数据分析。', points: ['数据报表', '可视化大屏', '预测分析'] }
          ]"
        />
      </el-tab-pane>
      <el-tab-pane label="硬件产品" name="hardware">
        <ProductGrid
          :items="[
            { icon: 'Gateway', title: '物联网网关', desc: '支持多种协议的物联网网关设备。', points: ['多协议支持', '边缘计算', '安全可靠'] },
            { icon: 'Sensor', title: '智能传感器', desc: '各类工业传感器，支持温度、湿度、压力等监测。', points: ['高精度测量', '无线传输', '低功耗设计'] },
            { icon: 'Edge', title: '边缘计算设备', desc: '边缘计算终端，支持本地数据处理和分析。', points: ['高性能计算', '实时响应', '离线运行'] }
          ]"
        />
      </el-tab-pane>
      <el-tab-pane label="解决方案" name="solution">
        <ProductGrid
          :items="[
            { icon: 'Smart', title: '智能工厂解决方案', desc: '完整的智能工厂建设方案，实现生产智能化。', points: ['设备互联', '数据驱动', '智能决策'] },
            { icon: 'Quality', title: '质量追溯解决方案', desc: '产品质量追溯系统，实现全流程质量管控。', points: ['全程追溯', '质量分析', '问题定位'] },
            { icon: 'Energy', title: '能耗管理解决方案', desc: '企业能耗监测和管理系统，降低能源成本。', points: ['能耗监测', '节能分析', '优化建议'] }
          ]"
        />
      </el-tab-pane>
    </el-tabs>
  </SectionBlock>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'

import SectionBlock from '@/components/SectionBlock.vue'

const active = ref('platform')

type ProductItem = { icon: string; title: string; desc: string; points: string[] }

const ProductGrid = defineComponent({
  props: { items: { type: Array as () => ProductItem[], required: true } },
  template: `
    <div class="grid">
      <el-card v-for="p in items" :key="p.title" class="card" shadow="hover">
        <div class="icon">{{ p.icon }}</div>
        <div class="title">{{ p.title }}</div>
        <div class="desc">{{ p.desc }}</div>
        <ul class="ul">
          <li v-for="x in p.points" :key="x">{{ x }}</li>
        </ul>
      </el-card>
    </div>
  `
})
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.card {
  border-radius: 14px;
}

.icon {
  width: 54px;
  height: 54px;
  border-radius: 16px;
  background: #0b1220;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  margin-bottom: 12px;
}

.title {
  font-weight: 900;
  color: #0b1220;
  margin-bottom: 6px;
}

.desc {
  color: #475467;
  line-height: 1.7;
}

.ul {
  margin-top: 10px;
  color: #475467;
  line-height: 1.8;
  padding-left: 18px;
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
