# 在博客文章中添加参考来源和提示信息

## 添加参考来源

在你想要添加参考来源的文字之后添加一个标签，示例如下。

```
OpenAI 的一项报告显示，GPT4 在各种专业和学术基准上达到了和人类相近的水平。<ref url="https://arxiv.org/abs/2303.08774">GPT-4 Technical Report</ref>
```

`url`参数可以省略。

BBG 自带的 Markdown 编辑器的预览功能以及博客渲染的时候会在文章底部额外渲染一个 Reference 区域，并将如上的 `ref` 标签渲染为一个内含数字的方括号（就像这样：`[1]`），点击方括号后跳转到 Reference 区域中。

## 添加提示信息

将要提示的信息放在`info-hint`标签中。示例如下：

```
<info-hint>这是一个提示。</info-hint>
```

除了通用的提示框之外，还有三种特殊的提示框，示例如下：

```
<warning-hint>这是一个表明警告的提示框。</warning-hint>
<success-hint>这是一个表明成功的提示框。</success-hint>
<danger-hint>这是一个表明危险的提示框。</danger-hint>
```