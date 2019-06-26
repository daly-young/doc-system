# Daly-Doc文档系统

## 技术栈
`Vue-cli3` + `elementUI` + `Egg` + `MySql`

## 功能
* 文档的增删改查
* 目录的增加
* 用户注册登录
* 用户文章收藏
* 用户操作记录

## 一览
![image](https://github.com/daly-young/doc-system/blob/master/image.png)

## Quick Start
```
// 前端静态
cd document-front
npm i
npm run serve

// node服务
cd ../document-server
npm i
npm run dev
```

## 部署到线上
**1.前端静态，修改打包输出路径**

`vue.config.js`

```
outputDir: '需要的位置',
```

**2.配置nginx,指向打包输出目录and设置接口代理**

```
server {
	listen 80;
	server_name system.xueshanshan.com;
	root   /usr/share/nginx/html/system;
	index index.js index.html index.htm;
	
	
	add_header Access-Control-Allow-Origin *;
	add_header Access-Control-Allow-Headers X-Requested-With;
	add_header Access-Control-Allow-Methods GET,POST,OPTIONS;
	
	include /etc/nginx/default.d/*.conf;
	
	location / {
		try_files $uri $uri/ /index.html;
	}
	
	location /api {
		rewrite  ^/api/(.*)$ /$1 break;
		proxy_pass   http://127.0.0.1:7001;
	}
	
	error_page 404 /404.html;
		location = /40x.html {
	}
	
	error_page 500 502 503 504 /50x.html;
		location = /50x.html {
	}
}
```

**3.node服务，数据库连接配置**

`config/config.pro.js`

```
config.mysql = {
	// 单数据库信息配置
	client: { 
		host: 'localhost',
		// 端口号
		port: '3306',
		// 用户名
		user: 'root',
		// 数据库名
		database: 'xxx',
		// 密码
		password: '123456',
	},
};
```

**4.启动node服务**

```
cd document-server
npm start
```



