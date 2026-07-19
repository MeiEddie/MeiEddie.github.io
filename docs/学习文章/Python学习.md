---
outline: deep
---

# Python学习小记

## 参考课程

https://www.bilibili.com/video/BV1rpWjevEip/?spm_id_from=333.337.search-card.all.click&vd_source=c5b001da49827c95685ff66b3392ffc9

（来自bilibili@Python官方课程）

## Python编辑

推荐使用Pycharm

懒人用记事本，然后去网页上找编译器

## Python课程学习

### 语法基础

<br>

##### Python简介

Python语言是一种`面向对象`的`解释型`高级编程语言

Python是`强类型`的`动态脚本语言`

> 编程语言：是用来定义计算机程序的语言，向计算机发出指令

##### 编译型语言和解释型语言

**解释型语言**

在运行时通过解释器逐行翻译并执行代码。（跨平台特性比较好）

**编译型语言**

在运行前通过编译器将源代码一次性翻译为机器码，生成可执行文件。（速度更快）

##### 第一个Python程序+注释

```python
print("hello world")

# 井号是单行注释
# 字符串要加上引号，单引号或双引号都可以

'''
三对引号包含的内容为多行注释
可以是单引号，也可以是双引号
'''

注释快捷键：Ctrl+/
```

##### Bug & Debug

1947年9月9日，Grace Hopper和她的团队在调试Mark II计算机时，发现了一只飞蛾卡在继电器中，导致计算机停止工作。于是他们将这只飞蛾贴在日志上，并写道：“在继电器中发现了一只bug。”从此，bug一词被广泛用于描述计算机系统中的错误。（来自知乎）

Grace Hopper也把排除故障程序的过程称为Debug

于是这种奇怪的称呼成为了后来计算机领域的专业行话

Debug：调试。可以通过Debug调试看到程序执行的顺序

断点调试：在断点位置处中断

设置断点：点击代码左侧数字

##### 输出函数

1. values：值，表示可以一次输出多个对象，用`,`分隔

2. sep：用来间隔多个对象，默认空格。

> 关键字参数必须跟随在位置参数后面（先写值，后加sep，放最后）

```python
print("first","second","third",sep='|')
```

输出

```
first|second|third
```

3. end：用来设定以什么结尾。默认值是`/n`换行符，我们可以换成其他字符串

演示

```python
print("first")
print("second")

print("first",end=',')
print("second")
```

输出

```
first
second
first,second
```

##### 变量与标识符

**变量**：只有在赋值以后才会被创建

演示

```python
# 变量名 = 值
# =是赋值运算符
num1 = 1
num2 = 2
total = num1 + num2
print(total)
```

输出

```
3
```

解释器在做什么：

1. 在内存中创建了一个`值`的数据
2. 创建了一个变量`变量名`，把数据保存到变量中

**标识符**：程序员定义的变量名和函数名

> 就是自定义的名称，也不能定义成关键字

> 关键字：Python中已经使用了的标识符，具有特殊功能和含义

**命名惯例**

见名知义、多单词下划线分割、大驼峰命名法（首字母大写）、小驼峰命名法（首字母第一个小写，后面大写）

##### 数值类型

int：整数，无大小限制。

float：浮点数，支持科学计数法。

complex：复数，形如a+bj。

> python使用j不是i是为了避免与工科中的电流单位i相混淆（来自课程弹幕）

> i、j均可，一般数学里面习惯用i，工科数学里边习惯用j（来自课程弹幕）

bool：布尔值，True（1）/False（0），是int子类，可参与数值运算。

> 严格区分大小写True/False

演示

```python
print(True + 1)
```

输出

```
2
```

##### 下节课

阿巴阿巴

##### 字符串编码与字符串常见操作

**字符串编码**

本质上是二进制与语言文字的一一对应关系

ASCII（英文）、GB2312（中文）、Unicode（国际统一）、GBK（繁体）、UTF-8（不定长编码，节省空间）

**字符串编码转换**

1. 编码：encode()

将其他编码的字符串转换成Unicode编码。

2. 解码：decode()

将Unicode编码转换成其他编码的字符串。

演示1

```python
a = 'hello'
print(a,type(a))  # str，字符串是以字符为单位进行处理
a1 = a.encode()  # 编码
print("编码后：",a1)
print(type(a1))  # bytes，以字节为单位进行处理的
a2 = a.decode()  # 解码
print(a2,type(a2))
```

输出1

```
<class 'bytes'>
b'hello' <class 'str'>
```

演示2

```python
st = "这里是六星教育"
st1 = st.encode("utf-8")
print(st1,type(st1))
st1 = st1.decode("utf-8")
print(st2,type(st2))
```

输出2

```
b'\xe8\xbf\x99\xe9\x87\x8c\xe6\x98\xaf\xe5\x85\xad\xe6\x98\x9f\xe6\x95\x99\xe8\x82\xb2' <class 'bytes'>
这里是六星教育 <class 'str'>
```

**字符串运算符**

a：Hello

b：Python

|操作符|描述|实例|
|:---:|:---:|:---:|
|+|字符串连接|a+b输出结果：HelloPython|
|*|重复输出字符串|a*2输出结果：HelloHello|
|[]|通过索引获取字符串中字符|a[1]输出结果e|
|[:]|截取字符串的一部分|a[1:4]输出结果ell|
|in|成员运算符-如果字符串中包含给定的字符返回True|'H' in a输出结果True|
|not in|成员运算符-如果字符串中不包含给定的字符返回True|'M' not in a输出结果True|
|r/R|原始字符串-所有的字符串都是直接按照字面的意思来使用，没有转义特殊或不能打印的字符。原始字符串除了在字符串的第一个引号前加上字母"r"（可以大小写）以外，与普通字符串有着几乎完全相同的语法|print r'\n' prints \n和print R'\n' prints \n|


### 语法进阶

<br>

### 练习题

<br>

### 网络爬虫

> 学爬虫，一定要先学HTML（来自课程弹幕）

##### 网络请求

https://www.baidu.com，是URL，统一资源定位符

**请求过程**

客户端（web浏览器）向服务器发送请求

1. 请求网址 -- request url
2. 请求方法 -- request methods
3. 请求头 -- request header
4. 请求体 -- request body

`F12`/`右键检查`查看请求响应

<br>