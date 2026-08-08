import{_ as s,o as n,c as e,a0 as p}from"./chunks/framework.jwovEGr5.js";const _=JSON.parse('{"title":"解决问题","description":"","frontmatter":{"outline":"deep"},"headers":[],"relativePath":"游戏制作/Godot/解决问题.md","filePath":"游戏制作/Godot/解决问题.md"}'),t={name:"游戏制作/Godot/解决问题.md"};function l(i,a,o,c,r,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="解决问题" tabindex="-1">解决问题 <a class="header-anchor" href="#解决问题" aria-label="Permalink to &quot;解决问题&quot;">​</a></h1><h2 id="遮挡" tabindex="-1">遮挡 <a class="header-anchor" href="#遮挡" aria-label="Permalink to &quot;遮挡&quot;">​</a></h2><p><strong>错误节点搭配</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Node2D</span></span>
<span class="line"><span>├─CanvasLayer</span></span>
<span class="line"><span>│  ├─ColorRect</span></span>
<span class="line"><span>│  └─Sprite2D</span></span>
<span class="line"><span>├    └─Area2D</span></span>
<span class="line"><span>├      └─CollisionShape2D</span></span>
<span class="line"><span>└─CanvasLayer</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>当有了ColorRect的时候，Area2D无法被判定，只有游戏启动时鼠标刚好放在碰撞区内才触发一次移入</p></div><p><strong>正确节点搭配</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Node2D</span></span>
<span class="line"><span>├─CanvasLayer</span></span>
<span class="line"><span>│  ├─TextureRect （或者删除该节点）</span></span>
<span class="line"><span>│  └─Sprite2D</span></span>
<span class="line"><span>├    └─Area2D</span></span>
<span class="line"><span>├      └─CollisionShape2D</span></span>
<span class="line"><span>└─CanvasLayer</span></span></code></pre></div>`,7)])])}const u=s(t,[["render",l]]);export{_ as __pageData,u as default};
