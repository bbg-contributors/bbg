# AGENTS.md

## 项目说明

这个仓库是一个基于 Electron 的静态博客管理与生成桌面应用。运行层面的主要特征如下：

- 主进程很薄，核心业务逻辑基本都在 `App/` 目录下的渲染进程 JavaScript 模块里。
- UI 由原生 HTML、Bootstrap、Fluent UI Web Components、CommonJS 模块和直接 DOM 操作组成。
- 站点数据采用文件持久化，不使用数据库：
  - 站点元数据：博客根目录下的 `data/index.json`
  - 内容文件：`data/articles/*.md` 和 `data/pages/*.md`
- 应用级偏好设置通过 `electron-json-storage` 保存。

## 高层结构

- `main.js`
  - Electron 生产环境入口
  - 创建主 `BrowserWindow`
  - 加载 `App/start.html`
  - 提供少量 IPC，用于返回开始页和重绘原生菜单
- `main_dev.js`
  - 开发环境入口
  - 支持热重载和 DevTools
- `App/start.html` + `App/start.js`
  - 启动页
  - 负责语言、样式等应用初始化
  - 支持从模板创建新站点，或者打开已有站点
- `App/manage.html` + `App/manage.js`
  - 主管理壳页面
  - 从 URL 参数中的 `rootdir` 读取博客根目录
  - 执行数据迁移检查
  - 根据 `currentPage` 分发到文章管理、页面管理、博客设置、Markdown 编辑器、预览发布等界面
- `App/markdown_editor.html`
  - 通过设置 `currentPage = "markdown_editor"` 复用 `App/manage.js`
- `App/ui/*.html`
  - 运行时插入的 HTML 片段模板
- `App/render_*.js`
  - UI 渲染模块
- `App/add_*`、`App/edit_*`、`App/delete_*`、`App/save_*`、`App/change_*`
  - 各类增删改和排序功能模块
- `App/blog_source`、`App/blog_indexjson_template`、`App/default_theme_src`
  - 新建站点时使用的模板资源

## 关键运行流程

1. Electron 从 `main.js` 启动。
2. 主窗口加载 `App/start.html`。
3. `App/start.js` 从 `electron-json-storage` 读取应用级配置。
4. 用户执行两类操作之一：
   - 创建新博客根目录，复制模板并初始化 `data/index.json`
   - 打开已有博客根目录，并校验 `data/index.json`
5. 页面跳转到 `App/manage.html?rootdir=...`
6. `App/manage.js` 会：
   - 从查询参数中读取 `rootdir`
   - 创建 `BlogInstance = new BlogData(rootDir)`
   - 从 `data/index.json` 载入全局 `blog` 数据
   - 调用迁移检查
   - 渲染当前选中的管理界面
7. 各个功能模块会直接修改全局 `blog` 对象，再调用 `BlogInstance.writeBlogData()` 落盘。

## 架构和设计风格

这个项目没有使用 React、Vue 或 MVVM，更接近一个“脚本驱动的桌面应用”，只是按功能拆成了多个模块文件。

目前观察到的模式：

- 主进程薄，渲染进程胖
- 按动作和功能拆分模块文件
- 通过 `insertAdjacentHTML` 做字符串模板式渲染
- 大量共享的隐式全局状态：
  - `blog`
  - `rootDir`
  - `lang_name`
  - `currentPage`
  - `BlogInstance`
- 通过 `App/BlogData.js` 实现一个很薄的文件仓储层，但写入仍然依赖全局 `blog`
- 通过 `App/check_migrate.js` 和 `App/migrate_core.js` 实现数据结构迁移

## 关键数据和状态约定

- `App/BlogData.js`
  - `getBlogData()` 从 `rootDir/data/index.json` 读取数据
  - `writeBlogData()` 将当前全局 `blog` 对象写回磁盘
- 应用级设置
  - 通过 `electron-json-storage` 持久化，不写入站点目录
  - `App/start.js` 和 `App/manage.js` 都会先调用 `storage.setDataPath(app.getPath("userData"))`
  - 当前常见 key：
    - `language`：应用语言
    - `stylesheet`：应用界面样式文件名
    - `custom_ui_v1`：应用自定义 UI 配置（如背景图）
    - `last_managed_site`：最近一次打开的站点
    - `ai_api_enabled`、`ai_api_type`、`ai_api_info`：AI 辅助写作相关配置
  - `App/start.js` 是应用级设置的主要入口：
    - 负责初始化默认值
    - 提供语言、样式、自定义 UI、AI 配置等设置入口
  - `App/loadUniStyle.js` 负责读取 `stylesheet` 和 `custom_ui_v1`，并把样式直接注入启动页和管理页
- 很多模块默认假设以下变量已经在渲染进程全局作用域中存在：
  - `blog`
  - `rootDir`
  - `lang_name`
  - 一些辅助函数
- 页面路由主要依赖 URL 查询参数，尤其是 `rootdir` 和 `path`

## UI 组织方式

- UI 外壳主要由以下模块渲染：
  - `App/render_container.js`
  - `App/render_nav.js`
- HTML 片段通过 `App/getUiFileContent.js` 加载
- `App/getUiFileContent.js` 会动态求值模板字符串，因此 UI 片段可以直接访问当前渲染作用域中的全局变量
- 样式通过 `App/loadUniStyle.js` 动态加载，并结合应用级配置生效

## 文章和页面编辑流程

- 文章列表渲染：`App/render_article_manager.js`
- 打开正文编辑器：`App/edit_article.js`
  - 会打开 `markdown_editor.html?rootdir=...&path=...`
- 编辑器实现：`App/render_markdown_editor.js`
  - 左侧原生 textarea
  - 右侧实时预览
  - 使用 `marked` 渲染 Markdown
  - 支持加密/解密相关能力
  - 支持可选的 AI 辅助写作
- 元信息编辑：
  - UI：`App/edit_article_meta.js`
  - 保存：`App/save_article_meta.js`
- 保存行为通常是：
  - 修改 `blog["文章列表"]`
  - 按需创建或重命名 markdown 文件
  - 调用 `BlogInstance.writeBlogData()` 持久化
  - 如果启用，则触发 RSS / sitemap 钩子

## 预览和发布流程

- `App/manage.js` 在非 Markdown 编辑模式下会启动一个 `localhost:41701` 的 Express 静态服务器
- `App/render_preview_and_publish_page.js` 在预览发布页中也会再次启动同端口静态服务器
- `App/preview_and_publish.js` 没有内建完整的 Git/SSH 客户端，而是通过外部终端执行命令来辅助发布：
  - `git add / commit / push`
  - 基于 `scp` 的上传

## 注意点

- 安全模型比较宽松：
  - `nodeIntegration: true`
  - `contextIsolation: false`
  - 大量使用 `@electron/remote`
- 模块之间通过全局变量强耦合，而不是显式依赖注入
- UI 渲染、状态修改、文件持久化经常混在同一个模块里
- `App/getUiFileContent.js` 使用了动态求值
- 预览服务在多个位置重复启动，后续容易出现端口和职责重复问题

## 建议阅读顺序

分析或修改这个项目时，建议优先按下面顺序阅读：

1. `package.json`
2. `main.js`
3. `App/start.js`
4. `App/manage.js`
5. `App/BlogData.js`
6. 相关的 `App/render_*.js`
7. 相关的 `App/save_*` / `App/edit_*` / `App/delete_*`
8. `App/check_migrate.js`
9. `App/migrate_core.js`
