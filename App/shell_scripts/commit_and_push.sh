#!/bin/bash

# 获取根目录
rootDir="$1"

# 检查是否提供了根目录
if [ -z "$rootDir" ]; then
    echo "错误：请提供站点根目录作为第一个参数。"
    exit 1
fi

# 检查根目录是否存在且是一个目录
if [ ! -d "$rootDir" ]; then
    echo "错误：提供的根目录 '$rootDir' 不存在或不是一个目录。"
    exit 1
fi

# 切换到根目录
cd "$rootDir" || exit 1

# 执行 git 命令
echo "你选择了提交更改并推送到远程仓库，将要执行的指令如下："
echo "git add ."
echo "git commit -m \"site_update\""
echo "git push"

# 确认是否执行
read -r -p "是否确认执行？ [y/N] " response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    # 添加所有更改
    git add .

    # 提交更改
    git commit -m "site_update"

    # 推送到远程仓库
    git push
    if [ $? -eq 0 ]; then
        echo "操作完成。"
    else
        echo "操作失败。请检查错误信息。"
    fi
else
    echo "已取消操作。"
fi

exit 0
