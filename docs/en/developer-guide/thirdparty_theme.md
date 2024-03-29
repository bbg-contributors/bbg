# The guide of third-party theme development

The version of bbgtheme2 uses the pattern of zip package files. So you need to use zip to package your theme and change the suffix into `.bbgtheme2`. Then you can use it.

## The migration guide of v1.

You only need to change the filename from `xxx.bbgtheme` to `index.html` and use zip to package it. Then change the zip file's suffix into `.bbgtheme2`

## The specific ways to develop a bbgtheme2 theme

We set `Vue` as an example to explain how to develop a bbgtheme2 theme.

1. Create a new Vue Project (vue-router required).

2. If this repository is using git as a version control manager. We recommend that you can insert the bbg config file's location into `.gitignore`. If you use the Vue-cli to build your vue project, you can insert `public/data` into `.gitignore`.

3. Learn the content of the `index.json`, `articles/*.md` and `pages/*.md` in the data directory and learn their file struction.

4. Use the XHR technology to get the data(Axios as an example below)

```javascript
axios.get("/data/index.json?t=" + new Date().getTime())
  .then((result) => {
    this.data = result.data;
  })
  .catch((error) => {
    console.error(error);
  });
```

5. Use vue-router to have multi-page routes

!> bbgtheme2's requirement of multi-page is not more strict than bbgtheme. You can use your own route modes like hash or h5.

This is an example of URLS.

```
  Article List /articlelist/
  Archives and tags /tags/
  Posts /posts/:postname/
  Pages /:pagename/
```

6. After developing, you can build this project. And you should zip package the dist and change the suffix to `.bbgtheme2`. You can use it by importing it in bbg.

## How to let users configure (set up) your theme

bbg will check whether `themecfg.json` and `themecfg_manual.html` exist in `Your Theme Directory/themecfg/` when configuring a third-party theme.

If `themecfg.json` is present, bbg will assume that your theme is supported to be configured and will provide an interface for users to edit the json file. On top of that, if `themecfg_manual.html` also exists, bbg will use it as a configuration document for your theme and will provide buttons for users to open it conveniently.

There are no formatting requirements for `themecfg.json`, you can organize its object structure as you see fit. But it must be readable in json format, and bbg will check that when the users save configurations.

If users change a third-party theme or reset it as an official theme, the original `themecfg.json` file will be backed up to `User's Site Root Directory/themecfg_backup/themecfg_<timestamp>.json`, and the original file will be deleted. When this operation occurs, users will be generally reminded that the configuration file is deleted and only the backup is kept.

## Something should be paid attention to

In order to ensure compatibility. Now we should explain something.

### The support for public comment service

In fact, it is embedded a public Leancloud key, and this also needs valine.

The information on this key is below.

!> Please pay attention that this key is only available for developing the bbg third-party theme.

```
appid: SykuVs4qcWMkl4RUtKEUlmog-gzGzoHsz
appkey: 0jowkR4ct0lJbWcvocymEkKw
```

Besides, to avoid different sites' comments mixed, you need to set the path of valine below:

(posts comments)

```
domain=xxx;article=xxx.md
```

（pages comments）

```
domain=xxx;page=xxx.md
```
