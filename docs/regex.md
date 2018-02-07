# 正则表达式

## 分类

正则表达式引擎有两种，分别是：DFA和NFA。

正则表达式流派有三种，分别是：基本正则表达式(basic)、扩展正则表达式(extended)以及Perl正则表达式(perl)。不同类别的正则表达式在语法上有所不同，详见相应章节的描述。


## 从引擎分类

###### 

|正则引擎         |软件                          |
|------------|---------------------------------|
|DFA         |mysql、egrep、flex、awk           |
|NFA         |perl、java、grep、more、vi、php    |
|DFA&NFA混合  |tcl                              |


## 从应用分类

Linux的很多命令都支持正则表达式，常见的有：

<table>
    <tr>
        <th>命令</th>
        <th>正则流派</th>
        <th>使用方法</th>
    </tr>
    <tr>
        <td rowspan="3">grep</td>
        <td>基本</td>
        <td>grep 'pattern' file1 file2 ...</td>
    </tr>
    <tr>
        <td>扩展</td>
        <td>grep -E 'pattern' file1 file2 ...</td>
    </tr>
    <tr>
        <td>Perl</td>
        <td>grep -P 'pattern' file1 file2 ...</td>
    </tr>
    <tr>
        <td rowspan="4">sed</td>
        <td>基本</td>
        <td>sed '/pattern/op' file1 file2 ...</td>
    </tr>
    <tr>
        <td>基本(替换)</td>
        <td>sed 's/pattern/replace/g' file1 file2 ...</td>
    </tr>
    <tr>
        <td>扩展</td>
        <td>sed -r '/pattern/op' file1 file2 ...</td>
    </tr>
    <tr>
        <td>扩展(替换)</td>
        <td>sed -r 's/pattern/replace/g' file1 file2 ...</td>
    </tr>
    <tr>
        <td>awk</td>
        <td>扩展</td>
        <td>awk 'BEGIN { statements } pattern { statements } END { statements }' file1 file2 ...</td>
    </tr>
    <tr>
        <td>vim</td>
        <td>基本</td>
        <td>:%s/pattern/replace/gc</td>
    </tr>
</table>
 
各主流编程语言也都支持正则表达式。
