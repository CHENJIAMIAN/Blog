import { defineConfig } from "vitepress"
import { getSideBar } from "vitepress-plugin-autobar"
import linkProcessorPlugin from './plugins/linkProcessor'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    base: "/Blog",
    lang: "zh",
    title: "CHENJIAMIAN",
    description: "个人博客",
    vite: {
        plugins: [linkProcessorPlugin({ debug: true }),
        ]
    },
    head: [
        ['meta', { name: 'keywords', content: '技术博客,前端开发,JavaScript,Vue,React,Cesium,WebGL,WebGPU' }],
        ['meta', { property: 'og:type', content: 'website' }],
        ['meta', { property: 'og:url', content: 'https://chenjiamian.github.io/Blog/' }],
        ['meta', { property: 'og:image', content: 'https://chenjiamian.github.io/Blog//og-image.jpg' }],
        ['link', { rel: 'canonical', href: 'https://chenjiamian.github.io/Blog/' }]
    ],

    // 站点地图配置
    sitemap: {
        hostname: 'https://chenjiamian.github.io/Blog/',
        lastmodDateOnly: true
    },
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        outlineTitle: "目录",
        nav: [
            { text: "介绍", link: "/" },
            { text: "主页", link: "/README" },
        ],

        sidebar: getSideBar(".", {
            ignoreDirectory: [
                "node_modules/@eslint-community/eslint-utils/README",
                "node_modules/@eslint-community/regexpp/README",
                "node_modules/@eslint/eslintrc/README",
                "node_modules/@eslint/js/README",
                "node_modules/@typescript-eslint/parser/README",
                "node_modules/@typescript-eslint/scope-manager/README",
                "node_modules/@typescript-eslint/types/README",
                "node_modules/@typescript-eslint/typescript-estree/README",
                "node_modules/@typescript-eslint/visitor-keys/README",
                "node_modules/eslint-scope/README",
                "node_modules/eslint-visitor-keys/README",
                "node_modules/eslint/README",
                "node_modules/vite-plugin-vitepress-auto-sidebar/README",
                "node_modules/vitepress-plugin-autobar/CHANGELOG",
                "node_modules/vitepress-plugin-autobar/README",
                "node_modules/vitepress/README",
            ],
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

        socialLinks: [{ icon: "github", link: "https://github.com/CHENJIAMIAN" }],

        footer: {
            // 你可以在这里添加 HTML 代码
            message: `1111111111111111111`,
            copyright: `2222222222222222`,
        },
    },
})
