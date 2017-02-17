# 命令 H-N

## kibitz - allow two people to interact with one shell 师徒对话

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


## ls - list directory contents 显示目录内容

### 

显示当前目录的详细信息：

```bash
$ ls -ld
drwxr-xr-x 2 root root 4096 Dec 16 01:25 .
```

