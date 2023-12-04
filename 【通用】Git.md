
```shell
GitHub 是git(分布式) 的远端公共服务器
    搜索技巧: in:name|readme|description xxx 
             stars|forks:>100 
             language:javascript 
             pushed:>YYYY-MM-DD
        
Git Workflow 是Git的工作流程, 也就是描述一下在工作中是怎么使用Git的(注要讲分支与合并)

当安装完 Git 应该做的第一件事就是设置你的用户名称与邮件地址。 这样做很重要，因为每一个 Git 的提交都会使用这些信息，并且它会写入到你的每一次提交中，不可更改：
 git config --global user.name "CJM"
 git config --global user.email 571574085@qq.com
 
HEAD#可以视为“当前分支”, 一个特殊的指针，它指向您当前所在的本地分支

git config -l //命令查看自己的配置			#默认这些配置都在 ~/.gitconfig 文件下
    C:\Users\123\.gitconfig #当前用户全局配置文件
    C:\Program Files\Git\etc\gitconfig#系统所有用户
    E:\GitLabRepository\dkyDist\.git\config #项目级别的配置文件
    
免密码登录github
    创建.git-credentials到用户目录
    执行 git config --global credential.helper store ,完成    

两种登录方式可以选择：
    https://username@github.com/username/projectname.git
    ssh://git@github.com:username/projectname.git
    
#先添加远程仓库：
git remote add github  https://github.com/stanbers/git-tutorial
#再去把这个远程的仓库pull到本地：
git pull github  master
git pull github  master --allow-unrelated-histories
git push -f github master        #本地master分支强制推到远程github/master主机上

GitHub中Fork# 即是 服务端的代码仓库克隆（即 新克隆出来的代码仓库在远程服务端） fork 其实并不是 Git 操作，而是一个 GitHub 操作
    fork:归根结底还是克隆，只是一种可以 pull request 可以合并到原项目的一种克隆
        #为何要这么管理代码：项目负责人 fork 一份到自己仓库，项目成员上传到这个 fork 的仓库，最大限度对于原项目没有任何影响，
        #只要 (GitHub 的 Pull Request 和 GitLab 的 Merge Request ) 的时候小心就行。
        #这样的代码管理方式，非常适合同一个大型项目下同时开发着好多个子项目，各个子项目又有着各自的项目成员
    branch:则是一个项目仓库中的代码管理方式，一种方便多人协作的方式
        #fork 可以给你的，远比 branch 要大的多。fork 其实就是一个新的仓库，你可以为所欲为，可以随便开分支，只要最后不乱 pull request 乱合并到原项目就不会出事；
        #而 branch 其实只是一个分支，比一个仓库的范围要小得多，你实际上还是处于同一个项目仓库中。  
        
.gitattributes
    问题:解决开发者使用不同的操作系统，默认的文件结尾行就会不同
    解决:任何人从仓库获取代码后，创建以及修改文件时，git 都会自动地设置好正确的文件结尾
```



