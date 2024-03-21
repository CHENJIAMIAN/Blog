
```javascript
指令集//x86、ARM v8、MIPS都是指令集的代号。指令集可以被扩展，如x86增加64位支持就有了x86-64
架构//是指令集的具体的实现? ARM64是ARM中64位体系结构
    ARM属于精简指令集体系，汇编指令比较简单。
    x86属于复杂指令集体系，汇编指令较多。属于两种不同的体系。
        x86 是一种“CPU”架构，最初用于 16 位“芯片”，后来扩展用于 32 位芯片。//如果操作系统是 32 位，则意味着它运行的是 x86 CPU 架构芯片。（我这里不考虑ARM）    
        但是现在,x86 是 64 位芯片上的架构!!! //由于32位芯片的内存使用限制，只能支持4GB的RAM，所以x86后来扩展到64位芯片上, 基本上现在用相同的架构（指令集）来构建一个芯片使用 64bit 来表示一个数字，因此是 64bit 芯片。        最初它被称为 x86-64，后来被简化为 x64，这意味着现在x86 是 64 位芯片上的架构.
```

> Windows命令

```javascript
批量拷贝目录下所有文件夹中的指定文件
    xcopy "D:\Program Files\OpenVPN\config\阿里正式新vpncerts"   "D:\Program Files\OpenVPN\config"  /S /E /Y
    
#对于windows 远程端口
    telnet localhost 8080

#对于windows 本地端口
    netstat -ano|findstr "8080"
```



```javascript
df -h //查看磁盘信息空间剩余
    du -h --max-depth=1 /usr/data // 查看文件或文件夹的磁盘使用空间/大小
nohup ./startup.sh  &     //nohup 再加个& 在后台运行为job 
    jobs
        杀死：kill %1（%1是将要被杀死的job的进程号）
        激活：fg %1（%1是将要被激活的job的进程号）
getconf LONG_BIT    //查看系统是不是64位的：
sudo nautilus 	//以root权限打开nautilus图形文件管理器，系统自带的
free -m             // 查看内存使用量和交换区使用量
lsb_release -a// ，即可列出Linux内核版本

sudo chmod 777 -R ./tomcat //操作文件时提示permission denied 给tomcat目录及目录下的文件递归执行更改权限操作所有的权限 77#改文件权限为 rwx rwx rwx   r=4，w=2，x=1          
    千万不要chmod整个/etc目录 !!!!
ifconfig//查看ip
ip route show
#查看端口22是否打开检查哪些进程在占用端口
sudo netstat -lnutp|grep 8080
sudo kill -9 进程id

通过PID号获取该恶意文件的路径 ls -l /proc/$PID/exe

//传输文件夹到另一个机器上
sudo scp -r /home/文件夹  gis@172.16.0.195:/home/文件夹

sudo rz //上传文件
sudo sz //下载文件
sudo passwd postgres //修改postgres这个用户的密码

ps aux | grep java //列出java相关进程,tomcat也是一个java进程
sudo killall -9 java //杀掉java进程
sudo bin/startup.sh //tomcat目录下重启
sudo tail -f logs/*  //跟踪日志
 
快捷键
    C+l : Clear
    C+a/e : 行首/尾
    C+u: 删除到行首
    C+z: 把命令放入后台
    C+r: 在历史命令中搜索
    
shell已经为我们准备好了这个续行符反斜杠 "\"，来把一行命令分解成多行

要快速杀死所有在bash下停止的jobs，请输入：
    kill -9 `jobs -ps` //jobs -ps列出已-p停止（-s）作业的进程ID（）。kill -9 `jobs -ps`将SIGKILL信号发送给所有人。
```

```javascript
not a valid identifier//的一般原因  将等号两边的空格去掉就可以了，大家要注意
D-bus//:一个进程间通信的工具
Systemctl//:一个systemd工具,主要负责控制systemd系统和服务管理器
systemd//:即为system daemon,是linux下的一种init软件，在Unix中常以“d”作为系统守护进程
```

> Vim

```javascript
gedit 文件	//用图形文件编辑器编辑，方便！！但通常，在服务器中，没有安装或需要桌面环境。因此，gedit无法启动和显示()

vim编辑器有两种模式，命令模式和编辑模式，通过ESC键来切换
     vi filename //打开或新增创建filename文件 
    :w //保存文件     :w vpser.net //保存至vpser.net文件 
    :q //退出编辑器，如果文件已修改请使用下面的命令 
    :q! //退出编辑器，且不保存 
    :wq //退出编辑器，且保存文件
    dd //删除当前行 
    ndd //向下删除当前行在内的n行 
    u //撤销上一步操作 
    U //撤销对当前行的所有操作
        /xxx //向光标下搜索vpser字符串     ?xxx //向光标上搜索vpser字符串 
        n //向下搜索前一个搜素动作     N //向上搜索前一个搜索动作 
    G //跳至文件的底部
    :set nu //显示行号     :set nonu //取消显示行号
```





