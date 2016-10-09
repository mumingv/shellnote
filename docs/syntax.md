# 语法

## 注释

Shell脚本中只支持单行注释（使用字符 `# ...`），不支持多行注释（如：C语言中的`/* ... */`）。其中`...`为注释内容。

```bash
# 这是一行注释
```

```bash
echo "Hello World"  # 这是本行代码的注释
```


## 变量

### 标准变量

#### 定义标准变量的三种方法：
```bash
name=JAY    # 字符串中不包含任何空白字符时，才能使用这种方法（不推荐使用）
name='JAY'  # 字符串中的变量不会被扩展
name="JAY"  # 字符串中的变量会被扩展
```
注意：
1. shell中所有的变量都是字符串；
2. 等号'='左右不能有空格；

#### 使用标准变量的两种方法：
```bash
echo $name
echo ${name}
```


### 环境变量

环境变量是shell环境或者操作系统存储的变量，可以直接在shell脚本中使用。

#### 常用的环境变量

|环境变量|含义          |取值示例   |
|--------|--------------|-----------|
|HOME|主目录，与用户相关|/home/work|
|PWD|当前工作目录|/home/work/git|
|SHELL|使用的Shell|/bin/bash|
|USER|用户名|work|
|UID|用户ID|1000|
|PS1|命令提示符|[\u@\h \W]\$|
|PATH|可执行文件搜索路径|/usr/local/bin:/usr/bin|
|LD_LIBRARY_PATH|库文件搜索路径|/user/lib|

#### 使用环境变量的方法

环境变量的使用方法和标准变量相同。
```bash
$ echo $HOME
/home/work
$ echo $HOME
/home/work
```


### 特殊变量

Linux系统提供了一些特殊的变量，用于表达一些特别的含义。

#### 常用的特殊变量

|特殊变量|含义          |
|--------|--------------|
|$?|表示上一条命令的返回码（退出状态）或者函数的返回值|
|$#|执行脚本或函数时的参数个数|
|$0|执行的脚本名称|
|$1|执行脚本或函数时的第1个参数|
|$2|执行脚本或函数时的第2个参数|
|$n|执行脚本或函数时的第n个参数|
|$@|执行脚本或函数时的所有参数（对应"$1""$2""$3"等，可以当作数组使用）（相比$*而言用的较多）|
|$*|执行脚本或函数时的所有参数（"$1c$2c$3"，c为IFS的第一个字符）（相比$@而言用的较少）|
|$$|当前Shell的进程ID（pid）|


##  函数

函数是一系列指令的集合，用来完成一个特定的功能。

### 函数定义

定义函数的时候，函数名称前加不加function关键字都可以。

#### 不使用function关键字
```bash
show_param_info() { 
    echo "函数参数个数：$#"
}
```

#### 使用function关键字
```bash
function show_return_info() { 
    # 命令':'什么也不做
    :
    echo "命令返回值(退出状态)：$?"
}
```


### 函数调用

调用函数直接写函数名称即可，如果函数有参数，参数紧跟在函数名称后面。

#### 调用不带参数的函数

```bash
show_param_info  # 调用函数：不带参数
```

#### 调用带参数的函数

```bash
show_param_info a b c  # 调用函数：带3个参数
```
注：调用函数时，参数不需要加括号，并且参数之间使用空格分隔。


## 数组

数组分为普通数组和关联数组。普通数组使用整数作为数组索引；关联数组使用字符串作为数组索引。

注：关联数组从Bash4.0版本开始支持。

### 普通数组

普通数组中的元素有顺序，元素的次序编号从0开始。

#### 定义普通数组

普通数组有两种方式定义，分别是列表方式和key-value方式。

使用列表方式定义普通数组
```bash
$ arr=(0 1 2 3 4 5 6)
```

使用key-value方式定义普通数组
```bash
$ arr_str[0]="test0"
$ arr_str[1]="test1"
$ arr_str[2]="test2"
```


#### 获取普通数组元素的值

