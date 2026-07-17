---
outline: deep
---

# Markdown个人学习小记

## Markdown介绍

Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档。使用Markdown 编写的文档可以轻松地导出为 HTML、Word、图像、PDF、Epub 等多种格式的文档。当前许多网站都支持使用 Markdown 来撰写文档或者发表文章。例如：GitHub、简书、StackOverflow、有道云笔记等等。（来自bilibili@请叫我AXin）

## Markdown编辑

既然是语言，那就会有相应的编辑器，例如Typora、VSCode等等。我使用的方法是VitePress+Node.js+npm本地实时预览，就暂时不用下载其他东西了。

使用Markdown语法，可以直接新建文本文档，更改后缀名为`.md`，右键使用记事本编辑

> 注意：我们打开之后要将下方的`已编排格式`切换为`Markdown语法`，否则不会生效

### markdown基础用法

<br>

##### 标题

```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
```

<br>

##### 引用

> https://www.bilibili.com/video/BV1JA411h7Gw/?spm_id_from=333.337.search-card.all.click&vd_source=1db826af20ac643dce96190fd8c9f0e3

```
> https://www.bilibili.com/video/BV1JA411h7Gw/?spm_id_from=333.337.search-card.all.click&vd_source=1db826af20ac643dce96190fd8c9f0e3 bilibili net
```

<br>

##### 有序列表：

把大象关进冰箱需要3步：
1. 打开冰箱
2. 把大象放进冰箱
3. 关上冰箱

```
把大象关进冰箱需要3步：
1. 打开冰箱
2. 把大象放进冰箱
3. 关上冰箱
```

<br>

##### 无序列表：

把大象关进冰箱需要3步：
- 打开冰箱
- 把大象放进冰箱
- 关上冰箱

```
把大象关进冰箱需要3步：
- 打开冰箱
- 把大象放进冰箱
- 关上冰箱
```

<br>

##### 任务列表

今天学习任务列表:
- [ ] 任务A
- [x] 任务B

```
今天学习任务列表:
- [ ] 任务A
- [x] 任务B

这里输出有点问题
```

<br>

##### 代码块

```c
int main(){
	return 0;
}
```

```
3个`c
int main(){
	return 0;
}
3个`
```

<br>

##### 数学公式

$$
\frac{\partial f}{\partial x} = 2\sqrt{a}x
$$

```
$$
\frac{\partial f}{\partial x} = 2\sqrt{a}x
$$

这里输出有点问题
```

<br>

##### 行内数学公式

$\theta=x^2$

```
$\theta=x^2$

这里输出有点问题
```

<br>

##### 表格

|姓名|年龄|成绩|
|:---|---:|:---:|
|张三|19|19|
|李四|19|19|

```
|姓名|年龄|成绩|
|:---|---:|:---:|
|张三|19|19|
|李四|19|19|
```

<br>

##### 脚注

一键三连[^三连]

[^三连]: 点赞，投币，收藏。

```
一键三连[^三连]

[^三连]: 点赞，投币，收藏。

这里输出有点问题，点了会跳404
```

<br>

##### 横线

---

```
---
```

<br>

##### 斜体、加粗、下划线

*斜体*

这个是未加粗
**这个是加粗**

<u>下划线</u>

```
*斜体*

这个是未加粗
**这个是加粗**

<u>下划线</u>
```

<br>

##### 链接

[百度](baidu.com "一个垃圾的搜索引擎")

```
[百度](baidu.com "一个垃圾的搜索引擎")

这里输出有点问题，点了会跳404
```

<br>

##### 引用链接

[百度][id]

[id]: baidu.com "一个垃圾的搜索引擎"

[谷歌][2]

[2]: Google.com "一个还可以的搜索引擎"

```
[百度][id]

[id]: baidu.com "一个垃圾的搜索引擎"

[谷歌][2]

[2]: Google.com "一个还可以的搜索引擎"

这里输出有点问题，点了会跳404
```

<br>

##### 链接设置到标题

