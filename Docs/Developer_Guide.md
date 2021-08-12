# 开发环境搭建

首先确保计算机上已经安装：

* Git
* Node v16.6.1
* **cnpm@7.0.0**（请不要使用npm，否则可能会造成冲突）

然后获取源代码。

```
git clone https://gitee.com/baiyang-lzy/bbg.git
```

然后转到项目根目录下执行：

```
cnpm install
```

下面会介绍一些常用的命令。

## 启动一个 BBG 实例
```
cnpm start
```

## 生成针对不同平台的软件包
```
cnpm run package_windows
cnpm run package_linux
cnpm run package_mas
cnpm run package_darwin
```