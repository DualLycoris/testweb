<template>
  <section class="section">
    <div class="container">
      <div v-if="title" class="title">{{ title }}</div>
      <div v-if="subtitle" class="subtitle">{{ subtitle }}</div>
      <div class="content">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{ title?: string; subtitle?: string }>()
</script>

<style scoped>
.section {
  padding: 48px 0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
}

.title {
  font-size: 28px;
  font-weight: 800;
  color: #0b1220;
  text-align: center;
}

.subtitle {
  margin-top: 10px;
  color: #667085;
  text-align: center;
  line-height: 1.8;
}

.content {
  margin-top: 22px;
}
</style>

