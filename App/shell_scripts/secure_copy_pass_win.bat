@echo off
setlocal enabledelayedexpansion

:: Function to perform secure copy with password authentication
:secure_copy_pass
    set "root_dir=%~1"

    :: Prompt the user for destination information
    set /p "dest_string=请输入服务器IP地址/SSH端口/用户名/要提交到的目录/密码（用空格隔开，例如 127.0.0.1 22 root /root/ password）: "

    :: Split the input string into an array
    set "count=0"
    for %%a in (%dest_string%) do (
        set "dest_array[!count!]=%%a"
        set /a "count+=1"
    )

    :: Check if enough parameters were provided
    if %count% LSS 5 (
        echo 错误：给定的参数不足。
        goto :eof
    )

    :: Assign the parameters to variables
    set "server_ip=!dest_array[0]!"
    set "ssh_port=!dest_array[1]!"
    set "username=!dest_array[2]!"
    set "remote_dir=!dest_array[3]!"
    set "password=!dest_array[4]!"

    :: Construct the command
    set "cmd=plink.exe -pw !password! -P !ssh_port! !username!@!server_ip! \"mkdir -p '!remote_dir!'\""
    echo 正在创建远程目录: !remote_dir!
    ::创建远程目录
    !cmd!
    if %ERRORLEVEL% NEQ 0 (
        echo 创建远程目录失败
        goto :eof
    )

    set "cmd=pscp.exe -pw !password! -P !ssh_port! -r "%root_dir%/*" !username!@!server_ip!:!remote_dir!"


    :: Confirm with the user
    echo 你选择了使用密码验证，将要执行的指令如下，请确认：
    echo !cmd!
    set /p "confirm=(y/n) "

    if /i "%confirm%"=="y" (
        :: Execute the command
        echo 正在上传文件，请稍候...
        !cmd!
        if %ERRORLEVEL% EQU 0 (
            echo 操作完成
        ) else (
            echo 操作失败
        )
    ) else (
        echo 操作已取消。
    )
    goto :eof

:: Check if a root directory is provided as an argument
if "%~1"=="" (
    echo Usage: %0 ^<root_directory^>
    echo Error: root directory is required as the first argument.
    exit /b 1
)

:: Check if the root directory exists
if not exist "%~1\" (
    echo Error: Directory '%~1' does not exist.
    exit /b 1
)

:: Example usage
call :secure_copy_pass "%~1"

exit /b 0
