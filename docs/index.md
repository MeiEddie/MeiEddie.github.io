---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Eddieの小窝"
  text: "欢迎~"
  tagline: 分享零基础可落地的实操教程，记录踩坑经验、工具配置与学习心得。愿每一篇文章都能帮同样入门的开发者少走弯路。（最近同步：2026.8.31）
  image:
    src: ./avatar.jpg
    alt: "头像"
  actions:
    - theme: brand
      text: 简介
      link: ./简介
    - theme: brand
      text: 概念学习
      link: ./概念学习/简介
    - theme: brand
      text: 理论学习
      link: ./理论学习/简介
    - theme: brand
      text: 电脑知识
      link: ./电脑知识/简介
    - theme: brand
      text: leetcode
      link: ./leetcode/leetcode介绍
    - theme: alt
      text: 游戏制作
      link: ./游戏制作/简介
    - theme: alt
      text: 梗图
      link: ./梗图/我的梗图
    - theme: alt
      text: 数独文章
      link: ./数独文章/数独介绍

features:
  - title: 正在进行
    details: ai、CSS、Python
  - title: 未来目标：
    details: JS、Vue，更改首页布局、网络碎片信息
  - title: 期待加入的模块
    details: 逻辑学
---

<br>

<ClientOnly>
<div style="text-align:left;margin:1rem 0;">
  <button id="zsuBtn" @click="goZSU" class="custom-vp-alt-btn">中山大学</button>
</div>
</ClientOnly>

<script setup>
function goZSU(){
  const pwd = prompt("请输入访问密码");
  if(pwd === "123"){
    location.href="./中山大学/目录";
  }else{
    alert("密码错误");
  }
}
</script>

<style>
.custom-vp-alt-btn {
  padding: 0 2rem;
  height: 4rem;
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;

  border: 1px solid var(--vp-button-alt-border);
  color: var(--vp-button-alt-text);
  background-color: var(--vp-button-alt-bg);
}
.custom-vp-alt-btn:hover {
  border-color: var(--vp-button-alt-hover-border);
  color: var(--vp-button-alt-hover-text);
  background-color: var(--vp-button-alt-hover-bg);
}
.custom-vp-alt-btn:active {
  border-color: var(--vp-button-alt-active-border);
  color: var(--vp-button-alt-active-text);
  background-color: var(--vp-button-alt-active-bg);
}
</style>

<br>

---

这里是便捷的个人游戏通道，欢迎来体验、游玩：

<br>

**MonsterValley（怪兽谷）** 跑酷 Godot作品

https://meieddie.github.io/MonsterValley/

最近更新：2026.8.16

<br>

**TheLastMemory（最后的记忆）** 剧情向 Godot作品

https://meieddie.github.io/TheLastMemory/

最近更新：2026.6.11

<br>

**Puzzle（迷宫）** 迷宫 RPGmaker作品

https://meieddie.github.io/Puzzle/

最近更新：2026.8.10

<br>

**修仙·问道长生** 文字修仙 原生VanillaJS作品

https://meieddie.github.io/XiuXian/

最近更新：2026.8.31

<br>

**占领蚂蚁窝** 益智 微信小程序

![占领蚂蚁窝](/assets/img/小程序码.png){width=400px}

最近更新：2026.8.28

```
新版本无法显示：
1. 删除原来的旧版本，重新打开
2. 小程序审核可能需要几天时间
```

<br>

**以上游戏可能会不定期更新**

**有任何问题可以在“简介/本站建设/联系”咨询**

<style>
.VPHome .VPHero .VPImage.image-src {
  border-radius: 35%;
  overflow: hidden;
  -webkit-mask-image: radial-gradient(circle, #000 70%, transparent 100%);
  mask-image: radial-gradient(circle, #000 70%, transparent 100%);
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}
.VPHome .VPHero .actions {
  display: grid !important;
  grid-template-columns: 1fr 1fr!important;
  gap: clamp(8px, 2vw, 18px) !important;
  margin: 2rem 8vw 0 auto !important;
  padding: 0 clamp(6px, 4vw, 24px) !important;
  box-sizing: border-box;
  max-width: 600px;
}
.VPHome .VPHero .actions .VPButton {
  width:100% !important;
  aspect-ratio: 3/1 !important;
  border-radius: 12px !important;
  box-sizing: border-box;
  min-width:130px;
  font-size: clamp(14px, 3vw, 24px) !important;
  font-weight: 500 !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  line-height: 1 !important;
}
@media (max-width: 480px) {
  .VPHome .VPHero .actions {
    gap:8px !important;
    padding:0 8px !important;
    margin: 2rem 4vw 0 auto !important;
  }
  .VPHome .VPHero .actions .VPButton {
    min-width:110px;
    border-radius:10px !important;
  }
}
</style>