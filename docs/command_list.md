# 命令列表

## ab

######  

|参数名称           |参数含义                           |
|-------------------|-----------------------------------|
|-n requests        |发送的HTTP请求的总数               |
|-c concurrency     |并发数（即：模拟用户数）           |
|-k                 |使用长连接模式                     |

###  

#### 示例：10并发，总共发送1000次HTTP请求

```
$ ab -c 10 -n 1000 http://123.56.21.232:8206/index.html
This is ApacheBench, Version 2.3 <$Revision: 1430300 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking 123.56.21.232 (be patient)
Completed 100 requests
Completed 200 requests
Completed 300 requests
Completed 400 requests
Completed 500 requests
Completed 600 requests
Completed 700 requests
Completed 800 requests
Completed 900 requests
Completed 1000 requests
Finished 1000 requests


Server Software:        nginx/1.8.0
Server Hostname:        123.56.21.232
Server Port:            8206

Document Path:          /index.html
Document Length:        1300 bytes

Concurrency Level:      10
Time taken for tests:   8.566 seconds
Complete requests:      1000
Failed requests:        0
Write errors:           0
Total transferred:      1749000 bytes
HTML transferred:       1300000 bytes
Requests per second:    116.75 [#/sec] (mean)
Time per request:       85.656 [ms] (mean)
Time per request:       8.566 [ms] (mean, across all concurrent requests)
Transfer rate:          199.40 [Kbytes/sec] received

Connection Times (ms)
              min  mean[+/-sd] median   max
Connect:        0   41  19.0     45      74
Processing:     1   44  19.0     47      75
Waiting:        1   43  18.7     45      74
Total:          1   85  30.9     97     110

Percentage of the requests served within a certain time (ms)
  50%     97
  66%     99
  75%    100
  80%    100
  90%    101
  95%    105
  98%    107
  99%    107
 100%    110 (longest request)
```

结果中重点字段的含义：

|字段名称           |字段含义                           |
|-------------------|-----------------------------------|
|Requests per second|每秒请求数，即：Web服务器的吞吐率。</br>计算公式：Complete requests / Time taken for tests  |


## awk

######  

|参数名称           |参数含义                           |
|-------------------|-----------------------------------|
|-F fs              |指定分隔符                         |

###  

#### 示例：统计平均耗时

```
$ head -4 access.log.2017060211 | awk -F ' ' 'BEGIN{sum=0} {sum+=$10} END{print sum, sum/NR}'  
3131 782.75
```


#### 示例：以空格作为分隔符，过滤第一列内容

```
$ cat input.txt 
姓名 年龄 标签
张三 23 愤青
李四 21 文艺青年
王五 18 学生
```
```
$ awk -F ' ' '{print $1}' input.txt
姓名
张三
李四
王五
```


#### 示例：将文件中的所有行合并成一行，以逗号分隔

```
$ cat category 
国际
国内
体育
娱乐
社会
财经
互联网
科技
房产
汽车
$ cat category | awk '{printf $1","}' 
国际,国内,体育,娱乐,社会,财经,互联网,科技,房产,汽车
```


## bash

######  

|参数名称           |参数含义                           |
|-------------------|-----------------------------------|
|-c string          |执行的命令由string指定             |

###  

#### 示例：执行远程脚本

```bash
$ bash -c "$(curl http://jumbo.baidu.com/install_jumbo.sh)"; source ~/.bashrc
```

说明：`$()`用于命令替换，和两个反撇号一样。即：将curl命令的结果替换到双引号当中，作为-c参数的输入。


## cal

###### 

### 

#### 示例：查看日历

```
$ cal
```
```
     九月 2017
日 一 二 三 四 五 六
                1  2
 3  4  5  6  7  8  9
10 11 12 13 14 15 16
17 18 19 20 21 22 23
24 25 26 27 28 29 30
```


## comm

######  

|参数名称           |参数含义                           |
|-------------------|-----------------------------------|
|-1                 |不显示第1行                        |
|-2                 |不显示第2行                        |
|-3                 |不显示第3行                        |

###  

#### 示例：求两个文件的交集、差集

