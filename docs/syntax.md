# 语法

## 注释

Shell脚本中只支持单行注释，不支持多行注释(如C语言中的`/* ... */`)。

```bash
# 这是一行注释
```

```bash
echo "Hello World"  # 这是本行代码的注释
```

```bash
arr=("apple" "banana" "orange")
for ((i=0; i<${#arr[*]}; i++)) {
    echo "C: fruit --> ${arr[$i]}"
}
```

