---
outline: deep
---

# HTML+CSS+JS+Vue学习小记

## 选择课程

https://www.bilibili.com/video/BV1oz421q7BB?spm_id_from=333.788.videopod.episodes&vd_source=c5b001da49827c95685ff66b3392ffc9

来自bilibili@尚学堂资料助手

以下的笔记就基本围绕此教学视频展开了

## HTML

### HTML编辑

运行HTML只需要浏览器+编辑器，当然记事本也算纯文本编辑器。不过下载专用编辑器可以提升学习效率，课程使用的是VSCode。

VSCode官网链接：

https://code.visualstudio.com/

**VSCode中文语言包**

扩展（菜单栏最下方四个方框的图标）→搜索Chinese→安装，重新打开就是中文了

> 为什么不考虑锻炼一下英语呢

### HTML课程学习

<br>

##### 第一个HTML程序

```html
<html>

<head>
    <title>一个网页标题</title>
</head>

<body>
    一段网页文字，不需要尖角号
</body>

</html>
```

1. 保证后缀为.html
2. 尖角号英文格式，斜杠放前面
3. 网页文字其实推荐用`<p></p>`标签，参考[段落、换行、水平线标签](#段落、换行、水平线标签)

<br>

##### VSCode快捷键

Shift+Alt+F：代码格式化

Slt+向上或向下：快速移动代码

Shift+Alt+向上或向下：复制+移动代码

Ctrl+S：快速保存

<br>

##### HTML5简介与基础框架

**简介**

HTML5是用来描述网页的一种语言，被称为超文本标记语言。HTML是一种标记语言，标记语言是一套标记标签。

标签是由尖括号包围的关键字，有两种表现形式：

1. 双标签，例：`<html></html>`
2. 单标签，例：`<img>`

**HTML5的DOCTYPE声明

DOCTYPE是document type（文档类型）的缩写。`<!DOCTYPE html>`是H5的声明，位于文档最前面，处于标签之前，是网页必备的组成部分，避免浏览器怪异模式。

**HTML5基本骨架**

html：定义HTML文档，限定开始、结束

head：定义文档头部。文档头部描述了文档的各种属性和信息

body：定义文档的主题，直接在页面中显示

title：定义文档标题，head必包含title，有利于SEO优化

meta：单标签，描述一个HTML网页文档的属性、关键词等。`charset="utf-8"`是说当前使用的是utf-8编码格式（utf-8或gbk都是编码格式，通常使用utf-8）。

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>网页名称</title>
</head>

<body>
    显示在浏览器中
</body>

</html>
```

> SEO是搜索引擎优化的英文缩写，实现网站排名。SEM是独立于SEO的（例：百度的广告）

::: tip
`<!DOCTYPE html>`不是基础骨架标签，而是声明
:::

<br>

##### 标题标签

标题（Heading）是通过`<h1>`-`<h6>`实现的，`<h1>`最大

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>标题测试</title>
</head>

<body>
    <h1>一级标题</h1>
    <h2>二级标题</h2>
    <h3>三级标题</h3>
    <h4>四级标题</h4>
    <h5>五级标题</h5>
    <h6>六级标题</h6>
</body>

</html>
```

**正确使用**

确保HTML标题标签只用于标题，不要仅仅是为了生成粗体或大号文本而使用标题。样式应使用CSS。

> 正确使用标题有益于SEO

**标题标签位置摆放**

> align属性HTML5不支持，HTML4.01已废弃。应使用CSS确定标题位置（来自005课程弹幕）

>不过其实它本身也不推荐这样写（编辑器会标红）

##### 段落、换行、水平线标签

**段落**

`<p></p>`

在HTML中，不推荐直接把文本放在最外层，不利于调整文本样式和结构，一定要通过标签承载（当然，效果是一样的）。

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>阿巴阿巴</title>
</head>

<body>
    <p>一个段落</p>
</body>

</html>
```

**换行**

`<br>`

较规范写法：`<br />`

后面的`/`表明换行结束

演示

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>阿巴阿巴</title>
</head>

<body>
    <p>这个<br>段落<br>演示了换行效果</p>
</body>

</html>
```

输出

```
这个
段落
演示了换行效果
```

**水平线**

`<hr/>`

同样放在body里面，就不演示了

调整样式：`<hr color="" width="" size=""/>`

1. color：水平线颜色
2. width：水平线宽度
3. size：水平线高度

课程中还有align，应该不能使用，也不推荐（标红了）

<br>

##### 下节课007

## CSS

## JavaScript

## Vue