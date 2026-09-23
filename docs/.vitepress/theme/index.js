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
    // ⚠️ 隐藏态**只**在枢纽页生效（CSS 那条规则带 :has(.Layout.article-hub-bg)），
    //   所以即便这里漏摘类，也不会影响首页 / 文章页。
    // ==========================================================================
    if (!window.__hubHideBound) {
      window.__hubHideBound = true
      const HIDDEN_CLASS = 'hub-hidden'
      // 按钮文案与无障碍属性（图标切换交给 CSS，见上面的类）
      const HIDE_TEXT = '隐藏'
      const SHOW_TEXT = '显示'
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

      // 离开枢纽页即复位（默认态就是"显示"，所以首屏初始化不用做事）
      if (router) {
        const prevAfterHub = router.onAfterRouteChange
        router.onAfterRouteChange = async (href) => {
          if (typeof prevAfterHub === 'function') await prevAfterHub(href)
          const reset = () => {
            if (hubIsHidden() && !document.querySelector('.Layout.article-hub-bg')) hubApply(false)
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
      // 背景此刻该不该铺 —— 口径与 style.css 的两个选择器逐条对齐：
      //   枢纽页：任何宽度都铺；文章正文页：只有 ≥960 铺（窄屏没有「大容器」托底）。
      const atHub = () => !!document.querySelector('.Layout.article-hub-bg')
      const bgWanted = () =>
        atHub() || (mqWide.matches && !!document.querySelector('.VPSidebar'))

      // 只做一件事：把"背景该不该铺"这个状态同步到 <html> 的 keep 类上。
      // ⚠️ 这里**不做任何"重播淡入"的动作**（三度定稿）：类只是把同一套声明多挂一份、
      //   用来盖住换页空档；要不要淡入由 CSS 的 `:has()` 选择器自己决定。
      //   背景已经在（类本来就在）时 classList.add 是空操作 → 动画名从头到尾没变过
      //   → 浏览器认定为"同一个动画"→ **不重播**。这正是"背景本来就在就别再淡"。
      const syncBgKeep = () => {
        if (bgWanted()) root.classList.add('article-bg-keep')
        else root.classList.remove('article-bg-keep')
      }

      // 视口跨 960 断点时重算（宽 → 窄停在文章页上必须撤掉背景，否则正文压在照片上读不了）
      const onWideChange = () => syncBgKeep()
      if (mqWide.addEventListener) mqWide.addEventListener('change', onWideChange)
      else if (mqWide.addListener) mqWide.addListener(onWideChange) // 老内核兜底

      if (router) {
        const prevAfterBg = router.onAfterRouteChange
        router.onAfterRouteChange = async (href) => {
          if (typeof prevAfterBg === 'function') await prevAfterBg(href)
          // 见上面 ⚠️⚠️：判定必须等这一帧 —— 这一刻 Vue 刚把新页面挂上，DOM 才是新页的
          if (typeof requestAnimationFrame === 'function') {
            requestAnimationFrame(syncBgKeep)
          } else {
            setTimeout(syncBgKeep, 16)
          }
        }
      }
    }
  }
}
