## NGINX
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

## 存在D:/Desktop/test/index.html怎么配置nginx让它可以访问
您可以在 Nginx 的配置文件中添加以下配置来让它可以访问：
```javascript
server {
    listen       80;
    server_name  localhost;

    location / {
        root   D:/Desktop/test;
        index  index.html index.htm;
    }
}

```

这个配置的含义是：当有请求访问 `http://localhost/` 时，Nginx 会返回 `D:/Desktop/test` 目录下的 `index.html` 或 `index.htm` 文件的内容。

## nginx的常用模块

Nginx拥有丰富的模块来扩展和定制其功能，以下是一些常用的模块：

1.  HTTP模块：提供HTTP服务和反向代理等功能，例如`ngx_http_core_module`、`ngx_http_proxy_module`、`ngx_http_rewrite_module`等。
2.  Stream模块：提供TCP/UDP流代理和负载均衡功能，例如`ngx_stream_core_module`、`ngx_stream_proxy_module`等。
3.  Upstream模块：提供上游服务器管理和负载均衡功能，例如`ngx_http_upstream_module`、`ngx_stream_upstream_module`等。
4.  SSL模块：提供HTTPS协议支持，例如`ngx_http_ssl_module`、`ngx_stream_ssl_module`等。
5.  Access模块：提供访问控制和安全策略支持，例如`ngx_http_access_module`、`ngx_http_auth_basic_module`等。
6.  Rewrite模块：提供URL重写功能，例如`ngx_http_rewrite_module`、`ngx_stream_rewrite_module`等。
7.  Cache模块：提供缓存支持，例如`ngx_http_proxy_module`、`ngx_http_fastcgi_module`等。
8.  Gzip模块：提供压缩支持，例如`ngx_http_gzip_module`等。
9.  Realip模块：提供真实客户端IP地址获取支持，例如`ngx_http_realip_module`等。
10. Header模块：提供请求头和响应头操作支持，例如`ngx_http_headers_module`、`ngx_http_addition_module`等。
11. Lua模块：提供Lua脚本支持，例如`ngx_http_lua_module`等。
12. Perl模块：提供Perl脚本支持，例如`ngx_http_perl_module`等。
13. JS模块：提供JavaScript脚本支持，例如`ngx_http_js_module`等。

这些模块都是Nginx的核心模块，可根据实际需求选择使用。同时，Nginx也支持第三方模块的开发和集成，可以通过编写自定义模块来满足特定需求。

## nginx反向代理面对sso可能有什么问题

在使用 Nginx 反向代理应用程序时，与 SSO 相关的常见问题包括：

1.  Cookie 不共享：在 SSO 系统中，用户在第一次登录时，认证服务器会颁发一个 Cookie 给用户。这个 Cookie 包含了用户的身份信息和权限信息。然而，当应用程序通过 Nginx 反向代理时，这个 Cookie 无法自动传递，因为代理服务器和应用服务器是不同的域。因此，需要手动将 Cookie 从代理服务器传递到应用服务器。
2.  跨域问题：如果应用程序与认证服务器不在同一个域中，那么在进行身份验证时就可能会遇到跨域问题。这个问题可以通过在 Nginx 中配置 CORS 来解决。
3.  HTTPS 证书问题：如果应用程序使用 HTTPS 协议进行通信，那么代理服务器和应用服务器之间的通信也需要使用 HTTPS 协议，并且需要使用正确的证书。如果证书不匹配或过期，就会导致 SSL 错误。
4.  同步问题：如果应用程序之间使用不同的用户数据库，那么需要确保用户在不同系统中的权限和状态保持同步。这需要在 SSO 系统中实现正确的逻辑和流程，以确保用户的信息被正确更新。
5.  会话共享问题：在 SSO 系统中，用户需要在不同系统之间保持会话。如果会话无法共享或共享不正确，用户可能会遇到登录超时或强制退出的问题。这个问题可以通过在 SSO 系统中实现正确的会话管理逻辑来解决。

需要注意的是，以上问题并不是绝对的，实际上在配置 Nginx 反向代理时，可能还会遇到其他与 SSO 相关的问题。因此，在使用 Nginx 反向代理 SSO 应用程序时，需要仔细考虑各种因素，并根据实际情况进行调整和优化。



### 给出配置解决以上问题，要加注释

以下是一个示例配置，用于解决在使用 Nginx 反向代理 SSO 应用程序时可能遇到的常见问题：

```bash
# 配置反向代理服务器
server {
    listen 80;
    server_name example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name example.com;

    # 配置 HTTPS 协议
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # 配置反向代理
    location / {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://localhost:8080;
    }

    # 配置 Cookie 传递
    location /app1/ {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://localhost:8081;
        proxy_cookie_domain localhost example.com; # 设置 Cookie 域
        
        # 配置 CORS
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            add_header 'Content-Length' 0;
            return 204;
        }
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
    }


    # 配置会话共享
    location /app2/ {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://localhost:8082;
        proxy_set_header Cookie $http_cookie; # 将 Cookie 传递给应用程序
        add_header Set-Cookie $sent_http_set_cookie; # 将应用程序返回的 Cookie 传递给客户端
    }
}

```

这个示例配置中，我们分别解决了 Cookie 不共享、跨域问题、HTTPS 证书问题、会话共享问题和同步问题。

在实际配置时，需要根据具体情况进行调整和优化，以确保反向代理系统的稳定和可靠性。
