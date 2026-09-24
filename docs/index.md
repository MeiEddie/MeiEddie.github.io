---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Eddieの小窝"
  text: "欢迎~"
  tagline: 分享零基础可落地的实操教程，记录踩坑经验、工具配置与学习心得。愿每一篇文章都能帮同样入门的开发者少走弯路。（最近同步：2026.9.23）
---

<!-- ============ 首屏下滑提示（fixed 固定在首屏底部，滚动后由 body.hint-hidden 淡出） ============ -->
<div class="scroll-hint"><span class="scroll-hint__arrow">↓</span>滑动探索更多</div>

<section class="home-profile">
  <div class="home-profile__inner">
    <!-- 左：profile 文字（整体左对齐） -->
    <div class="home-profile__text">
      <p class="home-profile__line home-profile__line--lead">Hello👋 I'm MeiEddie</p>
      <p class="home-profile__line">Born in May 2008, currently live in China</p>
      <p class="home-profile__line">A recreational coder & student who records learning journey</p>
      <p class="home-profile__line">This is Eddie's static blog</p>
    </div>
    <!-- 右：头像 -->
    <img class="home-profile__avatar" src="./avatar.jpg" alt="头像">
  </div>
</section>

<!-- ============ 作者帐号 ============
     一个账号 = 一张 <a class="account-card">。结构：.home-accounts > (.home-section__title
     + .accounts-grid > a.account-card > 徽标 + 文字块 + 外链箭头)，样式见 sections.css
     「作者帐号」一节。
     ➜ 增删账号：在 .accounts-grid 里加/删一行 <a>，href 换成对应主页即可。
       徽标里放**平台官方标志**（内联 <svg viewBox="0 0 24 24"> + fill="currentColor"，
       几何取自 simple-icons，在 node_modules/@iconify-json/simple-icons/icons.json 里能查到）；
       颜色不写在 svg 上，由 sections.css 的 .account-card__badge--<平台> 决定
       （GitHub #181717 / LeetCode #FFA116 / bilibili #00A1D6）。
       ⚠️ 加新平台：三处一起加 —— 这里的 <a> + sections.css 的 --<平台> 底色 + 上面的注释。
       两行文字分别是平台名与账号 ID（ID 用等宽字、超长自动省略号）。
       ID 想同时带昵称时用 " | " 分隔（例：1263433909 | _梅有仁_），整行仍受省略号兜底。
       2026.9.22：账号由 2 个变 3 个 —— 网格两列改三列（每张卡 352px，与游戏区卡同宽）。
     ⚠️ 顶栏那个 GitHub 图标（config.mjs 的 socialLinks）2026.9.22 已移除，
        GitHub 入口只留在这里一处，别再放回顶栏（两个地方同一个链接没意义）。
     ⚠️ 本注释到 </section> 之间一行空行都不要有（markdown HTML 块陷阱） -->