> 目录

> Linux 系统目录结构

```javascript
[root@主机名  路径]$:
    ~ home
    # root用户
    $ 普通用户
目录结构    /
    系统启动必须：
        /boot：存放的启动Linux 时使用的内核文件，包括连接文件以及镜像文件。
        /etc：存放所有的系统需要的配置文件和子目录列表，更改目录下的文件可能会导致系统不能启动。
        /lib：存放基本代码库（比如c++库），其作用类似于Windows里的DLL文件。几乎所有的应用程序都需要用到这些共享库。
        /sys： 这是linux2.6内核的一个很大的变化。该目录下安装了2.6内核中新出现的一个文件系统 sysfs 。sysfs文件系统集成了下面3种文件系统的信息：针对进程信息的proc文件系统、针对设备的devfs文件系统以及针对伪终端的devpts文件系统。该文件系统是内核设备树的一个直观反映。当一个内核对象被创建的时候，对应的文件和目录也在内核对象子系统中
    指令集合：
        /bin：存放着最常用的程序和指令
        /sbin：只有系统管理员能使用的程序和指令。
    外部文件管理：
        /dev ：Device(设备)的缩写, 存放的是Linux的外部设备。注意：在Linux中访问设备和访问文件的方式是相同的。
        /media：类windows的其他设备，例如U盘、光驱等等，识别后linux会把设备放到这个目录下。
        /mnt：临时挂载别的文件系统的，我们可以将光驱挂载在/mnt/上，然后进入该目录就可以查看光驱里的内容了。
    临时文件：
        /run：是一个临时文件系统，存储系统启动以来的信息。当系统重启时，这个目录下的文件应该被删掉或清除。如果你的系统上有 /var/run 目录，应该让它指向 run。
        /lost+found：一般情况下为空的，系统非法关机后，这里就存放一些文件。
        /tmp：这个目录是用来存放一些临时文件的。
    账户：
        /root：系统管理员的用户主目录。
        /home：用户的主目录，以用户的账号命名的。
        /usr：用户的很多应用程序和文件都放在这个目录下，类似于windows下的program files目录。
        /usr/bin：系统用户使用的应用程序与指令。
        /usr/sbin：超级用户使用的比较高级的管理程序和系统守护程序。
        /usr/src：内核源代码默认的放置目录。
    运行过程中要用：
        /var：存放经常修改的数据，比如程序运行的日志文件（/var/log 目录下）。
        /proc：管理内存空间！虚拟的目录，是系统内存的映射，我们可以直接访问这个目录来，获取系统信息。这个目录的内容不在硬盘上而是在内存里，我们也可以直接修改里面的某些文件来做修改。
    扩展用的：
        /opt：默认是空的，我们安装额外软件可以放在这个里面。
        /srv：存放服务启动后需要提取的数据（不用服务器就是空）
```

> 下载与安装

```javascript
wget 网址		//获取安装东西wget 是一个从网络上自动下载文件的自由工具

Yum                 //是一个在Fedora和RedHat以及CentOS中的Shell 前端软件包管理器。
    yum reinstall polkit -y //重新安装
    
APT                 //（全称为AdvancedPackaging Tools）是一个在 Debian 和 Ubuntu 中的 Shell 前端软件包管理器。与 YUM对应
    apt-get update //检查更新,别人会错误:E: Package 'XX' has no installation candidate
    apt-get upgrade//开始更新
    
RPM  //Red-Hat Package Manager（RPM软件包管理器）的缩写    //centos是来自于redhat，所以centos支持rpm格式的安装
    
//安装64位的jdk:  
    yum  -y  install java-1.8.0-openjdk.x86_64  #-y（当安装过程提示选择全部为"yes"），-q（不显示安装的过程）
    //#通过yum默认安装的路径为:  
    /usr/lib/jvm/jre-1.8.0
//安装ssh：
    //#查看仓库包含ssh包	
    yum list | grep ssh  
    //#安装ssh包：		
    yum  -y  install openssh-clients.x86_64
```

**使用包管理器**：大多数Linux发行版都包括至少一个包管理器，用于自动化安装、配置、更新和删除软件包。

