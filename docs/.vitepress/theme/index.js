import DefaultTheme from 'vitepress/theme'
// 全站 Layout：给每一篇文章的正文顶部注入「返回上一级」按钮（详见 Layout.vue 顶部注释）。
// 只覆盖了一个插槽，其余全部继承默认主题。
import Layout from './Layout.vue'
import './click-effect.css'
import './style.css'
// 区块 + 卡片网格的共用样式：首页（游戏通道 / 动态）与「文章专区」页共用同一套类名。
// 为什么单独一个文件见 sections.css 顶部注释 —— 卡片样式全站只维护这一份。
import './sections.css'
// 文章页「大容器」布局：左右留空位 + 中间容器装下（右侧侧边栏 + 正文 + 本页目录）。
// 只对带侧边栏的文档页生效（≥960px），首页 / 文章专区 / 友链 不受影响。
// 为什么单独一个文件：这是一整套联动坐标（容器底色、侧边栏位置、正文左右内边距），
// 拆开写极易改一处漏一处 → 统一放 doc-shell.css，文件顶部有完整说明。
import './doc-shell.css'

// 点击粒子特效：鼠标点击时原地生成不同颜色、不同形状、360° 向外发散、最后缩小消失
const SHAPES = ['circle', 'square', 'diamond', 'triangle', 'star']
// 高饱和度的缤纷配色，点击时随机取色
const COLORS = [
  '#ff5e5e', '#ffb84d', '#ffe14d', '#5ed84d', '#4dd2ff',
  '#7d6cff', '#ff6cf0', '#ff8f6c', '#3ddc97', '#ff4d8d'
]
const PARTICLE_COUNT = 20

