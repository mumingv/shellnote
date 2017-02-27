# 管理重任

## 简介


## 收集进程信息


## 杀死进程以及发送或响应信号


## 向用户终端发送信息


## 采集系统信息


## 使用proc采集信息


## 用cron进行调度


## 从Bash中读写MySQL数据库


## 用户管理脚本


## 图像文件的缩放及格式转换

前提：安装ImageMagick软件包，官方网站(http://www.imagemagick.org)。

```
$ sudo yum install ImageMagick
```

###  

#### 示例：转换图像文件格式

```
$ convert search.png search.jpeg
```


###  

#### 示例：修改图像尺寸, 单位：像素

```
$ convert search.png -resize 20x20 search_resize.png
```


## 从终端截图

前提：安装ImageMagick软件包，官方网站(http://www.imagemagick.org)。

```
$ sudo yum install ImageMagick
```

###   

#### 示例：失败，无法截图。

```
$ import -window work screenshot.png
import: unable to open X server `' @ error/import.c/ImportImageCommand/369.
```



## 管理多个终端