<section class="home-section home-accounts">
  <h2 class="home-section__title">作者帐号</h2>
  <div class="accounts-grid">
    <a class="account-card" href="https://github.com/MeiEddie" target="_blank" rel="noopener">
      <span class="account-card__badge account-card__badge--github" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12c0 5.303 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577c0-.285-.01-1.04-.015-2.04c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729c1.205.084 1.838 1.236 1.838 1.236c1.07 1.835 2.809 1.305 3.495.998c.108-.776.417-1.305.76-1.605c-2.665-.3-5.466-1.332-5.466-5.93c0-1.31.465-2.38 1.235-3.22c-.135-.303-.54-1.523.105-3.176c0 0 1.005-.322 3.3 1.23c.96-.267 1.98-.399 3-.405c1.02.006 2.04.138 3 .405c2.28-1.552 3.285-1.23 3.285-1.23c.645 1.653.24 2.873.12 3.176c.765.84 1.23 1.91 1.23 3.22c0 4.61-2.805 5.625-5.475 5.92c.42.36.81 1.096.81 2.22c0 1.606-.015 2.896-.015 3.286c0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg></span>
      <span class="account-card__body">
        <span class="account-card__name">GitHub</span>
        <span class="account-card__id">MeiEddie</span>
      </span>
      <span class="account-card__arrow" aria-hidden="true">↗</span>
    </a>
    <a class="account-card" href="https://leetcode.cn/u/i3rave-chaplygin0i2/" target="_blank" rel="noopener">
      <span class="account-card__badge account-card__badge--leetcode" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M13.483 0a1.37 1.37 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.3 5.3 0 0 0-1.209 2.104a5 5 0 0 0-.125.513a5.5 5.5 0 0 0 .062 2.362a6 6 0 0 0 .349 1.017a5.9 5.9 0 0 0 1.271 1.818l4.277 4.193l.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.38 1.38 0 0 0-1.951-.003l-2.396 2.392a3.02 3.02 0 0 1-4.205.038l-.02-.019l-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.7 2.7 0 0 1 .066-.523a2.55 2.55 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0m-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382a1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382a1.38 1.38 0 0 0-1.38-1.382z"/></svg></span>
      <span class="account-card__body">
        <span class="account-card__name">LeetCode（力扣）</span>
        <span class="account-card__id">i3rave-chaplygin0i2</span>
      </span>
      <span class="account-card__arrow" aria-hidden="true">↗</span>
    </a>
    <a class="account-card" href="https://space.bilibili.com/1263433909" target="_blank" rel="noopener">
      <span class="account-card__badge account-card__badge--bilibili" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="currentColor" d="M17.813 4.653h.854q2.266.08 3.773 1.574Q23.946 7.72 24 9.987v7.36q-.054 2.266-1.56 3.773c-1.506 1.507-2.262 1.524-3.773 1.56H5.333q-2.266-.054-3.773-1.56C.053 19.614.036 18.858 0 17.347v-7.36q.054-2.267 1.56-3.76t3.773-1.574h.774l-1.174-1.12a1.23 1.23 0 0 1-.373-.906q0-.534.373-.907l.027-.027q.4-.373.92-.373t.92.373L9.653 4.44q.107.106.187.213h4.267a.8.8 0 0 1 .16-.213l2.853-2.747q.4-.373.92-.373c.347 0 .662.151.929.4s.391.551.391.907q0 .532-.373.906zM5.333 7.24q-1.12.027-1.88.773q-.76.748-.786 1.894v7.52q.026 1.146.786 1.893t1.88.773h13.334q1.12-.026 1.88-.773t.786-1.893v-7.52q-.026-1.147-.786-1.894t-1.88-.773zM8 11.107q.56 0 .933.373q.375.374.4.96v1.173q-.025.586-.4.96q-.373.375-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q0-.56.386-.947q.387-.386.947-.386m8 0q.56 0 .933.373q.375.374.4.96v1.173q-.025.586-.4.96q-.373.375-.933.374c-.56-.001-.684-.125-.933-.374q-.375-.373-.4-.96V12.44q.025-.586.4-.96q.373-.373.933-.373"/></svg></span>
      <span class="account-card__body">
        <span class="account-card__name">bilibili</span>
        <span class="account-card__id">1263433909 | _梅有仁_</span>
      </span>
      <span class="account-card__arrow" aria-hidden="true">↗</span>
    </a>
  </div>
</section>

<section class="home-section home-status">
  <h2 class="home-section__title">动态</h2>
  <div class="card-grid status-grid">
    <div class="status-card">
      <div class="status-card__title">正在进行</div>
      <div class="status-card__detail">上课</div>
    </div>
    <div class="status-card">
      <div class="status-card__title">暂时停止</div>
      <div class="status-card__detail">ai、CSS、Python</div>
    </div>
    <div class="status-card">
      <div class="status-card__title">未来目标</div>
      <div class="status-card__detail">JS、Vue，更改首页布局、网络碎片信息</div>
    </div>
    <div class="status-card">
      <div class="status-card__title">期待加入的模块</div>
      <div class="status-card__detail">逻辑学、战略</div>
    </div>
  </div>
