#!/bin/bash

# Function to perform secure copy with password authentication
secure_copy_pass() {
    local dest_string
    local root_dir="$1"

    # Prompt the user for destination information
    read -r -p "请输入服务器IP地址/SSH端口/用户名/要提交到的目录/密码（用空格隔开，例如 127.0.0.1 22 root /root/ password）: " dest_string

    # Split the input string into an array
    IFS=' ' read -r -a dest_array <<< "$dest_string"

    # Check if enough parameters were provided
    if (( ${#dest_array[@]} < 5 )); then
        echo "错误：给定的参数不足。"
        return 1
    fi

    # Assign the parameters to variables
    local server_ip="${dest_array[0]}"
    local ssh_port="${dest_array[1]}"
    local username="${dest_array[2]}"
    local remote_dir="${dest_array[3]}"
    local password="${dest_array[4]}"

    # Construct the command
    local cmd="expect -c '
        spawn scp -P $ssh_port -r \"$root_dir\"/* $username@$server_ip:$remote_dir
        expect {
            \"yes/no\" { send \"yes\\r\"; exp_continue }
            \"password:\" { send \"$password\\r\" }
        }
        expect eof
    '"

    # Confirm with the user
    read -r -p "你选择了使用密码验证，将要执行的指令如下，请确认：\n$cmd\n(y/n) " confirm

    if [[ "$confirm" == "y" || "$confirm" == "Y" ]]; then
        # Execute the command
        eval "$cmd"
        if (( $? == 0 )); then
            echo "操作完成"
        else
            echo "操作失败"
            return 1
        fi
    else
        echo "操作已取消。"
        return 1
    fi
}

# Check if a root directory is provided as an argument
if [ -z "$1" ]; then
    echo "Usage: $0 <root_directory>"
    echo "Error: root directory is required as the first argument."
    exit 1
fi

# Check if the root directory exists
if [ ! -d "$1" ]; then
    echo "Error: Directory '$1' does not exist."
    exit 1
fi

# Example usage
secure_copy_pass "$1"

exit 0
