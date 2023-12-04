import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import DefaultTheme from 'vitepress/theme'

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