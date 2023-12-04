<template>
  <div class="layout">
    <DefaultHeader />
    <main>
      <slot />
      <!-- 主要内容区域 -->
    </main>
    <footer>
      本站总访问量
      <span id="busuanzi_value_site_pv"></span>
      次 本站访客数
      <span id="busuanzi_value_site_uv"></span>
      人次
    </footer>
  </div>
</template>

<script>
import { Layout as DefaultLayout } from 'vitepress/theme'

export default {
  components: {
    // DefaultHeader: DefaultLayout.Header,
  },
};
</script>
