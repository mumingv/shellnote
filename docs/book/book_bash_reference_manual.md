# Bash参考手册

手册：http://www.gnu.org/software/bash/manual/bash.html

## Introduction 简介

略。


## Definitions 定义

略。


## Basic Shell Features 基础特性

### 3.1 Shell Syntax 语法

#### 3.1.1 Shell Operation 语句执行流程

略。


#### 3.1.2 Quoting 引用

单引号中不能包含单引号，即使使用`\`也不行。


#### 3.1.3 Comments 注释

略。


### 3.2 Shell Commands 命令

#### 3.2.1 Simple Commands 简单命令

命令的返回码通常在0-128。如果命令被信号中断的话，返回码就是`128+n`，其中，`n`为信号ID。


#### 3.2.2 Pipelines 管道

略。


#### 3.2.3 Lists of Commands 命令列表

有如下四种操作符：`;`、`&`、`&&`、`||`。


#### 3.2.4 Compound Commands 复杂命令

##### 3.2.4.1 Looping Constructs 循环语句

**until**

```
until test-commands; do consequent-commands; done
```

**while**

```
while test-commands; do consequent-commands; done
```

**for**

```
for name [ [in [words …] ] ; ] do commands; done
for name in "$@"; do commands; done
```

或者

```
for (( expr1 ; expr2 ; expr3 )) ; do commands ; done
```


##### 3.2.4.2 Conditional Constructs 条件语句

**if**

```
if test-commands; then
  consequent-commands;
[elif more-test-commands; then
  more-consequents;]
[else alternate-consequents;]
fi
```

**case**

```
case word in [ [(] pattern [| pattern]…) command-list ;;]… esac
```

示例：

```
echo -n "Enter the name of an animal: "
read ANIMAL
echo -n "The $ANIMAL has "
case $ANIMAL in
  horse | dog | cat) echo -n "four";;
  man | kangaroo ) echo -n "two";;
  *) echo -n "an unknown number of";;
esac
echo " legs."
```


**select**

```
select name [in words …]; do commands; done
```


**((…))**

```
(( expression ))
```


**[[…]]**

```
[[ expression ]]
```


##### 3.2.4.3 Grouping Commands 命令分组

使用`( list )`和`{ list; }`。


#### 3.2.5 Coprocesses 并行处理

略。


#### 3.2.6 GNU Parallel 并行

略。


### 3.3 Shell Functions 函数

语法示例：

```
function name() {
	...
}
```


### 3.4 Shell Parameters 参数

#### 3.4.1 Positional Parameters 位置参数

`${N}`或`$N`。


#### 3.4.2 Special Parameters 特殊参数

`$*`、`$@`、`$#`、`$?`、`$-`、`$$`、`$!`、`$0`、`$_`。


### 3.5 Shell Expansions 扩展

#### 3.5.1 Brace Expansion 大括号扩展


```
bash$ echo a{d,c,b}e
ade ace abe
```

```
mkdir /usr/local/src/bash/{old,new,dist,bugs}
```

```
chown root /usr/{ucb/{ex,edit},lib/{ex?.?*,how_ex}}
```


#### 3.5.2 Tilde Expansion 波浪号扩展

`~root`表示用户root的根目录。

```
$ echo ~root/foo
/var/root/foo
```

参考资料：
- [CSDN：bash之波浪号扩展（tilde expansion）](https://blog.csdn.net/astrotycoon/article/details/78109809)


#### 3.5.3 Shell Parameter Expansion 参数扩展

##### 参数替换

|语法 					|含义 										|
|-----------------------|-------------------------------------------|
|${parameter} 			|变量parameter的值 							|
|${parameter:-word} 	|变量parameter有值，则取其值；否则取"word"		|
|${parameter:=word}		|变量parameter有值，则取其值；否则将"word"赋值给变量parameter，并取其值 	|
|${parameter:?word}		|变量parameter有值，则取其值；否则将"word"输出到标准错误（如果是非交互模式，则直接退出） 	|
|${parameter:+word}		|变量parameter有值，则取"word"；否则取空 		|


##### 字符串操作

|语法 					|含义 										|
|-----------------------|-------------------------------------------|
|${parameter:offset}</br>${parameter:offset:length}|获取子字符串 		|
|${#parameter}			|字符串长度 									|


##### 变量匹配

|语法 					|含义 										|
|-----------------------|-------------------------------------------|
|${!prefix*}</br>${!prefix@}|所有以prefix开头的变量名称 				|


##### 数组操作

|语法 					|含义 										|
|-----------------------|-------------------------------------------|
|${array[index]}		|数组下标为index的元素值 						|
|${array[@]}</br>${array[*]}|数组的所有元素值 							|
|${!array[@]}</br>${!array[*]}|数组的所有下标 							|
|${#array[@]}</br>${#array[*]}|数组的大小（元素个数）					|


##### 正则匹配替换

|语法 					|含义 										|
|-----------------------|-------------------------------------------|
|${parameter#word}		|将parameter中首部与word匹配的部分截除，使用最短匹配	|
|${parameter##word} 	|将parameter中首部与word匹配的部分截除，使用最长匹配	|
|${parameter%word}		|将parameter中尾部与word匹配的部分截除，使用最短匹配	|
|${parameter%%word} 	|将parameter中尾部与word匹配的部分截除，使用最长匹配	|
|${parameter/pattern/string} 	|将parameter中与patterm匹配的部分，使用string进行替换		|
|${parameter^pattern}	|把parameter中的第一个字符换成大写（Mac不支持）	|
|${parameter^^pattern}	|把parameter中的所有字符换成大写（Mac不支持）		|
|${parameter,pattern} 	|把parameter中的第一个字符换成小写（Mac不支持）	|
|${parameter,,pattern}	|把parameter中的所有字符换成小写（Mac不支持）		|
|${parameter@operator}	|把parameter的值进行一些转换  			  		|


##### 

参考资料：
- [CSDN: bash之参数扩展（Parameter Expansion）](https://blog.csdn.net/astrotycoon/article/details/78109827)
- [Bash 4.4 中新增的 ${parameter@operator} 语法](https://www.cnblogs.com/ziyunfei/p/4918675.html)


#### 3.5.4 Command Substitution 命令替换

语法形式：

```
$(command)
```

或

```
`command`
```

注：如下两种示例等价。

```
$(cat file)
$(< file)
```























