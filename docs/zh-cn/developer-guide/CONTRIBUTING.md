# 代码贡献指南

## 开发环境搭建

首先确保计算机上已经安装：

* Git
* Node.js >= 16
* Yarn (可选*)

> *你可以使用任何你喜欢的包管理器来代替 Yarn，你也无需将其它包管理器生成的文件（比如```pnpm-lock.yaml```）添加到 `.gitignore` 中。

然后获取源代码。

```sh
git clone --recursive https://github.com/bbg-contributors/bbg.git
```
> 如果你嫌慢的话 可以添加`--depth=1`。

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

由于 global-agent 的一个问题，部分系统配置下打包时可能会遇到 ```Unsupported `GLOBAL_AGENT.HTTP_PROXY` configuration```的错误，解决方法是执行以下命令来重新指定正确的 Proxy 配置：

```sh
export GLOBAL_AGENT_HTTPS_PROXY=http://host:port
export GLOBAL_AGENT_HTTP_PROXY=http://host:port
```

其中，```host:port``` 的内容由你的本地 Proxy 相关配置决定。注意本地 Proxy 协议必须为 http。

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

## 这些文件都是什么意思？/我想修改XXX功能，应该从哪里开始？

BBG 使用原生 JS 编写。当然，如果你想使用 Vue 和 React 这样的框架，也可以用包管理器安装然后在此项目的对应位置引入并使用，只要它不破坏其它功能的运行即可。

项目根目录下的 `./main*.js` 是 Electron 的入口文件。

`./App/*.js` 是用于实现 BBG 主要功能的文件，具体作用可以通过它们的文件名看出。由于 `./App/manage.js` 的存在，`./App/*.js` 内的所有函数和变量在 BBG 运行过程中都是可以相互调用的。

一些例子：

`blog` 是将博客的数据文件转换后的 JavaScript 对象。注意程序中对此对象的修改不会反映到文件中。

`BlogInstance.writeBlogData()` 用于将 blog 对象的内容保存到文件中。

## 开发注意事项

如果有涉及i18n的内容，请先在<https://github.com/bbg-contributors/bbg-lang>中编辑，后再使用`git submodule update --remote`进行更新

涉及submodule的内容同理。