import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'
import DefaultTheme from 'vitepress/theme'
import LayoutIndex from './layout/Index.vue'

import 'gitalk/dist/gitalk.css'

let lastRoutePath = ''; // 用于存储上一个路由的路径

export default {
  ...DefaultTheme,
  Layout: LayoutIndex,
  enhanceApp({ router }) {
    if (inBrowser) {
      router.beforeEach((to, from, next) => {
        lastRoutePath = from.path; // 更新上一个路由的路径
        next();
      });

      router.onAfterRouteChanged = () => {
        // 检查路由是否完全不同
        if (router.currentRoute.path !== lastRoutePath) {
          busuanzi.fetch();
        }
      }
    }
  }
}
