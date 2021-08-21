# 开发环境搭建

首先确保计算机上已经安装：

* Git
* Node v16.6.1

> 注意：**BBG 项目已不再使用 cnpm 作为包管理器，请尽量改用 npm。**

然后获取源代码。

```
git clone https://gitee.com/baiyang-lzy/bbg.git
```

然后转到项目根目录下执行：

```
npm install
```

下面会介绍一些常用的命令。

## 启动一个 BBG 实例
```
npm start
```

## 生成针对不同平台的软件包
```
npm run package_windows
npm run package_linux
npm run package_mas
npm run package_darwin
```

## 解决 npm 下载过慢的问题

```
npm config set registry http://registry.npm.taobao.org/
```

## 解决 Electron 无法启动

有时 Electron 可能无法启动并报错（信息如下）

```
Error: Electron failed to install correctly, please delete node_modules/electron and try installing again
```

如果遇到此情况，请使用文本编辑器编辑```项目根目录/node_modules/@electron/get/dist/cjs/artifact-utils.js```。

在此文件的前几行找到

```
const BASE_URL = 'https://github.com/electron/electron/releases/download/';
```

将其修改为

```
const BASE_URL = 'https://hub.fastgit.org/electron/electron/releases/download/';
```

然后切换到本项目根目录下，并执行：

```
node ./node_modules/electron/install.js
```

然后等待安装工作完成。