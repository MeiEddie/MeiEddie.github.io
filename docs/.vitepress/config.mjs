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
    sidebar: {
      '学习文章': [
        { text: '简介', link: '/学习文章/简介' },

        {
          text: '我的文章',
          collapsible: true,
          collapsed: false,
          items: [
            { text: 'Python学习', link: '/学习文章/Python学习' },
            { text: 'Markdown学习', link: '/学习文章/Markdown学习' },
            { text: 'VitePress学习', link: '/学习文章/VitePress学习' },
            { text: 'YAML学习', link: '/学习文章/YAML学习' },
            { text: 'HTML+CSS+JS+Vue学习', link: '/学习文章/HTML+CSS+JS+Vue学习' }
          ]
        },

        {
          text: '官方文章',
          collapsible: true,
          collapsed: false,
          items: [
            { text: 'markdown-examples', link: '/学习文章/markdown-examples' },
            { text: 'Runtime API Examples', link: '/学习文章/api-examples' }
          ]
        }
      ],

      '数独文章': [
        { text: '数独介绍', link: '/数独文章/数独介绍' },

        {
          text: '数独技巧',
          collapsible: true,
          collapsed: false,
          items: [
            { text: '基础技巧', link: '/数独文章/基础技巧' },
            { text: '进阶技巧', link: '/数独文章/进阶技巧' }
          ]
        },

        {
          text: '变形数独',
          collapsible: true,
          collapsed: false,
          items: [
            { text: '杀手数独', link: '/数独文章/杀手数独' }
          ]
        }
      ],

      'leetcode': [
        { text: 'leetcode介绍', link: '/leetcode/leetcode介绍' },
        
        {
          text: '学习计划',
          collapsible: true,
          collapsed: false,
          items: [
            { text: '编程基础0到1', link: '/leetcode/编程基础0到1' }
          ]
        },

        {
          text: '做题学习',
          collapsible: true,
          collapsed: false,
          items: [
            { text: 'kmp算法', link: '/leetcode/kmp算法' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/MeiEddie' }
    ]
  }
})