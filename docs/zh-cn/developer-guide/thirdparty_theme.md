# 第三方主题开发指南

bbgtheme2 版本采用的是 zip 文件压缩方式，因此你只需要把自己的主题文件使用 zip 打包好之后，把后缀名改为.bbgtheme2，就可以使用了。

## v1 版本迁移指南

你只要将后缀为.bbgtheme 的文件更改为 index.html 后进行 zip 打包，将扩展名改为.bbgtheme2 即可

## 具体的开发方法

我们以`Vue`为例来讲解一下具体的开发方法：

1.创建一个 Vue Project(里面必须含有 vue-router)

2.如果这是一个 git 仓库，开发时，建议在`.gitignore`里面加上 bbg 的配置文件所在位置，如果你使用的是 Vue 脚手架(Vue CLI)构建的 Vue Project，可以把`public/data`加入`.gitignore`

3.了解 data 文件夹下的`index.json`,`/articles/*.md`和`/pages/*.md`的内容，并了解它们的的文件构造

4.使用 XHR 技术进行数据获取(这里以 axios 为例)

```javascript
axios.get("/data/index.json?t=" + new Date().getTime())
  .then((result) => {
    this.data = result.data;
  })
  .catch((error) => {
    console.error(error);
  });
```

5.使用 vue-router 实现多页面

!> bbgtheme v2 版本对多页面要求并没有 v1 高，你可以使用 Hash，也可以使用 H5 模式

这是一个 URL 的示例:

```
  文章列表 /articlelist/
  归档和标签 /tags/
  文章 /posts/:name/
  页面 /name/
```

6.开发完成后，你可以进行构建，将构建好的文件打包为 zip 文件，之后将文件扩展名改为`.bbgtheme2`文件，在 bbg 软件内导入，即可食用。

## 如何让用户配置（设置）你的主题

bbg 在配置第三方主题时会检查`你的主题目录/themecfg/`中是否存在`themecfg.json`和`themecfg_manual.html`。

如果存在`themecfg.json`，bbg 认为你的主题支持被配置，并提供界面让用户可以编辑这个 json 文件。在此基础上，如果还存在`themecfg_manual.html`，bbg 会将其作为你主题的配置文档，并会提供按钮让用户可以方便地打开这个文档。

`themecfg.json`没有格式要求，你可以按照自己认为方便的方式组织其对象结构，但是无论如何必须能以 JSON 格式读取，并且用户在保存这个配置时 BBG 会检查其是否符合 JSON 格式要求。

如果用户更换了第三方主题或重置为了官方主题，原有的`themecfg.json`文件会备份到`用户的站点根目录/themecfg_backup/themecfg_<timestamp>.json`，然后原文件会被删除，当此操作发生时一般会提醒用户配置文件被删除而仅保留了备份。

## 需要注意的地方

为了保证兼容性，对于部分实现在此进行说明：

### 对公共评论服务的支持

实际上就是内置了一个公共的 Leancloud 密钥，实现上仍然是 Valine 实现的。这个公共 API 密钥的信息如下：

!> 需要注意的是，此密钥仅限开发 BBG 第三方主题使用。

```
appid: SykuVs4qcWMkl4RUtKEUlmog-gzGzoHsz
appkey: 0jowkR4ct0lJbWcvocymEkKw
```

除此之外为了避免不同站点之间的信息产生混淆，对于 valine 的 path 应该单独设置如下：

（如果是文章评论）

```
domain=xxx;article=xxx.md
```

（如果是页面评论）

```
domain=xxx;page=xxx.md
```

!> TODO: 添加主题的 Config 和附加插件功能
