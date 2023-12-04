<!-- Index.vue -->
<script lang="ts" setup>
import Theme from 'vitepress/theme'
import { watch, ref } from 'vue'
import { useRoute } from 'vitepress'

import Comment from './Comment.vue'

const { Layout } = Theme
const route = useRoute()
const num = ref(0)

watch(
  () => route.path,
  () => {
    num.value++
  }
)
</script>
<template>
  <Layout>
    <template #doc-after>
      <Comment :key="num" />
    </template>
  </Layout>
</template>