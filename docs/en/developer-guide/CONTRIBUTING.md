# Contributing Guide

## Set up the development environment

First make sure you have installed these below on your computer:

- Git
- Node.js >= 18

Then get the source code.

```sh
git clone --recursive --depth=1 https://github.com/bbg-contributors/bbg.git
```

If you have forked the repository into your GitHub Account, you can use the following command instead.

```sh
git clone --recursive --depth=1 https://github.com/[your username]/bbg.git
```

> If you have forgotten to add `--recursive`, you can execute `git submodule update --init` instead. `--depth=1` is just for better performance, it doesn't matter if you forget to add `--depth=1`.

Then go to the project root directory and execute command below to install dependencies:

```sh
npm install
```

## Commonly used commands

### Start a BBG instance (with debugging tools)

```sh
npm run dev
```

### Start a BBG instance (with debugging tools and hot reload)

```sh
npm run dev_with_hot_reload
```

### Start a BBG instance (without debugging tools, the same as the production environment)

```sh
npm run start
```

### Build packages

> If you are building a package for macOS on a Windows platform, you must run the relevant commands with administrator privileges to create the correct symlinks.

> If you are building a package for Windows on the Linux platform, you need to install Wine.

```sh
npm run build:win
npm run build:linux
npm run build:mac
```

### View documents locally

This project uses Docsify to manage documentation.

You can use the following command to open the documentation.

```sh
npm run read_doc
```

You can also visit <http://localhost:23941>.

## ESLint

You can use ESLint in the project：

```sh
npm run lint
npm run lint:fix
npm run lint:html
```

## What do these files mean? / I want to modify a function, where should I start?

BBG is written in [Vanilla](https://en.wikipedia.org/wiki/Vanilla_software) JS. Of course, if you want to use frameworks such as Vue and React, you can also install it with the package manager and import and use it in the corresponding location of this project, as long as it does not break the operation of other functions.

The `./main*.js` in the project root directory is the entry file of Electron.

`./App/*.js` are the files used to implement the main functions of BBG, and the specific functions can be seen from their file names. Due to the existence of `./App/manage.js`, all functions and variables in `./App/*.js` can be called each other during the running process of BBG.

Some examples:

`blog` is a JavaScript object converted from the blog's data file. Note that changes to this object in the program will not be reflected in the file.

`BlogInstance.writeBlogData()` is used to save the content of the blog object to a file.
