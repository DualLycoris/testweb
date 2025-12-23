<template>
  <div>
    <SectionBlock title="关于道器智造">
      <div class="block">
        <h2 class="h2">我们的使命</h2>
        <p class="p">
          道器智造致力于成为技术创新的引领者，通过前沿的技术解决方案，帮助企业实现数字化转型和智能化升级。我们相信技术与创新的力量，致力于为客户创造更大的价值。
        </p>
        <h2 class="h2">我们的愿景</h2>
        <p class="p">
          成为行业领先的技术服务提供商，通过持续的技术创新和优质的服务，推动中国制造业的智能化转型，助力企业实现高质量发展。
        </p>
        <h2 class="h2">核心价值观</h2>
        <ul class="ul">
          <li><strong>创新驱动：</strong>持续投入研发，保持技术领先</li>
          <li><strong>客户至上：</strong>以客户需求为中心，提供优质服务</li>
          <li><strong>诚信务实：</strong>诚实守信，脚踏实地</li>
          <li><strong>合作共赢：</strong>与合作伙伴共同成长</li>
        </ul>
      </div>
    </SectionBlock>

    <SectionBlock title="发展历程">
      <el-tabs v-model="active">
        <el-tab-pane v-for="t in timeline" :key="t.key" :label="t.label" :name="t.key">
          <div class="block">
            <h3 class="h3">{{ t.title }}</h3>
            <p class="p">{{ t.desc }}</p>
            <ul class="ul">
              <li v-for="i in t.items" :key="i">{{ i }}</li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
    </SectionBlock>

    <SectionBlock title="核心团队">
      <div class="team">
        <el-card class="member" shadow="hover">
          <div class="avatar">CEO</div>
          <div class="name">张总</div>
          <div class="role">首席执行官</div>
          <div class="desc">20年行业经验，曾任职多家知名科技公司高管</div>
        </el-card>
        <el-card class="member" shadow="hover">
          <div class="avatar">CTO</div>
          <div class="name">李总</div>
          <div class="role">首席技术官</div>
          <div class="desc">技术专家，在AI和云计算领域有深厚造诣</div>
        </el-card>
        <el-card class="member" shadow="hover">
          <div class="avatar">COO</div>
          <div class="name">王总</div>
          <div class="role">首席运营官</div>
          <div class="desc">运营管理专家，擅长企业数字化转型</div>
        </el-card>
      </div>
    </SectionBlock>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import SectionBlock from '@/components/SectionBlock.vue'

const active = ref('2020')

const timeline = [
  { key: '2020', label: '2020年', title: '公司成立', desc: '道器智造正式成立，专注于智能制造和数字化转型领域的技术服务。', items: ['公司注册成立', '核心团队组建完成', '获得首轮融资'] },
  { key: '2021', label: '2021年', title: '业务拓展', desc: '业务快速发展，服务范围不断扩大，客户满意度持续提升。', items: ['服务客户超过50家', '推出AI智能分析平台', '获得高新技术企业认证'] },
  { key: '2022', label: '2022年', title: '技术突破', desc: '在核心技术领域取得重大突破，产品和服务能力显著提升。', items: ['发布物联网云平台', '获得多项技术专利', '团队规模扩大至100人'] },
  { key: '2023', label: '2023年', title: '市场领先', desc: '在细分市场取得领先地位，品牌影响力不断提升。', items: ['服务客户超过200家', '获得行业创新奖', '建立多个区域服务中心'] },
  { key: '2024', label: '2024年', title: '持续创新', desc: '持续投入研发，推出新一代技术解决方案，引领行业发展。', items: ['发布AI大模型应用平台', '拓展海外市场', '建立产学研合作基地'] }
]
</script>

<style scoped>
.block {
  max-width: 920px;
  margin: 0 auto;
}

.h2 {
  margin: 18px 0 10px;
  color: #0b1220;
}

.h3 {
  margin: 6px 0 10px;
  color: #0b1220;
}

.p {
  line-height: 1.9;
  color: #475467;
}

.ul {
  color: #475467;
  line-height: 1.9;
}

.team {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.member {
  border-radius: 14px;
  text-align: center;
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  margin: 0 auto 12px;
  background: #0b1220;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}

.name {
  font-weight: 900;
  color: #0b1220;
}

.role {
  margin-top: 6px;
  color: #667085;
}

.desc {
  margin-top: 10px;
  color: #475467;
  line-height: 1.7;
}

@media (max-width: 960px) {
  .team {
    grid-template-columns: 1fr;
  }
}
</style>

