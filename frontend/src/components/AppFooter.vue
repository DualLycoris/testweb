<template>
  <footer class="footer">
    <div class="container">
      <div class="grid">
        <div>
          <div class="title">道器智造</div>
          <div class="desc">技术创新，引领未来</div>
        </div>
        <div>
          <div class="subtitle">快速链接</div>
          <div class="links">
            <RouterLink class="link" to="/">首页</RouterLink>
            <RouterLink class="link" to="/dao">道</RouterLink>
            <RouterLink class="link" to="/qi">器</RouterLink>
            <RouterLink class="link" to="/wan">玩</RouterLink>
            <RouterLink class="link" to="/about">关于我们</RouterLink>
            <RouterLink class="link" to="/contact">联系我们</RouterLink>
          </div>
        </div>
        <div>
          <div class="subtitle">联系方式</div>
          <div class="desc">邮箱: 781772346@qq.com</div>
          <div class="desc">电话: 13671671697</div>
        </div>
      </div>
      <div class="bottom">&copy; 2024 道器智造. 保留所有权利.</div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.footer {
  background: #0b1220;
  color: rgba(255, 255, 255, 0.85);
  padding: 34px 0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 16px;
}

.grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 18px;
}

.title {
  color: #fff;
  font-weight: 700;
  margin-bottom: 8px;
}

.subtitle {
  color: #fff;
  font-weight: 700;
  margin-bottom: 8px;
}

.desc {
  line-height: 1.8;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.link {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
}

.bottom {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  text-align: center;
  font-size: 13px;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>

