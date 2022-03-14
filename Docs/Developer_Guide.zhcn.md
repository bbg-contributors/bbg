# 开发环境搭建

**建议使用 [Visual Studio Code](https://code.visualstudio.com/) 开发此项目，尽管并不是必须的。**

---

首先确保计算机上已经安装：

* Git
* Node.js 运行时 版本 >= 16
* CNPM

注意：**为了避免网络问题，BBG 项目自 2021 年 12 月 26 日起使用 CNPM 作为项目的包管理器。如果你还没有安装 CNPM ，请执行 ```npm install -g cnpm --registry=https://registry.npmmirror.com``` 进行安装（Linux 下可能需要 root 权限）**

然后获取源代码。

```
git clone https://github.com/baiyang-lzy/bbg.git
```

然后转到项目根目录下执行：

```
cnpm install
```

下面会介绍一些常用的命令。

## 启动一个 BBG 实例（带有调试工具）

```
cnpm run dev
```

## 启动一个 BBG 实例（不带有调试工具，同生产环境一致）

```
cnpm run start
```

## 生成针对不同平台的软件包

> 如果你在 Windows 平台生成适用于 macOS 的软件包，必须使用管理员权限运行相关命令，以创建正确的软链接。

> 如果你在 Linux 平台生成适用于 Windows 的软件包，需要提前安装 Wine。

```
cnpm run package_windows
cnpm run package_linux
cnpm run package_mas
cnpm run package_darwin
```

由于 global-agent 的一个问题，部分系统配置下打包时可能会遇到 ```Unsupported `GLOBAL_AGENT.HTTP_PROXY` configuration```的错误，解决方法是执行以下命令来重新指定正确的 Proxy 配置：

```
export GLOBAL_AGENT_HTTPS_PROXY=http://host:port
export GLOBAL_AGENT_HTTP_PROXY=http://host:port
```

其中，host:port 的内容由你的本地 Proxy 相关配置决定。注意本地 Proxy 协议必须为 http。


## 解决 Electron 无法启动并报错

此问题是由于网络原因导致的。如果遇到了请换用 CNPM 作为包管理器，删除项目根目录下的 node_modules 目录并重新使用 CNPM 为本项目补齐依赖（```cnpm install```）。


## 不使用 NPM 或 CNPM 作为包管理器

你可以使用任何你喜欢的包管理器，只要它不影响 NPM 或 CNPM 的工作即可。你也无需将其它包管理器生成的文件（如```yarn.lock```）添加到```.gitignore```中。

## 这些文件都是什么意思？/我想修改XXX功能，应该从哪里开始？

BBG 使用原生 JS 编写。当然，如果你想使用 Vue 和 React 这样的框架，也可以用包管理器安装然后在此项目的对应位置引入并使用，只要它不破坏其它功能的运行即可。

项目根目录下的```./main*.js```是 Electron 的入口文件。

```./App/*.js```是用于实现 BBG 主要功能的文件，具体作用可以通过它们的文件名看出。由于```./App/manage.js```的存在，```./App/*.js```内的所有函数和变量在 BBG 运行过程中都是可以相互调用的。

一些例子：

```blog```是将博客的数据文件转换后的 JavaScript 对象。注意程序中对此对象的修改不会反映到文件中。

```BlogInstance.writeBlogData()```用于将 blog 对象的内容保存到文件中。