</section>

<!-- ============ 栏目导航已迁到独立页 docs/文章专区.md ============
     ➜ 以后增删改栏目：只改 docs/文章专区.md 里那几行 <a class="article-card">
     ➜ 改卡片外观：只改 .vitepress/theme/sections.css 的「文章专区卡片」一节 -->


---
<!-- ============ 免责声明（页面最底部，容器卡片式） ============
     布局占位：文案由站长自行填写。
     结构：容器 > 标题 + 小节（小节 = 小标题 + 文字）。
     ➜ 大标题文字改 <h3 class="home-disclaimer__title"> 里的内容；
     ➜ 每个小节 = 一段 <h4 class="home-disclaimer__subtitle">小标题</h4>
        + 若干行 <p class="home-disclaimer__text">…</p>；
     ➜ 不需要小标题的段落直接放 <p class="home-disclaimer__text">。
     ⚠️ 本注释到 </section> 之间一行空行都不要有
     （markdown-it 遇空行结束 HTML 块，缩进内容会被当代码块原样打印）。 -->
<section class="home-disclaimer">
  <div class="home-disclaimer__box">
    <h3 class="home-disclaimer__title">免责声明</h3>
    <h4 class="home-disclaimer__subtitle">一、总则</h4>
    <p class="home-disclaimer__text">欢迎访问Eddieの小窝。本博客为个人运营的静态博客，所有内容仅代表作者个人观点与经验分享，与任何组织、机构立场无关。凡访问本博客的用户，均视为已仔细阅读并同意本声明全部条款。</p>
    <h4 class="home-disclaimer__subtitle">二、内容准确性免责</h4>
    <p class="home-disclaimer__text">1. 本博客内容均为作者个人创作、整理或翻译，仅作学习交流与参考使用，不对内容的绝对准确性、完整性、及时性作出任何承诺与保证。
    <br>2. 技术教程、代码示例、操作指引等内容仅为演示用途，因运行环境差异、软件版本更新等原因可能存在偏差，需要用户自行承担风险</p>
    <h4 class="home-disclaimer__subtitle">三、第三方链接免责</h4>
    <p class="home-disclaimer__text">本博客可能包含指向第三方网站或资源的外部链接，该等链接仅为方便读者拓展阅读而提供。本博客不对第三方网站的内容真实性、安全性、合法性承担任何责任。</p>
    <h4 class="home-disclaimer__subtitle">四、知识产权说明</h4>
    <p class="home-disclaimer__text">1. 本博客原创内容（包括文字、图片、代码等）的著作权归作者所有，若有转载需求请注明出处与原文链接。
    <br>2. 本博客部分引用内容来源于公开网络，版权归原作者所有。如涉及版权争议或侵权问题，请及时联系作者，本站将第一时间核实并处理。联系方式请参考：文章专区/本站建设/联系</p>
  </div>
</section>

<!-- ⚠️ 「中山大学」访问密码门禁原先写在这里（<script setup> + onMounted/onUnmounted），
     2026.9.21 已搬到 .vitepress/theme/index.js 的 enhanceApp 里全局注册。
     原因：门禁挂在首页组件上，离开首页就会被 onUnmounted 摘掉 —— 而「中山大学」入口
     已从首页搬到「文章专区」页，用户点进去时首页正好卸载，门禁随之失效。
     本页不要再写门禁相关脚本，否则会覆盖掉全局那份。 -->

<style>
/* ==========================================================================
   首页专属样式（首屏 / 简介卡片 / 下滑提示）
   --------------------------------------------------------------------------
   区块与卡片（.home-section / .card-grid / .game-* / .status-*）是首页与
   「文章专区」页共用的，已抽到 .vitepress/theme/sections.css，本文件不再重复。
   ========================================================================== */