```
$ cat test1
美图
女人
美食
家居
健康
两性
情感
星座命理
育儿
文化
$ cat test2
家居
八卦
情感
```

交集：
```
$ comm -12 <(sort test1 | uniq) <(sort test2 | uniq)
家居
情感
```

差集：test1 - test2
```
$ comm -23 <(sort test1 | uniq) <(sort test2 | uniq)  
两性
健康
女人
文化
星座命理
美图
美食
育儿
```

差集：test2 - test1
```
$ comm -13 <(sort test1 | uniq) <(sort test2 | uniq)
八卦
```

## cut

######   

|参数名称                   |参数含义                           |
|--------------------------|----------------------------------|
|-d                         |指定分隔字符                       |
|-b                         |每个字节作为一列，列的编号从1开始      |
|-c                         |每个字符作为一列，列的编号从1开始      |
|-f                         |每个字段作为一列，列的编号从1开始。默认字段分隔符为TAB键 |

###  

#### 示例：截取从第9列及其之后的所有列（每列由空格分隔）

```
$ cat file | cut -d' ' -f9-
```


## crontab

###  

#### 示例：设置定时任务，每10分钟执行一次

```
$ crontab -e
...
$ crontab -l
*/10 * * * * sh /home/work/odp/app/audio/script/news/format_feed_category_dada_to_redis.sh online
```


###  

#### 参考资料

http://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/crontab.html


## curl

######  

|参数名称                   |参数含义                           |
|---------------------------|-----------------------------------|
|-s, --silent               |安静模式                           |
|-o, --output <file>        |指定输出文件                       |
|-w, --write-out <format>   |指定输出格式(如:时间)              |
|--connect-timeout <seconds>|指定连接超时时间                   |
|-m, --max-time <seconds>   |指定最大处理时间                   |

######  

|-w参数取值                 |取值含义                           |
|---------------------------|-----------------------------------|
|time_connect               |从开始到完成TCP连接的时间(秒)      |
|time_starttransfer         |从开始到即将开始传输的时间(秒)     |
|time_total                 |从开始到最终完成的时间(秒)         |

### 

#### 示例：查看curl的耗时

```
curl -o /dev/null -s -w %{time_connect}:%{time_starttransfer}:%{time_total} 'http://123.56.21.232:8254/myprojects/demo/get_json_data.php'
```
```
0.001:1.002:1.002
```


#### 示例：设置超时时间，并且超时

```
$ curl --max-time 1 'http://123.56.21.232:8254/myprojects/demo/get_json_data.php'
curl: (28) Operation timed out after 1001 milliseconds with 0 out of -1 bytes received
```


## date

######  

|参数名称                   |参数含义                           |
|-------------------------|-----------------------------------|
|-d, --date=STRING        |用字符串描述的时间，如：'yesterday'、'+1 days'  |

### 

#### 示例：时间戳和日期互转

日期转时间戳

```
date -d today +%s  # 1505890849
```

时间戳转日期（仅Mac适用）

```
date -d @1505890849 +%F  # 2017-09-20
```


#### 示例：根据字符串描述获取日期

单词表示

```
date -d yesterday +%F  # 2017-09-19
```
```
date -d tomorrow +%F  # 2017-09-21
```

next/last表示

```
date -d last-day +%F
date -d 'last day' +%F
date -d last-week +%F
date -d 'last week' +%F
date -d last-month +%F
date -d 'last month' +%F
date -d last-year +%F
date -d 'last year' +%F
```
```
date -d next-day +%F
date -d 'next day' +%F 
date -d next-week +%F 
date -d 'next week' +%F 
date -d next-month +%F 
date -d 'next month' +%F 
date -d next-year +%F 
date -d 'next year' +%F 
```

正负数/ago表示(单位单复数的效果是一样的)

```
date -d '-1 day' +%F
date -d '-1 days' +%F
```
```
date -d '1 day ago' +%F
date -d '1 days ago' +%F
```
```
date -d '1 day' +%F
date -d '1 days' +%F
```
```
date -d '+1 day' +%F
date -d '+1 days' +%F
```

基于指定日期的时间设置

```
date -d 'aug 16 -1 day' +%F
```
```
date -d 'aug 16 1 day' +%F
```


