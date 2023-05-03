# CHANGE LOG

## 20230503

- Supported adding reference sources and prompt information boxes in articles
- Added menu bar
- Re-added support for dark theme
- Changed the implemention of built-in Markdown editor

## 20230219

- Add builtin Markdown editor

## 20221202

- Fixed the issue that the image path was parsed incorrectly

## 20221130

Official theme related updates are as follows:

- Support resizing the image according to the user's screen size when rendering the image
- The image viewer is enabled by default, making it easier for users to view large images in articles
- For the parsing of the image path, the directory where Markdown is located is now used as the base URL by default

## 20221031

- Fixed the issue that the page style of the list of blog friends' accounts was wrong

## 20221030

- Support for uploading blog files to a remote server via SSH (Thanks to [@scientificworld] for the contribution!)
- Redesigned UI
- Support for disabling the shadow effect of the blog navigation bar
- Support setting the blog search button border color to dark
- Support setting to make the width of the blog version narrower (increase the left and right margins)
- Support setting priority to use serif fonts in blog

## 20221001

- Support site search function
- Add an option to improve the readability of blog data files

## 20220829

- Support for checking third-party themes for updates
- Support for setting third-party themes (subject support required)
- Fixed the issue with the clipboard can't be used on macOS
- Support for setting Japanese as the site language (Thanks to [@Misaka13514] for contributing!)
- Other technical updates such as update Electron and versions of dependent libraries (Thanks to [@mzwing] and [@Misaka13514] for their contributions)

## 20220817

- Blog Settings that require multiple lines of content to be stored now automatically remove empty lines at the beginning and the end
- Progress bars are supported when downloading themes

## 20220809

- Fixed the issue where you could not clean up the current third-party theme files when using the theme store to change the site to another third-party theme
- Improvement on i18n
- Fixed the issue which generated blogs would still appear in the archive and TAB screen after their posts had been hidden
- Fixed the issue which text, buttons and code in comment sections of generated blogs were too dark to see in dark mode

## 20220808

- Now the list of blog friends' accounts can be read from an external JSON file.

## 20220807

**General Updates**

- Changing the file name of the article is now supported
- Adjusting the order of friend blogs is now supported
- The modal box now supports animation and provides a 4-second floating prompt when the action is complete, adjusts the layout of the start page, and tweaks styles and visual effects
- Added support for Russian (Thanks to [@yangdongstation] for contributing!)

**Technical updates related to i18n**

- The fallback mechanism is now provided when the language file is incomplete
- Support for backchecking the integrity of meta.json（Thanks to [@Misaka13514] for contributing!）
- A script is now available for creating new translation files and generating templates（Thanks to [@scientificworld] for contributing!）

## 20220805

- Updated the version of valine used by the blog to 1.5.1, fixing a possible XSS vulnerability
- Added support for traditional Chinese and Japanese (Thanks to [@Misaka13514] for contributing!)

## 20220723

- Fixed the issue that could cause incomplete replacement of the theme

## 20220722

- Improved multi-language support for programming and generating blogs
- The theme store now only supports downloading theme-v2. Installation of theme-v1 by any means is no longer supported. Fixed the issue which in some cases, the default theme could not be reset

## 20220718

- Fixed the issue which blog posts and pages could not be managed after automatic sitemap generation was enabled

## 20220717

- Once again fixed the issue where the browser navigation button failed in the new routing mode

## 20220716

- Fixed the issue where articles and pages would not open in the new TAB under the new routing mode

## 20220715

- Fixed the issue in which the browser navigation (forward&back) buttons failed under the new routing mode

## 20220714

- Improved the routing for generating blogs
- Comments, archiving, and tagging now support dark themes

## 20220713

- Fixed the issue which some elements of the generated blogs were misaligned and too small on mobile platforms
- Code in generated blogs and pages now supports syntax highlighting

## 20220704

- Fixed the issue that deleting articles and deleting pages would not trigger RSS and sitemap updates
- Fixed the issue which code tags were not visible in dark themes
- The option to generate RSS and sitemap automatically is no longer allowed when domain fields are not filled in

## 20220702

- Supports automatic generation of sitemap and RSS. If you select the corresponding option in the settings, RSS and sitemap will be generated when the meta information of the page and post is changed
- Experimental bbg theme-v2 (Thanks to [@chihuo2104] for contributing!)

## 20220624

- Generated blogs now have better support for dark themes
- Fixed the issue which in some cases, site icons of the blog friend accounts were too tall

## 20220611

