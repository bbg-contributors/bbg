@echo off
REM 获取根目录
set "rootDir=%~1"

REM 检查是否提供了根目录
if "%rootDir%"=="" (
    echo 错误：请提供站点根目录作为第一个参数。
    exit /b 1
)

REM 检查根目录是否存在且是一个目录
if not exist "%rootDir%\" (
    echo 错误：提供的根目录 "%rootDir%" 不存在。
    exit /b 1
)

if not exist "%rootDir%\nul" (
    echo 错误：提供的根目录 "%rootDir%" 不是一个目录。
    exit /b 1
)

REM 切换到根目录
cd /d "%rootDir%"
if %errorlevel% neq 0 (
    echo 错误：无法切换到目录 "%rootDir%"。
    exit /b 1
)

REM 执行 git 命令
echo 你选择了提交更改并推送到远程仓库，将要执行的指令如下：
echo git add .
echo git commit -m "site_update"
echo git push

REM 确认是否执行
choice /m "是否确认执行？ [y/N]"
if %errorlevel% equ 1 (
    REM 添加所有更改
    git add .
    if %errorlevel% neq 0 (
        echo git add .  error!
        goto :error
    )
    

    REM 提交更改
    git commit -m "site_update"
    if %errorlevel% neq 0 (
        echo git commit error!
        goto :error
    )

    REM 推送到远程仓库
    git push
    if %errorlevel% equ 0 (
        echo 操作完成。
    ) else (
        echo 操作失败。请检查错误信息。
        goto :error
    )
) else (
    echo 已取消操作。
)

exit /b 0

:error
echo There is an error while running the script
exit /b 1
