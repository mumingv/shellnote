# 命令列表

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

