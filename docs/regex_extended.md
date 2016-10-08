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
|特殊表达|w|单词字符，等价于：[a-zA-Z0-9_]|
||d（不支持）|数字，等价于：[0-9]|
||D（不支持）|非数字，等价于：[^0-9]或[^d]|
||s|空白字符，如：空格、TAB、回车、换行|
||S|非空白字符，等价于：[^s]|
||[[:digit:]]|数字字符，等价于：[0-9]|
||[[:alpha:]]|字母字符，等价于：[a-zA-Z]|
||[[:alnum:]]|字母或数字，等价于：[a-zA-Z0-9]|
||[[:cntrl:]]|控制字符，如：TAB等|
||[[:graph:]]|非空格字符|
||[[:lower:]]|小写字母，等价于：[a-z]|
||[[:upper:]]|大写字母，等价于：[A-Z]|
||[[:print:]]|可打印字符，如：字母、数字、空格等|
||[[:punct:]]|标点，等价于：|
||[[:space:]]|空白字符，包括：空格、TAB|
||[[:xdigit:]]|16进制数字，等价于：[0-f]|
|子串|()|创建一个用于匹配的子串|
||(&#124;)|子串二选一|
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

