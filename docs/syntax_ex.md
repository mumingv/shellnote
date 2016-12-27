# 语法扩展

## 字符串

### 字符串连接

```bash
$ echo "abc""def"  # 无需连接符
abcdef
```

注：PHP使用点号'.'连接字符串；JavaScript使用加号'+'连接字符串。


### 字符串长度

```bash
$ echo ${name}
JAY
$ echo ${#name}
3
```
```bash
$ length=${#name}
$ echo ${length}
3
```


### 字符串截取

字符串中的字符编号从0开始；第一个参数表示截取的首字符编号，第二个参数表示截取的长度。

```bash
$ string="abcdefghijklmnopqrstuvwxyz"
$ echo ${string}
abcdefghijklmnopqrstuvwxyz
$ echo ${string:4}
efghijklmnopqrstuvwxyz
$ echo ${string:4:3}
efg
```

首字符编号为负数表示从字符串后面开始数（如：-1表示最后一个字符；-2表示倒数第二个字符；...），负数需要使用小括号包含。

```bash
$ echo ${string:(-2)}
yz
$ echo ${string:(-3):2}
xy
```

示例：获取最后一个字符。

```bash
$ echo ${string:(-1)}
z
```
```bash
$ echo ${string:$((${#string}-1)):1}
z
```


### 文本替换

```bash
$ var="This is a line of text"
$ echo ${var/line/replacd}
This is a replacd of text
```