## expr

###### 

#### 示例：简单四则运算

<font color="red">
乘法符号*会被解析成通配符，需要进行转义。
</font>

```
expr 2 + 3   # 5
expr 2 - 3   # -1
expr 2 \* 3  # 6
expr 2 / 3   # 0
expr 2 % 3   # 2
```


#### 示例：复杂四则运算

```
expr `expr 2 + 3` \* 4  # 20
```


## find

######  

|参数名称                   |参数含义                           |
|-------------------------|-----------------------------------|

### 

#### 查询当前目录下的所有子目录和文件

<font color="red">
说明：该方法列出的文件和目录是以绝对路径的形式显示的。
</font>

```
$ find $PWD
/Users/muming/Sites/shell/demo/datetime
/Users/muming/Sites/shell/demo/datetime/date_loop.sh
```


## grep

###  

示例：求两个文件的交集、差集

```
$ cat test1
美图
女人
美食
家居
健康
两性
情感
星座命理
育儿
文化
$ cat test2
家居
八卦
情感
```

交集：
```
$ grep -F -f test1 test2
家居
情感
```

差集：test2 - test1
```
$ grep -F -v -f test1 test2   
八卦
```

差集：test1 - test2
```
$ grep -F -v -f test2 test1
美图
女人
美食
健康
两性
星座命理
育儿
文化
```


## jq

前期：需要使用brew或yum安装。

mac:

```
$ brew install jq
```

linux:

```
$ yum install jq
```

###  

官方文档：https://stedolan.github.io/jq/manual/

###  

参考资料：http://www.rendoumi.com/linuxxia-ru-he-zai-ming-ling-xing-jie-xi-jsonwen-jian/

###  

#### 示例：查看格式化后的json数据

```
$ cat json.txt
{"logid":"15020935445408","CUID":"yinjie05_debug_monitor","request_uid":"case_request_uid_20170807"}
{"logid":"15020935445410","CUID":"test_debug_monitor","request_uid":"case_request_uid_test"}
```
```
$ cat json.txt | jq .
{
  "logid": "15020935445408",
  "CUID": "yinjie05_debug_monitor",
  "request_uid": "case_request_uid_20170807"
}
{
  "logid": "15020935445410",
  "CUID": "test_debug_monitor",
  "request_uid": "case_request_uid_test"
}
```


#### 示例：提取logid字段的值

```
$ cat json.txt | jq '.logid'
"15020935445408"
"15020935445410"
```


#### 示例：提取logid字段的值，且结果中不显示引号

```
$ cat json.txt | jq -r '.logid'
15020935445408
15020935445410
```


#### 示例：使用数组下标提取值

```
$ echo '[{"foo": 1}, {"bar": 2}]' | jq '.[1]'
{
  "bar": 2
}
```


## kibitz

前提：安装tcl和expect。

### 

使用步骤如下：

1.查看目标用户的用户名和TTY编号

```
[work@CentOS ~]$ w
 22:58:40 up 7 days,  7:29,  2 users,  load average: 0.00, 0.01, 0.05
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
work     pts/2    60.253.155.82    22:13    0.00s  0.07s  0.00s w
angela   pts/3    60.253.155.82    22:58    6.00s  0.02s  0.02s -bash
```

2.给目标用户发送请求

```
[work@CentOS ~]$ kibitz -tty pts/3 angela
asking angela to type:  kibitz -2519
Escape sequence is ^]
```

3.目标用户接受请求(需要根据提示手工输入kibitz -xxxx)

```
[angela@CentOS ~]$ 
Message from work@master on pts/2 at 23:00 ...
Can we talk? Run: kibitz -2519
EOF
kibitz -2519
Escape sequence is ^]
[work@CentOS ~]$
```


## locale

######  

###  

示例：显示当前配置的公共语言环境信息

```
$ locale
LANG="zh_CN.UTF-8"
LC_COLLATE="zh_CN.UTF-8"
LC_CTYPE="zh_CN.UTF-8"
LC_MESSAGES="zh_CN.UTF-8"
LC_MONETARY="zh_CN.UTF-8"
LC_NUMERIC="zh_CN.UTF-8"
LC_TIME="zh_CN.UTF-8"
LC_ALL=
```