使用数组下标获取某个数组元素的值
```bash
$ echo ${arr[2]}
2
$ index=3
$ echo ${arr[$index]}
3
```
```bash
$ echo ${arr_str[0]}
test0
$ index=2
$ echo ${arr_str[$index]}
test2
```

获取所有数组元素的值 `*` `@`
```bash
$ echo ${arr[*]}
0 1 2 3 4 5 6
$ echo ${arr[@]}
0 1 2 3 4 5 6
```
```bash
$ echo ${arr_str[*]}
test0 test1 test2
$ echo ${arr_str[@]}
test0 test1 test2
```

#### 获取普通数组元素的索引

获取数组索引 `!`
```bash
$ echo ${!arr[*]}
0 1 2 3 4 5 6
$ echo ${!arr[@]}  
0 1 2 3 4 5 6
```
```bash
$ echo ${!arr_str[*]}
0 1 2
$ echo ${!arr_str[@]}
0 1 2
```

#### 获取普通数组长度

获取数组长度（数组中的元素个数） `#`
```bash
$ echo ${#arr[*]}
7
$ echo ${#arr[@]}
7
```
```bash
$ echo ${#arr_str[*]}
3
$ echo ${#arr_str[@]}
3
```


### 关联数组

关联数组中的元素没有顺序，也就没有所谓的次序编号，数组元素需要通过key来获取。

关联数组除了定义和获取元素这两个操作与普通数组稍有区别之外，其他操作（如：获取数组索引、数组长度）均与普通数组保持一致。

#### 定义关联数组

关联数组在定义之前需要先使用命令`declare -A`进行声明。

关联数组有两种定义方式，分别是列表方式和key-value方式。使用列表方式定义关联数组的话，列表中的元素也使用key-value方式。

使用列表方式定义关联数组
```bash
$ declare -A fruits_value
$ fruits_value=([apple]='100 dollars' [orange]='150 dollars')
```

使用key-value方式定义关联数组
```bash
$ declare -A fruits_value
$ fruits_value[apple]='100 dollars'
$ fruits_value[orange]='150 dollars'
```

#### 获取关联数组元素的值

使用key获取某个数组元素的值（value）
```bash
$ echo ${fruits_value[orange]}
150 dollars
```
```bash
$ fruit_name=orange
$ echo ${fruits_value[$fruit_name]}
150 dollars
```

获取所有数组元素的值 `*` `@` 
```bash
$ echo ${fruits_value[*]}
150 dollars 100 dollars
```
```bash
$ echo ${fruits_value[@]}
150 dollars 100 dollars
```

#### 获取关联数组元素的索引

获取数组索引 `!`
```bash
$ echo ${!fruits_value[*]}
orange apple
```
```bash
$ echo ${!fruits_value[@]}
orange apple
```
注：关联数组的索引是没有顺序的。

#### 获取普通数组长度

获取数组长度（数组中的元素个数） `#`
```bash
$ echo ${#fruits_value[*]}
2
```
```bash
$ echo ${#fruits_value[@]}
2
```


### 二维数组

Shell不支持二维数组，如果需要使用二维数组，可以使用一维数组进行模拟，这里不作赘述。


## 列表

列表就是一系列的字符或者字符串，如：a b c d e f g，列表的元素之间使用空格进行分隔。

可以使用`{..}`来生成常用的字母列表或者数字列表，通常用在循环语句当中。

### 常见的列表

大写字母列表
```bash
$ echo {A..Z}
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
```
```bash
$ echo {Z..A}
Z Y X W V U T S R Q P O N M L K J I H G F E D C B A
```

小写字母列表
```bash
$ echo {a..z} 
a b c d e f g h i j k l m n o p q r s t u v w x y z
```
```bash
$ echo {z..a}
z y x w v u t s r q p o n m l k j i h g f e d c b a
```

数字列表
```bash
$ echo {0..9}
0 1 2 3 4 5 6 7 8 9
```
```bash
$ echo {9..0} 
9 8 7 6 5 4 3 2 1 0
```
```bash
$ echo {-3..9}
-3 -2 -1 0 1 2 3 4 5 6 7 8 9
```
```bash
$ echo {9..-3}
9 8 7 6 5 4 3 2 1 0 -1 -2 -3
```


