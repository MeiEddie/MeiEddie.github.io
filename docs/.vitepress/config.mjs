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
      '简介': [
        { text: '简介', link: '/简介' },
      ],

      '概念学习': [
        { text: '简介', link: '/概念学习/简介' },

        {
          text: 'ai相关',
          collapsible: true,
          collapsed: false,
          items: [
            { text: 'ai生活化类比', link: '/概念学习/ai相关/ai生活化类比'},
            { text: 'token增加模式', link: '/概念学习/ai相关/token增加模式'},
            { text: '从LLM到AgentSkill', link: '/概念学习/ai相关/从LLM到AgentSkill'},
          ]
        },


        { text: '嵌入式开发', link: '/概念学习/嵌入式开发'},
        { text: '搜索引擎原理', link: '/概念学习/搜索引擎原理'},
      ],

      '理论学习': [
        { text: '简介', link: '/理论学习/简介' },
        {
          text: 'python',
          collapsible: true,
          collapsed: false,
          items: [
            { text: 'Python学习', link: '/理论学习/python/Python学习' },
            { text: '排序算法', link: '/理论学习/python/排序算法' },
            { text: 'kmp算法', link: '/理论学习/python/kmp算法' },
            { text: '我的资源', link: '/理论学习/python/我的资源' },
          ]
        },

        {
          text: '前端',
          collapsible: true,
          collapsed: false,
          items: [
            { text: 'HTML', link: '/理论学习/前端/HTML' },
            { text: 'CSS', link: '/理论学习/前端/CSS' },
            { text: 'JavaScript', link: '/理论学习/前端/JavaScript' },
            { text: 'Vue', link: '/理论学习/前端/Vue' },
          ]
        },

        { text: 'Markdown学习', link: '/理论学习/Markdown学习' },
        { text: 'VitePress学习', link: '/理论学习/VitePress学习' },
        { text: 'YAML学习', link: '/理论学习/YAML学习' },

        {
          text: '论文学习',
          collapsible: true,
          collapsed: false,
          items: [
            {text: 'Attention-Is-All-You-Need', link: '/理论学习/论文学习/Attention-Is-All-You-Need' },
          ]
        },
        {
          text: '官方文章',
          collapsible: true,
          collapsed: false,
          items: [
            { text: 'markdown-examples', link: '/理论学习/官方文章/markdown-examples' },
            { text: 'Runtime API Examples', link: '/理论学习/官方文章/api-examples' },
          ]
        },
      ],

      '电脑知识': [
        { text: '简介', link: '/电脑知识/简介'},
        { text: '文件整理', link: '/电脑知识/文件整理'},
        { text: '图片传输', link: '/电脑知识/图片传输'},
        { text: '图片转PDF', link: '/电脑知识/图片转PDF'},
        { text: '电脑装机', link: '/电脑知识/电脑装机'},
        { text: '微软商店', link: '/电脑知识/微软商店'},
      ],

      '游戏制作': [
        { text: '简介', link: '/游戏制作/简介' },
        
        {
          text: 'Godot',
          collapsible: true,
          collapsed: false,
          items: [
            { text: '解决问题', link: '/游戏制作/Godot/解决问题' },
          ]
        },
      ],

      'leetcode': [
        { text: 'leetcode介绍', link: '/leetcode/leetcode介绍' },
        
        {
          text: '学习计划',
          collapsible: true,
          collapsed: false,
          items: [
            { text: '编程基础0到1', link: '/leetcode/编程基础0到1' },
            { text: 'LeetCode热题100', link: '/leetcode/LeetCode热题100' },
          ]
        },
      ],

      '中山大学': [
        { text: '目录', link: '/中山大学/目录' },

        {
          text: '新生课程',
          collapsible: true,
          collapsed: false,
          items: [
            { text: '网络安全', link: '/中山大学/新生课程/网络安全' },
            { text: '消防安全', link: '/中山大学/新生课程/消防安全' },
            { text: '国家安全', link: '/中山大学/新生课程/国家安全' },
            { text: '校园急救', link: '/中山大学/新生课程/校园急救' },
            { text: '防艾教育', link: '/中山大学/新生课程/防艾教育' },
            { text: '心肺复苏', link: '/中山大学/新生课程/心肺复苏' },
          ]
        },
        
      ],

      '战略': [
        { text: '战略简介', link: '/战略/战略简介' },
      ],

      '数独文章': [
        { text: '数独介绍', link: '/数独文章/数独介绍' },

        {
          text: '数独技巧',
          collapsible: true,
          collapsed: false,
          items: [
            { text: '基础技巧', link: '/数独文章/基础技巧' },
            { text: '进阶技巧', link: '/数独文章/进阶技巧' },
          ]
        },

        {
          text: '变形数独',
          collapsible: true,
          collapsed: false,
          items: [
            { text: '杀手数独', link: '/数独文章/杀手数独' },
          ]
        },
        
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/MeiEddie' },
    ]
  }
})