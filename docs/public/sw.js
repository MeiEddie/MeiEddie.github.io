// 离线小游戏 Service Worker（硬离线兜底）
// 把离线游戏页预缓存成 navigation fallback：断网打开博客时直接兜出游戏页（完整 dino 体验）。
const CACHE = 'offline-game-v1'
// 由 sw.js 自身位置推导站点基准路径（兼容子目录部署）：
//   /sw.js      → BASE = '/'
//   /sub/sw.js  → BASE = '/sub/'
const BASE = self.location.pathname.replace(/sw\.js$/, '')
const GAME = BASE + 'offline_game.html'

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE)
    // 离线游戏页是单个 HTML 文件（offline_game.html），直接预缓存该文件即可。
    // 单项失败不阻断整体（catch），保证 SW 仍能激活。
    await Promise.all([
      cache.add(new Request(GAME)).catch(() => {})
    ])
    // 无论预缓存成败都立即激活，避免 SW 卡在 installed 导致兜底永久失效
    await self.skipWaiting()
  })())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const req = event.request
  if (req.method !== 'GET') return
  // 仅对「页面导航」做离线兜底；其余请求（资源等）离线时自然失败，不拦截
  if (req.mode !== 'navigate') return
  event.respondWith((async () => {
    // —— Dino 式离线兜底 ——
    // 关键坑：导航请求的 fetch(req) 在离线时，部分浏览器会从 HTTP 缓存把「上一次访问的博客页」
    // 直接吐回来（200），导致 .catch() 永不触发、离线兜不出游戏页。
    // 解决办法：在线时正常走网络（no-store，避免博客被缓存）；离线时用「独立探针」二次确认——
    // 探针指向一个非导航小资源并强制 no-store，离线时网络必然失败，从而可靠兜出游戏页。
    const tryNetwork = () => fetch(req, { cache: 'no-store' })
    // 在线（SW 作用域感知到的）直接走网络，省去探针开销
    if (self.navigator.onLine) {
      try { return await tryNetwork() } catch (e) { /* 落到兜底 */ }
    }
    // 离线确认：探针探活（探针本身是非导航请求，不会被本处理器拦截，直达网络）
    let reachable = false
    try {
      await fetch(new Request(BASE + 'sw.js', { cache: 'no-store' }), { cache: 'no-store' })
      reachable = true
    } catch (e) { reachable = false }
    if (reachable) { try { return await tryNetwork() } catch (e) {} }
    // 真离线：返回缓存里的游戏页（按两个 key 依次查找）
    const cache = await caches.open(CACHE)
    return (await cache.match(new Request(GAME)))
      || new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
  })())
})