- **Debian/Ubuntu及其衍生版本**：
    
    - `apt-get`或`apt`命令：例如，要安装nginx，可以使用`sudo apt-get install nginx`或`sudo apt install nginx`。
- **Fedora/RHEL/CentOS**：
    
    - Fedora使用`dnf`命令：例如，`sudo dnf install nginx`。
    - RHEL和CentOS 7之前版本使用`yum`命令：例如，`sudo yum install nginx`。
    - CentOS 8及之后版本转向使用`dnf`。
- **Arch Linux及其衍生版本**：
    
    - 使用`pacman`命令：例如，`sudo pacman -S nginx`。
# 权限

```python
3个num对应: 
    拥有者、群组、其他
chmod 4755 filename    #可使此程序具有root的权限.
chmod 755 hello.sh #给权限

#若要rwx属性则4+2+1=7； 
#若要rw-属性则4+2=6； 
#若要r-x属性则4+1=7。 
chmod 777 file          #效果相同 chmod a=rwx file    //a 表示这三者皆是
chmod 771 file         #效果相同 chmod ug=rwx,o=x file //u 表示该文件的拥有者，g 表示与该文件的拥有者属于同一个群体(group)者,o 表示其他以外的人
```



> 配置SSH

```python
#SSH 是目前较可靠，专为远程登录会话和其他网络服务提供安全性的协议

#从客户端来看，SSH提供两种级别的安全验证。
#第一种级别（基于口令的安全验证）易受到“中间人”这种方式的攻击。
#第二种级别（基于密匙的安全验证）
#需要依靠密匙，也就是你必须为自己创建一对密匙，并把公用密匙放在需要访问的服务器上。

#查看ssh安装				
rpm -qa | grep openssh
#没有安装openssh-clients		
yum -y install openssh-clients
#开启ssh服务
service ssh start

#开放8080端口给外网访问
1.开放端口命令： /sbin/iptables -I INPUT -p tcp --dport 8080 -j ACCEPT
2.保存：/etc/rc.d/init.d/iptables save
3.重启服务：/etc/init.d/iptables restart
4.查看端口是否开放：/sbin/iptables -L -n

#ssh免密码登录
#现在检查您是否可以在没有密码的情况下ssh到localhost：
  $ ssh localhost
#如果在没有密码短语的情况下无法ssh到localhost，请执行以下命令：
  $ ssh-keygen -t dsa -P '' -f ~/.ssh/id_dsa 	 # -t密钥算法  -p “更改密码” -f指定文件名
  $ cat ~/.ssh/id_dsa.pub >> ~/.ssh/authorized_keys # cat file1 >> file2的意思是把 file1 的文档内容输入file2 这个文档里

#修改root密码，在终端中输入passwd，然后，两次输入新的密码。
```



> SHELL

```python
cat /etc/shells #通过 cat 命令来查看当前 Linux 系统的可用 Shell
Bash #是GNU计划编写的Unix shell其中比较流行的Shell之一,Bash 也是大多数Linux 系统默认的 Shell。
    #通用的shell有标准的Bourne shell (sh）和C shell (csh）。
sh    #切换默认bashshell到shshell
exit  #退出shell
Shell #是命令行解释器，是编程语言，用户通过它与内核（硬件）交互
linux默认shell: Bash
vim /etc/shells #编辑文件 Vim是从vi 发展出来的一个文本编辑器
echo '1'    #打印1
echo -e '\r'#打印回车
vi hello.sh #编辑hello.sh             #!/bin/bash 第一句不是注释,是声明,不能删
bash hello.sh     #执行shell脚本
history           #查看历史命令

#Tab键自动补全

#  $定义过的变量
your_name="tom"
echo $your_name

#输出重定向:把命令的结果输出到文件中
```



```javascript
Linux 指GNU/Linux，即采用Linux内核的GNU操作系统，包涵 Linux内核 GNU组件 软件，可以被称为GNU/Linux
    GNU组件 可以运行于Linux内核之上，GNU的内核为Hurd
    在实际使用上，多半使用Linux内核、FreeBSD等替代方案，作为系统核心，其中主要的操作系统是Linux的发行版。
    
UNIX-Like	
    ▪ GNU	▪ Linux	▪ Android	▪ Debian    ▪ Ubuntu(以桌面应用为主,使用的是apt-get命令安装软件)	
    ▪ Red Hat	▪ Linux Mint	▪ Minix    ▪ QNX	▪ GNU/Linux	▪ GNU/Hurd	▪ Debian GNU/Hurd   ▪ GNU/kFreeBSD	▪ StartOS


./hello.sh    //等同于     上一级/hello.sh
cat 文件	  //把文件内容打印到控制台
 ll	  //list即显示所有文件的详细信息 -a all显示隐藏文件
 pstree -p//以一种优雅的方式展示进程树


Linux靠文件名区分文件类型
    压缩包：*.gz  *.bz2    .tar.bz2、*.tgz等
    二进制软件包：.rpm
    

命令行界面(CLI) = 使用文本命令进行交互的用户界面
终端(Terminal) =TTY= 文本输入/输出环境
    pts(pseudo-terminal slave)是虚拟终端pty(pseudo-tty)的实现方法
控制台(Console) = 一种特殊的终端
```

