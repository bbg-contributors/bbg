# 第三方主题开发文档

第三方主题文件实际上是一个```html```文件，并且需要完整地实现原有的```站点根目录/index.html```的功能，即：

* 请求并解析 ```站点根目录/data/``` 里的各种数据。
* 把这些数据渲染到网页中去。

## 具体的开发方法

首先，把此项目完整地```git clone```下来。找到```App/blog_source/```目录，这个就是主题的开发目录了。

它与 BBG 项目本体实际上是独立的，所以你可以把整个```blog_source```目录复制出来，复制到你认为合适的地方。

然后，使用你喜欢的开发工具打开你复制出来的目录。

假设你把```blog_source```中的内容复制到了```example```文件夹下。

1. 阅读并了解```example/data/index.json```的结构。

2. 将```example/index.html```替换为你自己编写的新的```index.html```文件，它可以：

* 请求并解析```自己所在目录/data/index.json```的内容，并且能够把解析出的内容渲染到网页中。

* 请求并解析```自己所在目录/data/articles/*.md```和```自己所在目录/data/pages/*.md```的内容，并能够在用户需要访问它们时，把这些内容渲染到网页上。

3. 当你觉得满意的时候，把你创建的```index.html```修改为```主题的名字.bbgtheme```，这样你就创建了一个有效的第三方主题文件。

注意：```*.bbgtheme```的文件编码必须为 UTF-8。如果不是UTF-8 编码格式，则必须转换为 UTF-8 编码格式。如果需要转换编码格式的话，可以使用[@scientificworld](https://gitee.com/scientificworld)开发的[pyenconv](https://gitee.com/scientificworld/pyenconv)来转换，```pyenconv```可以自动识别输入文件的编码格式，并且可以将转换后的结果重新写到原文件，非常的方便。

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

关于domain=xxx中的这个xxx的值怎样获取，实际上它应该是通过将window.location.href去除所有url中#xxx和?xxx=xxx的部分来生成。

### 对于路由方式和永久链接

官方主题目前不使用 hash 进行路由，各个页面的转入是使用url参数（如index.html?type=article&filename=first.md）来完成的。

无论你的第三方主题使用何种路由方式，它最好要支持以下链接能够对应到正确的页面：

```
index.html?type=internal&function=article_list 对应文章列表
index.html?type=internal&function=archive_and_tags 对应归档和标签
index.html?type=internal&function=tag&argument=xxxxx 对应浏览xxx标签下的文章

index.html?type=article&filename=xxx.md 对应某个文章
index.html?type=page&filename=xxx.md 对应某个页面

```