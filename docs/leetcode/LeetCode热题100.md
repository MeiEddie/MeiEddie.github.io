---
outline: deep
---

# LeetCode热题100

详细题目可以去官网查看：

https://leetcode.cn/studyplan/top-100-liked/

## 哈希

### 1. 两数之和

给定一个整数数组nums和一个整数目标值target，请你在该数组中找出和为目标值target的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。

**我的尝试**

```python
class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        for i in range(len(nums)):
            for j in range(i+1,len(nums)):
                if nums[i] + nums[j] == target:
                    return([i,j])
```

运行时间：1975ms

::: warning
时间复杂度太大
:::

**题解学习**

哈希表解法

```python
class Solution(object):
    def twoSum(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        a = {}
        for i,v in enumerate(nums):
            if (target-v) in a:
                return [i,a[target-v]]
            else:
                a[v] = i
```

::: tip
enumerate()

遍历序列（列表、字符串等）时，同时拿到【下标索引】和【元素本身】。
:::