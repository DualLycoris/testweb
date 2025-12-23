<template>
  <SectionBlock title="联系我们" subtitle="欢迎与我们联系，我们将竭诚为您服务">
    <div class="grid">
      <div class="info">
        <el-card class="info-card" shadow="hover">
          <div class="label">公司地址</div>
          <div class="value">上海市梅陇路130号</div>
        </el-card>
        <el-card class="info-card" shadow="hover">
          <div class="label">联系电话</div>
          <div class="value">13671671697</div>
        </el-card>
        <el-card class="info-card" shadow="hover">
          <div class="label">电子邮箱</div>
          <div class="value">781772346@qq.com</div>
        </el-card>
        <el-card class="info-card" shadow="hover">
          <div class="label">工作时间</div>
          <div class="value">周一至周五: 9:00 - 18:00</div>
          <div class="value">周六: 9:00 - 12:00</div>
        </el-card>
      </div>

      <div class="form">
        <el-card class="card" shadow="hover">
          <div class="title">在线留言</div>
          <MessageForm @submitted="onSubmitted" />
        </el-card>
      </div>
    </div>

    <div class="list">
      <el-card class="card" shadow="hover">
        <div class="title">最新留言</div>
        <MessageList ref="listRef" />
      </el-card>
    </div>
  </SectionBlock>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import MessageForm from '@/components/MessageForm.vue'
import MessageList from '@/components/MessageList.vue'
import SectionBlock from '@/components/SectionBlock.vue'

const listRef = ref<InstanceType<typeof MessageList> | null>(null)

function onSubmitted() {
  listRef.value?.refresh()
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.info-card {
  border-radius: 14px;
}

.label {
  font-weight: 900;
  color: #0b1220;
  margin-bottom: 6px;
}

.value {
  color: #475467;
  line-height: 1.7;
}

.card {
  border-radius: 14px;
}

.title {
  font-weight: 900;
  color: #0b1220;
  margin-bottom: 10px;
}

.list {
  margin-top: 14px;
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .info {
    grid-template-columns: 1fr;
  }
}
</style>

