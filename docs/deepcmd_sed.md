# sed

## 基本语法


## 内建常量

######  

|常量名称			|含义						|
|---------------|---------------------------|
|xx 			|xx|


## 内建函数

######  

|函数名称			|含义						|
|---------------|---------------------------|
|			|						|

## 命令参数

######  

|常量名称			|含义						|
|---------------|---------------------------|
|-n, --quiet, --silent|不显示文本原有内容		|
|-i, --in-place |直接修改原文件结果不输出		|

	
## 命令示例

### 去除字符串中的子字符串（"\u0010"）

```
$ echo '{"key":"zhanggang_debug_monitor","name":"sysprofile","type":"string","value":"\u0010"}' | sed 's/\\u0010//g'
{"key":"zhanggang_debug_monitor","name":"sysprofile","type":"string","value":""}
```


### 替换代码中的某个字符串

```
$ find ./ -name '*.php' | xargs sed -i 's/insertTags/insertTagsWithQueryId/g'
```

### 替换目录下所有文件中的某个字符串

Linux环境下执行：

```
$ find . -type f -print0 | xargs -0 -I {} sed -i 's/标题/Mysql笔记/g' {}
```

有些Linux版本不支持xargs的-I参数，需要使用下面的命令。

```
$ find . -type f -print0 | xargs -0 --replace={} sed -i 's/streamFormat/stream_format/g' {}
```

注: Mac环境下该命令暂时不可用，待研究。

