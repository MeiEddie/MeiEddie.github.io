---
outline: deep
---

# kmp算法

## 学习参考

### 视频：

1. 《最浅显易懂的KMP算法讲解》bilibili@Ross-Ning

https://www.bilibili.com/video/BV1AY4y157yL/?spm_id_from=333.337.search-card.all.click&vd_source=c5b001da49827c95685ff66b3392ffc9

2. 《「六分钟速通」KMP算法求解流程》bilibili@Prism菌

https://www.bilibili.com/video/BV19C4y157dH?spm_id_from=333.788.recommend_more_video.-1&trackid=web_related_0.router-related-2479604-t4rlm.1784731248892.677&vd_source=c5b001da49827c95685ff66b3392ffc9

### 其他

1. leetcode@力扣官方题解

https://leetcode.cn/u/leetcode-solution/

2. 豆包ai

## 简单介绍

KMP（Knuth-Morris-Pratt）是字符串模式匹配算法，解决问题：

给定主串s、模式串p，快速找到p在s中第一次出现的位置（或所有匹配位置）。

**传统暴力匹配缺点**

暴力匹配：不匹配时，主串指针回退、模式串从头开始。

大量无效重复对比，最坏复杂度`O(n*m)`。

> 其中n代表主串长度，m代表字串长度

**KMP核心思想**

匹配失败时：主串指针不回退，只利用模式串自身信息，将模式串跳到合适位置，消除重复比对。

关键：next数组（前缀函数）

这个时候，主串的指针永远向前移动（改进为线性时间复杂度）,复杂度为`O(n)`。

## 前缀、后缀定义

对模式串子串p[0...i]

真前缀：不包含最后一个字符的所有前缀

真后缀：不包含第一个字符的所有后缀

next[i] = p[0...i]的最长相等真前缀、真后缀长度

::: tip
示例：ababc

子串 abab：

前缀：a, ab, aba

后缀：b, ab, bab

最长相等：ab → 长度2
:::

## 简单kmp逻辑

假设我们已经得出了字串的next数组

```python
def kmp_search(string, patt):
    next = build_next(patt)

    i = 0  # 主串中的指针
    j = 0  # 子串中的指针
    while i < len(string):
        if string[i] == patt[j]:  # 字符匹配，指针后移
            i += 1
            j += 1
        elif j > 0:  # 字符失配，根据 next 跳过子串前面的一些字符
            j = next[j - 1]
        else:  # 子串第一个字符就失配
            i += 1

        if j == len(patt):  # 匹配成功
            return i - j
```

## next数组构造（前缀函数）

构造逻辑

设模式串长度m

next[0] = -1（约定初始值，方便代码跳转）

双指针：i=1（当前求next下标），j=-1（匹配前缀长度）

循环：

如果j == -1 或 p[i] == p[j]：i++, j++, next[i]=j

否则：j = next[j]（回跳）

::: tip
示例演示

模式串：p = "ababc"
:::

构造next数组

```python
def build_next(patt):
    """
    计算 Next 数组
    """
    next = [0]  # next数组（初值元素一个0）
    prefix_len = 0  # 当前共同前后缀的长度
    i = 1
    while i < len(patt):
        if patt[prefix_len] == patt[i]:
            prefix_len += 1
            next.append(prefix_len)
            i += 1
        else:
            if prefix_len == 0:
                next.append(0)
                i += 1
            else:
                prefix_len = next[prefix_len - 1]
    return next
```