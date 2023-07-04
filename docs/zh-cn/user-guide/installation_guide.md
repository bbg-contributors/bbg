# 安装指南

## Windows / macOS

在 [GitHub Releases] 可以获取安装程序和 `dmg` 包。

## Arch Linux / Manjaro

可以从 AUR 安装，以下两个包任选其一即可：[bbg](https://aur.archlinux.org/packages/bbg/) 和 [bbg-git](https://aur.archlinux.org/packages/bbg-git/)。感谢 [Misaka13514](https://i.atri.tk) 和 [zzjzxq33](https://github.com/woshoxxx) 的维护。

## Debian 或基于 Debian 的 Linux 发行版

目前 GitHub Releases 构建出的 `deb` 包仍有 bug，在安装过程中可能会报错，程序自带的`chrome-sandbox`也可能无法正常运作。介意的用户可以参照本教程后面对于其它 Linux 发行版的教程直接使用 AppImage。

## 其它 Linux 发行版

[GitHub Releases] 中提供了 `AppImage` 包下载，下载下来后先执行此命令为程序添加可执行权限：

```
chmod +x 下载下来的appimage文件
```

然后双击程序即可启动。

[GitHub Releases]: https://github.com/bbg-contributors/bbg/releases/latest
