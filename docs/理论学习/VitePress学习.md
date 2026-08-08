---
outline: deep
---

# VitePress学习小记

## VitePress介绍

VitePress是一个由Vite和Vue驱动的静态网站生成器，旨在快速构建以内容为中心的网站。它可以将用Markdown编写的内容转换为优雅的文档，生成静态HTML页面，方便部署到任何地方。（官网）

## 我的探索

### 添加图片

> 相对路径方法

##### 文件夹管理

文件越做越多，因此我们需要管理我们的图片文件夹，以防越来越乱

示例：在你的`docs`文件夹内部添加`img`文件夹（代表图片）

此时你的目录结构参考如下

```
项目根目录
├─ docs/
│  ├─ img/        # 专门存放文章图片
│  │  ├─ 1.png
│  │  └─ 2.jpg
│  ├─ articles/      # 你的文章md文件夹
│  │  └─ 1.md
│  └─ index.md       # 首页
└─ package.json
```

##### `.md`添加图片

复习：Markdown的图片添加为`![图片替代文字](路径)`

路径规则和HTML是一样的，`../`代表父级，`./`代表同级，`/`代表子级

根据当前`.md`文件位置反推图片位置即可

我们只需要先“到达”共同文件夹，然后一级一级往下找到我们的图片文件

以上文为例，`1.md`文件内添加`1.png`文件

1. 我们知道他们的共同文件夹是`docs`，所以先用`../`从`1.md`所在文件夹`articles`进入`docs`

2. 下一级文件`img`，再下一级为`1.png`

所以我们的路径就有了：`../img/1.png`

### 图片格式设置

MarkDown语法本身不支持图片格式的设置，但是在VitePress当中是可以进行修改的

原生样式：`![图片替代文字](路径)`

我们在后方添加`{}`，内部加上我们需要的格式

例如：`![图片替代文字](路径){width=400px}`，这样就设置了图片的宽度

> 暂时只发现了width的用法，连height都用不了

## VitePress其他

VitePress支持直接在index.md里写完整Vue模板，关闭默认首页布局，用纯Vue+CSS写整个仪表盘页面，不用修改.vitepress/theme主题文件。

details: Lorem ipsum dolor sit amet, consectetur adipiscing elit是VitePress模板自带的示例占位描述，是无实义填充文本。