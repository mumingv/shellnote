# 功能FAQ

## 如何查询CPU核内存相关的信息？



## 如何根据IP来查询域名？

### 方法1：使用nslookup查询

```
$ nslookup 10.194.62.48
Server:         10.10.10.10
Address:        10.10.10.10#53

48.62.194.10.in       name = machine-xxx.xx.com.
```

name后面的就是IP对应的域名。


### 方法2：使用traceroute查询

```
$ traceroute 10.194.62.48
traceroute to 10.194.62.48 (10.194.62.48), 30 hops max, 46 byte packets
 1  10.95.199.1 (10.95.199.1)  5.069 ms  11.261 ms  52.744 ms
 2  10.93.138.93 (10.93.138.93)  0.632 ms  1.645 ms  0.418 ms
 3  10.91.22.49 (10.91.22.49)  0.560 ms  1.304 ms  1.010 ms
 4  machine-xxx.xx.com (10.194.62.48)  27.088 ms  26.773 ms  27.407 ms
 ```


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


### 方法3：使用awk命令

```bash
$ echo $string | awk '{print substr($0, length($0)-1, length($0))}'
lo
```


### 方法4：使用cut命令

```bash
$ echo $string | rev | cut -c -2 | rev
lo
```

`rev`命令用于颠倒字符串；`cut -c -2`表示每个字符作为一列，并且获取前两列。


### 方法5：使用colrm命令

```bash
$ echo $string | rev | colrm 3 | rev
lo
```

`colrm 3`命令表示删除从第3列一直到最后一列，列的编号从1开始。


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


## 如何根据端口号查询进程可执行文件所在的目录？

根据端口号（8183）查询到进程号（15386）。

```
$ netstat -tunlp | grep 8183
(Not all processes could be identified, non-owned process info
 will not be shown, you would have to be root to see it all.)
tcp 0 0 0.0.0.0:8183 0.0.0.0:* LISTEN 15386/nginx
```

根据进程号（15386）查询可执行程序的位置。
```
$ ps -ef | grep 15386
work 15386 1 0 Sep02 ? 00:00:00 nginx: master process /home/work/odp/webserver/sbin/nginx
```


## 使用SecureCRT登录主机，一段时间后自动退出？

提示错误信息：

```
timed out waiting for input: auto-logout
```

解决办法：设置用户的超时时间，该设置会覆盖系统的默认设置（默认设置在`/etc/profile`文件当中）。

```
$ vim ~/.bash_profile
...
export TMOUT=7200
...
```


## 如何在命令行中循环执行脚本？

#### 示例：循环执行php脚本

```
$ while :; do php test.php; done;
```

<font color="red">
说明：语法关键字后面要么跟空格，要么跟分号。while后面如果不携带一个空格的话，会报如下错误。
</font>

```
$ while:; do php test.php; done; 
bash: syntax error near unexpected token `do'
```


#### 示例：杀掉某个范围的所有pid

```
$ pid=12062; while (( $pid < 12189 )); do kill -9 $pid; ((pid=$pid+1)); done;
```

