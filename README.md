> 我把我的个人笔记从**有道云笔记**迁移到了**Obsidian**了, 并且配置了**VitePress**+**GithubPage from GithubAction**, 自动生成博客网站。

- [我写的油猴脚本们](https://greasyfork.org/zh-CN/users/969000-s-%E7%BB%9F%E4%B8%80%E4%B8%96%E7%95%8C-v)
- [![Build and Deploy](https://github.com/CHENJIAMIAN/Blog/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/CHENJIAMIAN/Blog/actions/workflows/deploy-pages.yml)push 到 master 分支时, 自动拷贝所有文件覆盖 gh_action_branch 分支, 并自动构建部署 gh_action_branch 分支, 如此隔离vitepress相关文件以防止Obsidian打开文件太多而卡顿
