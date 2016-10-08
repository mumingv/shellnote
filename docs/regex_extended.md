# 扩展正则表达式

## 语法概要

这里列出了扩展正则表达式的一些基本语法符号，详细的使用方法参考后面的各个示例。
（ERE = Extended Regular Expression）

|分类|ERE|描述|
|----|---------------------|----|----|
|位置标记|^|行起始标记|
||$|行结尾标记|
||\b|单词边界标记|
||\B|非单词边界标记|
||\<|单词起始标记|
||\>|单词结尾标记|
|单个字符|.|任意单个字符|
||[]|字符组当中的任意一个字符|
||[-]|字符范围当中的任意一个字符|
||[^]|除了字符组或字符范围之外的任意一个字符|
|分类字符I|\w|单词字符，等价于：[a-zA-Z0-9_]|
||\W|非单词字符，等价于：[^a-zA-Z0-9_]|
||\d|【ERE不支持】数字，等价于：[0-9]|
||\D|【ERE不支持】非数字，等价于：[^0-9]或[^d]|
||\s|空白字符，等价于：[ \n\r\t\f\v]|
||\S|非空白字符，等价于：[^ \n\r\t\f\v]|
|分类字符II|[[:cntrl:]]|控制字符，对应ASCII码：0x00-0x1F和0x7F|
||[[:print:]]|可打印字符，对应ASCII码：0x20-0x7E|
||[[:space:]]|空白字符，等价于：[ \n\r\t\f\v]|
||[[:graph:]]|非空格字符，对应ASCII码：0x21-0x7E|
||[[:punct:]]|标点，对应ASCII码：0x21-0x2F, 0x3A-0x40, 0x5B-0x60, 0x7B-0x7E|
||[[:alnum:]]|字母或数字，等价于：[a-zA-Z0-9]|
||[[:xdigit:]]|16进制数字，等价于：[0-9a-fA-F]|
||[[:alpha:]]|字母字符，等价于：[a-zA-Z]|
||[[:digit:]]|数字字符，等价于：[0-9]|
||[[:upper:]]|大写字母，等价于：[A-Z]|
||[[:lower:]]|小写字母，等价于：[a-z]|
|子串|()|创建一个用于匹配的子串|
||(&#124;)|创建一个用于匹配的二选一子串|
||\n|向后引用(back reference)匹配的子串|
|重复|?|0次或1次|
||*|0次或多次|
||+|1次或多次|
||{n}|n次|
||{n,}|至少n次|
||{,m}|至多m次|
||{n,m}|至少n次，至多m次|
|转义|\|转义|


## 位置标记

下面所描述的所有位置标记，均是指某个特定的位置，不会匹配任何实际的字符。

### 行起始标记 `^`

#### 匹配以字母'H'开头的行

```bash
$ echo -e "abcdefg\n1234567\nHello\nworld" | grep -E '^H'
Hello
```

### 行结尾标记 `$`

#### 匹配以字母'o'结尾的行

```bash
$ echo -e "abcdefg\n1234567\nHello\nworld" | grep -E 'o$'
Hello

```


### 单词边界标记 `\b`

单词边界指的是单词的起始位置或者结尾位置。通常用来表示单词边界的位置（或字符）通常有：行首、行尾、空格字符、TAB字符以及各标点符号。

#### 匹配以字母'H'作为单词起始字符的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E '\bH'
Hello
```

#### 匹配以字母'd'作为单词结尾字符的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E 'd\b'
world
Good morning
```

#### 行首作为单词边界
```bash
$ echo -e "123 def" | grep -E '\b[0-9]{3}\b'        
123 def
```

#### 行尾作为单词边界
```bash
$ echo -e "abc 123" | grep -E '\b[0-9]{3}\b'        
abc 123
```

#### TAB字符作为单词边界
```bash
$ echo -e "abc\t123\tdef" | grep -E '\b[0-9]{3}\b'  
abc     123     def
```

#### 下面的'123'没有单词边界，所以无法匹配
```bash
$ echo -e "abc123def" | grep -E '\b[0-9]{3}\b' 
```


### 非单词边界标记 `\B`

顾名思义，非单词边界是指除了能够标记单词边界的字符之外的其他字符所在的位置。

#### 匹配字母'b'，但'b'不是单词起始字符
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E '\Bb'
abcdefg
```

#### 匹配连续的三个数字，且其左右均无单词边界
```bash
$ echo -e "abc123def" | grep -E '\B[0-9]{3}\B'  
abc123def
```


### 单词起始标记 `\<`

#### 匹配以字母'H'作为单词起始字符的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E '\<H'
Hello
```
注：`\<H` 等同于 `\bH`。


### 单词结尾标记 `\>`

#### 匹配以字母'd'作为单词结尾字符的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E 'd\>'
world
Good morning
```
注：`d\>` 等同于 `d\b`。


## 单个字符

### 任意单个字符 `.`

#### 匹配字母'o'紧接任意一个字符的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E 'o.'
world 
Good morning
```


### 字符组当中的任意一个字符 `[]`

如果`[]`中的这组字符是连续的数字或者字母，可以使用`[-]`来表示。如：`[0123456789]`可以表示为`[0-9]`，`[abcdefghijklmnopqrstuvwxyz]`可以表示为`[a-z]`。

#### 匹配包含'0','1','2','3'之中任意一个数字字符的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E '[0123]'
1234567
```


### 字符范围当中的任意一个字符 `[-]`

`[-]`表示字符范围。通常用来表示连续的一组字母，如： `[a-z]`；或者用来表示连续的一组数字，如：`[0-9]`。

#### 匹配包含'0'到'3'之间任意一个数字字符的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E '[0-3]'
1234567
```
注：这里的`[0-3]`等同于`[0123]`。


### 除了字符组或字符范围之外的任意一个字符 `[^]`

#### 匹配包含除了'0'到'3'之间字符之外、任意一个数字字符的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E '[^0123]'
abcdefg
1234567
Hello
world
Good morning
```
或者
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E '[^0-3]'
abcdefg
1234567
Hello
world
Good morning
```

## 分类字符I

所谓分类字符，是指一类字符的集合。这里将其分成两个类别（分类字符I和分类字符II）是为了对应不同的书写格式。分类字符I对应使用转义字符 `\` 表示的分类字符，如：`\w`；而分类字符I对应使用方括号 `[]`表示的分类字符，如：`[:digit:]`。

### 单词字符 `\w`

单词字符是指能够组成单词的所有字符的集合，一般来说，其包含字母、数字和下划线（也就是和大多数编程语言中命名变量的字符集一致，比如：C语言就只允许使用字母、数字和下划线命名变量）。单词字符等价于：`[a-zA-Z0-9_]`。

#### 匹配任意一个单词
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning\nabc\tdef" | grep -E '\w+' -o
abcdefg
1234567
Hello
world
Good
morning
abc
def
```
注：`grep`命令的`-o`参数用来输出匹配上的字符串，而不是输出整行。


### 非单词字符 `\W`

顾名思义，非单词字符就是指除了单词字符之外的所有字符的集合。非单词字符等价于：`[^a-zA-Z0-9_]`。

#### 匹配包含任意一个非单词的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning\nabc\tdef" | grep -E '\W+'
Good morning  # 空格是非单词
abc     def   # TAB是非单词
```


### 空白字符 `\s`

空白字符`\s`等价于：`[ \n\r\t\f\v]`。其中，空格`' '`为可打印字符，其他五个字符为控制字符。

#### 匹配包含任意一个空白字符的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning\nabc\tdef" | grep -E '\s'
Good morning  # 空格是空白字符
abc     def  # TAB是空白字符
```


### 非空白字符 `\S`

顾名思义，非空白字符是指除了空白字符之外的所有字符。非空白字符`\S`等价于：`[^ \n\r\t\f\v]`。

#### 匹配包含任意一个非空白字符的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning\nabc\tdef" | grep -E '\S'
abcdefg 
1234567 
Hello 
world 
Good morning 
abc     def
```


## 分类字符II

### 控制字符 `[[:cntrl:]]`

控制字符`[[:cntrl:]]`对应的ASCII码为：0x00-0x1F和0x7F。

#### 匹配包含任意一个控制字符的行：
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning\nabc\tdef" | grep -E '[[:cntrl:]]'
abc     def  # TAB是控制字符，空格不是控制字符
```


### 可打印字符 `[[:print:]]`

#### 匹配包含任意一个可打印字符的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning\nabc\tdef" | grep -E '[[:print:]]'
abcdefg
1234567
Hello
world
Good morning  // 空格是可打印字符
abc     def   // TAB不是可打印字符
```


### 空白字符 `[[:space:]]`

空白字符`[[:space:]]`由一个可打印字符(空格`' ' `)和五个控制字符（`'\n\r\t\f\v'`）组成。

#### 匹配包含任意一个空白字符的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning\nabc\tdef" | grep -E '[[:space:]]'
Good morning
abc     def  # TAB是空白字符
```


### 非空格字符 `[[:graph:]]`

空格字符`[[:graph:]]`可以理解成从可打印字符中去掉空格，即：非空格可打印字符，对应的ASCII码为：0x21-0x7E。

#### 匹配包含任意一个字母或数字的行：
```bash
[work@CentOS ~]$ echo -e "abcdefg\n1234567\nXYZ" | grep -E '[[:graph:]]' 
abcdefg
1234567
XYZ
```

### 标点符号 `[[:punct:]]`

标点符号`[[:punct:]]`对应的ASCII码为：0x21-0x2F, 0x3A-0x40, 0x5B-0x60, 0x7B-0x7E。


### 字母或数字 `[[:alnum:]]`

字母或数字`[[:alpha:]]`等价于`[a-zA-Z0-9]`。

#### 匹配包含任意一个字母或数字的行：
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E '[[:alnum:]]'
abcdefg
1234567
Hello
world
Good morning
```
等价于
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E '[a-zA-Z0-9]'
abcdefg
1234567
Hello
world
Good morning
```


### 16进制数字字符 `[[:xdigit:]]`

16进制数字字符 `[[:xdigit:]]`，等价于：[0-9a-fA-F]。

#### 匹配包含任意一个小写字母的行
```bash
$ echo -e "abcdefg\n1234567\nXYZ" | grep -E '[[:xdigit:]]' 
abcdefg
1234567
```


### 字母字符 `[[:alpha:]]`

字母字符`[[:alpha:]]`等价于`[a-zA-Z]`。

#### 匹配包含任意一个字母的行：
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E '[[:alpha:]]'
abcdefg
Hello
world
Good morning
```
等价于
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E '[a-zA-Z]'
abcdefg
Hello
world
Good morning
```


### 数字字符 `[[:digit:]]`

数字字符`[[:digit:]]`等价于`[0-9]`。

#### 匹配包含任意一个数字的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E '[[:digit:]]'
1234567
```
等价于
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld\nGood morning" | grep -E '[0-9]'
1234567
```


### 大写字母 `[[:upper:]]`

大写字母`[[:lower:]]`等价于`[[:upper:]]`。

#### 匹配包含任意一个大写字母的行
```bash
$ echo -e "abcdefg\n1234567\nHELLO" | grep -E '[[:upper:]]'
HELLO
```

### 小写字母 `[[:lower:]]`

小写字母`[[:lower:]]`等价于`[[:lower:]]`。

#### 匹配包含任意一个小写字母的行
```bash
$ echo -e "abcdefg\n1234567\nHELLO" | grep -E '[[:lower:]]'
abcdefg
```


## 子串

### 创建一个用于匹配的子串 `()`

#### 匹配包含子串'abc'的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld" | grep -E '(abc)'
abcdefg
```


### 创建一个用于匹配的二选一子串 `(|)`

#### 匹配包含子串'abc'或者子串'123'的行
```bash
$ echo -e "abcdefg\n1234567\nHello\nworld" | grep -E '(abc|123)'
abcdefg
1234567
```


### 向后引用(back reference)匹配的子串 `\n`

正则表达式中可以包含多个使用`()`包含的子串，可以使用\1、\2、...、\n的形式来引用对应序号的子串。

#### 使用后向引用将`'digit 7'`改为`'digit-7'`
```bash
$ echo 'this is digit 7 in a number' | sed -r 's/(digit) ([0-9])/\1-\2/'  
this is digit-7 in a number
```


## 重复

可以将重复标记写在单个字符、分类字符或者子串的后面，表示对其进行重复匹配。

### 重复n次 `{n}`

#### 匹配有3个数字的行
```bash
$ echo -e "\n1\n12\n123\n1234\n12345\n123456" | grep -E '^[0-9]{3}$'
123
```


### 重复至少n次 `{n,}`

#### 匹配至少有3个数字的行
```bash
$ echo -e "\n1\n12\n123\n1234\n12345\n123456" | grep -E '^[0-9]{3,}$'
123
1234
12345
123456
```


### 重复至多m次 `{,m}`

#### 匹配至多有3个数字的行
```bash
$ echo -e "\n1\n12\n123\n1234\n12345\n123456" | grep -E '^[0-9]{,3}$'

1
12
123
```
等同于
```bash
$ echo -e "\n1\n12\n123\n1234\n12345\n123456" | grep -E '^[0-9]{0,3}$'

1
12
123
```


### 重复至少n次、至多m次 `{n,m}`

#### 匹配至少有3个数字并且至多有5个数字的行
```bash
$ echo -e "\n1\n12\n123\n1234\n12345\n123456" | grep -E '^[0-9]{3,5}$' 
123
1234
12345
```


### 重复0次或1次 `?`

#### 匹配空行或者只有一个数字的行
```bash
$ echo -e "\n1\n12\n123\n1234\n12345\n123456" | grep -E '^[0-9]?$'

1
```
等同于
```bash
$ echo -e "\n1\n12\n123\n1234\n12345\n123456" | grep -E '^[0-9]{0,1}$'

1
```


### 重复0次或多次 `*`

#### 匹配空行或者有多个数字的行
```bash
$ echo -e "\n1\n12\n123\n1234\n12345\n123456" | grep -E '^[0-9]*$'

1
12
123
1234
12345
123456
```
等同于
```bash
$ echo -e "\n1\n12\n123\n1234\n12345\n123456" | grep -E '^[0-9]{0,}$'  

1
12
123
1234
12345
```


### 重复1次或多次 `+`

#### 匹配至少有一个数字的行
```bash
$ echo -e "\n1\n12\n123\n1234\n12345\n123456" | grep -E '^[0-9]+$'
1
12
123
1234
12345
123456
```
等同于
```bash
[work@CentOS ~]$ echo -e "\n1\n12\n123\n1234\n12345\n123456" | grep -E '^[0-9]{1,}$' 
1
12
123
1234
12345
123456
```


## 转义

### 使用转义字符 `\`

转义字符`\`用来将字符由字面意义转换成特殊意义，如：`b`表示字母`'b'`的字面意义，而`\b`则表示单词边界标记这个特殊意义；或者用来将字符由特殊意义转换成字面意义，如：在扩展正则表达式中，`^`表示行起始标记这个特殊意义，而`\^`则表示字符`'^'`的字面意义。

需要特别注意的是，在不同类别的正则表达式中，一个字符是表示字面意义还是特殊意义是由各自实现的，有可能不同。比如：加号`+`在扩展正则表达式中表示特殊意义；但其在基本正则表达式中却表示字面意义，如果要表示特殊意义的话，就需要对其进行转义，写成`\+`的形式。

#### 匹配字符串'a^3'
```bash
$ echo -e "abc\n123\na^3" | grep -E 'a\^3'
a^3
```
如果写成下面的形式就无法匹配到字符串'a^3'
```bash
$ echo -e "abc\n123\na^3" | grep -E 'a^3'
```
