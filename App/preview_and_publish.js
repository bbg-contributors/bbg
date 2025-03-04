
const { exec } = require("child_process");
const Prompt = require("native-prompt");
const execSync = require("child_process").execSync;

const terminalEmulators = {
  "linux": ["konsole --noclose -e bash -c", "gnome-terminal -- bash -c ", "xterm -hold -e bash -c"],
  "darwin": ["Terminal.app", "iTerm.app"],
  "win32": ["wt", "cmd.exe"]
};

const getCurrentPlatform = () => {
  const platform = process.platform;
  if (platform === "linux") {
    return "linux";
  } else if (platform === "darwin") {
    return "darwin";
  } else if (platform === "win32") {
    return "win32";
  } else {
    throw new Error("Unsupported platform");
  }
};

module.exports = {
  "openInBrowser": function(){
    shell.openExternal("http://localhost:41701");
  },
  "commit_and_push": function(){
    if (window.confirm("你选择了提交更改并推送到远程仓库，将要执行的指令如下，请确认：\n git add . \n git commit -m \"site_update\" \n git push ")) {
      try {
        execSync(`cd ${rootDir} && git add . `);
        execSync(`cd ${rootDir} && git commit -m "site_update" `);
      } catch (error) {
        doNothing();
      }
  
      try {
        window.alert(`操作完成。\n${execSync(`cd ${rootDir} && git push`)}`);
      } catch (error) {
        window.alert(`操作失败。输出如下：\n${error}`);
      }
    }
  },
  "commit_only": function(){
    if (window.confirm("你选择了仅提交更改但不推送，将要执行的指令如下，请确认：\n git add . \n git commit -m \"site_update\"")) {
      try {
        execSync(`cd ${rootDir} && git add . `);
        execSync(`cd ${rootDir} && git commit -m "site_update" `);
      } catch (error) {
        doNothing();
      }
      window.alert("操作完成。");
    }
  },
  "secure_copy_pass": async function(){
    var dest = (await Prompt("", "请输入服务器IP地址/SSH端口/用户名/要提交到的目录/密码（用空格隔开，例如 127.0.0.1 22 root /root/ password）")).split(" ");
    if (dest.length < 5) window.alert("错误：给定的参数不足。");
    else {
      var cmd = `expect <<- EOF
  spawn sh -c "scp -P ${dest[1]} -r ${rootDir}/* ${dest[2]}@${dest[0]}:${dest[3]}"
  expect {
  "yes/no" { send "yes\\r"; exp_continue }
  "password:" { send "${dest[4]}\\r" }
  }
  expect eof
  EOF`;
      if (window.confirm(`你选择了使用密码验证，将要执行的指令如下，请确认：\n${cmd}`)) {
        try {
          execSync(cmd);
        } catch(error) {
          doNothing();
        }
      }
    }
  },
  "secure_copy_key": async function(){
    var dest = (await Prompt("", "请输入服务器IP地址/SSH端口/用户名/要提交到的目录/密钥位置（用空格隔开，例如 127.0.0.1 22 root /root/ ~/.ssh/id_rsa ，密钥位置可省略）")).split(" ");
    if (dest.length < 4) window.alert("错误：给定的参数不足。");
    else {
      if (dest.length == 4) dest[4] = "~/.ssh/id_rsa";
      var cmd = `scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -P ${dest[1]} -i ${dest[4]} -r ${rootDir}/* ${dest[2]}@${dest[0]}:${dest[3]}`;
      if (window.confirm(`你选择了使用密钥验证，将要执行的指令如下，请确认：${cmd}`)) {
        try {
          execSync(cmd);
        } catch(error) {
          doNothing();
        }
      }
    }
  },
};