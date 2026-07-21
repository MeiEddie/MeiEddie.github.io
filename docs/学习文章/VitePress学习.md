---
outline: deep
---

# VitePress学习小记

## VitePress介绍

VitePress是一个由Vite和Vue驱动的静态网站生成器，旨在快速构建以内容为中心的网站。它可以将用Markdown编写的内容转换为优雅的文档，生成静态HTML页面，方便部署到任何地方。（官网）

## 我的探索

### 图片配置（出问题了）

简单演示

##### 单篇文章封面图（列表缩略/文章头部图）

自定义cover/image字段（主题读取这个变量渲染图片）

```markdown
---
title: Python成员运算符详解
date: 2026-07-21
# 简单写法
cover: /img/python-cover.jpg
# 完整对象写法（推荐，支持alt、样式）
image:
  src: /img/python-cover.jpg
  alt: Python代码截图
  style: "border-radius:8px;"
---
```

##### 首页Hero顶部大图（index.md首页专用）

```markdown
---
layout: home
hero:
  name: 我的技术博客
  text: 前端&Python笔记
  # 首页主图YAML配置
  image:
    src: /logo-blog.png
    alt: 博客logo
    # 明暗模式分开图片
    light: /logo-light.png
    dark: /logo-dark.png
---
```

##### 目录结构示例

```
你的博客项目根目录
├─ docs/
│  ├─ public/        # 静态资源根目录（关键）
│  │  └─ img/        # 专门存放文章图片
│  │     ├─ python-error.png
│  │     └─ blog-cover.jpg
│  ├─ articles/      # 你的文章md文件夹
│  │  └─ python语法.md
│  └─ index.md       # 首页
└─ package.json
```

##### 路径对应对照表

|本地文件真实位置|YAML/Markdown填写路径|
|:---:|:---:|
|docs/public/img/blog-cover.jpg|/img/blog-cover.jpg|
|docs/public/logo.png|/logo.png|
|docs/public/banner/post1.png|/banner/post1.png|

##### 一些疑问

**为什么要加public**

docs/public/是Vite约定的纯静态资源出口：

文件夹内的所有文件原封不动复制到打包后的网站根目录，不压缩、不改名、不加哈希；

访问时直接对应网站域名根路径/，不需要写public；

专门存放全局通用资源：封面图、logo、横幅、图标、下载文件。

##### 不知道为什么不能显示

## VitePress其他

VitePress支持直接在index.md里写完整Vue模板，关闭默认首页布局，用纯Vue+CSS写整个仪表盘页面，不用修改.vitepress/theme主题文件。

details: Lorem ipsum dolor sit amet, consectetur adipiscing elit是VitePress模板自带的示例占位描述，是无实义填充文本。