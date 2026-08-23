---
outline: deep
---

# VitePress学习小记

## VitePress介绍

VitePress是一个由Vite和Vue驱动的静态网站生成器，旨在快速构建以内容为中心的网站。它可以将用Markdown编写的内容转换为优雅的文档，生成静态HTML页面，方便部署到任何地方。（官网）

## 我的探索

### 跳转页面

有时，我们希望能够用户点击跳转时，可以新打开一个页面而不会覆盖原来的页面

**原生语法：**

```markdown
[展示名称](./name){target="_blank"}
```

但是当我们同级未加`.`或加了后缀`.md`时，跳转会失败：

```markdown
[展示名称](/name){target="_blank"}

[展示名称](./name.md){target="_blank"}
```

**Markdown支持HTML语法，如下：**

```markdown
<a href="./name" target="_blank" rel="noopener noreferrer">展示名称</a>
```

同理：同级未加`.`或加了后缀`.md`时，跳转会失败：

```markdown
<a href="/name" target="_blank" rel="noopener noreferrer">展示名称</a>

<a href="./name.md" target="_blank" rel="noopener noreferrer">展示名称</a>
```

### 首页hero添加image的问题

在Vitepress加Github托管的静态模式下，包含`index.md`文件。

其中的`YAML`语法`hero`中的部分，应该是可以通过`image`为首页添加图片。

此时出现问题：本地测试正常，而托管到Github之上后无法找到图片路径

##### 不是图片名称原因

经测试，所在路径包括自己名称本身都为英文的图片，也无法正常显示

##### 应该不是哈希的原因

**有关public文件夹的方法**

public核心特性：

1. 完全不经过Vite/Rollup编译处理

文件原样复制到打包输出dist根目录，不会压缩、不会加hash后缀、不会base64内联。

> 哪怕 md 里完全没有引用这个文件，打包依然会复制过去。

2. 访问路径：必须用根绝对路径`/`

`public/logo.png`→md/vue中写`/logo.png`访问

经尝试，public文件夹并没有解决问题

**避免哈希**

有可能只有public文件夹避免了编译处理，其子文件夹并没有

我们将图片直接放入public文件夹，发现问题也并没有解决

##### 测试过程以及猜想

点开开F12开发者工具中的网络选项，刷新页面观察，该文件出现了报错404

格式`text/html`不是指图片文件的格式，而是指404页面的格式

报错说明网页根本没有找到我们在首页`image`中放置的图片

回看Github仓库，路径中含有我们需要的图片，但是在发现在dist中没有该图片

> 查看方法：在Actions中，点击你的deploy，其中展开的操作里面有可以下载，完成之后是一个压缩包zip，里面还有一个压缩包rar，解压缩完毕之后可以查看到，我们需要的照片并没有被读取

Github根本没有读取，这就相当奇怪

在本地进行测试的时候，所有路径都是直接进行读取的，因此首页图片可以正常显示；而托管之后图片路径缺失，因此无法正常显示

##### 其他实现方法

或许我们可以用普通引用图片+CSS的方法解决

### `.md`添加图片

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

##### 添加图片

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