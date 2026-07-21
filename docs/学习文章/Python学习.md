---
outline: deep
---

# Python学习小记

## 参考课程

https://www.bilibili.com/video/BV1rpWjevEip/?spm_id_from=333.337.search-card.all.click&vd_source=c5b001da49827c95685ff66b3392ffc9

（来自bilibili@Python官方课程）

## Python编辑

推荐使用Pycharm（要收费，试用30天）

官方下载链接：

https://www.jetbrains.com/zh-cn/pycharm/download/download-thanks.html?platform=windows

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

##### 数值类型、字符串与格式化输出

**int**：整数，无大小限制。

**float**：浮点数，支持科学计数法。

**complex**：复数，形如a+bj。

> python使用j不是i是为了避免与工科中的电流单位i相混淆（来自课程弹幕）

> i、j均可，一般数学里面习惯用i，工科数学里边习惯用j（来自课程弹幕）

演示

```python
print(type(1+2j))

m1 = 1 + 1j
m2 = 2 + 2j
m3 = 1 - 1j
print(m1 + m2)
print(m1 + m3)
print(m1 - m3)

print(type(m1 + m3))
print(type(m1 - m3))
```

输出

```
<class 'complex'>
(3+3j)
(2+0j)
2j
<class 'complex'>
<class 'complex'>
```

> 我们能看到复数的虚部一定要写出来

**bool**：布尔值，True（1）/False（0），是int子类，可参与数值运算。

> 严格区分大小写True/False

演示

```python
print(True + 1)
```

输出

```
2
```

**string**：字符串

演示

```python
name = """I
love
coding"""
print(name)
```

输出

```
I
love
coding
```

**格式化输出**

占位符：占位的符号。占位符可以生成一定格式的字符串

占位符的三种方式

1. %
2. format()
3. 格式化f

%格式化输出：

|符号|描述|
|:---:|:---:|
|%c|格式化字符及其ASCII码|
|%s|格式化字符串|
|%d|格式化整数|
|%u|格式化无符号整型|
|%o|格式化无符号八进制数|
|%x|格式化无符号十六进制数|
|%X|格式化无符号十六进制数（大写）|
|%f|格式化浮点数字，可指定小数点后的精度|
|%e|用科学计数法格式化浮点数|
|%E|作用同%e，用科学计数法格式化浮点数|
|%g|%f和%e的简写|
|%G|%F和%E的简写|
|%p|用十六进制数格式化变量的地址|

演示

```python
name = "EDDIE"
print("我的名字：%s" %name)
# %d 整数
age = 18
print("我的名字：%s，我的年龄：%d" %(name, age))
# %4d
a = 123
print('%6d' %a)
print('%06d' %a)
print('%16d' %a)
print('%016d' %a)
print('%3d' %a)
print('%2d' %a)
# $f 浮点数
n1 = 1.23
n2 = 1.2345678
print('%f' %n1)  # 默认小数点后6位，遵循四舍五入
print('%f' %n2)
# %.4f 定义精确度
print('%.3f' %n2)
# %%
print('氧气在空气的体积占比约为21%%' %())
print("%d%%" %1)
# 格式化f
print(f"我的名字是{name}，我今年{age}岁了")
```

输出

```
我的名字：EDDIE
我的名字：EDDIE，我的年龄：18
   123
000123
             123
0000000000000123
123
123
1.230000
1.234568
1.235
氧气在空气的体积占比约为21%
1%
我的名字是EDDIE，我今年18岁了
```

> 要在字符串中显示%，必须用%%转义（否则会被解析为占位符，导致错误）（来自视频弹幕）

> 可以换成"%d%%"%x的形式，但是"%d%%" %x这个x只能是数字整数（来自视频弹幕）

##### 算数与赋值运算符

**算数运算符**

加减乘除：略

|运算符|描述|
|:---:|:---:|
|//|取整数|
|%|取余数|
|**|幂|

> 算数运算符若有浮点数，结果也会用浮点数表示

**优先级**

括号T0，幂T1，剩下的自己试

**赋值运算符**

在算数运算符后面加一个等于号

##### 输入函数与转义字符

input(prompt) prompt是提示，会在控制台中显示

