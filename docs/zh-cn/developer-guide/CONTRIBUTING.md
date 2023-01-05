# 代码贡献指南

## 开发环境搭建

首先确保计算机上已经安装：

- Git
- Node.js >= 16
- Yarn (可选\*)

> \*你可以使用任何你喜欢的包管理器来代替 Yarn，你也无需将其它包管理器生成的文件（比如`pnpm-lock.yaml`）添加到 `.gitignore` 中。

然后获取源代码。（你也可以fork到自己的账户中）

```sh
git clone --recursive git@github.com:/bbg-contributors/bbg.git
```

或

```sh
git clone --recursive git@github.com:/[your username]/bbg.git
```

!> 请注意！必须使用ssh方式clone仓库，因为bbg的大部分开发者位于中国大陆地区，众所周知由于某些原因，所以所以仓库的submodules都使用ssh方式进行拉取。

!> 如果你的github 账户没有ssh key，请回炉重造或[RTFM](https://docs.github.com/zh/github/authenticating-to-github/connecting-to-github-with-ssh)。

> 如果你嫌慢的话 可以添加`--depth=1`。

> 如果你忘记了 `--recursive` 也没事，在clone后执行`git submodule update --init`就行了

!> 如果你这两个都没有执行打开出现错误，请不要开issue，建议RTFM.

submodule/clone出现以下问题：
```sh
PS C:\Users\chihuo2104\Desktop\workspace> git clone git@github.com:/bbg-contributors/bbg.git --recursive
Cloning into 'bbg'...
Enter passphrase for key '/c/Users/chihuo2104/.ssh/id_rsa':
remote: Enumerating objects: 3141, done.
remote: Counting objects: 100% (388/388), done.
remote: Compressing objects: 100% (171/171), done.
remote: Total 3141 (delta 282), reused 300 (delta 217), pack-reused 2753
Receiving objects: 100% (3141/3141), 4.02 MiB | 2.44 MiB/s, done.
Resolving deltas: 100% (2202/2202), done.
Submodule 'App/blog_indexjson_template' (https://github.com/bbg-contributors/blog_indexjson_template.git) registered for path 'App/blog_indexjson_template'
Submodule 'App/blog_source' (https://github.com/bbg-contributors/blog_source.git) registered for path 'App/blog_source'
Submodule 'App/default_theme_src' (https://github.com/bbg-contributors/default_theme_src.git) registered for path 'App/default_theme_src'
Submodule 'App/i18n' (https://github.com/bbg-contributors/bbg-lang.git) registered for path 'App/i18n'
Submodule 'resources' (https://github.com/bbg-contributors/bbg-resources.git) registered for path 'resources'
Cloning into 'C:/Users/chihuo2104/Desktop/workspace/bbg/App/blog_indexjson_template'...
remote: Enumerating objects: 49, done.
remote: Counting objects: 100% (49/49), done.
remote: Compressing objects: 100% (26/26), done.
remote: Total 49 (delta 26), reused 42 (delta 22), pack-reused 0
Receiving objects: 100% (49/49), 9.27 KiB | 9.27 MiB/s, done.
Resolving deltas: 100% (26/26), done.
Cloning into 'C:/Users/chihuo2104/Desktop/workspace/bbg/App/blog_source'...
remote: Enumerating objects: 27, done.
remote: Counting objects: 100% (27/27), done.
remote: Compressing objects: 100% (24/24), done.
remote: Total 27 (delta 5), reused 21 (delta 2), pack-reused 0
Receiving objects: 100% (27/27), 15.29 KiB | 15.29 MiB/s, done.
Resolving deltas: 100% (5/5), done.
Cloning into 'C:/Users/chihuo2104/Desktop/workspace/bbg/App/default_theme_src'...
fatal: unable to access 'https://github.com/bbg-contributors/default_theme_src.git/': Recv failure: Connection was reset
fatal: clone of 'https://github.com/bbg-contributors/default_theme_src.git' into submodule path 'C:/Users/chihuo2104/Desktop/workspace/bbg/App/default_theme_src' failed
Failed to clone 'App/default_theme_src'. Retry scheduled
Cloning into 'C:/Users/chihuo2104/Desktop/workspace/bbg/App/i18n'...
fatal: unable to access 'https://github.com/bbg-contributors/bbg-lang.git/': Failed to connect to github.com port 443 after 21052 ms: Couldn't connect to server
fatal: clone of 'https://github.com/bbg-contributors/bbg-lang.git' into submodule path 'C:/Users/chihuo2104/Desktop/workspace/bbg/App/i18n' failed
Failed to clone 'App/i18n'. Retry scheduled
Cloning into 'C:/Users/chihuo2104/Desktop/workspace/bbg/resources'...
fatal: unable to access 'https://github.com/bbg-contributors/bbg-resources.git/': Failed to connect to github.com port 443 after 21058 ms: Couldn't connect to server
fatal: clone of 'https://github.com/bbg-contributors/bbg-resources.git' into submodule path 'C:/Users/chihuo2104/Desktop/workspace/bbg/resources' failed
Failed to clone 'resources'. Retry scheduled
Cloning into 'C:/Users/chihuo2104/Desktop/workspace/bbg/App/default_theme_src'...
fatal: unable to access 'https://github.com/bbg-contributors/default_theme_src.git/': Recv failure: Connection was reset
fatal: clone of 'https://github.com/bbg-contributors/default_theme_src.git' into submodule path 'C:/Users/chihuo2104/Desktop/workspace/bbg/App/default_theme_src' failed
Failed to clone 'App/default_theme_src' a second time, aborting
```
~~目前还没有找到解法（全恼~~
解决方法：多clone几次，实在不行善用搜索引擎

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

`./App/*.js` 是用于实现 BBG 主要功能的文件，具体作用可以通过它们的文件名看出。由于 `./App/manage.js` 的存在，`./App/*.js` 内的所有函数和变量在 BBG 运行过程中都是可以相互调用的。

一些例子：

`blog` 是将博客的数据文件转换后的 JavaScript 对象。注意程序中对此对象的修改不会反映到文件中。

`BlogInstance.writeBlogData()` 用于将 blog 对象的内容保存到文件中。

## 开发注意事项

如果有涉及 i18n 的内容，请先在<https://github.com/bbg-contributors/bbg-lang>中编辑，后再使用`git submodule update --remote`进行更新

涉及 submodule 的内容同理。

如果有任何错误，一般都是submodule没更新，请先执行`git submodule update`

如果还是报错，请[新开 issue](https://github.com/bbg-contributors/bbg/issues/new).

如果你对这个 bug 有自己的解决方案，或者是有新的想法，欢迎[PR](https://github.com/bbg-contributors/bbg/pulls/)！