示例：显示所有可用的公共语言环境名称

```
$ locale -a
zh_CN
zh_CN.eucCN
zh_CN.GB18030
zh_CN.GB2312
zh_CN.GBK
zh_CN.UTF-8
zh_HK
zh_HK.Big5HKSCS
zh_HK.UTF-8
zh_TW
zh_TW.Big5
zh_TW.UTF-8
C
POSIX
```


## ls

######  

|参数名称           |参数含义                           |
|-------------------|-----------------------------------|
|-1                 |一行显示一个文件名称               |
|-d, --directory    |显示目录本身的信息，而不是其内容   |

### 

示例：一行显示一个文件名称

```
$ ls
angela  bin  books
$ ls -1
angela
bin
books
```

示例：显示当前目录的详细信息

```bash
$ ls -ld
drwxr-xr-x 2 root root 4096 Dec 16 01:25 .
```


## lsof

######  

|参数名称           |参数含义                           |
|------------------|-----------------------------------|
|-p               |根据进程ID列表查询进程对应的文件|
|-i               |根据IP地址／端口号查询进程信息|

###  

#### 示例：根据进程ID查询该进程打开的文件。源码：[链接](https://github.com/mumingv/shell/tree/master/command/strace/testlsof)。

```
$ ./a.out &
[1] 17470
$ lsof -p 17470
COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF    NODE NAME
...
a.out   17470 work    3r   REG  202,1        0  289936 /tmp/foo
```


#### 示例：根据端口号查询进程信息

```
$ lsof -i:8181
COMMAND PID     USER   FD   TYPE    DEVICE SIZE/OFF NODE NAME
nginx   986 yinjie05    8u  IPv4 230185288     0t64  TCP *:8181 (LISTEN)
nginx   987 yinjie05    8u  IPv4 230185288     0t64  TCP *:8181 (LISTEN)
nginx   988 yinjie05    8u  IPv4 230185288     0t64  TCP *:8181 (LISTEN)
```


## mutt

######    

### 示例：待补充


## netstat 

######  

|参数名称           |参数含义                           |
|-------------------|-----------------------------------|
|--numeric, -n      |主机名、端口号、用户名显示为数字格式, 默认为字母格式|

### 示例：查询tcp连接信息(客户端、服务器的IP和端口号)

```shell
$ netstat -n | awk '/^tcp/'
tcp        0      0 172.17.0.1:45138        172.17.0.1:1234         ESTABLISHED
tcp        0      0 172.17.0.1:45140        172.17.0.1:1234         ESTABLISHED
tcp        0      0 172.17.0.1:45136        172.17.0.1:1234         ESTABLISHED
```


## open

### 示例：打开一个URL页面

对于一个http网址，命令会自动在浏览器中打开该URL。

```
$ open http://localhost:8080
```


## ps

######  

|参数名称           |参数含义                           |
|-------------------|-----------------------------------|
|-L                 |显示线程信息                       |
|-f                 |显示完整的列(full-format)          |

### 示例：根据进程ID查询线程信息。 

```
$ ps -Lf 22728
UID        PID  PPID   LWP  C NLWP STIME TTY      STAT   TIME CMD
work     22728     1 22728  0    3 16:31 ?        Sl     0:19 redis-server *:6379
work     22728     1 22729  0    3 16:31 ?        Sl     0:00 redis-server *:6379
work     22728     1 22730  0    3 16:31 ?        Sl     0:00 redis-server *:6379
```

<font color="red">
说明：LWP表示线程ID(thread ID)，NLWP表示线程数量(number of threads)。
</font>


## pstack

### 

示例：查询redis-server各线程的堆栈信息。