请参考[标题](#链接设置到标题)

```
请参考[标题](#链接设置到标题)
```

<br>

##### URL

http://www.baidu.com

```
http://www.baidu.com
```

<br>

##### 图片

![百度](https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png "百度搜索")

如果是本地地址那么可以写**本地图片的相对地址或者绝对地址**

![本地图片](c:\Users\Public\Pictures\Sample Pictures\八仙花.jpg "百度搜索")

**本地地址未成功**

```
![百度](https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png "百度搜索")

如果是本地地址那么可以写**本地图片的相对地址或者绝对地址**

![本地图片](c:\Users\Public\Pictures\Sample Pictures\八仙花.jpg "百度搜索")

**本地地址未成功**
```

<br>

##### 行内代码

`printf()`

```
`printf()`
```

<br>

##### 标准的表情符号

:smile:

```
:smile:
```

emoji国际通用表情包代码链接：

> https://unicode.org/emoji/charts/full-emoji-list.html

<br>

##### 下标、上标

H~2~O

X^2^

```
H~2~O

X^2^
```

<br>

##### 高亮文字

==这是一段高亮文字==

```
==这是一段高亮文字==
```

<br>

### markdown进阶用法

<br>

##### outline

```
---
outline: deep
---

---包裹的是页面独立配置（前置元数据），---以外的内容，才是通用Markdown
outline: deep：页面右侧目录（大纲）显示深层级标题
默认只会展示二级标题##，设为deep后###、####三级四级标题也会显示在侧边目录里。
```

##### layout home

```
---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
hero:
  name: "大标题"
  text: "副标题小字"
  tagline: 标语
  actions: # 横幅下方按钮组
    - theme: brand # 主色按钮
      text: Markdown Examples # 按钮文字
      link: /markdown-examples # 点击跳转路径
    - theme: alt # 次要按钮
      text: API Examples
      link: /api-examples
features:  # 页面下方功能卡片列表
  - title: Feature A  # 卡片标题
    details: 卡片描述文字
---
```

> 第一行井号后的链接是VitePress官网里面的HomePage，注释的是参考

> 删掉layout: home后页面就不会显示首页横幅，会变成普通文档页面

> index.md本质是Markdown文件，但顶部---包裹的区块是VitePress专属的Frontmatter（页头配置），不属于标准 Markdown。VitePress/VuePress/Hexo这类静态博客工具，都会在md文件顶部加Frontmatter（YAML/TOML），用来给页面加自定义参数，属于工具扩展语法，只有---以外的内容，才是通用Markdown。

::: tip
简单区分

--- 内部：YAML配置

--- 外部：标准Markdown
:::

##### 完全自定义首页Vue布局

> VitePress支持直接在index.md里写完整Vue模板，关闭默认首页布局，用纯Vue+CSS写整个仪表盘页面，不用修改.vitepress/theme主题文件。

1. 修改根目录index.md的Frontmatter，禁用默认home布局

```
---
# 关闭系统自带首页布局，空白布局让我们自己写全屏页面
layout: false
---
```

2. 使用Vue编辑

<br>

### 关于格式问题

在记事本中编辑：前缀`#`与后面的文本之间要加一个半角空格，两侧都加的例如`**文本**`就不需要空格

一般来说各种符号的上方都要空出一行换行，下方一般不需要

YAML缩进：空格、-不能乱，缩进用2个空格，不要用Tab，否则页面会报错。

## Markdown其他

details: Lorem ipsum dolor sit amet, consectetur adipiscing elit是VitePress模板自带的示例占位描述，是无实义填充文本。

使用VSCode预览：安装Markdown Preview Enhanced插件，然后再右键文件提示的命令面板中，输入Markdown: Open Preview to the Side，然后有提示：打开MarkDown侧边预览即可。（但是无法同步图片）

Markdown采用纯文本，所以可以实现无缝跨平台迁移，同时，md基本上不需要鼠标和触控板来进行文字编辑，这种交互模式对程序员很友好。

markdown文件可以运行HTML和CSS代码。