>  linux启动读取配置顺序

```javascript
一般只有/etc/profile --> ~/.bashrc 
/etc/profile 
-> (~/.bash_profile | ~/.bash_login | ~/.profile) 
-> ~/.bashrc 
-> /etc/bashrc
-> ~/.bash_logout

关于各个文件的作用域，在网上找到了以下说明：
（1）/etc/profile： 此文件为系统的每个用户设置环境信息,当用户第一次登录时,该文件被执行. 并从/etc/profile.d目录的配置文件中搜集shell的设置。
（2）/etc/bashrc: 为每一个运行bash shell的用户执行此文件.当bash shell被打开时,该文件被读取。
（3）~/.bash_profile: 每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!默认情况下,他设置一些环境变量,执行用户的.bashrc文件。
（4）~/.bashrc: 该文件包含专用于你的bash shell的bash信息,当登录时以及每次打开新的shell时,该该文件被读取。
（5）~/.bash_logout:当每次退出系统(退出bash shell)时,执行该文件. 另外,/etc/profile中设定的变量(全局)的可以作用于任何用户,而~/.bashrc等中设定的变量(局部)只能继承/etc/profile中的变量,他们是"父子"关系。
（6）~/.bash_profile 是交互式、login 方式进入 bash 运行的~/.bashrc 是交互式 non-login 方式进入 bash 运行的通常二者设置大致相同，所以通常前者会调用后者。
```

> 文件

```python
ls -a /var/  #显示隐藏的文件
ls -l #详细信息
pwd	                    #打印当前目录
mkdir                   #新建文件夹 -p确保目录名称存在，不存在的就建一个

rm                      #删除文件
rm -rf 目录名	      #删除文件夹目录 -f 强制删除
cp [选项] srcfile copyfile	#复制文件  -r复制目录 -p带属性复制 -d带链接文件属性复制 
                                        #-a的作用是复制得一模一样,连修改时间都一样 

mv srcfile copyfile 	#移动，重命名   mv 的原文件或目录不加/
mv /a  /b/c                 #例子：将/a目录移动到/b下，并重命名为c：

- rw- r-- r--		#-rw-所有者 r--所属组  r--其他人       r读w写x执行
#第一位- 表示文件


ln -s orifile destfile  #生成软链接文件,类似快捷方式                       http://www.imooc.com/video/4017
                        #硬链接相当于复制出一个文件出来了
```

# 压缩

```python
#综合起来，在压缩比率上： tar.bz2>tar.gz>tar   #占用空间与压缩比率成反比： tar.bz2<tar.gz<tar
#耗费时间（打包，解压）#打包：tar.bz2>tar.gz>tar  #解压： tar.bz2>tar>tar.gz
#因此，Linux下对于占用空间与耗费时间的折衷多选用tar.gz格式，不仅压缩率较高，而且打包、解压的时间都较为快速，是较为理想的选择。

#tar只是打包动作，相当于归档处理，不做压缩；解压也一样，只是把归档文件释放出来。
tar -cvf .tar a
#-c create打包 b
#-x extract解压缩 
#-v verbose显示过程日志
#-f 指定打包后的文件名
#-z --gzip

#tar.gz其实这是对tar包进行gzip算法的压缩, gzip是GNUzip的缩写,它是一个GNU自由软件的文件压缩程序
tar -zxvf #压缩文件名.tar.gz #解压
tar -zcvf #压缩文件名 .tar.gz 被压缩文件名 #压缩
```

## 查找

```python
find / -name *.mysql//在指定目录下查找 文件，通配符匹配
find / -mtime -2 #查找2天内修改的文件，多了一个减号
whereis mysql //查找二进制程序、代码等相关文件路径
which //查找并显示给定命令的绝对路径
systemctl status mysqld.service //mysql服务状态
    //或 service mysqld status
    
字符串:
    grep 字符串 文件名	        #查找文件里符合条件的 字符串，正则匹配
    
#locate与find 不同: find 是去硬盘找，locate 只在/var/lib/slocate资料库中找（更快）
#所以locate的查找并不是实时的，而是以数据库的更新为准，一般是系统自己维护，也可以手工升级数据库 ，命令为：locate -u 
```