/* ===== 首屏：纯展示，占满一屏，下方内容需下滑到达 ===== */
.VPHome .VPHero {
  min-height: 100vh;
  min-height: 100svh;
  box-sizing: border-box;
  position: relative;
  /* 文字块垂直居中：hero 撑满一屏，容器在其中上下居中。
     清掉默认主题的 padding-top(nav+48px)/padding-bottom(48px)，
     否则内容会整体比视口正中低约 40px */
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.VPHome .VPHero .container {
  width: 100%;
}
/* hero 文字块：整块水平居中 + 文字居中对齐
   （默认主题 ≥960px 是「左文右图」两栏，现在图已移出 hero，只剩文字，直接居中） */
.VPHome .VPHero .main {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
/* 标题两行（.name/.text）是默认主题 .heading（flex 容器）的子项，
   text-align 对 flex 子项无效 → 用 align-items 让两行各自水平居中，
   否则「欢迎~」会贴在标题盒（按 .name 收缩）的左侧 */
.VPHome .VPHero .heading {
  align-items: center;
}
/* 副标题：容器（默认主题 576px 定宽、随 .main 整体居中）不动，
   文字改为左对齐 —— 换行时每一行都从左缘补满，短尾行靠左 */
.VPHome .VPHero .tagline {
  text-align: left;
}
/* 首屏不再显示默认 actions（栏目入口已独立成「文章专区」页，见 docs/文章专区.md） */
.VPHome .VPHero .actions { display: none !important; }

/* ===== 简介卡片：首屏下方（左 = profile 文字，右 = 头像） ===== */
.home-profile {
  /* 背景与正文同色，和首屏底部的渐隐过渡无缝衔接 */
  background: var(--vp-c-bg);
  /* 上方留白给足呼吸感（下滑提示贴在首屏底部内侧，不会压到这里）。
     下方 2026.9.21 由 1rem 收到 0：头像（200px）比文字块高，文字底部本身
     已有约 27px 的空档，再加下内距会让「简介 → 游戏区」中间明显发空。 */
  padding: 3.5rem 1.25rem 0;
}
/* 内容条：与游戏区同宽，左右两栏作为一整组在条内居中 */
.home-profile__inner {
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(2rem, 6vw, 5rem);
}
/* 左栏：profile 文字（块内左对齐；整块随 inner 一起居中） */
.home-profile__text {
  text-align: left;
  color: var(--vp-c-text-2);
  font-size: clamp(0.9rem, 1.4vw, 1.05rem);
  line-height: 1.9;
}
.home-profile__line { margin: 0; }
/* 首行打招呼：加大加粗、换回主文字色，和下面几行说明拉开层级 */
.home-profile__line--lead {
  margin-bottom: 0.4rem;
  font-size: 1.35em;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
/* 右栏：头像（圆角 + 径向遮罩造型，沿用原 hero 头像的做法） */
.home-profile__avatar {
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 35%;
  overflow: hidden;
  -webkit-mask-image: radial-gradient(circle, #000 70%, transparent 100%);
  mask-image: radial-gradient(circle, #000 70%, transparent 100%);
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}

/* ===== 免责声明：页面最底部（游戏区下方，容器卡片式） =====
   布局占位，文案在上方 HTML 里填。首页正文被包在 .vp-doc 里 →
   .vp-doc h3/h4/p=(0,1,1) 会盖掉单层 class(0,1,0)，所以规则统一写两层选择器。 */
.home-disclaimer {
  max-width: 1120px;
  margin: 0 auto;
  /* 游戏区自带 padding-bottom:2rem，这里不再给上内距，靠这 2rem 呼吸 */
  padding: 0 1.25rem 2.5rem;
}
/* 容器卡片：和游戏卡片同一套视觉语言（边框 + 圆角 + 软底色）。
   宽度不再收窄：外层 .home-disclaimer 与 .home-section 的水平尺寸完全一致
   （max-width 1120 + 左右 1.25rem 内距）→ 卡片左右边缘正好对齐上方游戏卡片的网格。 */
.home-disclaimer__box {
  margin: 0 auto;
  padding: 1.4rem 1.6rem 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: var(--vp-c-bg-soft);
}
/* 大标题：居中 + 区块标题的缩小版（两层选择器压 .vp-doc h3 的字号/边距） */
.home-disclaimer .home-disclaimer__title {
  margin: 0 0 1rem;
  padding-bottom: 0.7rem;
  border-bottom: 1px solid var(--vp-c-divider);
  text-align: center;
  font-size: 1.15rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}
/* 小节标题：左对齐 + 品牌色竖条，和游戏分组标题同一层级语言（压 .vp-doc h4） */
.home-disclaimer .home-disclaimer__subtitle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 1rem 0 0.3rem;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}
.home-disclaimer .home-disclaimer__subtitle::before {
  content: "";
  flex: 0 0 auto;
  width: 4px;
  height: 1em;
  border-radius: 2px;
  background: var(--vp-c-brand-1);
}
/* 正文：小号次要文字（压 .vp-doc p 的 16px 边距） */
.home-disclaimer .home-disclaimer__text {
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.8;
  color: var(--vp-c-text-2);
}
.home-disclaimer .home-disclaimer__text + .home-disclaimer__text {
  margin-top: 0.3rem;
}

/* 下滑提示：真实 DOM + flex 保证整组水平居中。
   定位说明：本元素的包含块是首页正文的包装层（.vp-doc 内的定位 div），它的顶边正好落在
   首屏（.VPHero，min-height:100svh）的底边；所以下面的 top:0 + translateY(-100% - 72px)
   等价于"紧贴首屏底部再上移 72px"，且因为用的是 absolute，提示会随页面一起向上滚走。
   （不要改回 position:fixed——那会让它钉在视口不动；也不要用 top:100svh 换算，
     因为包含块不是全宽的根容器，算出来会偏低。） */
.scroll-hint {
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-50%, calc(-100% - 72px));
  display: flex;
  align-items: center;
  gap: 0.4rem;
  /* 首屏底部提示同样压在照片上：亮暗统一浅色（照片偏暗 + 黑纱，深色字读不清） */
  color: #f5f7fa;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.05em;
  white-space: nowrap;
  pointer-events: none;
  z-index: 5;
  transition: opacity 0.4s ease;
  /* 默认主题 base.css 在「减少动态效果」下用 !important 把过渡压成 0s，
     这里用更高特异性 + !important 反压回来，否则淡入淡出不可见 */
  transition-duration: 0.4s !important;
  transition-delay: 0s !important;
}
.scroll-hint__arrow {
  display: inline-block;
  letter-spacing: 0;
  animation: arrowFloat 1.2s ease-in-out infinite;
  /* 同上：反压 base.css 的 animation-duration:1ms / iteration-count:1 */
  animation-duration: 1.2s !important;
  animation-delay: 0s !important;
  animation-iteration-count: infinite !important;
}
@keyframes arrowFloat {
  0%, 100% { transform: translateY(-5px); }
  50%      { transform: translateY(5px); }
}
/* 页面下移超过阈值（body.hint-hidden 由主题 JS 切换）：淡出；回到顶部：淡入 */
body.hint-hidden .scroll-hint {
  opacity: 0;
}

/* ===== 响应式 ===== */
@media (max-width: 560px) {
  /* 窄屏：左右两栏放不下 → 改成上下排列（文字在上、头像在下）并整体居中 */
  .home-profile { padding: 2.5rem 1rem 0; }
  .home-profile__inner { flex-direction: column; gap: 1.5rem; }
  .home-profile__text { text-align: center; }
  .home-profile__avatar { width: 150px; height: 150px; }
}


/* 旧 hero 头像规则已删除：头像已移出 hero，样式见上方 .home-profile__avatar */
</style>