![9D1276755ACB46B5BC945E124EEF0A16](https://github.com/CHENJIAMIAN/Blog/assets/20126997/49cbddac-c3a8-4afd-a9a2-810fda13a69d)


```shell
merge 将产生一个额外的合并提交来保留两个分支以前的的提交记录
rebase 线性的,是在原有提交(第一个共同的commit祖先记录)的基础上将差异内容反映进去


#区别在历史记录
revert 是撤销某一次,是放弃指定提交的修改，但是会生成一次新的提交，需要填写提交注释，以前的历史记录都在；
reset  是回退,是指将HEAD指针指到指定提交，历史记录中不会出现放弃的提交记录。#reset --soft：软回溯，回退 commit 的同时保留修改内容。
reflog：记录了 commit 的历史操作。#如果说 reset \--soft 是后悔药，那 reflog 就是强力后悔药。它记录了所有的 commit 操作记录，便于错误操作后找回记录

到本地:
    git clone -o jQuery https://github.com/jquery/jquery.git #会自动建立一种追踪关系
    
查看远端:        
    git remote -v #查看所有已提交的远程名字\网址。
    git remote show gitlab #查看已添加主机的详细信息。
    git remote rm gitlab #删除已添加主机
    git branch -a #查看所有[已取得关联]的分支 *表示当前分支
    

    git remote add gitlab git@192.168.1.53:xxx/dkyDist.git
    git remote rename gitlab  gitlab2 
    
    git branch -vv #查看追踪关系
    建立追踪关系:
        推荐: git push -u gitlab cjm #当前分支与gitlab/cjm建立追踪
        不推荐: git branch --set-upstream-to=gitlab/cjm cjm  
            
更新:    
    git cherry-pick           #部分更新, 将某一次提交合入到本地当前分支上
        
    git checkout -b newBranch github/master  #切换分支, checkout命令创建一个newBranch 分支。   
    git checkout -b dev #创建新分支 
    
        git stash #暂存到本地,不参与提交 git stash apply#读取暂存
        #stash的好处是可以先将你的改动暂存到本地仓库中，随时可以取出来再用，但是不用担心下次push到服务器时，把不想提交的改动也push到服务器上，因为
        #Stash Changes的内容不参与commit和push。
        git commit --amend #撤销上次暂存,并提交
    
    
到本地:
    获取所有分支: git pull --tags gitlab   
    推荐 git fetch gitlab develop #获取gitlab上的develop 分支 
        git diff cjm#来比较本地代码与刚刚从远程下载下来的代码的区别
        git merge gitlab/develop#将gitlab上的develop分支合并到当前分支中     #与pull的区别: merge的结果像是一个新的合并的提交
            #git rebase github/newsip #如果你想要一个干净的，没有merge commit的线性历史树，那么你应该选择git rebase,要在没人用的分支使用!!不在公共分支使用!!
                #rebase看起来则像没有经历过任何合并一样   
    不推荐  git pull gitlab develop:cjm #取回gitlab上的develop分支，与本地的cjm分支合并成新的分支 | 如果远程分支是与当前分支合并，则冒号后面的部分可以省略。   
        #与fetch的区别: git pull等同于 git fetch + git merge
                               

    git remote prune gitlab  #删除不存在对应远程分支的本地分支
        
到远端:   
    git push gitlab develop:newsip   #将本地的develop分支推送到  gitlab主机的newsip分支。如果远端分支不存在，则会被新建。(如本地删除了文件,远程没有,则文件又会被拉取到本地)       
    git push gitlab :newsip          #删除远端gitlab的newsip分支
        $ git push --all gitlab #    将所有本地分支都推送到gitlab 主机。         
        $ git push gitlab --tags#    最后，git push不会推送标签（tag），除非使用--tags选项。
        
同步:
     git pull --tags origin test-bug
     git push origin test-bug:test-bug
     
 先拉:
     git pull --tags origin dev
 后推:
     git push origin dev
```


```shell
当我们需要删除暂存区或分支上的文件, 同时工作区也不需要这个文件了, 可以使用
1 git rm file_path
2 git commit -m 'delete somefile'
3 git push
当我们需要删除暂存区或分支上的文件, 但本地又需要使用, 只是不希望这个文件被版本控制, 可以使用
git rm --cached file_path
git commit -m 'delete remote somefile'
git push

有一些文件我们不想提交到git上去了，但是又被检测到有变化，显示Untracked files，我们可以采用
git rm --cached file来停止跟踪这些文件
```

## 技巧
```js
使用 --depth 参数来防止获取所有提交历史记录
git clone --depth=30 https://github.com/mrdoob/three.js.git
```

### 向 `.gitignore` 文件中新增内容但发现它不生效时
```sh
 git rm --cached -r . && git add . && git commit -m "Untrack files in .gitignore" 
```
