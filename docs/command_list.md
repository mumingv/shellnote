# 命令列表

## ab

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


## crontab

###    

#### 示例：设置定时任务，每10分钟执行一次

```
$ crontab -e
...
$ crontab -l
*/10 * * * * sh /home/work/odp/app/audio/script/news/format_feed_category_dada_to_redis.sh online
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


## ls

### 

显示当前目录的详细信息：

```bash
$ ls -ld
drwxr-xr-x 2 root root 4096 Dec 16 01:25 .
```


## ps

### 

示例：根据进程ID查询线程信息。

```
$ ps -Lf 22728
UID        PID  PPID   LWP  C NLWP STIME TTY      STAT   TIME CMD
work     22728     1 22728  0    3 16:31 ?        Sl     0:19 redis-server *:6379
work     22728     1 22729  0    3 16:31 ?        Sl     0:00 redis-server *:6379
work     22728     1 22730  0    3 16:31 ?        Sl     0:00 redis-server *:6379
```

<font color="red">
说明：LWP表示线程ID，NLWP表示线程数量。
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
说明：大括号表示的为线程，如：{redis-server}。
</font>


## sort

|参数名称           |参数含义                           |
|-------------------|-----------------------------------|
|-t SEP             |指定字段分隔符（默认分隔符为空格、TAB等空白符号）|
|-k KEYDEF          |指定按照哪一个字段进行排序         |
|-n                 |将数字字符串安装数值大小排序（默认是按照字符串排序）|
|-r                 |降序排列（默认是升序排列）         |


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

