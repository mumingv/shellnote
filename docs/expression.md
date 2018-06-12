# 表达式汇总

###### 

|表达式 		|含义							|备注			|
|-----------|-------------------------------|---------------|
|[...]		|测试表达式是否为真。如：用于if语句。	||
|${N} 		|N>0，引用函数的位置参数			||
|$N  		|N>0, 当N为个位数时与${N}相同		||
|$*			|"$*"等价于"$1c$2c…"				|3.4.2 Special Parameters|
|$@ 		|"$@"等价于"$1" "$2" …			|3.4.2 Special Parameters|
|$#			|参数个数							|3.4.2 Special Parameters|
|$?			|返回码							|3.4.2 Special Parameters|
|$-			|								|3.4.2 Special Parameters|
|$$			|进程ID							|3.4.2 Special Parameters|
|$!			|后台进程ID						|3.4.2 Special Parameters|
|$0 		|脚本文件名称 						|3.4.2 Special Parameters|
|$_ 		|								|3.4.2 Special Parameters|