```
$ ps -Lf 22728
UID        PID  PPID   LWP  C NLWP STIME TTY      STAT   TIME CMD
work     22728     1 22728  0    3 16:31 ?        Sl     0:20 redis-server *:6379
work     22728     1 22729  0    3 16:31 ?        Sl     0:00 redis-server *:6379
work     22728     1 22730  0    3 16:31 ?        Sl     0:00 redis-server *:6379
[work@CentOS docs]$ pstack 22728
Thread 3 (Thread 0x7f36bbed6700 (LWP 22729)):
#0  0x00007f36c318f6d5 in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f36c3d53f35 in bioProcessBackgroundJobs ()
#2  0x00007f36c318bdc5 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f36c2eba73d in clone () from /lib64/libc.so.6
Thread 2 (Thread 0x7f36bb6d5700 (LWP 22730)):
#0  0x00007f36c318f6d5 in pthread_cond_wait@@GLIBC_2.3.2 () from /lib64/libpthread.so.0
#1  0x00007f36c3d53f35 in bioProcessBackgroundJobs ()
#2  0x00007f36c318bdc5 in start_thread () from /lib64/libpthread.so.0
#3  0x00007f36c2eba73d in clone () from /lib64/libc.so.6
Thread 1 (Thread 0x7f36c3ce7780 (LWP 22728)):
#0  0x00007f36c2ebad13 in epoll_wait () from /lib64/libc.so.6
#1  0x00007f36c3d171ef in aeProcessEvents ()
#2  0x00007f36c3d1765b in aeMain ()
#3  0x00007f36c3d162e9 in main ()
```


## pstree

### 

示例：查询work用户的进程树，并显示各进程和线程的ID。

```
$ pstree work -p
nginx(23729)─┬─nginx(23730)
             └─nginx(23731)

php-cgi(23750)─┬─php-cgi(23751)
               ├─php-cgi(23752)
               ├─php-cgi(23753)
               ├─php-cgi(23754)
               ├─php-cgi(23755)
               ├─php-cgi(23756)
               ├─php-cgi(23757)
               └─php-cgi(23758)

redis-server(22728)─┬─{redis-server}(22729)
                    └─{redis-server}(22730)
```

<font color="red">
说明：大括号表示线程，如：{redis-server}。
</font>


## sed

######  

|参数名称               |参数含义                           |
|-----------------------|-----------------------------------|
|-r, --regexp-extended  |扩展正则表达式                     |

###  

#### 示例：使用后向匹配提取子字符串

```
$ echo "987.[没有数据]湖南道县新闻.txt" | sed -r 's/.*](.*)\.txt/\1/'
湖南道县新闻
```


## sort

######  

|参数名称           |参数含义                           |
|-------------------|-----------------------------------|
|-t SEP             |指定字段分隔符（默认分隔符为空格、TAB等空白符号）|
|-k KEYDEF          |指定按照哪一个字段进行排序         |
|-n                 |将数字字符串按照数值大小排序（默认是按照字符串排序）|
|-r                 |降序排列（默认是升序排列）         |

######   

<font color="red">
说明：如果需要将TAB键指定为字段分隔符的话，有下面两种方法。</br>
1. 使用`-t $'\t'`表示；</br>
2. 使用`-t '<ctrl+v><tab>'`输入。
</font>

### 

#### 示例：按照第二列的整数由大到小排序

```
$ cat news_query.txt | head -n 10 | sort -t$'\t' -k2 -nr
孙鸿志  146     0       0       0       0       0       146     5
家居新闻        46      0       0       0       0       23      23      5
武钢股份退市    37      0       0       0       0       11      26      5
置换债券        28      0       0       2       2       16      8       5
迪士尼郑州      24      0       0       0       0       0       24      5
男孩被藏獒咬断喉咙      22      0       0       0       0       0       22      5
琴音和玄        19      0       0       0       1       0       18      5
上海梦花街      16      0       0       0       0       2       14      5
安记紫菜 塑料袋 12      0       0       0       0       12      0       4
商河爆炸        6       0       0       0       0       0       6       5
```

## stat

###### 

### 

#### 示例：查看文件的修改时间

```
$ stat smarttv_timely_dict_20171128.txt
  File: `smarttv_timely_dict_20171128.txt'
  Size: 25122           Blocks: 56         IO Block: 4096   regular file
