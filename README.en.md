[中文](./README.md)

# Blog

An Obsidian note vault that automatically builds and deploys a VitePress blog through GitHub Actions.

I migrated my personal notes from Youdao Cloud Notes to **Obsidian**, then configured **VitePress** and GitHub Pages deployment from GitHub Actions to generate a blog site automatically.

When changes are pushed to the master branch, the workflow copies the notes to the gh_action_branch branch, builds the site there, and deploys that branch. Keeping the VitePress files separate prevents Obsidian from slowing down when it opens a large number of files.

1. My VS Code extension
   - [Copy Folder Contents - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=CHENJIAMIAN.copy-folder-contents), used to collect source material for AI workflows.
2. [My Tampermonkey scripts](https://greasyfork.org/zh-CN/users/969000-s-%E7%BB%9F%E4%B8%80%E4%B8%96%E7%95%8C-v)

[![Build and Deploy](https://github.com/CHENJIAMIAN/Blog/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/CHENJIAMIAN/Blog/actions/workflows/deploy-pages.yml)
