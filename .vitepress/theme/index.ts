import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import DefaultTheme from 'vitepress/theme'
import LayoutIndex from './layout/Index.vue'

import 'gitalk/dist/gitalk.css'

export default {
  ...DefaultTheme,
  enhanceApp({ router }) {
    if (inBrowser) {
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
      }
    }
  }
}