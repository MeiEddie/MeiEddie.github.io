---
outline: deep
---

# HTML+CSS+JS+Vue学习小记

## 参考课程

https://www.bilibili.com/video/BV1oz421q7BB?spm_id_from=333.788.videopod.episodes&vd_source=c5b001da49827c95685ff66b3392ffc9

（来自bilibili@尚学堂资料助手）

## HTML

### HTML编辑

运行HTML只需要浏览器+编辑器，当然记事本也算纯文本编辑器。不过下载专用编辑器可以提升学习效率，课程使用的是VSCode。

VSCode官网链接：

https://code.visualstudio.com/

**VSCode中文语言包**

扩展（菜单栏最下方四个方框的图标）→搜索Chinese→安装，重新打开就是中文了

> 为什么不考虑锻炼一下英语呢

### HTML课程学习

### 第一个HTML程序

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

### VSCode快捷键

Shift+Alt+F：代码格式化

Slt+向上或向下：快速移动代码

Shift+Alt+向上或向下：复制+移动代码

Ctrl+S：快速保存

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    !+回车快捷生成网页
</body>

</html>
```

### HTML5简介与基础框架

<br>

##### 简介

HTML5是用来描述网页的一种语言，被称为超文本标记语言。HTML是一种标记语言，标记语言是一套标记标签。

标签是由尖括号包围的关键字，有两种表现形式：

1. 双标签，例：`<html></html>`
2. 单标签，例：`<img>`

**HTML5的DOCTYPE声明

DOCTYPE是document type（文档类型）的缩写。`<!DOCTYPE html>`是H5的声明，位于文档最前面，处于标签之前，是网页必备的组成部分，避免浏览器怪异模式。

##### HTML5基本骨架

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

### 标题标签

<br>

##### 标题

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

##### 正确使用

确保HTML标题标签只用于标题，不要仅仅是为了生成粗体或大号文本而使用标题。样式应使用CSS。

> 正确使用标题有益于SEO

##### 标题标签位置摆放

> align属性HTML5不支持，HTML4.01已废弃。应使用CSS确定标题位置（来自005课程弹幕）

>不过其实它本身也不推荐这样写（编辑器会标红）

### 段落、换行、水平线标签

<br>

##### 段落

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

##### 换行

`<br>`

较规范写法：`<br/>`

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

##### 水平线

`<hr/>`

同样放在body里面，就不演示了

调整样式：`<hr color="" width="" size=""/>`

1. color：水平线颜色
2. width：水平线宽度
3. size：水平线高度

课程中还有align，应该不能使用，也不推荐（标红了）

### 图片标签

`<img>`标签定义HTML页面中的图像

```html
<img src="" alt="" title="" width="" height="">
```

**src**：路径（图片地址与名字）

**alt**：规定图像的替代文字（没找到路径时可以显示）

**width**：规定图像的宽度

**height**：规定图像的高度

**title**：鼠标悬停在图片上给予提示

::: tip
width和height的单位都是px，例如`width="300px"`

一般来说，为了保持图片的比例，我们不使用height
:::

### 图片路径

<br>

##### 绝对路径

从盘符开始，到图片结束

##### 相对路径

子级关系：`/`

父级关系：`../`

同级关系：`./`（可以省略）

> 浏览器安全限制，不能加载本地路径（来自弹幕）

> 捣鼓半天发现，绝对路径图片可以，直接打开html文件可以显示，在调试器中打开不显示（来自弹幕）

##### 网络路径

网络服务器的图片

> 直接网络访问会产生跨域问题（来自弹幕）

### 超文本链接标签

HTML使用标签`<a>`来设置超文本链接

超链接可以是一个字、一个词、一句话、一幅图像，点击可以跳转到新的文档或当前文档的某个部分

```html
<a href="url">链接文本</a>
```

> 要写完整的url，就是从http开始

###### 超链接属性

在标签`<a>`中使用了`href`属性来描述链接的地址

默认情况下，链接将以以下形式出现在浏览器中：

1. 一个未访问过的链接显示为蓝色字体并带有下划线。

2. 访问过的链接显示为紫色并带有下划线。

3. 点击链接时，链接显示为红色并带有下划线。

::: tip
这三种状态对应CSS伪类：

`:link`未访问链接（蓝色）

`:visited`已访问链接（紫色）

`:active`激活点击瞬间（红色）

还有常用的`:hover`鼠标悬浮状态。
:::

```html
<body>
    <a href="">链接文本</a>

    <a href="">
        <img width="" src="" alt="">
    </a>
