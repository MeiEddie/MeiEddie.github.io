<script setup>
// ==========================================================================
// 全站 Layout：目前只做一件事 —— 给**每一篇文章**在顶栏站名「Eddieの小窝」右边
// 放一个「返回上一级」按钮。
// --------------------------------------------------------------------------
// 2026.9.22 二轮改位（站长要求「放在 Eddieの小窝 右边，变色和上方栏的模块相同」）：
//   按钮原先挂在 #doc-before 插槽（正文标题**上方**，会把标题整体下推约 47px），
//   现改为挂在 #nav-bar-title-after —— 它的位置在 VPNavBarTitle.vue 的
//   <a class="title"> 内部、站名 <span> **之后**，正是"站名右边"。
//   ⚠️⚠️ 这个插槽在 **<a> 里面** → 按钮是嵌套在链接里的，点击会冒泡到 <a>，
//      浏览器默认动作 = 跳回首页。所以 theme/index.js 的委托里**必须** preventDefault()
//      （已加，别删；删了就会"点返回 = 回首页"）。
//   ⚠️ 这个插槽在**所有页面**都会渲染（首页 / 文章专区 / 友链 的顶栏同样有站名），
//      而"返回上一级"只在文章里讲得通 → 这里用 frontmatter.layout 过滤，只留文档页。
//      （上一版靠 #doc-before 天然只在 doc 布局渲染，这次没有那层保护，要自己判。）
//   ⚠️ 插槽是 .title 那个 flex 容器的最后一个子项 → align-items:center 自带垂直居中。
// 为什么按钮本身写在这里、而不是在每个页面里：
//   本站约定「页面不写脚本、交互一律在 theme/index.js 里做全局委托」——
//   这里同理：按钮只留 class / data 属性，点击行为全在 index.js 的委托里。
//   走的是官方推荐的写法（DefaultTheme.Layout + 具名插槽透传）。
// ==========================================================================
import DefaultTheme from 'vitepress/theme'
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

// 文档页 = 没写 layout（默认就是 doc）或显式写 doc；
// 首页（home）、文章专区 / 友链（page）排除在外 —— 那几页没有"上一级"可言。
const isDocPage = computed(() => {
  const layout = frontmatter.value.layout
  return layout === undefined || layout === null || layout === 'doc'
})
</script>

<template>
  <DefaultTheme.Layout>
    <template #nav-bar-title-after>
      <!-- 结构：button.back-btn > (svg.back-btn__icon + span.back-btn__text)
           样式在 theme/sections.css 的「页面返回按钮」一节（与 .copy-btn 同一套小按钮语言）；
           点击行为在 theme/index.js 的全局委托里。
           这里**故意不写 data-back-fallback**：让 index.js 按当前文章路径自动推出
           「所属栏目的首页」（如 /电脑知识/办公软件/xx → /电脑知识/简介）——
           写死一个固定地址反而更差。要手动指定时才在别处写这个属性。 -->
      <button v-if="isDocPage" class="back-btn" type="button" aria-label="返回上一级" title="返回上一级">
        <svg class="back-btn__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M16 4 8 12l8 8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span class="back-btn__text">返回上一级</span>
      </button>
    </template>
  </DefaultTheme.Layout>
</template>