## 分支语句 `if`

语句中的条件判断使用方括号[]、[[]]或者test表示，使用test是为了避免过多的括号。'['后']'前必须要有空格。同理，'[['后']]'前必须要有空格。

关于`[]`和`[[]]`的区别：
一般情况下使用`[]`即可。需要注意的是，在进行字符串比较时，由于系统可能会误解`[]`的含义，为确保不产生歧义，则需要使用`[[]]`进行比较测试。

关于`[]`和`test`的区别：
`[]`和`test`的功能是等价的，但是在使用`test`进行字符串比较时，如果在条件判断中使用了小于符号`<`，则需要对其进行转义，写成`\<`。

建议：对于数字比较（算术比较）和文件系统相关条件测试，使用`[]`、`[[]]`或者`test`都是一样的；对于字符串比较，只能使用`[[]]`和`test`，且使用`test`需要注意小于符号`\<`转义的问题，故字符串比较推荐使用`[[]]`，因为这种方式最“省心”。

关于分号的使用：
1、如果一行就是一条命令，则无需使用分号；
2、如果一行中有多条命令，则使用分号分隔这些命令；
也就是说，shell遇到分号或者行尾就认为是一条完整的命令。


### if语句的三种基本结构（测试条件使用`[]`） 


#### if...then...fi
```bash
if [ 6 -gt 0 ]; then
    echo "6 > 0"
fi
```
等价于：
```bash
[ 6 -gt 0 ] && echo "6 > 0"  # 条件为真时执行
[ 6 -lt 0 ] || echo "6 > 0"  # 条件为假时执行
```

如果有多个条件的话，条件之间使用逻辑操作符`-a`或`-o`表示逻辑与操作以及逻辑或操作。
```bash
if [ 6 -gt 0 -a 6 -lt 10 ]; then 
    echo "6 > 0 && 6 < 10"
fi
```

#### if...then...else...fi
```bash
if [ 6 -gt 0 ]; then
    echo "6 > 0"
else
    echo "6 <= 0"
fi
```

#### if...then...elif...then...else...fi
```bash
if [ 6 -gt 8 ]; then
    echo "6 > 8"
elif [ 6 -gt 0 ]; then  # 注意：这里不能使用 else if
    echo "6 > 0"
else
    echo "6 <= 0"
fi
```


### if语句的三种基本结构（测试条件使用`test`） 

#### if...then...fi
```bash
if test 6 -gt 0; then
    echo "6 > 0"
fi
```
如果有多个条件的话，条件之间使用逻辑操作符`-a`或`-o`表示逻辑与操作以及逻辑或操作。
```bash
if test 6 -gt 0 -a 6 -lt 10 ; then 
    echo "6 > 0 && 6 < 10"
fi
```

#### if...then...else...fi
```bash
if test 6 -gt 0 ; then
    echo "6 > 0"
else
    echo "6 <= 0"
fi
```

#### if...then...else if...then...else...fi
```bash
if test 6 -gt 8 ; then
    echo "6 > 8"
elif test 6 -gt 0 ; then
    echo "6 > 0"
else
    echo "6 <= 0"
fi
```


### 数字比较（算术比较） `[]` `[[]]` `test`

#### 比较操作符

|比较操作符|含义|示例|
|----------|----|----|
|-gt|大于|[ 6 -gt 0 ]|
|-ge|大于等于|[ 6 -ge 0 ]|
|-lt|小于    |[ 6 -lt 0 ]|
|-le|小于等于|[ 6 -le 0 ]|
|-eq|等于|[ 6 -eq 0 ]|
|-ne|不等于|[ 6 -ne 0 ]||

#### 逻辑操作符

|逻辑操作符|含义|示例|
|----------|----|----|
|-a|逻辑与|[ 6 -gt 0 -a 6 -lt 10 ]|
|-o|逻辑或|[ 6 -gt 0 -o 6 -lt 10 ]|


### 字符串比较 `[[]]`

#### 比较操作符

