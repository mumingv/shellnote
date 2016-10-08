# 正则表达式

## 分类

正则表达式主要有三种，分别是：基本正则表达式(basic)、扩展正则表达式(extended)以及Perl正则表达式(perl)。不同类别的正则表达式在语法上有所不同，详见相应章节的描述。

## 应用

Linux的很多命令都支持正则表达式，常见的有：

<table>
    <tr>
        <th>命令</th>
        <th>正则</th>
        <th>使用方法</th>
    </tr>
    <tr>
        <td rowspan="3">grep</td>
        <td>基本</td>
        <td>`grep 'pattern' file1 file2 ...`</td>
    </tr>
    <tr>
        <td>扩展</td>
        <td>`grep -E 'pattern' file1 file2 ...`</td>
    </tr>
    <tr>
        <td>Perl</td>
        <td>`grep -P 'pattern' file1 file2 ...`</td>
    </tr>
    <tr>
        <td>sed</td>
        <td>扩展</td>
        <td>`sed -r '/pattern/op' file1 file2 ...`</td>
    </tr>
    <tr>
        <td>awk</td>
        <td>扩展</td>
        <td>`awk '/pattern/ { statements }' file1 file2 ...`</td>
</table>
 
各主流编程语言也都支持正则表达式。
