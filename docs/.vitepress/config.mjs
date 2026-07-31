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
          text: 'python',
          collapsible: true,
          collapsed: true,
          items: [
            { text: 'Python学习', link: '/学习文章/python/Python学习' },
            { text: '排序算法', link: '/学习文章/python/排序算法' },
            { text: 'kmp算法', link: '/学习文章/python/kmp算法' },
            { text: '我的资源', link: '/学习文章/python/我的资源' }
          ]
        },

        {
          text: '前端',
          collapsible: true,
          collapsed: true,
          items: [
            { text: 'HTML', link: '/学习文章/前端/HTML' },
            { text: 'CSS', link: '/学习文章/前端/CSS' },
            { text: 'JavaScript', link: '/学习文章/前端/JavaScript' },
            { text: 'Vue', link: '/学习文章/前端/Vue' }
          ]
        },

        {
          text: '其他',
          collapsible: true,
          collapsed: false,
          items: [
            { text: 'Markdown学习', link: '/学习文章/其他/Markdown学习' },
            { text: 'VitePress学习', link: '/学习文章/其他/VitePress学习' },
            { text: 'YAML学习', link: '/学习文章/其他/YAML学习' }
          ]
        },

        {
          text: '官方文章',
          collapsible: true,
          collapsed: true,
          items: [
            { text: 'markdown-examples', link: '/学习文章/官方文章/markdown-examples' },
            { text: 'Runtime API Examples', link: '/学习文章/官方文章/api-examples' }
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

      '电脑知识': [
        { text: '简介', link: '/电脑知识/简介'},
        { text: '电脑装机', link: '/电脑知识/电脑装机'},
        { text: '图片传输', link: '/电脑知识/图片传输'},
        { text: '微软商店', link: '/电脑知识/微软商店'},
        { text: '搜索引擎原理', link: '/电脑知识/搜索引擎原理'} 
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
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/MeiEddie' }
    ]
  }
})