Device: fd10h/64784d    Inode: 4292975     Links: 1
Access: (0664/-rw-rw-r--)  Uid: (  503/yinjie)   Gid: (  505/yinjie)
Access: 2017-11-30 10:11:17.000000000 +0800
Modify: 2017-11-30 10:09:39.000000000 +0800
Change: 2017-11-30 10:09:39.000000000 +0800
```


## strace

######  

|参数名称           |参数含义                           |
|-------------------|-----------------------------------|
|-o filename        |将输出保存到指定的文件             |

###  

示例：跟踪lsof的系统调用，查看打开文件'/tmp/foo'所使用的方法。源码：[链接](https://github.com/mumingv/shell/tree/master/command/strace/testlsof)。

```
$ gcc testlsof.c
$ ./a.out &
[2] 17795
$ strace -o lsof.strace lsof -p 17755
$ grep '/tmp/foo' lsof.strace 
readlink("/proc/17755/fd/3", "/tmp/foo", 4096) = 8
```


## tar

### 不同格式的压缩和解压方法

tar格式的打包和解压，没有使用压缩算法。

```
$ tar cvf abc.tar abc
$ tar xvf abc.tar
```

tar.gz格式的压缩和解压，gz是gzip压缩算法的缩写。

```
$ tar cvzf abc.tar.gz abc
$ tar xvzf abc.tar.gz 
```

tar.bz2格式的压缩和解压，bz2是bzip2压缩算法的缩写。

```
$ tar cvjf abc.tar.bz2 abc
$ tar xvjf abc.tar.bz2
```

tar.Z格式的压缩和解压，Z是compress压缩算法的缩写。
<font color="red">
使用compress命令需要先安装对应的软件包ncompress。
</font>

```
$ sudo yum install ncompress
$ tar cvZf abc.tar.Z
$ tar xvZf abc.tar.Z
```


### 

#### 示例：压缩和解压多个目录

```
$ tar cvzf enrich.tar.gz enrich/actions/ enrich/models/ enrich/script/
```
```
$ tar xvzf enrich.tar.gz
$ ll
drwxrwxr-x  5 mumingv mumingv  4096 Dec  3 11:39 enrich
-rw-rw-r--  1 mumingv mumingv 77420 Dec  3 11:39 enrich.tar.gz
```



## time

###  

#### 示例：统计获取大搜检索接口数据所需的时间

```
$ time wget 'http://www.baidu.com/ns?ct=1&rn=10&ie=utf-8&rsv_bp=1&sr=0&cl=2&f=8&prevct=no&tn=json_webapp&word=刘德华'
...
real    0m0.119s
user    0m0.002s
sys     0m0.002s
```


## tr

###  

#### 示例：删除文本中的空格

```
$ echo 'Hello world' | tr -d ' '
Helloworld
```


## watch

被watch的命令默认每隔2秒执行一次。

### 

#### 示例：查看当前目录下文件数量的变化

```
$ watch 'ls -1 | wc -l'
```

<font color="red">
说明：被watch的命令需要使用引号括起来。
</font>


## wc

######  

###  

#### 示例：统计文件中的行数（去除空行）

```bash
$ cat query.all | grep -v ^$ | wc -l
```


## wget

######   

|参数名称                    |参数含义                           |
|---------------------------|---------------------------------|
|-c, --continue             |断电续传                         |
|-q, --quite                |不打印输出                        |
|-k, --convert-links        |将绝对链接转为相对链接，下载整个站点后脱机浏览网页，最好加上这个参数|
|-p, --page-requisites      |下载网页所需的所有文件，如图片等     |
|-L, --relative             |递归时不进入其它主机               |
|-r, --recursive            |递归下载                          |
|-nd, --no-directories      |递归下载时不创建一层一层的目录，把所有的文件下载到当前目录|
|-nH, --no-host-directories |不要主机目录                       |
|-np, --no-parent           |递归下载时不搜索上层目录             |


### 

#### 示例：下载站点的所有目录和文件

```
$ wget -r -nH http://cp01-shifen-001.cp01.baidu.com:8030/
$ ls -1
http_server.py
index.html
newnext.tar.gz
news_query.php
nohup.out
playcontent.tar.gz
test.txt
```


#### 示例：下载站点的某个目录

```
$ wget -q -c -r -nH -np -k -L -p http://nj03-wise-2www099.nj03.baidu.com:8020/20170926/
$ ls -1
20170926
```




