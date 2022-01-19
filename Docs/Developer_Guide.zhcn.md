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

```
cnpm run package_windows
cnpm run package_linux
cnpm run package_mas
cnpm run package_darwin
```

## 解决 Electron 无法启动并报错

此问题是由于网络原因导致的。如果遇到了请换用 CNPM 作为包管理器，删除项目根目录下的 node_modules 目录并重新使用 CNPM 为本项目补齐依赖（```cnpm install```）。