> 环境变量

```javascript
echo $PATH 	//#打印环境变量path

三种方法：
    1、只对当前的shell 起作用
        $PATH="$PATH":/NEW_PATH  (关闭shell Path会还原为原来的path)
    2、所有用户
        修改 /etc/profile 文件// 此文件为系统的每个用户设置环境信息,当用户第一次登录时,该文件被执行.并从/etc/profile.d目录的配置文件中搜集shell的设置.
        export  PATH="$PATH:/NEW_PATH：$JAVA_HOME/bin"
        export JAVA_HOME=/jdk1.6.0_14 
       export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar    
    3、每个用户
        /etc/bashrc//为每一个运行bash shell的用户执行此文件.当bash shell被打开时,该文件被读取
        在下面添加：export  PATH="$PATH:/NEW_PATH"
    4、单独用户: //隐藏的
        ~/.bash_profile: 每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!默认情况下,他设置一些环境变量,执行用户的.bashrc文件.
        ~/.bashrc: 该文件包含专用于你的bash shell的bash信息,当登录时以及每次打开新的shell时,该该文件被读取.
        ~/.bash_logout: 当每次退出系统(退出bash shell)时,执行该文件.
//  /etc/profile 和 ~/.bashrc 是"父子"继承关系
```





> NGINX

```shell
URI匹配
    location ^~ /images/ {
        # 前半部分匹配 ^~
        # 可以使用正则，如：
        # location ~* \.(gif|jpg|png)$ { }
    }
    #语法规则
    location [ = | ~ | ~* | ^~ ] uri { ... } #后面是要匹配的字符，花括号中是要执行的操作。
    #修饰符
    =   表示精确匹配。只有请求的url路径与后面的字符串完全相等时，才会命中。
    ~  表示该规则是使用正则定义的，区分大小写。
    ~* 表示该规则是使用正则定义的，不区分大小写。
    ^~ 表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续的查找
    
配置CORS跨域
    在server下加入
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Credentials' 'true';
    
配置https
    server {
        listen 443 ssl;
        server_name example.com;
    
        ssl_certificate /path/to/cert.pem;
        ssl_certificate_key /path/to/key.pem;
    
        #其他配置项
    }
以下是在 Windows 系统上使用 Nginx 常用的命令：
    start nginx
    nginx -s stop
    nginx -s reload
    nginx -t#检查配置文件语法是否正确
    nginx -v#显示 Nginx 版本信息
    nginx -V#显示 Nginx 编译参数
    请注意，以上命令应该在以管理员身份运行的命令行中执行。
    如果您在安装 Nginx 时选择了将其添加到系统路径中，则可以在任何位置使用这些命令。
    如果没有将 Nginx 添加到系统路径中，则需要先导航到 Nginx 的安装目录才能执行这些命令。
    
总结 location 加不加/ 和 proxy 加不加/ 的影响
    在nginx中配置proxy_pass时，当在后面的url加上了/，相当于是绝对根路径，则nginx不会把location中匹配的路径部分代理走;如果没有/，则会把匹配的路径部分也给代理走。      
     首先是location进行的是模糊匹配
    1）没有“/”时，location /abc/def可以匹配/abc/defghi请求，也可以匹配/abc/def/ghi等
    2）而有“/”时，location /abc/def/不能匹配/abc/defghi请求，只能匹配/abc/def/anything这样的请求
    下面四种情况分别用http://192.168.1.4/proxy/test.html 进行访问。
    第一种：proxy加/不保留路径
        location  /proxy/ {
        proxy_pass http://127.0.0.1:81/;
        }
        结论：会被代理到http://127.0.0.1:81/test.html 这个url
     
    第二种(相对于第一种，最后少一个 /)
        location  /proxy/ {
        proxy_pass http://127.0.0.1:81;
        }
        结论：会被代理到http://127.0.0.1:81/proxy/test.html 这个url
     
    第三种：
        location  /proxy/ {
        proxy_pass http://127.0.0.1:81/ftlynx/;
        }
        结论：会被代理到http://127.0.0.1:81/ftlynx/test.html 这个url。
     
    第四种(相对于第三种，最后少一个 / )：
        location  /proxy/ {
        proxy_pass http://127.0.0.1:81/ftlynx;
        }
        结论：会被代理到http://127.0.0.1:81/ftlynxtest.html 这个url
        

```





