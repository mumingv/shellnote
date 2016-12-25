# 功能FAQ

## 如何获取脚本参数？

获取参数个数，使用：`$#`。

获取脚本名称，使用：`$0`。

获取参数名称，使用：`$1`，`$2`，`$3`，...。

参考：
- [语法](#docs/syntax#常用的特殊变量)
- [示例1](https://github.com/mumingv/shell/blob/master/books/my_shell_cookbook/c01/function.sh)
- [示例2](https://github.com/mumingv/shell/blob/master/books/my_shell_cookbook/c04/4_02_word_freq.sh)


## 如何连接字符串？

Shell中的所有变量值都是字符串，字符串连接时无需连接符。

```bash
#!/bin/bash

# 连接自定义字符串
name='Jay'
tel='18612345678'
echo ${name}${tel}

# 连接Shell系统变量字符串 
echo "Hello"$1
```
```bash
$ sh string_concat.sh Jay
Jay18612345678
HelloJay
```

参考：
- [示例](https://github.com/mumingv/shell/blob/master/funcpoint/string_concat.sh)


## 如何获取字符串的最后两位？

```bash
$ string=hello 
$ echo ${string}
hello
```

### 方法1：直接使用字符串提取语法

```bash
$ echo ${string:(-2)}
lo
$ echo ${string:(-2):2}
lo
```
```bash
$ echo ${string:$((-2))}
lo
$ echo ${string:$((-2)):2}
lo
```
```bash
$ echo ${string:$((${#string}-2))}  
lo
$ echo ${string:$((${#string}-2)):2}
lo
```

说明：$(())表示算术运算。


### 方法2：使用grep命令

```bash
$ echo $string | grep -E -o ..$
lo
```

说明：-o参数表示只输出匹配的部分字符串，而不是输出整行；..$为正则表达式。




## 如何获取日期和时间信息？

### 获取当前日期

```bash
$ date +%F
2016-12-14
$ date +%Y-%m-%d
2016-12-14
```


### 获取当前时间

```bash
$ date +%T
10:38:56
$ date +%H:%M:%S
10:38:59
```


### 获取日期和时间的常用方式

```bash
$ date +%F.%T
2016-12-14.10:47:46
```