|转义字符|描述|
|:---:|:---:|
|\（在行尾时）|续行符|
|\\ |反斜杠符号|
|\\'|单引号|
|\\"|双引号|
|\\a|响铃|
|\\b|退格(Backspace)|
|\\e|转义|
|\\000|空|
|\\n|换行|
|\\v|纵向制表符|
|\\t|横向制表符|
|\\r|回车（将当前位置移到本行开头）|
|\\f|换页|
|\\oyy|八进制数，yy代表的字符，例如：\\o12代表换行|
|\\xyy|十六进制数，yy代表的字符，例如：\\x0a代表换行|

##### if判断、比较与逻辑运算符

这一块比较简单，多用就行

报错演示：

```python
score = input('请输入成绩：')
if score == 100:
    print('你真棒！')
if score == 60:
    print("还要继续加油哈！")
```

input()获取的是字符串类型，字符串和数字永远不相等，条件永远无法触发。

更改有两种方法

```python
score = int(input('请输入成绩：'))  # 改成数字输入
if score == 100:
    print('你真棒！')
if score == 60:
    print("还要继续加油哈！")
```

```python
score = input('请输入成绩：')
if score == '100':  # 改成字符串判断
    print('你真棒！')
if score == '60':
    print("还要继续加油哈！")
```

**比较运算符（关系运算符）**

 ==、!=、>、<、>=、<=

**逻辑运算符**

或与非：or and not

##### 三目运算（三元表达式）

基本结构：if-elif-else

为什么名字这么高大上呢

示例

```python
ticket = True
temp = 36.8
if ticket:  # 外层if判断
    print("可以进站了哈哈哈-->", end="")
    # 正常人腋下体温是36.3-37.2
    if 36.3 <= temp <= 37.2:
        print("体温正常，安心回家")
    else:
        print("体温异常，被抓过去隔离")
else:
    print("没票不能进站")
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
a2 = a1.decode()  # 解码
print(a2,type(a2))
```

输出1

```
hello <class 'str'>
编码后： b'hello'
<class 'bytes'>
hello <class 'str'>
```

演示2

```python
st = "这里是EDDIE"
st1 = st.encode("utf-8")
print(st1,type(st1))
st2 = st1.decode("utf-8")
print(st2,type(st2))
```

输出2

```
b'\xe8\xbf\x99\xe9\x87\x8c\xe6\x98\xafEDDIE' <class 'bytes'>
这里是EDDIE <class 'str'>
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

演示

```python
a = '我是'
b = 'EDDIE'
print(a+b)

print('重复输出，加上换行\n'*3)

name = 'abcdefghijklmn'

c = name[0]
print('第一位开始：', c)
print('最后一位开始：', name[-1])

# 成员运算符
print('o' in name)
print(c in name, name[0] not in name, sep = '|')
print('abce' in name, end='\n\n')  # 作为整体去寻找

print('从左到右切割')
print(name[0:3])  # 包前不包后
print(name[3:])
print(name[:3], end='\n\n')

print('从右到左切割')
print(name[-1:])  # 步长默认为1
print(name[-1::-1])  # 步长更改为-1
print(name[-1:-5:-1])
```

输出

```
我是EDDIE
重复输出，加上换行
重复输出，加上换行
重复输出，加上换行

第一位开始： a
最后一位开始： n
False
True|False
False

从左到右切割
abc
defghijklmn
abc

从右到左切割
n
nmlkjihgfedcba
nmlk
```

**字符串常见操作**

find、index、count

演示

```python
name = 'abcdeabcdea'
print(name.find('a'))
print(name.find('a', 1))  # 从第二个开始检查
print(name.find('a', 1, 3))  # 最后一个数字代表结束，包前不包后

print(name.index('a'))

print(name.count('a'), name.count('b'))
```

输出

```
0
5
-1
0
3 2
```

> index和find的区别就是,index找不到会报错，find找不到会返回-1（来自弹幕）

> find只能用于字符串，而index还可以用于表，index用途更广泛（来自弹幕）

##### 下节课

阿巴阿巴

### 语法进阶

<br>

### 练习题

<br>

### 网络爬虫

> 学爬虫，一定要先学HTML（来自课程弹幕）

##### 网络请求

类似 https://www.baidu.com 的是URL，统一资源定位符

**请求过程**

客户端（web浏览器）向服务器发送请求

1. 请求网址 -- request url
2. 请求方法 -- request methods
3. 请求头 -- request header
4. 请求体 -- request body

`F12`/`右键检查`查看请求响应

<br>