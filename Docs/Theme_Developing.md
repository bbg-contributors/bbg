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