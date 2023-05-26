import { defineConfig } from 'vitepress'
import { getSideBar } from 'vitepress-plugin-autobar'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh',
  title: "CHENJIAMIAN",
  description: "个人博客",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outlineTitle: '目录',
    nav: [
      { text: '介绍', link: '/' },
      { text: '主页', link: '/README' },
    ],

    sidebar: getSideBar(".",{
      ignoreDirectory: ['node_modules'],
    }),
    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/CHENJIAMIAN' }
    ]
  },
})
