import { defineConfig } from 'vitepress'
import { createHash } from 'node:crypto'

let zsuPasswordHash = 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'
if (process.env.ZSU_PASSWORD) {
  zsuPasswordHash = createHash('sha256').update(process.env.ZSU_PASSWORD).digest('hex')
}

export default defineConfig({
  base: "/",
  title: "Eddieの小窝",
  description: "一个小小的博客",
  vite: {
    define: {
      __ZSU_PASSWORD_HASH__: JSON.stringify(zsuPasswordHash),
    },
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      // 栏目导航枢纽页（docs/文章专区.md），首页不再展示栏目卡片。
      { text: '文章专区', link: '/文章专区' },
      // 友链页，紧跟在「文章专区」右侧。
      // ⚠️ 没在下面 sidebar 里配 key → 该页不显示侧边栏（与「文章专区」一致）。
      // ⚠️⚠️ 结尾这个 **斜杠必须留**：页面文件是 docs/友链/index.md，路由是 /友链/。
      //     写成 '/友链' 时 VitePress 解析不到页面，会把 href 退化成 /友链.html
      //     → 线上 404（2026.9.21 实测：产物 nav 里就是 /友链.html）。
      { text: '友链', link: '/友链/' },
    ],
    // ⚠️ 侧边栏开合约定（2026.9.22，配合 theme/doc-shell.css 的「分类小方块」）：
    //    所有带 items 的分类项统一写 collapsed: true —— 即"默认收起"。
    //    桌面（≥960px）那套布局里，分类平时只是一个**小方块**，鼠标 hover（或点一下）
    //    才展开出里面的文章；若这里写 collapsed: false，方块会一上来就展开、把侧边栏撑长。
    //    （<960px 的移动端抽屉同样是收起态，点方块展开，行为一致。）
    //    唯一例外：当前页面所在的分类会被默认主题自动展开（.collapsed 被摘掉），
    //    用来提示"你在哪"—— 这是预期行为，不要当成 bug。
    sidebar: {
      '本站建设': [
        { text: '本站建设', link: '/本站建设' },
      ],

      '电脑知识': [
        { text: '简介', link: '/电脑知识/简介'},

        {
          text: '办公软件',
          collapsible: true,
          collapsed: true,
          items: [
            { text: 'Excel表冻结行列', link: '/电脑知识/办公软件/Excel表冻结行列' },
          ]
        },

        { text: '文件整理', link: '/电脑知识/文件整理'},
        { text: '图片传输', link: '/电脑知识/图片传输'},
        { text: '图片转PDF', link: '/电脑知识/图片转PDF'},
        { text: '图片格式转换', link: '/电脑知识/图片格式转换'},
        { text: '电脑装机', link: '/电脑知识/电脑装机'},
        { text: '微软商店', link: '/电脑知识/微软商店'},
      ],

      '概念学习': [
        { text: '简介', link: '/概念学习/简介' },

        {
          text: '网页制作',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '前端部分', link: '/概念学习/网页制作/前端部分' },
            { text: '后端部分', link: '/概念学习/网页制作/后端部分' },
          ]
        },

        {
          text: 'ai相关',
          collapsible: true,
          collapsed: true,
          items: [
            { text: 'ai生活化类比', link: '/概念学习/ai相关/ai生活化类比'},
            { text: 'token增加模式', link: '/概念学习/ai相关/token增加模式'},
            { text: '从LLM到AgentSkill', link: '/概念学习/ai相关/从LLM到AgentSkill'},
          ]
        },


        { text: '嵌入式开发', link: '/概念学习/嵌入式开发'},
        { text: '搜索引擎原理', link: '/概念学习/搜索引擎原理'},
        { text: '手部识别', link: '/概念学习/手部识别'},
      ],

      '理论学习': [
        { text: '简介', link: '/理论学习/简介' },
        {
          text: 'python',
          collapsible: true,
          collapsed: true,
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
          collapsed: true,
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
          collapsed: true,
          items: [
            {text: 'Attention-Is-All-You-Need', link: '/理论学习/论文学习/Attention-Is-All-You-Need' },
          ]
        },
      ],

      '游戏制作': [
        { text: '简介', link: '/游戏制作/简介' },
        
        {
          text: 'Godot',
          collapsible: true,
          collapsed: true,
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
          collapsed: true,
          items: [
            { text: '编程基础0到1', link: '/leetcode/编程基础0到1' },
            { text: 'LeetCode热题100', link: '/leetcode/LeetCode热题100' },
          ]
        },
      ],

      '中山大学': [
        { text: '目录', link: '/中山大学/目录' },
        { text: '个人培养方案查看', link: '/中山大学/个人培养方案查看' },

        {
          text: '新生课程',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '网络安全', link: '/中山大学/新生课程/网络安全' },
            { text: '消防安全', link: '/中山大学/新生课程/消防安全' },
            { text: '国家安全', link: '/中山大学/新生课程/国家安全' },
            { text: '校园急救', link: '/中山大学/新生课程/校园急救' },
            { text: '防艾教育', link: '/中山大学/新生课程/防艾教育' },
            { text: '心肺复苏', link: '/中山大学/新生课程/心肺复苏' },
            { text: '2026级新生入学教育', link: '/中山大学/新生课程/2026级新生入学教育' },
          ]
        },

        {
          text: '新生体验',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '心肺复苏（实践）', link: '/中山大学/新生体验/心肺复苏（实践）' },
            { text: '消防安全（实践）', link: '/中山大学/新生体验/消防安全（实践）' },
          ]
        },
        
        {
          text: '高等数学',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '简介', link: '/中山大学/高等数学/简介' },
            { text: '第一课', link: '/中山大学/高等数学/第一课' },
            { text: '第二课', link: '/中山大学/高等数学/第二课' },
          ]
        },

        {
          text: '大学物理',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '简介', link: '/中山大学/大学物理/简介' },
            { text: '第一课', link: '/中山大学/大学物理/第一课' },
          ]
        },

        {
          text: '无机化学',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '简介', link: '/中山大学/无机化学/简介' },
            { text: '第一课', link: '/中山大学/无机化学/第一课' },
          ]
        },

        // 2026.9.21 修复 404：这一组的名字和 link 原本都写的是「阅读」，
        // 但磁盘上的目录是「自学阅读」→ 点开必然 404（实测）。
        // 现按真实目录名改回，并把同一目录下另一个文件一并挂上 ——
        // 它此前没进侧边栏，属于「站内点不到」的孤立页。
        {
          text: '自学阅读',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '分析化学手册（第二版）第一分册：基础知识与安全知识', link: '/中山大学/自学阅读/分析化学手册（第二版）第一分册：基础知识与安全知识' },
            { text: '高分子化学（第六版）', link: '/中山大学/自学阅读/高分子化学（第六版）' },
          ]
        },

        // 2026.9.21 新增：docs/中山大学/自学视频/ 整个目录此前没进侧边栏（孤立页）
        {
          text: '自学视频',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '高分子化学-潘祖仁', link: '/中山大学/自学视频/高分子化学-潘祖仁' },
          ]
        },

      ],

      '梗图': [
        { text: '梗图', link: '/梗图/我的梗图' },
      ],

      '数独文章': [
        { text: '数独介绍', link: '/数独文章/数独介绍' },

        {
          text: '数独技巧',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '基础技巧', link: '/数独文章/基础技巧' },
            { text: '进阶技巧', link: '/数独文章/进阶技巧' },
          ]
        },

        {
          text: '变形数独',
          collapsible: true,
          collapsed: true,
          items: [
            { text: '杀手数独', link: '/数独文章/杀手数独' },
          ]
        },
        
      ],
    },

    // socialLinks 已于 2026.9.22 整条移除：原本只有 GitHub 一个图标，
    // 顶栏那个反色圆角方块不要了，GitHub 入口只保留在首页「作者帐号」区
    // （docs/index.md 的 .home-accounts）—— 别在两处放同一个链接。
    // ⚠️ VitePress 对 theme.socialLinks 用的是「真值判断」（VPNavBarSocialLinks.vue 的
    //    v-if="theme.socialLinks"，[] 也是真值）：写成空数组**同样会渲染出一个空容器**，
    //    它自带 margin-left:12px（我们 style.css 6.3 补的间距），会把亮暗开关从右边缘
    //    平白推开 12px —— 所以这里必须整条删掉，不能置成空数组。
    //    同时 VPNavBarExtra（768~1279px 的浮层）里那一组社交图标也一并没有了。
  }
})