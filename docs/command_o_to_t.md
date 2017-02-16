# 命令 O-T

## tar - 打包目录和文件

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