function spawn(x, y) {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const el = document.createElement('span')
    el.className = 'click-spark'

    const shape = SHAPES[(Math.random() * SHAPES.length) | 0]
    const color = COLORS[(Math.random() * COLORS.length) | 0]
    const size = 8 + Math.random() * 10

    // 关键定位样式内联，避免依赖外部 CSS 加载时机
    el.style.position = 'fixed'
    el.style.left = (x - size / 2) + 'px'
    el.style.top = (y - size / 2) + 'px'
    el.style.width = size + 'px'
    el.style.height = size + 'px'
    el.style.background = color
    el.style.pointerEvents = 'none'
    el.style.zIndex = '2147483647'

    if (shape === 'circle') {
      el.style.borderRadius = '50%'
    } else if (shape === 'diamond') {
      el.style.clipPath = 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)'
    } else if (shape === 'triangle') {
      el.style.clipPath = 'polygon(50% 0, 0 100%, 100% 100%)'
    } else if (shape === 'star') {
      el.style.clipPath =
        'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
    }
    // square 不需要额外处理

    document.body.appendChild(el)

    // 360° 随机方向向外发散（距离小一点，停留更靠近落点、更显眼）
    const angle = Math.random() * Math.PI * 2
    // 发散距离略微拉大并增强随机性，避免粒子在统一圆周上"停成一圈"
    const dist = 40 + Math.random() * 100
    const dx = Math.cos(angle) * dist
    const dy = Math.sin(angle) * dist
    const rot = (Math.random() * 360) | 0
    // 微微加快：1.1s ~ 1.8s
    const dur = 1100 + Math.random() * 700

    const anim = el.animate(
      [
        // 从落点出发：一边向外飞散、一边旋转、一边缩小并淡出
        // 不再中途停留，取消"拘束圈"（粒子不会在圆周上停顿）
        { transform: 'translate(0, 0) rotate(0deg) scale(1)', opacity: 1, offset: 0 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(0)`, opacity: 0, offset: 1 }
      ],
      // ease-out：起飞快、随后减速，整体更轻快
      { duration: dur, easing: 'cubic-bezier(.2,.7,.3,1)' }
    )
    anim.onfinish = () => el.remove()
  }
}

export default {
  extends: DefaultTheme,
  // 文章页顶部「返回上一级」按钮由它统一注入（所有 layout:doc 页面，无需逐页写标记）
  Layout,
  enhanceApp({ router, siteData } = {}) {
    // 只在客户端绑定；并用标记防止 dev HMR 重复绑定
    if (typeof window === 'undefined') return

    // ==========================================================================
    // 中山大学板块：访问密码门禁（2026.9.21 从 docs/index.md 搬到这里，全站生效）
    // --------------------------------------------------------------------------
    // 为什么必须搬：原实现写在首页的 <script setup> 里，靠 onMounted 把 zsuGate
    // 挂到 router.onBeforeRouteChange、再由 onUnmounted 摘掉。而「中山大学」的入口
    // 当天已从首页搬到「文章专区」页 —— 用户点进文章专区的瞬间首页组件就卸载、
    // 门禁被摘除，于是从那里再点「中山大学」不再弹密码框（门禁等于失效）。
    // 挂到主题入口（enhanceApp 只在应用初始化时跑一次）后，从任何页面跳进
    // 中山大学都会被拦；另外补了一次「直链进入 / 刷新」的检查（整页加载不走路由钩子）。
    // 解锁状态存 sessionStorage：同一标签页内解锁一次，之后逛板块不再反复问，
    // 关掉标签页即失效。
    // ==========================================================================
    const ZSU_FLAG = 'zsu-unlocked'
    const ZSU_ASK_MAX = 3
    // 路径里是否含「中山大学」。location.pathname 里中文是百分号编码，必须解码；
    // 解码失败（路径里有裸 % 等）时退回原始串判断，绝不抛异常。
    const zsuInPath = (p) => {
      const s = p || ''
      try { return decodeURIComponent(s).includes('中山大学') } catch { return s.includes('中山大学') }
    }
    const zsuUnlocked = () => {
      try { return sessionStorage.getItem(ZSU_FLAG) === '1' } catch { return false }
    }
    const zsuUnlock = () => {
      try { sessionStorage.setItem(ZSU_FLAG, '1') } catch { /* 隐私模式等，忽略 */ }
    }
    const zsuSha256 = async (text) => {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
      return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
    }
    // 问密码：答对（或本次会话已解锁）→ true；取消 / 连错 ZSU_ASK_MAX 次 → false
    const zsuAsk = async () => {
      if (zsuUnlocked()) return true
      for (let i = 0; i < ZSU_ASK_MAX; i++) {
        const pwd = prompt('请输入访问密码')
        if (pwd === null) return false
        try {
          if ((await zsuSha256(pwd)) === __ZSU_PASSWORD_HASH__) { zsuUnlock(); return true }
        } catch (e) {
          // 非安全上下文（非 https / 非 localhost）拿不到 crypto.subtle，无法校验。
          // 保守放行并告警，避免整个板块彻底打不开。
          console.warn('[zsu-gate] 无法校验密码（crypto.subtle 不可用）：', e)
          return true
        }
        alert('密码错误，请重试')
      }
      return false
    }

    if (!window.__zsuGateBound) {
      window.__zsuGateBound = true
      if (router) {
        const prevBefore = router.onBeforeRouteChange
        router.onBeforeRouteChange = async (to) => {
          // 链式调用原有钩子，避免覆盖别处注册的拦截
          if (typeof prevBefore === 'function' && (await prevBefore(to)) === false) return false
          if (!zsuInPath(to)) return true
          // 已经在板块内部：内部互跳不再重复问（与原实现一致）
          if (zsuInPath(location.pathname)) return true
          return zsuAsk()
        }
      }
      // 直链进入 / 刷新页面：整页加载不经过 onBeforeRouteChange，这里单独补一次。
      // 答不出来就退回站点根目录（从历史记录里也能回去，但不依赖 history 长度更稳）。
      if (zsuInPath(location.pathname) && !zsuUnlocked()) {
        ;(async () => {
          if (!(await zsuAsk())) window.location.replace(import.meta.env.BASE_URL || '/')
        })()
      }
    }

    if (window.__clickSparkBound) return
    window.__clickSparkBound = true
    // 用【捕获阶段】挂载，确保点击侧边栏/导航栏等「会跳转的链接」时
    // 也能先于 VitePress 自身的点击处理拿到事件并生成粒子
    window.addEventListener('click', (e) => spawn(e.clientX, e.clientY), true)

    // 首页「↓ 滑动探索更多」提示：下移超过阈值淡出，回到顶部淡入
    // （通过 body.hint-hidden 类驱动，样式写在 docs/index.md 内联 <style> 中）
    if (!window.__scrollHintBound) {
      window.__scrollHintBound = true
      // 滚动到「首屏高度的多少比例」之后才开始淡出（越大越不容易消失）
      const SCROLL_HINT_RATIO = 0.6
      const toggleHint = () => {
        document.body.classList.toggle(
          'hint-hidden',
          window.scrollY > window.innerHeight * SCROLL_HINT_RATIO
        )
      }
      window.addEventListener('scroll', toggleHint, { passive: true })
      toggleHint() // 处理刷新时页面本身已处于滚动位置的初始态
    }

    // 首页顶栏：只要「首屏背景图」还压在顶栏后面，顶栏就保持透明；
    // 首屏整块滚过顶栏之后，交还给默认主题的「带底色」行为
    // （否则白色正文会从透明顶栏下面穿过去，和 Home / 站点标题叠在一起看不清）。
    // 类挂在 body 上，样式见 theme/style.css 的「首页顶栏：保持透明」一节。
    if (!window.__homeNavBound) {
      window.__homeNavBound = true
      const toggleHomeNav = () => {
        const hero = document.querySelector('.VPHome .VPHero')
        const h = hero ? hero.getBoundingClientRect().height : 0
        // 顶栏高度直接读 CSS 变量，避免这里和 style.css 里的 80px 各写一份
        const navH =
          parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue('--vp-nav-height')
          ) || 80
        document.body.classList.toggle(
          'home-past-hero',
          h > 0 && window.scrollY > h - navH
        )
      }
      window.addEventListener('scroll', toggleHomeNav, { passive: true })
      window.addEventListener('resize', toggleHomeNav, { passive: true })
      // 客户端路由切换时滚动位置会被重置（可能不冒泡成 scroll 事件），补一次
      if (router) router.onAfterRouteChange = toggleHomeNav
      toggleHomeNav()
    }

    // ==========================================================================
    // 「复制链接」按钮（友链页「本站链接」用）：一处委托，全站可用
    // --------------------------------------------------------------------------
    // 页面里只要写 <button class="copy-btn" data-copy-from="#某元素">：
    // 复制的文本取 data-copy-from 指向元素的**可见文本**（也可以直接写 data-copy="字面量"）。
    // 为什么放主题入口：和中山大学门禁同因 —— 页面 <script setup> 里的监听会随页面卸载
    // 失效（友链是独立页面，从首页点进去就换组件）；挂这里只在应用初始化时跑一次。
    // 剪贴板 API 在非安全上下文（file:// 双击打开、http 非 localhost）下不可用，
    // 故保留 textarea + execCommand 的兜底，两条路都失败才显示「复制失败」。
    // ==========================================================================
    if (!window.__copyBtnBound) {
      window.__copyBtnBound = true
      const COPY_FEEDBACK_MS = 1600

      const copyText = async (text) => {
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text)
            return true
          }
        } catch (e) {
          console.warn('[copy-btn] clipboard API 不可用，改用 execCommand 兜底：', e)
        }
        try {
          const ta = document.createElement('textarea')
          ta.value = text
          ta.setAttribute('readonly', '')
          ta.style.cssText = 'position:fixed;top:-1000px;left:0;opacity:0'
          document.body.appendChild(ta)
          ta.select()
          ta.setSelectionRange(0, ta.value.length)
          const ok = document.execCommand('copy')
          ta.remove()
          return ok
        } catch (e) {
          console.warn('[copy-btn] execCommand 兜底也失败：', e)
          return false
        }
      }

      window.addEventListener('click', async (e) => {
        const btn = e.target instanceof Element ? e.target.closest('.copy-btn') : null
        if (!btn) return
        const sel = btn.getAttribute('data-copy-from')
        const src = sel ? document.querySelector(sel) : null
        const text = (src ? src.textContent : btn.getAttribute('data-copy') || '').trim()
        if (!text) return

        const ok = await copyText(text)
        // 回执：换文案 + 换色，约 1.6s 后还原；连点则重新计时
        const label = btn.querySelector('.copy-btn__text') || btn
        if (!btn.dataset.copyLabel) btn.dataset.copyLabel = label.textContent
        label.textContent = ok ? '已复制' : '复制失败'
        btn.classList.toggle('is-copied', ok)
        btn.classList.toggle('is-failed', !ok)
        clearTimeout(btn.__copyTimer)
        btn.__copyTimer = setTimeout(() => {
          label.textContent = btn.dataset.copyLabel
          btn.classList.remove('is-copied', 'is-failed')
        }, COPY_FEEDBACK_MS)
      })
    }

    // ==========================================================================
    // 「返回上一级」按钮（顶栏站名 Eddieの小窝 右侧）：一处委托，全站可用
    // --------------------------------------------------------------------------
    // 按钮本身不在页面里写 —— 由 theme/Layout.vue 通过默认主题的 #nav-bar-title-after
    // 插槽注入到顶栏站名右侧（该插槽在 <a class="title"> 内部，点击必须先 preventDefault，
    // 见下面监听里的注释）；首页 / 文章专区 / 友链 的顶栏同样会渲染这个插槽，
    // 所以在 Layout.vue 里用 frontmatter.layout 过滤掉了，只留文档页。
    // 改位历史：① 「文章专区」枢纽页左上角 → ② 每篇文章正文标题上方（#doc-before）→
    //          ③ 顶栏站名右侧（当前，2026.9.22 二轮）。
    //
    // 点击后去哪儿（三级，从"最贴合来路"到"最稳"）：
    //   ① 有站内来路 → history.back()，正好回到"进本页之前那一页"（不是死跳首页）；
    //   ② 没有站内来路（直接输网址 / 刷新 / 新标签打开 / 从站外跳进来）→ 按当前文章
    //      路径推出**所属栏目的首页**：本站层级是 文章专区(枢纽页) → 栏目(如 /电脑知识/简介)
    //      → 文章，所以"上一级"就是栏目首页（见下面的 sectionHome()）；
    //   ③ 连栏目都推不出来（或推出来的就是当前页）→ 回「文章专区」枢纽页。
    // 页面也可以在按钮上写 data-back-fallback="/某地址" 手动指定 ② 的目标（有则优先）。
    // 为什么自己记"来路"，而不是看 document.referrer / history.length：
    //   · SPA 里 referrer 只在首次加载时定下、之后路由切换**不更新**（实测照旧是那一份），
    //     所以「首页 → 文章专区」这种纯客户端跳转在 referrer 里根本看不出来；
    //   · history.length **从 2 起**（浏览器启动那个 about:blank 也算一格，实测直链进入
    //     就是 2）→ 拿它当"有上一页"的判据会误判。
    //   于是借 onAfterRouteChange 自己记录上一次的页面路径（popstate 前进/后退也会触发，
    //   所以后退后再点按钮同样准）。上一页路径与当前页路径都过一遍 normPath：
    //   ⚠️ VitePress 首次加载**也会**触发一次 onAfterRouteChange（走的是 router.go()），
    //     而且那次把 URL 从 `/文章专区` 规范化成了 `/文章专区.html` —— 不做归一化就会
    //     立刻误判成"有个不同的来路"，点一下按钮真的去 history.back()，
    //     结果是回到浏览器启动时那个 about:blank（实测就是这么翻的车）。
    // ⚠️ onAfterRouteChange 是**单值属性**不是数组 → 必须链式调用上一份（本文件上方的
    //    toggleHomeNav 已经占了一格），否则会把"首页顶栏透明"那条一并覆盖掉。
    // ==========================================================================
    if (!window.__pageBackBound) {
      window.__pageBackBound = true
      // 归一化：解码 + 去掉 .html / index.html / 结尾斜杠（'/文章专区.html' 与 '/文章专区/' 视为同一页）
      const normPath = (p) => {
        let s = p || ''
        try { s = decodeURIComponent(s) } catch (e) { /* 路径含裸 % 等，用原串 */ }
        return s.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/+$/, '')
      }
      let herePath = normPath(location.pathname) // 当前页路径，随路由更新
      let prevPath = ''   // 上一页路径（站内）
      let hasPrev = false // 是否记录到过"上一页"（首页的 normPath 是 '' 也是合法来路 → 不能只靠字符串判空）
      if (router) {
        const prevAfter = router.onAfterRouteChange
        router.onAfterRouteChange = async (href) => {
          if (typeof prevAfter === 'function') await prevAfter(href)
          let next = href
          try { next = new URL(href, location.origin).pathname } catch (e) { /* 用原值 */ }
          prevPath = herePath
          hasPrev = true
          herePath = normPath(next)
        }
      }

      // —— 兜底目标：按当前文章路径推「所属栏目的首页」 ——
      // 层级：文章专区(枢纽页) → 栏目(如 /电脑知识/简介) → 文章。
      // 栏目首页的地址**直接从 config.mjs 的 sidebar 里取**，不另外维护一份映射表：
      //   侧边栏每个栏目分组的第一条就是该栏目的首页（简介 / 目录 / leetcode介绍 / 我的梗图 …），
      //   所以「取第一段路径 → 找同名分组 → 取其中第一个带 link 的条目」即可。
      // 例：/电脑知识/办公软件/Excel表冻结行列 → /电脑知识/简介（而不是死跳首页）。
      // 取不到（新栏目还没进侧边栏 / 侧边栏改成了数组形式）→ 返回 ''，交给调用处兜底。
      const sectionHome = (p) => {
        const seg = normPath(p).split('/').filter(Boolean)[0]
        if (!seg) return ''
        // 侧边栏既可能是「按路径的对象」（本站现状），也可能是数组 → 两种都容错
        let sidebar = null
        try {
          sidebar = (siteData && siteData.value && siteData.value.themeConfig
            && siteData.value.themeConfig.sidebar) || null
        } catch (e) { sidebar = null }
        const group = Array.isArray(sidebar) ? sidebar : (sidebar ? sidebar[seg] : null)
        const firstLink = (items) => {
          if (!Array.isArray(items)) return ''
          for (const it of items) {
            if (!it) continue
            if (it.link) return it.link
            const deep = firstLink(it.items) // 分组套分组的情况
            if (deep) return deep
          }
          return ''
        }
        return firstLink(group)
      }
      // 全站兜底：栏目也推不出来时回「文章专区」枢纽页（别把人扔回首页 —— 那里没有文章入口）
      const HUB = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '') + '/文章专区'

      window.addEventListener('click', (e) => {
        const btn = e.target instanceof Element ? e.target.closest('.back-btn') : null
        if (!btn) return
        // ⚠️⚠️ 必须 preventDefault：按钮现在挂在顶栏的 #nav-bar-title-after 插槽里，
        //   而那个插槽在 <a class="title">（站名链接）**内部** → 不拦截的话，
        //   点击的默认动作是"跳回首页"，history.back() 会被这次跳转盖掉（表现为"点返回=回首页"）。
        e.preventDefault()
        if (hasPrev && prevPath !== normPath(location.pathname) && window.history.length > 1) {
          window.history.back() // 走 popstate → VitePress 自己按 SPA 方式换页
          return
        }
        // 页面显式指定的兜底地址优先（Layout.vue 里那个按钮故意不写，走自动推导）
        let target = btn.getAttribute('data-back-fallback') || sectionHome(location.pathname) || ''
        // 推出来的就是当前页（例如正站在栏目首页上）→ 作废，别自己点自己
        if (target && normPath(target) === normPath(location.pathname)) target = ''
        window.location.href = target || HUB || import.meta.env.BASE_URL || '/'
      })
    }

    // ==========================================================================
    // 「文章专区」枢纽页：右上角「隐藏 / 显示」按钮（2026.9.23 十轮新增）
    // --------------------------------------------------------------------------
    // 站长口径：「在文章专区右上角加一个『隐藏』的按钮，按下之后可以隐藏此页面内的文字和
    //   按钮（方便看壁纸）」。
    // 页面里只写 <button class="hub-hide-btn">（标记在 docs/文章专区.md），行为全在这里
    //   —— 与门禁 / 复制 / 返回上一级同一条约定：页面不写脚本、交互一律全局委托
    //   （页面 <script setup> 里的监听会随页面卸载失效，那三个都踩过这个坑）。
    // 落点：给 <html> 挂 / 摘 `hub-hidden` 类，样式在 theme/sections.css 的
    //   「文章专区 · 隐藏按钮」一节。一个类驱动三件事：正文淡出（opacity 0）、
    //   图标由睁眼切成闭眼、按钮上的文案在「隐藏 / 显示」之间换。
    // 为什么挂 <html> 而不是挂被隐藏的那几个元素：同 article-bg-keep 的理由 ——
    //   <html> 不随页面内容重渲染，状态最稳（被隐藏的节点是 Vue 渲染的，将来加个动画 /
    //   条件渲染就可能被重建，类会跟着丢）。
    // ⚠️ 必须做"离开本页就复位"：类挂在 <html> 上、跨路由不会自己消失；隐藏着点去别的页面
    //   再回到枢纽页，会看到一个"空白页"，看起来像坏了。复位也**延到 rAF** 再判
    //   （理由同下面 articleBg 那段 ⚠️⚠️：onAfterRouteChange 触发时 DOM 还是旧页的）。
    // ⚠️ onAfterRouteChange 是**单值属性不是数组** → 必须链式调用上一份（本文件已有
    //   toggleHomeNav / 来路记录 / articleBg 三处占位，覆盖掉会连累它们）。
    // ⚠️ 隐藏态**只**在枢纽页生效（CSS 那条规则带 :has(.Layout.*-hub-bg)，且只藏 .home-section 内
    //   除按钮外的子节点），所以即便这里漏摘类，也不会影响首页 / 文章页。按钮现已在文章专区 /
    //   游乐场 / 友链三页复用同一套标记与委托。
    // ⚠️⚠️ 2026.9.23 修正：隐藏态**只作用于当前页面**——任何路由变化（含三枢纽页互跳）都复位，
    //   重新进入某页以"显示"态刷新；不再跨页保留隐藏态。
    // ==========================================================================
    if (!window.__hubHideBound) {
      window.__hubHideBound = true
      const HIDDEN_CLASS = 'hub-hidden'
      // 按钮文案与无障碍属性（图标切换交给 CSS，见上面的类）
      // 2026.9.23 十四轮：文案从「隐藏 / 显示」改成「隐藏内容 / 显示内容」，与按钮放大一起改
      const HIDE_TEXT = '隐藏内容'
      const SHOW_TEXT = '显示内容'
      const HIDE_LABEL = '隐藏页面内容，只看壁纸'
      const SHOW_LABEL = '显示页面内容'
      const hubApply = (on) => {
        document.documentElement.classList.toggle(HIDDEN_CLASS, on)
        document.querySelectorAll('.hub-hide-btn').forEach((btn) => {
          btn.setAttribute('aria-pressed', on ? 'true' : 'false')
          btn.setAttribute('aria-label', on ? SHOW_LABEL : HIDE_LABEL)
          btn.setAttribute('title', on ? SHOW_LABEL : HIDE_LABEL)
          const txt = btn.querySelector('.hub-hide-btn__text')
          if (txt) txt.textContent = on ? SHOW_TEXT : HIDE_TEXT
        })
      }
      const hubIsHidden = () => document.documentElement.classList.contains(HIDDEN_CLASS)

      window.addEventListener('click', (e) => {
        const btn = e.target instanceof Element ? e.target.closest('.hub-hide-btn') : null
        if (!btn) return
        hubApply(!hubIsHidden())
      })

      // 每次路由变化都复位（默认态就是"显示"，首屏初始化不用做事）。
      // ⚠️⚠️ 隐藏态只对「当前所在页面」生效：在文章专区 / 游乐场 / 友链三枢纽页之间互跳、
      //   或离开枢纽页回到首页 / 文章页，一律复位为"显示"——重新进入某页也会以显示态刷新。
      // 站长 2026.9.23 修正：之前保留隐藏态会让 A 页隐藏后跳到 B 页仍隐藏（范围越界）。
      if (router) {
        const prevAfterHub = router.onAfterRouteChange
        router.onAfterRouteChange = async (href) => {
          if (typeof prevAfterHub === 'function') await prevAfterHub(href)
          const reset = () => {
            // 只要还藏着就摘掉类，无论新页面是不是枢纽页。
            // 不依赖「页面上有没有 .hub-hide-btn」判定：那样跨枢纽页互跳会保留隐藏态。
            if (hubIsHidden()) hubApply(false)
          }
          if (typeof requestAnimationFrame === 'function') requestAnimationFrame(reset)
          else setTimeout(reset, 16)
        }
      }
    }

    // ==========================================================================
    // 文章区背景图：跨页保持 + 淡入时机（2026.9.22 二轮修"换页闪一下" / 三轮定"背景本来就在
    // 就别再淡" / 六轮把淡入的载体由「照片」换成「黑幕」——判定逻辑一个字没改）
    // --------------------------------------------------------------------------
    // 症状（站长口径）：在文章专区里点开一篇文章，背景图会**整张消失、再重新淡入**一遍。
    // 根因（headless 实测）：背景的"可见 + 淡入"原本只由 style.css 里
    //   `html:has(.VPSidebar)` / `html:has(.Layout.article-hub-bg)` 两个选择器判定，
    //   而这两个选择器**跟着页面内容走** —— SPA 换页时旧页先卸载、新页后挂上，中间那一小段
    //   两个选择器双双不命中：实测点击卡片后 ~120ms 声明被撤、动画被移除，
    //   ~200ms 新页挂上、动画重新跑满全程（= 整块背景闪掉又淡回来）。
    // 治法：把"照片可见 + 黑幕动画（六轮起时间轴挂在 body::after 的黑幕上）一直在跑"
    //   同时交给挂在 <html> 上的类 `article-bg-keep`（声明见 style.css「跨页保持」一节）。
    //   类不随内容重渲染变化 → 换页全程它都在 → 动画名从头到尾没离开过 → 不重启。
    //   区内互跳（点文章 / 点侧边栏）照片不闪、黑幕也不重播。
    // 淡入时机（站长口径三度收紧为「背景本来就在就别再淡」）：
    //   淡入**完全由 CSS 那两个 `:has()` 选择器"开始命中"那一下驱动**，JS 不参与：
    //     · 首次进入（直链 / 刷新）→ 首帧选择器就命中 → 淡入一次；
    //     · 从首页 / 友链进文章区 → 那一刻选择器才开始命中 → 淡入一次；
    //     · 区内互跳（点文章 / 点侧边栏 / 回枢纽页）→ keep 类一直挂着，"背景可见 +
    //       动画一直在跑"从头到尾成立 → **不重播**（照片不闪、不重看一遍淡入）。
    //   ⚠️ 所以这里**不要**再写"摘类 → 强制重排 → 挂回类"那套重播手法
    //     （那条重播已按站长口径整个移除；即使要重建，光摘挂类也取消不掉同名动画）。
    // ⚠️⚠️ 判定必须**延到 rAF（下一帧）**再做，不能直接在路由钩子里做：实测
    //   `onAfterRouteChange` 是**在 Vue 打补丁之前**触发的 —— 那一刻 router.route.data
    //   已经是新页的数据，但 DOM 还是**旧页**的（直链进枢纽页时 #app 甚至还是空的 →
    //   会被误判成"不在文章区" → 类压根没挂上，后面点文章自然又重播一次）。
    //   rAF 回调排在"补丁微任务"之后、且固定在**该帧绘制之前** → 查到的 DOM 一定是新页的，
    //   而撤类的时机仍在绘制前，离开文章区也不会残留背景。
    // ⚠️ 判定必须查 DOM 而不是查路由：pageClass / hasSidebar 的最终结果就落在 DOM 上，
    //   窄屏（<960）文章页本来就不铺背景（那是 CSS 媒体查询定的），查 DOM 才能和 CSS
    //   口径完全对齐；在这里再手写一份"哪些路径算文章区"的映射迟早会走岔。
    // ⚠️ onAfterRouteChange 是单值属性不是数组，必须链式调用上一份（本文件已有
    //   toggleHomeNav 与"返回上一级"的来路记录占位，覆盖掉会连累它们）。
    //   （它**首次导航也会触发**（入口是 `router.go()`），所以直链进文章区时类照样挂得上，
    //    无需另外写一段"首屏初始化"。）
    // ==========================================================================
    if (!window.__articleBgBound) {
      window.__articleBgBound = true
      const root = document.documentElement
      const mqWide = window.matchMedia('(min-width: 960px)')
      // 背景此刻该不该铺 —— 口径与 style.css 的三个选择器逐条对齐：
      //   枢纽页（任何宽度都铺）：「文章专区」(article-hub-bg)、「友链」(friend-hub-bg) 与「游乐场」(playground-hub-bg)；
      //   文章正文页：只有 ≥960 铺（窄屏没有「大容器」托底）。
      //   两页 hub 共享 article-bg-keep 的「跨页不闪」逻辑（各自背景图由 :has 规则决定，
      //   与 keep 类无关）。
      const atHub = () =>
        !!document.querySelector('.Layout.article-hub-bg') ||
        !!document.querySelector('.Layout.friend-hub-bg') ||
        !!document.querySelector('.Layout.playground-hub-bg') ||
        !!document.querySelector('.Layout.art-hall-hub-bg')
      const bgWanted = () =>
        atHub() || (mqWide.matches && !!document.querySelector('.VPSidebar'))

      // 只做一件事：把"背景该不该铺"这个状态同步到 <html> 的 keep 类上。
      // keep 类只是把同一套声明多挂一份、盖住换页空档；要不要淡入由 CSS 的 `:has()`
      // 选择器自己决定。背景一直在（类本来就在）时 classList.add 是空操作 → 动画名没变
      // → 浏览器认作"同一动画"→ **不重播**。这正是"背景本来就在就别再淡"。
      const syncBgKeep = () => {
        if (bgWanted()) root.classList.add('article-bg-keep')
        else root.classList.remove('article-bg-keep')
      }

      // 当前页用哪张背景图（决定"互跳时背景换没换"）：
      //   article-hub / 文章正文页(.VPSidebar) 共用 文章页.jpg → 'article'
      //   friend-hub → 'friend'、playground-hub → 'playground'；无背景页 → ''
      const bgImageKey = () => {
        if (document.querySelector('.Layout.article-hub-bg')) return 'article'
        if (document.querySelector('.Layout.friend-hub-bg')) return 'friend'
        if (document.querySelector('.Layout.playground-hub-bg')) return 'playground'
        if (document.querySelector('.Layout.art-hall-hub-bg')) return 'art-hall'
        if (mqWide.matches && document.querySelector('.VPSidebar')) return 'article'
        return ''
      }

      // 预加载各枢纽页 / 文章区背景图：保证切换时图已在缓存里、瞬间切换不闪白。
      // （CSS 背景图首次用到才会解码；这里提前 new Image() 触发下载 + 解码。）
      ;['/assets/img_background/首页.jpg', '/assets/img_background/文章页.jpg',
        '/assets/img_background/友链页.jpg', '/assets/img_background/游乐场页.jpg',
        '/assets/img_background/艺术走廊.jpg'].forEach((u) => { const im = new Image(); im.src = u })

      // 上一次**已揭示**的背景 key（'' = 还没记录过 / 或上一页无背景）。
      // ⚠️⚠️ 判定口径（2026.9.24 二十五轮修订，站长报「除了首页之外的页面背景没有淡入效果」）：
      //   放行条件是「**背景图换了一张**」，不是「本会话第一次」——
      //   二十四轮那版写成 `anyBgSeen`（整个会话只放行一次），后果是：只要揭示过任意一张
      //   背景，之后**所有**页面的黑幕都被 bg-no-curtain 掐掉（实测：首页→文章专区有淡入，
      //   文章专区→友链→游乐场→艺术走廊全线 animation:none、黑幕最大不透明度恒 0）。
      //   现在改成逐次比对 key：article / friend / playground / art-hall 各自算一张图，
      //   `cur !== prevBgKey` 就是"换图了" → 放行黑幕淡入。
      // ⚠️ 这样仍然完整保住二十四轮的两条诉求 —— 它们都是**同图跨页**，key 不变 → 抑制：
      //     · 文章专区 → 点进一篇文章（都是 'article'）→ 不闪黑；
      //     · 文章正文页 → 「返回上一级」回文章专区（都是 'article'）→ 不闪黑。
      //   ⚠️ 别再退回 `anyBgSeen` 那种"全会话一票"的写法：那等于把首页以外所有页面的
      //      淡入一起关掉，正是站长这次报的毛病。
      let prevBgKey = ''
      // 黑幕重播的令牌：每次"换图放行"自增一次，跨帧摘类前比对 —— 期间又发生导航就作废，
      // 免得把上一轮的"放行"补执行到新页面（那页可能本该抑制）。
      let curtainToken = 0

      // 视口跨 960 断点时重算（宽 → 窄停在文章页上必须撤掉背景，否则正文压在照片上读不了）
      const onWideChange = () => syncBgKeep()
      if (mqWide.addEventListener) mqWide.addEventListener('change', onWideChange)
      else if (mqWide.addListener) mqWide.addListener(onWideChange) // 老内核兜底

      if (router) {
        const prevAfterBg = router.onAfterRouteChange
        router.onAfterRouteChange = async (href) => {
          if (typeof prevAfterBg === 'function') await prevAfterBg(href)
          // 见上面 ⚠️⚠️：判定必须等这一帧 —— 这一刻 Vue 刚把新页面挂上，DOM 才是新页的
          const afterPaint = () => {
            syncBgKeep()
            const cur = bgImageKey()
            // 2026.9.24（二十五轮）：本次导航是否允许黑幕淡入 —— 判据是"背景图换没换"：
            //   当前页有背景，且与上一页那张**不是同一张** → 换图，放行淡入；
            //   其余（同图跨页 = 文章家族内部互跳 / 当前页无背景）→ 抑制黑幕，直接切，
            //   避免"背景重新加载"的闪黑。
            const imageChanged = cur !== '' && cur !== prevBgKey
            prevBgKey = cur
            // ⚠️⚠️ 关键（实测出来的坑，别把下面两行简化成一句 remove）：
            //   光把 bg-no-curtain 摘掉**不会**让黑幕重播 —— `article-curtain-out` 这个
            //   动画名在 body::after 上**一直挂着**（跨页保持类 html.article-bg-keep 也声明了
            //   同一个名字），浏览器认定为"同一个动画"、且它早就跑完（`both` 填充停在
            //   opacity:0）→ 名没变 → 不从头跑。
            //   实测（.workbuddy/tmp/curtain-nav2-probe.cjs，只摘类那版）：文章专区首次有
            //   淡入，之后友链 / 游乐场 / 艺术走廊的 animationstart 全是 0、黑幕最大不透明度
            //   恒 0 —— 正是站长报的"除了首页，别的页面背景都没有淡入"。
            //   ✅ 正确做法 = **先挂抑制类、让动画名真正落成 `none`，下一帧再摘掉** ——
            //      动画名走了 `none → article-curtain-out`，浏览器才当成一次新动画从头跑。
            //      这一帧里黑幕是基础态 opacity:0（不会闪），16ms 的延迟肉眼不可见。
            //   ⚠️ 抑制态必须**先挂**：它同时也是"同图跨页"那一支的终态（挂上就不摘）。
            root.classList.add('bg-no-curtain')
            if (!imageChanged) return
            const token = ++curtainToken
            requestAnimationFrame(() => {
              if (token !== curtainToken) return // 期间又导航了 → 作废，交给那一次自己判
              root.classList.remove('bg-no-curtain')
            })
          }
          if (typeof requestAnimationFrame === 'function') {
            requestAnimationFrame(afterPaint)
          } else {
            setTimeout(afterPaint, 16)
          }
        }
      }
    }

    // ==========================================================================
    // 「艺术走廊」画廊（2026.9.23 新增，docs/艺术走廊.md）
    // --------------------------------------------------------------------------
    // 站长口径：卡牌容器放画作 / 照片，鼠标滚轮控制横向左右移动，停止时自动匹配
    //   最接近的卡牌、做卡牌选择效果（中间大、两边小，参考截图）。
    // 结构约定见 docs/艺术走廊.md 顶部注释；样式见 sections.css 的「艺术走廊画廊」。
    // 与门禁 / 复制 / 隐藏按钮同一条约定：**交互一律全局委托、页面里不写脚本**
    //   （页面 <script setup> 里的监听会随页面卸载失效）。所以这里全部用
    //   window 级监听 + closest 判定，元素上不挂任何监听 → 换页后 DOM 是新的也照样工作。
    //   ⚠️ scroll 事件不冒泡，但**捕获阶段**的 window 监听能收到后代元素的 scroll
    //     （e.target = 滚动元素本身），横向 / 纵向滚动都能捕获到。
    // 实现要点：
    //   · 滚轮：竖向 deltaY / 横向 deltaX（触控板横扫、Shift+滚轮）取绝对值大的那个，
    //     **累加到目标值**，rAF 循环每帧按剩余距离 × 0.18 平滑逼近 —— 直加 scrollLeft
    //     会一格一格硬跳（站长反馈"一卡一卡"），惯性逼近才是连续滑动。
    //     preventDefault 挡住页面竖滚（passive:false 才能 prevent）。
    //   · 吸附：滚轮停稳（160ms 无新滚轮）后，找「中心离视口中心最近」的卡牌，
    //     惯性滑到它正中 —— 即"停止时自动匹配最接近的卡牌"。
    //   · 选中效果：滚动**过程中**（rAF 节流）就实时把最近卡牌点亮（.is-active，
    //     CSS 里放大 + 描边 + 投影），不是等停下才变 —— 滚起来有"焦点跟随"的观感。
    //   · 点击卡牌 = 直接选中并惯性居中它。
    //   · 初始化：直链 / 刷新时立即跑一次；SPA 换页后在 onAfterRouteChange 的 rAF 里
    //     再跑（DOM 才是新页的，同 articleBg 那段的理由）。卡牌宽度是 CSS 写死的，
    //     offsetLeft 不受图片加载影响 → 初始定位稳定。
    // ==========================================================================
    if (!window.__galleryBound) {
      window.__galleryBound = true
      const SETTLE_MS = 160
      // 逐帧逼近系数：每帧走「剩余距离 × 0.18」，指数衰减 → 起步快、收尾缓，
      // 把滚轮一格一格的硬跳变成连续滑动（站长反馈"一卡一卡"的根因就是直加 scrollLeft）。
      const LERP_FACTOR = 0.18

      // 卡牌中心在「视口内容坐标系」里的横坐标。⚠️ 必须用 rect 相减来算：
      // offsetLeft 相对 offsetParent（不一定是滚动视口，中间有无定位的祖先），
      // 会把外层容器的左边距一并算进去 → 初始落位偏左（站长实测）。
      // rect 含 transform 缩放，但缩放原点是中心 → 中心点不受影响，放心用。
      const cardCenter = (vp, card) => {
        const vpRect = vp.getBoundingClientRect()
        const cardRect = card.getBoundingClientRect()
        return vp.scrollLeft + cardRect.left - vpRect.left + cardRect.width / 2
      }

      // 卡牌中心相对视口中心的偏移，取最小者 = "最接近的卡牌"
      const nearestCard = (vp) => {
        const cards = vp.querySelectorAll('.gallery-card')
        if (!cards.length) return null
        const vpCenter = vp.scrollLeft + vp.clientWidth / 2
        let best = null
        let bestDist = Infinity
        cards.forEach((card) => {
          const dist = Math.abs(cardCenter(vp, card) - vpCenter)
          if (dist < bestDist) { bestDist = dist; best = card }
        })
        return best
      }

      const setActive = (vp, card) => {
        vp.querySelectorAll('.gallery-card.is-active').forEach((c) => {
          if (c !== card) c.classList.remove('is-active')
        })
        if (card) card.classList.add('is-active')
      }

      // 惯性滚动：把 scrollLeft 逐帧推向 __galleryTarget（rAF 驱动，一帧一停）。
      // 每次改 scrollLeft 都会触发 scroll 事件 → 下方捕获监听顺势更新焦点卡牌。
      const clampLeft = (vp, left) =>
        Math.min(vp.scrollWidth - vp.clientWidth, Math.max(0, left))
      const startLerp = (vp) => {
        if (vp.__galleryLerpRaf) return
        const step = () => {
          vp.__galleryLerpRaf = 0
          if (vp.__galleryTarget == null) return
          const diff = vp.__galleryTarget - vp.scrollLeft
          if (Math.abs(diff) < 0.5) {
            vp.scrollLeft = vp.__galleryTarget
            return
          }
          vp.scrollLeft += diff * LERP_FACTOR
          vp.__galleryLerpRaf = requestAnimationFrame(step)
        }
        vp.__galleryLerpRaf = requestAnimationFrame(step)
      }

      // 把某张卡牌滚到视口正中（smooth = 惯性滑过去；auto = 初始化时直接落位）
      const centerCard = (vp, card, smooth) => {
        if (!card) return
        const left = clampLeft(vp, cardCenter(vp, card) - vp.clientWidth / 2)
        if (smooth) {
          vp.__galleryTarget = left
          startLerp(vp)
        } else {
          vp.scrollLeft = left
        }
      }

      // 停稳后吸附：每次滚轮都重置计时器，160ms 没有新滚轮 = 停了 → 惯性滑向最近卡牌
      const settle = (vp) => {
        clearTimeout(vp.__gallerySettle)
        vp.__gallerySettle = setTimeout(() => {
          centerCard(vp, nearestCard(vp), true)
        }, SETTLE_MS)
      }

      // 滚轮 → 累加目标位移（整个委托只此一处需要 passive:false + preventDefault）。
      // 不再直接动 scrollLeft：只改目标，rAF 循环负责平滑逼近 —— 这是顺滑的关键。
      window.addEventListener('wheel', (e) => {
        const vp = e.target instanceof Element ? e.target.closest('.gallery-viewport') : null
        if (!vp) return
        e.preventDefault()
        // 若上一段惯性已停，以当前实际位置为基准续累加（避免陈旧目标叠加跳变）
        if (!vp.__galleryLerpRaf) vp.__galleryTarget = vp.scrollLeft
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
        vp.__galleryTarget = clampLeft(vp, vp.__galleryTarget + delta)
        startLerp(vp)
        settle(vp)
      }, { passive: false })

      // 滚动过程中：rAF 节流地更新"焦点卡牌" + 重置吸附计时器（捕获阶段才能收到 scroll）
      window.addEventListener('scroll', (e) => {
        const t = e.target
        if (!(t instanceof Element) || !t.classList.contains('gallery-viewport')) return
        if (!t.__galleryRaf) {
          t.__galleryRaf = requestAnimationFrame(() => {
            t.__galleryRaf = 0
            setActive(t, nearestCard(t))
          })
        }
        settle(t)
      }, true)

      // 点击卡牌 = 选中、居中 + 弹出作品弹窗（左图右文）
      window.addEventListener('click', (e) => {
        const card = e.target instanceof Element ? e.target.closest('.gallery-card') : null
        if (!card) return
        const vp = card.closest('.gallery-viewport')
        if (!vp) return
        setActive(vp, card)
        centerCard(vp, card, true)
        clearTimeout(vp.__gallerySettle)
        openArtModal(card)
      })

      // —— 作品弹窗（2026.9.24 新增）：点击卡牌弹出，左半侧画作、右半侧介绍， ——
      // —— 右上角 × 关闭（点遮罩 / Esc / 路由变化离开本页也会关）。           ——
      // 与画廊同一条约定：DOM 由这里动态创建挂到 body，页面里不写脚本；
      // 内容源 = 艺术走廊.md 里每张卡牌的 .gallery-card__intro 隐藏块。
      // 样式见 sections.css 的「艺术走廊 · 作品弹窗」一节。
      const ensureModal = () => {
        let root = document.getElementById('art-modal')
        if (root) return root
        root = document.createElement('div')
        root.className = 'art-modal'
        root.id = 'art-modal'
        root.setAttribute('aria-hidden', 'true')
        root.innerHTML = '<div class="art-modal__backdrop"></div>' +
          '<div class="art-modal__panel" role="dialog" aria-modal="true">' +
            '<button class="art-modal__close" type="button" aria-label="关闭弹窗">✕</button>' +
            '<div class="art-modal__media"><img class="art-modal__img" alt=""></div>' +
            '<div class="art-modal__body">' +
              '<h2 class="art-modal__title"></h2>' +
              '<div class="art-modal__intro"></div>' +
            '</div>' +
          '</div>'
        document.body.appendChild(root)
        return root
      }
      const closeArtModal = () => {
        const root = document.getElementById('art-modal')
        if (!root || !root.classList.contains('is-open')) return
        root.classList.remove('is-open')
        document.documentElement.classList.remove('art-modal-open')
        // 先把焦点还给来源卡牌，再置 aria-hidden（顺序反了会有无障碍警告）
        if (root.__artReturnFocus && typeof root.__artReturnFocus.focus === 'function') {
          root.__artReturnFocus.focus()
        }
        root.__artReturnFocus = null
        root.setAttribute('aria-hidden', 'true')
      }
      const openArtModal = (card) => {
        const img = card.querySelector('.gallery-card__img')
        if (!img) return
        const name = card.querySelector('.gallery-card__name')
        const intro = card.querySelector('.gallery-card__intro')
        const root = ensureModal()
        root.querySelector('.art-modal__img').src = img.src
        root.querySelector('.art-modal__img').alt = img.alt || ''
        root.querySelector('.art-modal__title').textContent = name ? name.textContent : (img.alt || '')
        root.querySelector('.art-modal__intro').innerHTML = intro ? intro.innerHTML : ''
        root.__artReturnFocus = card
        root.classList.add('is-open')
        root.setAttribute('aria-hidden', 'false')
        document.documentElement.classList.add('art-modal-open')
        const closeBtn = root.querySelector('.art-modal__close')
        if (closeBtn) closeBtn.focus()
      }
      // 关闭委托：点 × 或点遮罩关（点在面板内部不关）
      window.addEventListener('click', (e) => {
        if (!(e.target instanceof Element)) return
        const root = e.target.closest('.art-modal')
        if (!root || !root.classList.contains('is-open')) return
        if (e.target.closest('.art-modal__close') || e.target.closest('.art-modal__backdrop')) closeArtModal()
      })
      // Esc 关闭（弹窗没开时是空操作）
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeArtModal()
      })

      // 初始化：把中间那张卡牌设为初始焦点并居中（每页视口只初始化一次）
      const initGalleries = () => {
        document.querySelectorAll('.gallery-viewport').forEach((vp) => {
          if (vp.__galleryInit) return
          vp.__galleryInit = true
          const cards = vp.querySelectorAll('.gallery-card')
          if (!cards.length) return
          const mid = cards[Math.floor(cards.length / 2)]
          setActive(vp, mid)
          // 等一帧（布局就绪）再落位，避免初始 scrollLeft 算在旧布局上
          if (typeof requestAnimationFrame === 'function') requestAnimationFrame(() => centerCard(vp, mid, false))
          else centerCard(vp, mid, false)
        })
      }
      initGalleries()
      if (router) {
        const prevAfterGallery = router.onAfterRouteChange
        router.onAfterRouteChange = async (href) => {
          if (typeof prevAfterGallery === 'function') await prevAfterGallery(href)
          // rAF 后 DOM 才是新页的（同 articleBg / hubHide 那两段的理由）
          // 换页（含从艺术走廊离开）时把弹窗强制关掉，避免挂 body 的浮层带去别的页
          const run = () => { closeArtModal(); initGalleries() }
          if (typeof requestAnimationFrame === 'function') requestAnimationFrame(run)
          else setTimeout(run, 16)
        }
      }
    }

    // ==========================================================================
    // 顶栏「音乐」按钮 + 音乐弹窗（2026.9.24 二十三轮新增）
    // --------------------------------------------------------------------------
    // 按钮由 Layout.vue 的两个插槽渲染（桌面顶栏「友链」右侧 / 移动端抽屉菜单底部），
    //   这里只管行为 —— 与「返回上一级」同一条约定：DOM 里只留 class。
    // 曲目清单 MUSIC_LIST（二十四轮 2026.9.24 起按截图样式重做卡片）：
    //   { title, src, cover, artists: [...] }
    //   · 音频放 docs/assets/music/、圆形封面放 docs/assets/img_music/（文件名同名最省事）；
    //   · cover 用 object-fit:cover 圆形裁选展示（站长口径：不拉伸，能裁多大裁多大）；
    //   · artists 一行一个（截图里「Puth/Andrew」那种每行一条的格式）。
    //   ⚠️ src/cover 一律写 /assets/... **绝对路径**（与文章插图同一条铁律：
    //      中文文件名 + 相对路径 build 会直接挂）。
    // 弹窗 DOM 动态建挂 body；关闭 = × / 点遮罩 / Esc / 路由变化。
    //   ⚠️ 位置：**不居中**，面板钉在导航栏正下方、横向锚在「音乐」按钮下面（下拉卡片）。
    // ⚠️ 关弹窗**故意不停音乐**（BGM 设定：弹窗只是操作面板，声音跨页继续走）。
    // 播放器自绘（上一首 / 播放·暂停 / 下一首 / 静音 + 音量条 + 可点进度条），
    //   不用 <audio controls> —— 原生控件的样子与本站语言不一致、换肤后更突兀。
    // ==========================================================================
    if (!window.__musicBound) {
      window.__musicBound = true
      const MUSIC_LIST = [
        {
          title: 'Por Una Cabeza',
          artists: ['Thomas Newma'],
          src: '/assets/music/PorUnaCabeza-ThomasNewma.mp3',
          cover: '/assets/img_music/PorUnaCabeza-ThomasNewma.jpg'
        },
        // { title: '曲名', artists: ['作者'], src: '/assets/music/曲名.mp3', cover: '/assets/img_music/封面.jpg' },
      ]
      // 打开弹窗时是否自动播第一首（默认关：进来先挑歌，别一开门就响）
      const AUTOPLAY_ON_OPEN = false
      let musicIndex = -1 // 当前曲目下标，-1 = 还没选过

      const fmtTime = (sec) => {
        if (!isFinite(sec) || sec < 0) sec = 0
        const m = Math.floor(sec / 60)
        const s = Math.floor(sec % 60)
        return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s
      }
      // 顶栏按钮的「正在播放」态（桌面 / 移动端两份按钮一起翻）
      const setBtnPlaying = (on) => {
        document.querySelectorAll('.music-nav-btn').forEach((b) => {
          b.classList.toggle('is-playing', !!on)
        })
      }
      // 播放器图标（SVG，fill 跟随 currentColor → 亮暗自适配）
      const ICONS = {
        prev: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h2.2v14H6z"/><path d="M20 5.5v13L9.5 12z"/></svg>',
        next: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.8 5H18v14h-2.2z"/><path d="M4 5.5v13L14.5 12z"/></svg>',
        play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
        pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h3.4v14H7zM13.6 5H17v14h-3.4z"/></svg>',
        vol: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z"/><path d="M14.8 8.4a5 5 0 0 1 0 7.2l1.4 1.4a7 7 0 0 0 0-10l-1.4 1.4z"/></svg>',
        muted: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4z"/><path d="M15.2 9.8l1.3-1.3 1.7 1.7 1.7-1.7 1.3 1.3-1.7 1.7 1.7 1.7-1.3 1.3-1.7-1.7-1.7 1.7-1.3-1.3 1.7-1.7z"/></svg>'
      }
      const ensureMusicModal = () => {
        let root = document.getElementById('music-modal')
        if (root) return root
        root = document.createElement('div')
        root.className = 'music-modal'
        root.id = 'music-modal'
        root.setAttribute('aria-hidden', 'true')
        root.innerHTML =
          '<div class="music-modal__backdrop"></div>' +
          '<div class="music-modal__panel" role="dialog" aria-modal="true" aria-label="音乐">' +
            '<button class="music-modal__close" type="button" aria-label="关闭">✕</button>' +
            '<h2 class="music-modal__title">音乐</h2>' +
            '<p class="music-modal__empty" hidden></p>' +
            '<div class="music-modal__player" hidden>' +
              '<div class="music-player__meta">' +
                '<span class="music-player__cover"><img class="music-player__img" alt=""></span>' +
                '<div class="music-player__artists"></div>' +
              '</div>' +
              '<div class="music-player__progress">' +
                '<span class="music-player__cur">00:00</span>' +
                '<div class="music-player__bar"><div class="music-player__fill"></div></div>' +
                '<span class="music-player__total">00:00</span>' +
              '</div>' +
              '<div class="music-player__row">' +
                '<button class="music-player__btn" type="button" data-act="prev" aria-label="上一首">' + ICONS.prev + '</button>' +
                '<button class="music-player__btn music-player__btn--play" type="button" data-act="toggle" aria-label="播放 / 暂停">' + ICONS.play + '</button>' +
                '<button class="music-player__btn" type="button" data-act="next" aria-label="下一首">' + ICONS.next + '</button>' +
                '<button class="music-player__btn music-player__btn--vol" type="button" data-act="mute" aria-label="静音 / 取消静音">' + ICONS.vol + '</button>' +
                '<input class="music-player__vol" type="range" min="0" max="1" step="0.01" value="1" aria-label="音量">' +
              '</div>' +
            '</div>' +
            '<audio class="music-modal__audio" preload="metadata"></audio>' +
          '</div>'
        document.body.appendChild(root)
        const audio = root.querySelector('.music-modal__audio')
        audio.addEventListener('play', () => { setBtnPlaying(true); syncPlayIcon() })
        audio.addEventListener('pause', () => { setBtnPlaying(false); syncPlayIcon() })
        audio.addEventListener('ended', () => { if (MUSIC_LIST.length > 1) playAt(musicIndex + 1) })
        audio.addEventListener('timeupdate', () => {
          const fill = root.querySelector('.music-player__fill')
          const cur = root.querySelector('.music-player__cur')
          if (fill && audio.duration) fill.style.width = (audio.currentTime / audio.duration * 100) + '%'
          if (cur) cur.textContent = fmtTime(audio.currentTime)
        })
        audio.addEventListener('loadedmetadata', () => {
          const total = root.querySelector('.music-player__total')
          if (total) total.textContent = fmtTime(audio.duration)
        })
        return root
      }
      // 播放中态同步到 UI：播放键图标 ⏸/▶（SVG）
      const syncPlayIcon = () => {
        const root = document.getElementById('music-modal')
        if (!root) return
        const audio = root.querySelector('.music-modal__audio')
        const btn = root.querySelector('[data-act="toggle"]')
        if (btn) btn.innerHTML = audio && !audio.paused ? ICONS.pause : ICONS.play
      }
      // 把当前曲目（或空态）刷进卡片：标题 / 圆形封面 / 艺术家列表
      const renderCard = () => {
        const root = document.getElementById('music-modal')
        if (!root) return
        const player = root.querySelector('.music-modal__player')
        const empty = root.querySelector('.music-modal__empty')
        const title = root.querySelector('.music-modal__title')
        if (!MUSIC_LIST.length) {
          if (player) player.hidden = true
          if (title) title.textContent = '音乐'
          if (empty) {
            empty.hidden = false
            empty.innerHTML = '音乐还没上架 —— 把音频文件放进 <code>docs/assets/music/</code>、' +
              '圆形封面放进 <code>docs/assets/img_music/</code>，再到 <code>theme/index.js</code>' +
              ' 的 MUSIC_LIST 里登记一行，这里就会自动出现曲目。'
          }
          return
        }
        const m = MUSIC_LIST[Math.max(0, musicIndex)]
        if (empty) empty.hidden = true
        if (player) player.hidden = false
        if (title) title.textContent = m.title || m.src
        const img = root.querySelector('.music-player__img')
        const cover = root.querySelector('.music-player__cover')
        if (img) {
          img.src = m.cover || ''
          img.alt = m.title || ''
        }
        if (cover) cover.hidden = !m.cover
        const artists = root.querySelector('.music-player__artists')
        if (artists) {
          const list = Array.isArray(m.artists) && m.artists.length
            ? m.artists
            : (m.artist ? [m.artist] : [])
          artists.innerHTML = ''
          artists.hidden = !list.length
          list.forEach((a) => {
            const d = document.createElement('div')
            d.className = 'music-player__artist'
            d.textContent = a
            artists.appendChild(d)
          })
        }
      }
      const playAt = (i) => {
        if (!MUSIC_LIST.length) return
        const root = ensureMusicModal()
        const audio = root.querySelector('.music-modal__audio')
        musicIndex = (i + MUSIC_LIST.length) % MUSIC_LIST.length
        audio.src = MUSIC_LIST[musicIndex].src
        renderCard()
        syncPlayIcon()
        // 浏览器可能以「无用户手势」拒播（例如跨页自动续播）→ 静默忽略，别抛未捕获异常
        const p = audio.play()
        if (p && typeof p.catch === 'function') p.catch(() => {})
      }
      const togglePlay = () => {
        const root = document.getElementById('music-modal')
        if (!root) return
        const audio = root.querySelector('.music-modal__audio')
        if (!audio.src) { playAt(0); return }
        if (audio.paused) {
          const p = audio.play()
          if (p && typeof p.catch === 'function') p.catch(() => {})
        } else {
          audio.pause()
        }
      }
      const openMusicModal = () => {
        const root = ensureMusicModal()
        renderCard()
        // 「在上方栏下面弹出」：面板钉在导航栏正下方（CSS top），横向锚在「音乐」按钮
        // 正下方（下拉卡片）；按钮不在（<960px 藏进抽屉）时退化为水平居中。
        const panel = root.querySelector('.music-modal__panel')
        const btn = document.querySelector('.VPNavBar .music-nav-btn')
        if (panel) {
          if (btn && btn.offsetWidth > 0) {
            const r = btn.getBoundingClientRect()
            const w = panel.offsetWidth || 360
            const left = Math.min(Math.max(12, r.right - w), window.innerWidth - w - 12)
            panel.style.left = left + 'px'
            panel.style.transform = 'none'
          } else {
            panel.style.left = '50%'
            panel.style.transform = 'translateX(-50%)'
          }
        }
        root.classList.add('is-open')
        root.setAttribute('aria-hidden', 'false')
        document.documentElement.classList.add('music-modal-open')
        if (AUTOPLAY_ON_OPEN && MUSIC_LIST.length && musicIndex < 0) playAt(0)
        const closeBtn = root.querySelector('.music-modal__close')
        if (closeBtn) closeBtn.focus()
      }
      const closeMusicModal = () => {
        const root = document.getElementById('music-modal')
        if (!root || !root.classList.contains('is-open')) return
        root.classList.remove('is-open')
        document.documentElement.classList.remove('music-modal-open')
        root.setAttribute('aria-hidden', 'true')
        // ⚠️ 故意不 pause()：关弹窗 = 收起面板，音乐继续放（BGM 设定）
      }
      // 点击委托：顶栏「音乐」按钮 → 开弹窗；弹窗内 → × / 遮罩 / 播放控制 / 进度条
      window.addEventListener('click', (e) => {
        if (!(e.target instanceof Element)) return
        if (e.target.closest('.music-nav-btn')) { openMusicModal(); return }
        const root = e.target.closest('.music-modal')
        if (!root || !root.classList.contains('is-open')) return
        if (e.target.closest('.music-modal__close') || e.target.closest('.music-modal__backdrop')) {
          closeMusicModal()
          return
        }
        const actBtn = e.target.closest('[data-act]')
        if (actBtn) {
          const act = actBtn.dataset.act
          if (act === 'toggle') togglePlay()
          else if (act === 'prev') playAt(musicIndex - 1)
          else if (act === 'next') playAt(musicIndex + 1)
          else if (act === 'mute') {
            const audio = root.querySelector('.music-modal__audio')
            const volBtn = root.querySelector('[data-act="mute"]')
            audio.muted = !audio.muted
            if (volBtn) volBtn.innerHTML = audio.muted ? ICONS.muted : ICONS.vol
          }
          return
        }
        const bar = e.target.closest('.music-player__bar')
        if (bar) {
          const audio = root.querySelector('.music-modal__audio')
          if (!audio.duration) return
          const rect = bar.getBoundingClientRect()
          const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
          audio.currentTime = ratio * audio.duration
        }
      })
      // 音量条（input 事件实时跟手；往上拖时若处于静音则自动取消静音）
      window.addEventListener('input', (e) => {
        if (!(e.target instanceof Element) || !e.target.classList.contains('music-player__vol')) return
        const root = document.getElementById('music-modal')
        if (!root) return
        const audio = root.querySelector('.music-modal__audio')
        const v = Number(e.target.value)
        audio.volume = v
        if (v > 0 && audio.muted) {
          audio.muted = false
          const volBtn = root.querySelector('[data-act="mute"]')
          if (volBtn) volBtn.innerHTML = ICONS.vol
        }
      })
      // Esc 关闭（弹窗没开时是空操作）
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMusicModal()
      })
      // 换页：弹窗强制关（音乐继续放，跨页不中断）
      if (router) {
        const prevAfterMusic = router.onAfterRouteChange
        router.onAfterRouteChange = async (href) => {
          if (typeof prevAfterMusic === 'function') await prevAfterMusic(href)
          closeMusicModal()
        }
      }
    }
  }
}
