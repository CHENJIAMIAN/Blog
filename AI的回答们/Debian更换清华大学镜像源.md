---
title: Debian更换清华大学镜像源
created: 2025-07-14
source: Cherry Studio
tags: 
---
### 🤖 Assistant



```bash
#!/bin/bash

# 备份原有的 sources.list 文件
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak.$(date +%Y%m%d_%H%M%S)

# 使用清华大学镜像源更新 sources.list 文件
sudo tee /etc/apt/sources.list <<EOF
deb http://mirrors.tuna.tsinghua.edu.cn/debian bookworm main
deb http://mirrors.tuna.tsinghua.edu.cn/debian bookworm-updates main
deb http://mirrors.tuna.tsinghua.edu.cn/debian-security bookworm-security main
deb http://mirrors.tuna.tsinghua.edu.cn/debian bookworm-backports main
EOF

echo "sources.list 文件已成功更新为清华大学镜像源。"
echo "请运行 'sudo apt update' 来同步软件包列表。"
```

