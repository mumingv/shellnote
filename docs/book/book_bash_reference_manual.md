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


#### 3.5.5 Arithmetic Expansion 算术扩展

语法形式：

```
$(( expression ))
```

示例：有没有空格都可以

```
$ abc=$(( 1+2 ))
$ echo $abc
3
```
```
$ abc=$((1+2))
$ echo $abc
3
```


#### 3.5.6 Process Substitution 进程替换

语法形式：`<(list)`可以看做一个临时文件

1. 把list的输出作为一个临时文件，作为command的参数

```
command <(list)
```

2. 把command的输出到临时文件，临时文件作为list的输入
```
command >(list)
```

示例：[参考](#docs/command_list#comm)



#### 3.5.7 Word Splitting 分词

Shell在分词时会跳过那些被双引号包围的词。

参考：

- [Here String 中不该进行分词](http://www.cnblogs.com/ziyunfei/p/4781553.html)
- [再谈 $* 和 $@ 在 Bash 中的表现](http://www.cnblogs.com/ziyunfei/p/4808530.html)


#### 3.5.8 Filename Expansion 文件名展开

参考：

- [bash之通配符](https://blog.csdn.net/astrotycoon/article/details/50814031)



#### 3.5.9 Quote Removal 引用去除

略。


### 3.6 Redirections 重定向

`<&n`与`0<&n`含义相同，表示将文件描述符n的内容复制到stdin。

`<&-`与`0<&-`含义相同，表示关闭stdin。

`>&-`与`1>&-`含义相同，表示关闭stdout。


#### 3.6.1 Redirecting Input 输入重定向

```
[n]<word
```

其中，n默认值为0（stdin）。


#### 3.6.2 Redirecting Output 输出重定向

```
[n]>[|]word
```

`noclobber`选项用户防止重定向将已有的文件覆盖。使用如下方式打开或关闭。

```
set -o noclobber  # 打开选项
set +o noclobber  # 关闭选项
```

`>|`则无视noclobber选项的存在。

示例：

```
$ echo 'aaa' > file.txt
$ echo 'bbb' > file.txt
$ set -o noclobber
$ echo 'ccc' > file.txt
-bash: file.txt: cannot overwrite existing file
$ echo 'ccc' >| file.txt
$ cat file.txt
ccc
```

##### 参考资料

- [noclobber：避免文件的重写](http://blog.51cto.com/tech110/232312)


#### 3.6.3 Appending Redirected Output 附加输出重定向

```
[n]>>word
```

与`[n]>word`相比，`[n]>>word`不覆盖原有文件，而是采用追加的方式写入。


#### 3.6.4 Redirecting Standard Output and Standard Error 标准输出和标准错误同时重定向

```
&>word
```
```
>&word
```

以上两种方式等价于：

```
>word 2>&1
```


#### 3.6.5 Appending Standard Output and Standard Error 附加标准输出和标准错误同时重定向

```
&>>word
```

以上方式等价于：

```
>>word 2>&1
```


#### 3.6.6 Here Documents Here文档

```
[n]<<[-]word
        here-document
delimiter
```

示例：将Here文档内容输出到文件(output.sh)

```
cat << EOF > output.sh
echo "hello"
echo "world"
EOF
```

`<<-`与`<<`相比，`<<-`会把Here文档每行前面的TAB制表符删除掉。


##### 参考资料

- [linux shell 的here document 用法 (cat << EOF)](https://my.oschina.net/u/1032146/blog/146941)


#### 3.6.7 Here Strings Here字符串

```
[n]<<< word
```

示例：

```
$ tr a-z A-Z <<<"Yes it is a string"
YES IT IS A STRING
```

###### 参考资料

- [Here文档](https://zh.wikipedia.org/wiki/Here%E6%96%87%E6%A1%A3)


#### 3.6.8 Duplicating File Descriptors 复制文件描述符

```
[n]<&word
```

```
[n]>&word
```

说明：`>&word`等价于`>word 2>&1`，是复制文件描述符的一种特殊场景。


#### 3.6.9 Moving File Descriptors 移除文件描述符

```
[n]<&digit-
```

```
[n]>&digit-
```


#### 3.6.10 Opening File Descriptors for Reading and Writing 打开文件描述符进行读写

```
[n]<>word
```


### 3.7 Executing Commands 执行命令

#### 3.7.1 Simple Command Expansion 简单命令扩展

略。


#### 3.7.2 Command Search and Execution 命令搜索和执行

略。


#### 3.7.3 Command Execution Environment 命令执行环境

略。


#### 3.7.4 Environment 环境

略。


#### 3.7.5 Exit Status 退出状态

略。


#### 3.7.6 Signals 信号

略。


#### 3.8 Shell Scripts Shell脚本

略。


### 4 Shell Builtin Commands Shell内建命令

#### 4.1 Bourne Shell Builtins Bsh内建命令

##### 冒号（:）

```
: [arguments]
```

参考资料

- [Shell内建命令之冒号](https://blog.csdn.net/ieearth/article/details/52589020)


##### 点号（.）

```
. filename [arguments]
```


##### break

```
break [n]
```


##### cd

```
cd [-L|[-P [-e]] [-@] [directory]
```


##### continue

```
continue [n]
```


##### eval

```
eval [arguments]
```


##### exec

```
exec [-cl] [-a name] [command [arguments]]
```


##### exit

```
exit [n]
```


##### export

```
export [-fn] [-p] [name[=value]]
```


##### getopts 获取位置参数

```
getopts optstring name [args]
```


##### hash

```
hash [-r] [-p filename] [-dt] [name]
```

参考资料

- [Shell内建命令之hash](https://blog.csdn.net/ieearth/article/details/52599900)



##### pwd

```
pwd [-LP]
```


##### readonly


##### return


##### shift


##### test


##### times


##### trap


##### umask


##### unset


#### 4.2 Bash Builtin Commands Bash内建命令

##### alias

```
alias [-p] [name[=value] …]
```


##### bind

```
bind [-m keymap] [-lpsvPSVX]
bind [-m keymap] [-q function] [-u function] [-r keyseq]
bind [-m keymap] -f filename
bind [-m keymap] -x keyseq:shell-command
bind [-m keymap] keyseq:function-name
bind [-m keymap] keyseq:readline-command
```


##### builtin

```
builtin [shell-builtin [args]]
```


##### caller


##### command


##### declare

```
declare [-aAfFgilnrtux] [-p] [name[=value] …]
```


##### echo

```
echo [-neE] [arg …]
```

##### enable


##### help


##### let


##### local


##### logout


##### mapfile


##### printf


##### read


##### readarray


##### source


##### type


##### typeset


##### ulimit


##### unalias


### 4.3 Modifying Shell Behavior 修改Shell行为

#### 4.3.1 The Set Builtin

```
set [--abefhkmnptuvxBCEHPT] [-o option-name] [argument …]
set [+abefhkmnptuvxBCEHPT] [+o option-name] [argument …]
```


#### 4.3.2 The Shopt Builtin


### 4.4 Special Builtins 特殊的内建命令


## 5 Shell Variables Shell变量

略。


## 6 Bash Features Bash特性

### 6.1 Invoking Bash


### 6.2 Bash Startup Files


### 6.3 Interactive Shells

#### 6.3.1 What is an Interactive Shell?

略。

#### 6.3.2 Is this Shell Interactive?

略。

#### 6.3.3 Interactive Shell Behavior

略。


### 6.4 Bash Conditional Expressions Bash条件表达式


### 6.5 Shell Arithmetic 算术运算

略。


### 6.6 Aliases 别名

略。


### 6.7 Arrays 数组

略。


### 6.8 The Directory Stack 目录栈

#### 6.8.1 Directory Stack Builtins

略。


### 6.9 Controlling the Prompt 控制提示


### 6.10 The Restricted Shell


### 6.11 Bash POSIX Mode


## 7 Job Control 任务控制

### 7.1 Job Control Basics 任务控制基础


### 7.2 Job Control Builtins 任务控制内建命令

#### bg


#### fg


#### jobs


#### kill


#### wait


#### disown


#### suspend


### 7.3 Job Control Variables 任务控制变量

#### auto_resume


## 8 Command Line Editing 命令行编辑

### 8.1 Introduction to Line Editing


### 8.2 Readline Interaction


### 8.3 Readline Init File


### 8.4 Bindable Readline Commands

#### 8.4.1 Commands For Moving 移动命令

###### 
|命令           |作用                       |
|---------------|---------------------------|
|C-a            |行首                       |
|C-e            |行尾                       |
|C-f            |向前移动一个字符           |
|C-b            |向后移动一个字符           |
|M-f            |向前移动一个单词（M默认为esc键，iterm2改为了option键）|
|M-b            |向后移动一个单词（M默认为esc键，iterm2改为了option键）|
|C-l            |清除屏幕，保留当前命令行   |


#### 8.4.2 Commands For Manipulating The History 维护历史命令


#### 8.4.3 Commands For Changing Text 改变文本命令


#### 8.4.4 Killing And Yanking 


#### 8.4.5 Specifying Numeric Arguments


#### 8.4.6 Letting Readline Type For You


#### 8.4.7 Keyboard Macros


#### 8.4.8 Some Miscellaneous Commands 混合命令


### 8.5 Readline vi Mode


### 8.6 Programmable Completion


### 8.7 Programmable Completion Builtins


### 8.8 A Programmable Completion Example


## 9 Using History Interactively


## 10 Installing Bash


## Appendix A Reporting Bugs

略。

## Appendix B Major Differences From The Bourne Shell

略。

## Appendix C GNU Free Documentation License

略。

## Appendix D Indexes 索引附录

## D.1 Index of Shell Builtin Commands Shell内建命令索引


## D.2 Index of Shell Reserved Words Shell保留字索引


## D.3 Parameter and Variable Index 参数和变量索引


## D.4 Function Index 函数索引


## D.5 Concept Index 概念索引


