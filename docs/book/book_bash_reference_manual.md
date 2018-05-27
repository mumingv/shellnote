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






































