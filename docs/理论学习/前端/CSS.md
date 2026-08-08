---
outline: deep
---

# CSS学习小记

## 学习参考

### 视频

https://www.bilibili.com/video/BV1oz421q7BB?spm_id_from=333.788.videopod.episodes&vd_source=c5b001da49827c95685ff66b3392ffc9

（来自bilibili@尚学堂资料助手）

### 其他

豆包ai


## CSS学习

### CSS简介

<br>

##### CSS概念

CSS（Cascading Style Sheets）层叠样式表，又叫级联样式表，简称样式表

CSS文件后缀名为 `.css`

CSS用于HTML文档中元素样式的定义

##### 为什么需要CSS

使用css的目的就是让网页具有美观一致的页面

##### 语法

CSS 规则由两个主要的部分构成：选择器，以及一条或多条声明

选择器通常是我们需要改变样式的HTML元素，每条声明由一个属性和一个值组成

属性（property）是我们希望设置的样式属性（style attribute）。每个属性有一个值，属性和值被冒号分开：

```html
<style>
    h1{
        color: blue;
        font-size: 12px;
    }
</style>
```

##### CSS引入HTML（其一）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        h3{
            color: red;
            font-size: 30px;
        }
    </style>
</head>
<body>
    <h3>标题内容</h3>
</body>
</html>
```

::: tip
这里的`h3{}`是选择器，选择要添加的元素h3

括号里的是声明（样式），要改变的内容

声明 = 属性 + 属性值
:::

> 后面会学class和id解决同一个标签不同样式的情况（弹幕）

### CSS的引入方式

<br>

##### 内联样式（行内样式）

要使用内联样式，你需要在相关的标签内使用样式（style）属性。Style属性可以包含任何CSS属性

> 问题：缺乏整体性和规划性，不利于维护，维护成本高。

```html
<p style="background: orange; font-size: 24px;">CSS</p>
```

##### 内部样式

当单个文档需要特殊的样式时，就应该使用内部样式表。你可以使用`<style>`标签在文档头部定义内部样式表

> 问题：单个页面内的 CSS 代码具有统一性和规划性，便于维护，但是在多个页面之间容易混乱

```html
<head>
    <style>
        h1 {
            background: red;
        }
    </style>
</head>
```

##### 外部样式（推荐）

当样式需要应用于很多页面时，外部样式表将是理想的选择。在使用外部样式表的情况下，我们可以通过改变一个文件来改变整个站点的外观。每个页面使用`<link>`标签链接到样式表。`<link>`标签在文档的头部（head），如下：

```html
<link rel="stylesheet" type="text/css" href="xxx.css">
```

### 选择器一

CSS语法规则由两个主要的部分构成：选择器，以及一条或多条声明（样式）

##### 全局选择器

可以与任何元素匹配，优先级最低，一般做样式初始化

```css
*{
    margin: 0;
    padding: 0;
}
```

##### 元素选择器

HTML文档中的元素，p、b、div、a、img、body等。

标签选择器，选择的是页面上所有这种类型的标签，所以经常描述“共性”，无法描述某一个元素的“个性”。

```css
p{
    font-size:14px;
}
```

再比如说，我想让“学完前端，继续学Java”这句话中的“前端”两个变为红色字体，那么我可以用`<span>`标签把“前端”这两个字围起来，然后给`<span>`标签加一个标签选择器。

```html
<p>学完了<span>前端</span>，继续学Java</p>
```

```css
span{
    color: red;
}
```

**温馨提示**

1. 所有的标签，都可以是选择器。比如ul、li、label、dt、dl、input、div等
2. 无论这个标签藏的多深，一定能够被选择上
3. 选择的所有，而不是一个

##### 类选择器

规定用圆点`.`来定义，针对你想要的所有标签使用。优点：灵活

```html
<h2 class="oneclass">你好</h2>
```

```css
/*定义类选择器*/
.oneclass{
    width:800px;
}
```

**class属性的特点**

1. 类选择器可以被多种标签使用
2. 类名不能以数字开头
3. 同一个标签可以使用多个类选择器，只能写一个class属性，用空格隔开

```html
<h3 class="classone classtwo">我是一个h3啊</h3>

<h3 class="teshu" class="zhongyao">我是一个h3啊</h3>  /// 错误
```

### 022下节课