|比较操作符|含义|示例|
|----------|----|----|
|>|大于|[[ def > abc ]]|
||大于等于（不支持）||
|<|小于|[[ abc < def ]]|
||小于等于（不支持）||
|= 或 == |等于|[[ abc = abc ]] 或 [[ abc == abc ]]|
|!=|不等于|[[ abc == def ]]|


### 文件系统相关条件测试 `[]` `[[]]` `test`

|文件系统相关测试    |含义|示例|
|--------------------|----|----|
|-f  |判断文件是否存在|[ -f ./check_root.sh ]|
|-x|判断文件是否可执行|[ -x ./check_root.sh ]|
|-d|判断是否是目录|[ -d ./ ]|
|-e|判断是否是目录或文件|[ -e ./ ] 或 [ -e ./check_root.sh ]|
|-c|判断是否是字符设备文件|[ -c /dev/tty ]|
|-b|判断是否是块设备文件|[ -b /dev/xvda ]|
|-r|判断文件是否可读|[ -r ./check_root.sh ]|
|-w|判断文件是否可写|[ -w ./check_root.sh ]|
|-L|判断文件是否是一个符号链接|[ -L /dev/stdin ]|


## 循环语句 `for` `while` `until`

### 循环语句 `for...in...do...done`

#### 遍历数字列表
```bash
for i in 0 1 2; do
    echo "number --> $i"
done
```
```bash
for i in {0..2}; do
    echo "number --> $i"
done
```
```bash
for i in `seq 0 2`; do
    echo "number --> $i"
done
```

#### 遍历字母列表
```bash
for c in {a..c}; do
    echo "char --> $c"
done
```

#### 遍历数组元素
```bash
arr=("apple" "banana" "orange")
for fruit in ${arr[*]}; do
    echo "fruit --> $fruit"
done
```
```bash
arr=("apple" "banana" "orange")
for fruit in ${arr[@]}; do
    echo "fruit --> $fruit"
done
```

#### 分割遍历字符串: 带IFS
```bash
# for语句里in后面的字符串必须写成变量的方式，不能直接写字符串字面值
IFS=":"
count=0
line="a:b:c"
for var in $line; do
    echo "$count --> $var"
    let count++
done
```

#### 遍历数组元素（使用C语言格式，只针对普通数组）
```bash
arr=("apple" "banana" "orange")
for ((i=0; i<${#arr[*]}; i++)) {
    echo "C: fruit --> ${arr[$i]}"
}
```


### 循环语句 `while...do...done`

#### 常见用法示例
```bash
i=0
while [ $i -lt 3 ]; do
    echo "number --> $i"
    let i++
done
```

#### 使用`true`进行无限循环
```bash
i=0
while true; do
    if [ $i -lt 3 ]; then
        echo "true: number --> $i"
    else
        break    
    fi
    let i++
done
```

### 循环语句 `until...do...done`

#### 常见用法示例
```bash
i=0
until [ $i -eq 3 ]; do
    echo "number --> $i"
    let i++
done
```


## 关键字

这里只列出一些比较常用的关键字。

|关键字 |含义                   |
|-------|-----------------------|
|true   |内建命令，返回真值（0）|
|false  |内建命令，返回假值（1）|
|break  |跳出循环，和C语言一致  |
|continue|继续下次循环，和C语言一致|

### 示例

#### 使用函数每隔3秒钟执行一次用户提供的命令
```bash
$ repeat() { while true; do $@ && sleep 3; done }
$ repeat echo 'Hello World!'
Hello World!
Hello World!
Hello World!
...
```
细心的你会发现，`true`命令执行结果始终为0
```bash
$ true
$ echo $?
0
```
这一点和C等语言的`true`的值是不同的，但是含义都表示“真”。

C语言中的所有非0值都可以认为是`true`，0值认为是`false`；但是Shell中0值表示命令/函数执行成功（对应真值`true`），非0值表示命令/函数执行失败（对应假值`false`）。

## 其他

语句是以行为单位，即：如果一行就是一条语句的话，后面不用加分号';'标记一条语句结束；

如果一行中有多条语句，则语句之间使用分号';'进行分隔；


