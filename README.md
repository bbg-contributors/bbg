BBG
===

![](https://img.shields.io/badge/开发环境-Node_v16.6.1-blue)
![](https://img.shields.io/badge/开发框架-Electron_v13.1.6-green)


## 功能简介

BBG 是一个基于 Electron 开发的静态博客生成器。

## 下载地址

本软件支持 macOS、Windows、Linux 平台。

[在 Gitee Releases 下载它们](https://gitee.com/baiyang-lzy/bbg/releases)

## 开发环境搭建

首先确保计算机上已经安装：

* Node v16.6.1
* **cnpm@7.0.0**（请不要使用npm，否则可能会造成冲突）

然后在项目根目录下执行：

```
cnpm install
```

启动一个 BBG 实例：
```
cnpm start
```
生成针对不同平台的软件包：
```
cnpm run package_windows
cnpm run package_linux
cnpm run package_mas
cnpm run package_darwin
```
