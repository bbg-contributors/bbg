# 第三方主题(v2 .bbgtheme2)版本开发指南

bbgtheme2版本采用的是zip文件压缩方式，因此你只需要把自己的主题文件使用zip打包好之后，把后缀名改为.bbgtheme2，就可以使用了。

## v1版本迁移指南

你只要将后缀为.bbgtheme的文件更改为index.html后进行zip打包，将扩展名改为.bbgtheme2即可

## 具体的开发方法

!> 你可以使用诸如`Vue` `React` `Angular` 这样的前端开发框架来进行你的开发，在.bbgtheme1中，是无法做到前端工程化的。

我们以`Vue`为例来讲解一下具体的开发方法：

1.创建一个Vue Project(里面必须含有vue-router)

2.如果这是一个git仓库，开发时，建议在`.gitignore`里面加上bbg的配置文件所在位置，如果你使用的是Vue脚手架(Vue CLI)构建的Vue Project，可以把`public/data`加入`.gitignore`

3.了解data文件夹下的`index.json`,`/articles/*.md`和`/pages/*.md`的内容，并了解它们的的文件构造

4.使用XHR技术进行数据获取(这里以axios为例)

```javascript
  axios.get('/data/index.json?t=' + (new Date().getTime()))
    .then((result) => {
      this.data = result.data
    })
    .catch((error) => {
      console.error(error)
    })
```

5.使用vue-router实现多页面

!> bbgtheme v2版本对多页面要求并没有v1高，你可以使用Hash，也可以使用H5模式

这是一个URL的示例:

```
  文章列表 /articlelist/
  归档和标签 /tags/
  文章 /posts/:name/
  页面 /name/
```

6.开发完成后，你可以进行构建，将构建好的文件打包为zip文件，之后将文件扩展名改为`.bbgtheme2`文件，在bbg软件内导入，即可食用。

## 需要注意的地方

为了保证兼容性，对于部分实现在此进行说明：

### 对公共评论服务的支持

实际上就是内置了一个公共的 Leancloud 密钥，实现上仍然是 Valine 实现的。这个公共 API 密钥的信息如下：注意，此密钥仅限开发 BBG 第三方主题使用。

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

!> TODO: 添加主题的Config和附加插件功能