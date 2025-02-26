#!/bin/bash

# Function to handle git commit
git_commit_only() {
    # Check if the user confirms the operation
    if (zenity --question --text "你选择了仅提交更改但不推送，将要执行的指令如下，请确认：\n git add . \n git commit -m \"site_update\""); then
        # Get the root directory from the argument
        local rootDir="$1"

        # Check if rootDir is provided
        if [ -z "${rootDir}" ]; then
            zenity --error --text "Error: rootDir is not provided as an argument."
            exit 1
        fi

        # Check if rootDir exists and is a directory
        if [ ! -d "${rootDir}" ]; then
            zenity --error --text "Error: rootDir provided '${rootDir}' does not exist or is not a directory."
            exit 1
        fi

        # Navigate to the root directory
        cd "${rootDir}" || {
            zenity --error --text "Error: Could not navigate to directory: ${rootDir}"
            exit 1
        }

        # Execute git add .
        git add .
        if [ $? -ne 0 ]; then
            zenity --error --text "Error: git add . failed"
            exit 1
        fi

        # Execute git commit -m "site_update"
        git commit -m "site_update"
        if [ $? -ne 0 ]; then
            zenity --error --text "Error: git commit failed"
            exit 1
        fi
        
        # Inform the user that the operation is complete
        zenity --info --text "操作完成。"
    else
        echo "Operation cancelled by user"
    fi
}

# Check if at least one argument is provided
if [ $# -eq 0 ]; then
    zenity --error --text "Error: Please provide the root directory as an argument."
    exit 1
fi

# Call the function, passing the first argument as rootDir
git_commit_only "$1"
