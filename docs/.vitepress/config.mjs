import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/",
  title: "Eddieの小窝",
  description: "一个小小的博客",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [
      {
        text: '我的文章',
        items: [
          { text: '简介', link: '/简介' },
          { text: 'HTML学习', link: '/HTML学习' },
          { text: 'Markdown学习', link: '/Markdown学习' }
        ]
      },
      {
        text: '官方文章',
        items: [
          { text: 'markdown-examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/MeiEddie' }
    ]
  }
})