- The generated blogs are now supported to show "PREVIOUS POST" and "NEXT POST" buttons at the bottom of the post page
- You now have the option to provide "DOWNLOAD THIS ARTICLE" and "COPY THE FULL TEXT TO THE CLIPBOARD" buttons for website users
- Support to check the consistency of blog data on the blog settings page, also fixed the issue when deleting articles or pages, if the content file does not exist, will cause the entire deletion operation failure
- Website users will now visit blog posts with the title of the post (rather than just the website title), which is good for search engine optimization and a better website experience

## 20220604

- Fixed the issue with incorrect blog styles

## 20220603

- Support for sitemap generation
- Fixed a temporary missing style problem where the interface was rendered before the style was loaded

## 20220531

- Fixed the issue which the "BACK TO THE TOP" button on the blog setting page was not working
- The blog's valine has been updated to ver.1.4.18, a possible XSS vulnerability is fixed. This will help to resolve the problem which the comment system failed to load

## 20220527

- The UI has been redesigned, especially for the blog setting page
- Make dark themes to look more [colorful](https://www.zhihu.com/question/263441909)
- Removed some built-in themes (`cafe.css`&`cyan.css`) for maintenance reasons

## 20220522

- New App icon
- Fixed the issue in which the profile picture in the friend blog accounts showed a white edge

## 20220515

- Support for dark themes
- Installation packages are available for download from this release. (Thanks to [@mzwing] & [@Misaka13514] for their contributions!).

## 20220507

- The theme store source repository was changed to GitHub
- The software update source was changed to GitHub
- Experimental support for submitting changes to a website directly within the application and pushing them to a remote Git repository
- New theme change function, currently built-in three themes: "default theme", "cafe", "green leaf"

## 20220427

- Support for adjusting the order of articles
- Support for adjusting the layout of the official theme interface

## 20220314

- Improved the display logic for the number of articles per page
- Fixed the bug in which the number of articles per page setting could not be saved
- Support setting site-wide content licensing agreements for site-wide content
- Authorized packagers can now customize the version information content

## 20220304

- The list of generated blog posts supports page-by-page display.
- Fixed slow loading of some resource files.

## 20220213

- **Security Update** Updated the version of valine that generated the blog to ver.1.4.16, which fixes an XSS vulnerability in Valine (see GitHub xCss/Valine Issues #368 #363 #352 #348 for details). For the security of your site, update it as soon as possible. (Thanks to [@Misaka13514] for reporting the issue!)

## 20220212

- Improve copywriting accuracy

## 20220211

- Fixed a bug that could cause the public comment service and custom CDN functionality to be corrupted
- Support custom CSS and custom js when generating blogs

## 20220210

- Support for changing the CDN of the CSS resource files that generate the blog
- Improved availability of "Checking for Updates"

## 20220202

- The Markdown rendering library was updated to Marked, which is helpful to improve some rendering issues.
- Fixed the issue with the incorrect version number when checking for updates
- Support site friend blog accounts function

## 20220123

- Supports the site bulletin board function
- Support for displaying unclassified posts in the "Archive and Tagging" interface of a blog
- Improves users' experience and reliability of the settings page
- The --asar parameter is used by default when packaging from this release

## 20220119

- Experimental multilingual support

## 20211205

- Management page UI updated, more modern and beautiful
- Adjusted routing policies for official themes
- New feedback group links and reminders for Arch Linux users
- Fixed a bug that could cause blog updates to be incomplete

## 20211106

- The official theme now supports dark themes and "back to top" (both buttons are in the lower right corner).
- Changed the rendering style of the official theme and made the look and feel smoother.
- Improved online theme experience

## 20211022

- Fixed the issue which the "Recently Opened" section may be displayed incorrectly when opening BBG for the first time
- The layout of the menu bar has been adjusted to make it more reasonable

## 20211016

- Visual tweaks and optimize some parts of the copywriting
- Fixed the bug in which blog configuration could not be saved when public comment service was enabled
- ~~From this release onwards, DEB package downloads will be available~~ and will not be available right now due to limited time and energy

[@baiyuanneko]: https://github.com/baiyuanneko
[@chihuo2104]: https://github.com/chihuo2104
[@Misaka13514]: https://github.com/Misaka13514
[@mzwing]: https://github.com/mzwing
[@scientificworld]: https://github.com/scientificworld
[@so1ve]: https://github.com/so1ve
[@MujiTogawa]: https://github.com/MujiTogawa
[@yangdongstation]: https://github.com/yangdongstation
[@JJ-Shep]: https://github.com/JJ-Shep
[@woshoxxx]: https://github.com/woshoxxx
