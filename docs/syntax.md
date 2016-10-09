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

Shell不支持二维数组，如果需要使用二维数组，可以使用一维数组进行模拟。


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



