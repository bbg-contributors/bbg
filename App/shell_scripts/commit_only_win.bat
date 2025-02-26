@echo off
REM Function to handle git commit
:git_commit_only
    REM Check if the user confirms the operation
    echo 你选择了仅提交更改但不推送，将要执行的指令如下，请确认：
    echo git add .
    echo git commit -m "site_update"
    echo.
    choice /m "确认操作？ (Y/N)"
    if errorlevel 2 goto :operation_cancelled
    if errorlevel 1 (
        
        REM Get the root directory from the argument
        set "rootDir=%~1"

        REM Check if rootDir is provided
        if "%rootDir%"=="" (
            echo Error: rootDir is not provided as an argument.
            pause
            exit /b 1
        )

        REM Check if rootDir exists and is a directory
        if not exist "%rootDir%\" (
            echo Error: rootDir provided '%rootDir%' does not exist or is not a directory.
            pause
            exit /b 1
        ) else if not exist "%rootDir%\NUL" (
            echo Error: rootDir provided '%rootDir%' does not exist or is not a directory.
            pause
            exit /b 1
        )

        REM Navigate to the root directory
        pushd "%rootDir%"
        if errorlevel 1 (
            echo Error: Could not navigate to directory: %rootDir%
            pause
            exit /b 1
        )

        REM Execute git add .
        git add .
        if errorlevel 1 (
            echo Error: git add . failed
            popd
            pause
            exit /b 1
        )

        REM Execute git commit -m "site_update"
        git commit -m "site_update"
        if errorlevel 1 (
            echo Error: git commit failed
            popd
            pause
            exit /b 1
        )

        REM Inform the user that the operation is complete
        echo 操作完成。
        popd
    )
    exit /b 0

:operation_cancelled
    echo Operation cancelled by user
    exit /b 0

REM Check if at least one argument is provided
if "%~1"=="" (
    echo Error: Please provide the root directory as an argument.
    pause
    exit /b 1
)

REM Call the function, passing the first argument as rootDir
call :git_commit_only "%~1"
pause
exit /b 0
