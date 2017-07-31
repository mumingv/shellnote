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

	
## 命令示例

### 去除字符串中的子字符串（"\u0010"）

```
$ echo '{"key":"zhanggang_debug_monitor","name":"sysprofile","type":"string","value":"\u0010"}' | sed 's/\\u0010//g'
{"key":"zhanggang_debug_monitor","name":"sysprofile","type":"string","value":""}
```


