# 代码贡献指南

## 开发环境搭建

首先确保计算机上已经安装：

- Git
- Node.js >= 18
- Yarn （如果没有的话可以在安装了Node.js和NPM之后使用`npm install -g yarn`安装）

然后使用 Git 获取源代码。

```sh
git clone --recursive --depth=1 https://github.com/bbg-contributors/bbg.git
```

如果你将项目仓库 Fork 到了你自己的 GitHub 账户中，则使用下面这条命令。

```sh
git clone --recursive --depth=1 https://github.com/[your username]/bbg.git
```

> 如果你忘记了 `--recursive` 也没事，在clone后执行`git submodule update --init`就行了。--depth=1参数是为了加快速度，没有也没关系。

然后转到项目根目录下执行以下命令安装依赖：

```sh
yarn install
```

## 常用命令

### 启动一个 BBG 实例（带有调试工具）

```sh
yarn run dev
```

### 启动一个 BBG 实例（不带有调试工具，同生产环境一致）

```sh
yarn run start
```

### 生成软件包

> 如果你在 Windows 平台生成适用于 macOS 的软件包，必须使用管理员权限运行相关命令，以创建正确的软链接。

> 如果你在 Linux 平台生成适用于 Windows 的软件包，需要提前安装 Wine。

```sh
yarn run build:win
yarn run build:linux
yarn run build:mac
```

由于 global-agent 的一个问题，部分系统配置下打包时可能会遇到 `Unsupported 'GLOBAL_AGENT.HTTP_PROXY' configuration`的错误，解决方法是执行以下命令来重新指定正确的 Proxy 配置：

```sh
export GLOBAL_AGENT_HTTPS_PROXY=http://host:port
export GLOBAL_AGENT_HTTP_PROXY=http://host:port
```

其中，`host:port` 的内容由你的本地 Proxy 相关配置决定。注意本地 Proxy 协议必须为 http。

### 在本地查看文档

本项目使用 Docsify 来管理项目文档。

目前文档已经和 BBG 开发者面板 整合在一起，

使用这个命令打开 BBG 开发者面板：

```sh
yarn run devpanel
```

你也可以访问 <http://localhost:23941>。

## 语法检查和格式化

你可以在本项目中使用 ESLint：

```sh
yarn run lint
yarn run lint:fix
yarn run lint:html
```

## 这些文件都是什么意思？/我想修改 XXX 功能，应该从哪里开始？

BBG 使用原生 JS 编写。当然，如果你想使用 Vue 和 React 这样的框架，也可以用包管理器安装然后在此项目的对应位置引入并使用，只要它不破坏其它功能的运行即可。

项目根目录下的 `./main*.js` 是 Electron 的入口文件。

`./App/*.js` 是用于实现 BBG 主要功能的文件，具体作用可以通过它们的文件名看出。`./App/manage.js` 将`./App/*.js` 内的许多函数和变量作为全局变量，从而让它们在 BBG 运行过程中可以相互调用。

一些例子：

`blog` 是将博客的数据文件转换后的 JavaScript 对象。注意程序中对此对象的修改不会反映到文件中。

`BlogInstance.writeBlogData()` 用于将 blog 对象的内容保存到文件中。

## 开发注意事项

如果有涉及 i18n 的内容，请先在<https://github.com/bbg-contributors/bbg-lang>中编辑，后再使用`git submodule update --remote`进行更新

涉及 submodule 的内容同理。

如果有任何错误，一般都是submodule没更新，请先执行`git submodule update --remote`

如果还是报错，请[新开 issue](https://github.com/bbg-contributors/bbg/issues/new).

如果你对这个 bug 有自己的解决方案，或者是有新的想法，欢迎[PR](https://github.com/bbg-contributors/bbg/pulls/)！