</body>
```

##### 超链接表现

当鼠标移动到网页的某个链接上时，箭头会变成一只小手

### 文本标签

<br>

##### 常用文本标签

|标签|描述|
|:---:|:---:|
|`<em>`|定义着重文字|
|`<b>`|定义粗体文本|
|`<i>`|定义斜体字|
|`<strong>`|定义加重语气|
|`<del>`|定义删除字|
|`<span>`|元素没有特定的含义|

::: tip
常用文本标签和段落是不同的，段落代表一段文本，而文本标签一般表示文本词汇
:::

> span没有效果，是为了之后的CSS编辑更方便

> Em定义着重文字（表示强调文本，用于改变句子的语气或重点。屏幕阅读器会通过语调变化（如重读）来传达这种强调（来自弹幕）

> I定义斜体字 表示与正常文本不同的文本，通常用于技术术语、外来词、小说标题、思想等。不传达强调，仅表示一种风格上的区别（来自弹幕）

### 有序列表

有序列表是一列项目，列表项目使用数字进行标记。有序列表始于`<ol>`标签。每个列表项始于`<li>`标签。

```html
<ol>
    <li>第一段文字</li>
    <li>第二段文字</li>
</ol>
```

::: tip
`<ol> = ordered list`有序列表

`<li> = list item`列表项
:::

##### type属性

`<ol>`的属性`type`拥有的选项

1表示列表项目用数字标号（1,2,3...）

a表示列表项目用小写字母标号（a,b,c...）

A表示列表项目用大写字母标号（A,B,C...）

i表示列表项目用小写罗马数字标号（i,ii,iii...）

I表示列表项目用大写罗马数字标号（I,II,III...）

##### 有序列表嵌套

列表是可以进行嵌套的，我们使用百级分段编码作为例子：

```html
<ol>
    <li>100</li>
    <li>200
        <ol>
            <li>210</li>
            <li>220</li>
        </ol>
    </li>
    <li>300</li>
</ol>
```

> 重点规则：嵌套的子列表`<ol>`必须写在父级`<li>`和`</li>`中间，不能直接放在外层`<ol>`下。

### 无序列表

```html
<ul>
    <li>第一段文字</li>
    <li>第二段文字</li>
</ul>
```

运行效果：

```
● 第一段文字
● 第二段文字
```

:::tip
`<ul>`unordered list无序列表

`<li>`list item列表项

默认标记就是小黑圆点，后面可以用CSS修改样式（方块、空心圆、去掉圆点等）。
:::

##### type属性

`<ul>`的属性`type`拥有的选项

disc默认实心圆

circle空心圆

square小方块

none不显示

##### 无序列表嵌套

```html
<ul>
    <li>100</li>
    <li>200
        <ul>
            <li>210</li>
            <li>220</li>
        </ul>
    </li>
    <li>300</li>
</ul>
```

最后的输出有默认格式

> 不设置样式默认嵌套就是实心空心方块方块的顺序来好像（来自弹幕）

##### 常见应用场景

1. 无序的列表效果
2. 导航效果

> 补充小知识点：网页里绝大多数导航栏底层都是用`<ul>`+`<li>`实现的，后续配合CSS去掉圆点、横向排列就做成导航菜单。

##### 快捷键

快速生成ul+li的布局：ul>li*3（数字根据自己的需要的li数量修改）

> ol也可以使用类似快捷键:ol>li*3（来自弹幕）

### 表格标签

表格：`<table>`

行：`<tr>`

单元格 (列)：`<td>`

示例：

```html
<table>
    <tr>
        <td>1</td>
        <td>2</td>
    </tr>
    <tr>
        <td>3</td>
        <td>4</td>
    </tr>
</table>
```

输出：

```
1 2
3 4
```

##### 快捷键

```
快速生成表格结构：table>tr* 行数 >td* 列数{单元格}
```

### 013

## CSS

## JavaScript

## Vue